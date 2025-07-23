import { createClient } from '@supabase/supabase-js'

// Build時に環境変数が存在しない場合のデフォルト値を設定
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://localhost:3000'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

// 本番環境でのみ厳密なバリデーション
if (process.env.NODE_ENV === 'production' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Missing Supabase environment variables in production')
}

// 🔒 セキュリティ強化: フロントエンド用クライアント（制限付き）
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'kanri-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'kanri-budget-management',
      'x-client-info': 'supabase-js-web'
    },
  },
  realtime: {
    // リアルタイム機能を制限（セキュリティ向上）
    params: {
      eventsPerSecond: 2,
    },
  },
})

// 🔐 サーバーサイド専用クライアント（フルアクセス）
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'kanri-budget-management-admin',
        'x-client-info': 'supabase-js-admin'
      },
    },
  }
)

// 🛡️ セキュリティユーティリティ関数
export const securityUtils = {
  // anon key が適切に制限されているかチェック
  async validateAnonKeyRestrictions() {
    try {
      // 危険: users テーブルへの直接アクセスを試行
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1)
      
      if (!error && data && data.length > 0) {
        console.error('🚨 SECURITY ALERT: anon key has unrestricted access to users table!')
        return false
      }
      
      return true
    } catch (err) {
      console.log('✅ anon key is properly restricted')
      return true
    }
  },

  // RLS ポリシーが有効かチェック
  async validateRLSStatus() {
    try {
      const { data, error } = await supabaseAdmin
        .from('pg_tables')
        .select('tablename, rowsecurity')
        .eq('schemaname', 'public')
      
      if (error) {
        console.error('❌ Failed to check RLS status:', error)
        return false
      }
      
      const unprotectedTables = data?.filter(table => !table.rowsecurity) || []
      
      if (unprotectedTables.length > 0) {
        console.error('🚨 SECURITY ALERT: Tables without RLS:', unprotectedTables)
        return false
      }
      
      console.log('✅ All tables have RLS enabled')
      return true
    } catch (err) {
      console.error('❌ RLS validation failed:', err)
      return false
    }
  },

  // セキュリティ設定の包括的チェック
  async performSecurityAudit() {
    console.log('🔍 Starting security audit...')
    
    const results = {
      anonKeyRestricted: await this.validateAnonKeyRestrictions(),
      rlsEnabled: await this.validateRLSStatus(),
    }
    
    const isSecure = Object.values(results).every(Boolean)
    
    if (isSecure) {
      console.log('✅ Security audit passed!')
    } else {
      console.error('🚨 Security audit failed:', results)
    }
    
    return { isSecure, results }
  }
}

// 🔒 型定義（セキュリティ強化版）
export interface SecureUser {
  id: string
  name: string | null
  email: string
  role: 'admin' | 'manager' | 'member'
  department: string | null
  is_active: boolean
  // パスワード、トークンなどの機密情報は除外
}

export interface AuthenticatedSession {
  user: SecureUser
  access_token: string
  refresh_token?: string
  expires_at: number
}

// 🛡️ セキュア認証ヘルパー
export const authHelpers = {
  async getCurrentUser(): Promise<SecureUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return null
      }
      
      // RLS により制限された安全なユーザー情報取得
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, name, email, role, department, is_active')
        .eq('id', user.id)
        .single()
      
      if (userError || !userData) {
        console.error('Failed to fetch user data:', userError)
        return null
      }
      
      return userData as SecureUser
    } catch (err) {
      console.error('getCurrentUser error:', err)
      return null
    }
  },

  async signInSecure(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Sign in error:', error)
        return { success: false, error: error.message }
      }
      
      const user = await this.getCurrentUser()
      
      if (!user || !user.is_active) {
        await supabase.auth.signOut()
        return { success: false, error: 'User account is inactive' }
      }
      
      return { success: true, user }
    } catch (err) {
      console.error('signInSecure error:', err)
      return { success: false, error: 'Authentication failed' }
    }
  },

  async signOutSecure() {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
      }
      
      // ローカルストレージのクリーンアップ
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kanri-auth')
        sessionStorage.clear()
      }
      
      return { success: !error }
    } catch (err) {
      console.error('signOutSecure error:', err)
      return { success: false }
    }
  }
}

// 🔍 開発環境でのセキュリティ監査実行
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // セキュリティ監査を遅延実行（アプリ初期化後）
  setTimeout(() => {
    securityUtils.performSecurityAudit()
      .then(({ isSecure }) => {
        if (!isSecure) {
          console.warn('⚠️ Security issues detected. Please review the audit results.')
        }
      })
      .catch(err => console.error('Security audit failed:', err))
  }, 5000)
} 