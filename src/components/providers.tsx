"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionChecked, setSessionChecked] = useState(false)

  const checkSession = async () => {
    try {
      console.log('[AUTH_PROVIDER] セッションチェック開始')
      
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      
      console.log('[AUTH_PROVIDER] セッションレスポンス:', {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('[AUTH_PROVIDER] セッションデータ:', data)
        
        if (data.user) {
          setUser(data.user)
          console.log('[AUTH_PROVIDER] ユーザー設定完了:', data.user.email)
        } else {
          setUser(null)
          console.log('[AUTH_PROVIDER] ユーザーなし')
        }
      } else {
        console.warn('[AUTH_PROVIDER] セッション取得失敗:', response.status)
        setUser(null)
      }
    } catch (error) {
      console.error('[AUTH_PROVIDER] セッションチェックエラー:', error)
      setUser(null)
    } finally {
      setLoading(false)
      setSessionChecked(true)
      console.log('[AUTH_PROVIDER] セッションチェック完了')
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      console.log('[AUTH_PROVIDER] ログイン試行:', email)
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      console.log('[AUTH_PROVIDER] ログインレスポンス:', {
        status: response.status,
        ok: response.ok
      })

      if (response.ok) {
        const data = await response.json()
        console.log('[AUTH_PROVIDER] ログイン成功:', data)
        
        if (data.success && data.user) {
          setUser(data.user)
          return true
        }
      }
      
      console.warn('[AUTH_PROVIDER] ログイン失敗')
      return false
    } catch (error) {
      console.error('[AUTH_PROVIDER] ログインエラー:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('[AUTH_PROVIDER] ログアウト実行')
      
      await fetch('/api/auth/signout', { 
        method: 'POST',
        credentials: 'include'
      })
      
      setUser(null)
      console.log('[AUTH_PROVIDER] ログアウト完了')
    } catch (error) {
      console.error('[AUTH_PROVIDER] ログアウトエラー:', error)
      setUser(null)
    }
  }

  // セッションチェックは一度だけ実行
  useEffect(() => {
    if (!sessionChecked) {
      console.log('[AUTH_PROVIDER] 初回セッションチェック実行')
      checkSession()
    }
  }, [sessionChecked])

  // デバッグ用ログ
  useEffect(() => {
    console.log('[AUTH_PROVIDER] 状態変更:', {
      hasUser: !!user,
      userEmail: user?.email,
      loading,
      sessionChecked
    })
  }, [user, loading, sessionChecked])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
} 