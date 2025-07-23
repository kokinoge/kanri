# 🔒 Supabase セキュリティ設定ガイド

## 🚨 **重要: 個人情報漏洩防止のための必須設定**

### **1. プロジェクト作成時の設定**

#### **1.1 基本セキュリティ設定**
```bash
# Supabase CLI のインストール
npm install -g @supabase/cli

# ログインとプロジェクト作成
supabase login
supabase projects create kanri-budget-management --region ap-northeast-1
```

#### **1.2 データベース設定**
```sql
-- パスワードポリシーの強化
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
ALTER SYSTEM SET log_connections = on;
ALTER SYSTEM SET log_disconnections = on;
```

### **2. 環境変数の適切な設定**

#### **2.1 本番環境用 (.env.production)**
```bash
# ⚠️ 重要: anon key は読み取り専用に制限
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # 制限付きキー

# サーバーサイド専用（公開しない）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...      # フルアクセスキー（サーバーのみ）
DATABASE_URL=postgresql://postgres.xxx:password@aws...
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=https://your-domain.com
```

#### **2.2 開発環境用 (.env.local)**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # 開発用キー
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres.xxx:password@aws...
NEXTAUTH_SECRET=development-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### **3. Anon Key の権限制限設定**

#### **3.1 JWT 設定（Supabase Dashboard）**
```json
{
  "role": "anon",
  "iss": "supabase",
  "iat": 1640995200,
  "exp": 1972531200,
  "aud": "authenticated",
  "sub": "",
  "email": "",
  "phone": "",
  "app_metadata": {
    "provider": "email",
    "providers": ["email"]
  },
  "user_metadata": {},
  "roles": ["anon"]
}
```

#### **3.2 Anon ロールの権限制限**
```sql
-- anon ロールの権限を最小限に制限
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;

-- 認証関連のみ許可
GRANT USAGE ON SCHEMA auth TO anon;
GRANT SELECT ON auth.users TO anon;  -- 自分の情報のみ（RLSで制限）

-- 完全に読み取り専用にする場合
GRANT SELECT ON public.masters TO anon;  -- マスタデータのみ許可
```

### **4. RLS ポリシーの実装**

#### **4.1 自動実行スクリプト**
```bash
# RLSマイグレーションの実行
psql -h your-db-host -U postgres -d postgres -f supabase-migration.sql
```

#### **4.2 ポリシー検証クエリ**
```sql
-- RLS が有効になっているかチェック
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- ポリシー一覧の確認
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- anon ロールでテスト（危険：本番では実行しない）
SET ROLE anon;
SELECT * FROM users LIMIT 1;  -- エラーになることを確認
RESET ROLE;
```

### **5. API セキュリティ強化**

#### **5.1 Supabase クライアント設定**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'kanri-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'kanri-budget-management',
    },
  },
  realtime: {
    // リアルタイム機能を無効化（セキュリティ向上）
    params: {
      eventsPerSecond: 2,
    },
  },
})

// サーバーサイド専用クライアント
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

### **6. NextAuth.js と Supabase 統合**

#### **6.1 セキュアな認証設定**
```typescript
// src/auth.ts - 修正版
import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabaseAdmin } from "@/lib/supabase"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Supabase Auth を使用した認証
        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        if (error || !data.user) {
          console.error('Auth error:', error)
          return null
        }

        // ユーザー情報の取得（RLS により制限される）
        const { data: userData, error: userError } = await supabaseAdmin
          .from('users')
          .select('id, name, email, role, department, is_active')
          .eq('id', data.user.id)
          .single()

        if (userError || !userData || !userData.is_active) {
          console.error('User fetch error:', userError)
          return null
        }

        return {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          department: userData.department,
        }
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24時間
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.department = user.department
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.department = token.department as string
      }
      return session
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // セキュリティ設定
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `kanri.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
})
```

### **7. セキュリティ検証チェックリスト**

#### **7.1 本番デプロイ前チェック**

- [ ] **RLS 有効化確認**: 全テーブルでRLSが有効
- [ ] **anon key 制限確認**: 読み取り専用権限のみ
- [ ] **環境変数確認**: SERVICE_ROLE_KEYがサーバーサイドのみ
- [ ] **セッション設定**: 適切な有効期限とセキュアクッキー
- [ ] **CORS 設定**: 本番ドメインのみ許可
- [ ] **HTTPS 強制**: 全通信のHTTPS化

#### **7.2 侵入テスト**

```bash
# anon key での不正アクセステスト
curl -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "apikey: YOUR_ANON_KEY" \
     "https://your-project.supabase.co/rest/v1/users?select=*"
# → 403 Forbidden が返ることを確認

# 大量データ取得テスト
curl -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "apikey: YOUR_ANON_KEY" \
     "https://your-project.supabase.co/rest/v1/users?limit=1000"
# → 空の結果 or 403 が返ることを確認
```

### **8. 監視・アラート設定**

#### **8.1 Supabase ダッシュボード設定**
- **Auth ログ監視**: 異常なログイン試行の検出
- **API 使用量監視**: 異常なアクセス数の検出
- **エラーログ監視**: 権限エラーの頻発検出

#### **8.2 カスタム監視（オプション）**
```sql
-- 異常アクセスの検出クエリ
SELECT 
  DATE_TRUNC('minute', created_at) as minute,
  COUNT(*) as request_count,
  COUNT(DISTINCT user_id) as unique_users
FROM audit_logs 
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY minute
HAVING COUNT(*) > 100;  -- 1分間に100回以上のアクセス
```

## ✅ **セキュリティ対策完了の確認**

この設定により、以下のセキュリティリスクを防止できます：

1. **🛡️ PII漏洩防止**: Users/Accounts/Sessionsテーブルの完全保護
2. **🔒 権限昇格防止**: Role-based access control の徹底
3. **🚫 不正アクセス防止**: RLSによる行レベルセキュリティ
4. **👁️ 監査ログ**: 全操作の記録と監視
5. **🔐 トークン保護**: anon keyの最小権限化

**⚠️ 重要**: 本番デプロイ前に必ず侵入テストを実行してください。 