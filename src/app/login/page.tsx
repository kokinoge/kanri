'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // URLからエラーパラメータをチェック
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError('認証エラーが発生しました。もう一度お試しください。')
    }

    // 既にログイン済みの場合はコールバックURLまたはホームにリダイレクト
    if (user) {
      const callbackUrl = searchParams.get('callbackUrl') || '/'
      router.push(decodeURIComponent(callbackUrl))
    }
  }, [router, searchParams, user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const success = await login(email, password)
      if (success) {
        // ログイン成功時はコールバックURLまたはホームにリダイレクト
        const callbackUrl = searchParams.get('callbackUrl') || '/'
        router.push(decodeURIComponent(callbackUrl))
      } else {
        setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('ログイン処理中にエラーが発生しました。')
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div>認証状態を確認中...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>
          予算管理システムにログインしてください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </form>
        
        <div className="mt-6 pt-6 border-t">
          <div className="text-sm text-gray-600">
            <p className="font-semibold">テスト用認証情報:</p>
            <p>開発環境: admin@example.com / admin</p>
            <p>本番環境: admin@example.com / admin123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div>読み込み中...</div>
            </div>
          </CardContent>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
} 