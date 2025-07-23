'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>読み込み中...</div>
      </div>
    )
  }

  if (!user) {
    return null // リダイレクト中
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                予算管理システム - Kanri
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                ようこそ、{user.name}さん ({user.email})
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* API Status Check */}
            <Card>
              <CardHeader>
                <CardTitle>API Status Check</CardTitle>
                <CardDescription>
                  システムの動作確認
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/api">
                  <Button className="w-full">
                    ステータス確認
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 設定管理 */}
            <Card>
              <CardHeader>
                <CardTitle>設定管理</CardTitle>
                <CardDescription>
                  システム設定とマスターデータ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/settings/users" className="block">
                    <Button variant="outline" className="w-full">
                      ユーザー管理
                    </Button>
                  </Link>
                  <Link href="/settings/departments" className="block">
                    <Button variant="outline" className="w-full">
                      部署管理
                    </Button>
                  </Link>
                  <Link href="/settings/clients" className="block">
                    <Button variant="outline" className="w-full">
                      クライアント管理
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 予算管理 */}
            <Card>
              <CardHeader>
                <CardTitle>予算管理</CardTitle>
                <CardDescription>
                  予算の作成・管理・追跡
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/budgets" className="block">
                    <Button className="w-full">
                      予算ダッシュボード
                    </Button>
                  </Link>
                  <Link href="/integrated-management" className="block">
                    <Button variant="outline" className="w-full">
                      統合管理
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 分析・レポート */}
            <Card>
              <CardHeader>
                <CardTitle>分析・レポート</CardTitle>
                <CardDescription>
                  データ分析とレポート生成
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/analytics" className="block">
                    <Button className="w-full">
                      分析ダッシュボード
                    </Button>
                  </Link>
                  <Link href="/reports" className="block">
                    <Button variant="outline" className="w-full">
                      レポート一覧
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* システム情報 */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>システム情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>ユーザー:</strong> {user.name}<br/>
                    <strong>メール:</strong> {user.email}<br/>
                    <strong>役割:</strong> {user.role || '未設定'}
                  </div>
                  <div>
                    <strong>部署:</strong> {user.department || '未設定'}<br/>
                    <strong>環境:</strong> {process.env.NODE_ENV}<br/>
                    <strong>認証状態:</strong> 認証済み
                  </div>
                  <div>
                    <strong>最終ログイン:</strong> {new Date().toLocaleString('ja-JP')}<br/>
                    <strong>セッション:</strong> アクティブ
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 