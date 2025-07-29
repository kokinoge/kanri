'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  // ローディング中は読み込み表示
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">読み込み中...</h2>
          <p className="text-gray-600">システム状態を確認しています</p>
        </div>
      </div>
    )
  }

  // ログイン済みの場合はダッシュボードを表示
  if (user) {
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
                  ようこそ、{user.email}さん
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  ログイン中: {user.email}
                </span>
                <Button variant="outline" onClick={logout}>
                  ログアウト
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* メインダッシュボード */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* システム状態 */}
              <Card>
                <CardHeader>
                  <CardTitle>システム状態</CardTitle>
                  <CardDescription>
                    アプリケーションは正常に動作中
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 font-semibold">✅ 動作中</p>
                  <p className="text-sm text-gray-600 mt-2">
                    環境: production
                  </p>
                </CardContent>
              </Card>

              {/* データテーブル */}
              <Card>
                <CardHeader>
                  <CardTitle>データテーブル</CardTitle>
                  <CardDescription>
                    データ管理と分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/data-tables">
                    <Button className="w-full">
                      データテーブルへ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* クライアント管理 */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント管理</CardTitle>
                  <CardDescription>
                    顧客情報の管理
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/clients">
                    <Button variant="outline" className="w-full">
                      クライアント一覧
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* 設定 */}
              <Card>
                <CardHeader>
                  <CardTitle>設定</CardTitle>
                  <CardDescription>
                    システム設定とマスターデータ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full">
                      設定画面へ
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* ユーザー情報 */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>ユーザー情報</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>ログインユーザー:</strong> {user.email}<br/>
                      <strong>権限:</strong> {user.role || '管理者'}<br/>
                      <strong>ログイン状態:</strong> オンライン
                    </div>
                    <div>
                      <strong>環境:</strong> production<br/>
                      <strong>認証:</strong> NextAuth.js<br/>
                      <strong>データベース:</strong> PostgreSQL
                    </div>
                    <div>
                      <strong>フレームワーク:</strong> Next.js 14<br/>
                      <strong>デプロイ:</strong> Vercel<br/>
                      <strong>最終更新:</strong> {new Date().toLocaleString('ja-JP')}
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

  // 未ログインの場合は従来のランディングページを表示
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
                システムが正常に動作しています
              </p>
            </div>
            <Link href="/login">
              <Button variant="outline">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </header>

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* システム状態 */}
              <Card>
                <CardHeader>
                  <CardTitle>システム状態</CardTitle>
                  <CardDescription>
                    アプリケーションは正常に動作中
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 font-semibold">✅ 動作中</p>
                  <p className="text-sm text-gray-600 mt-2">
                    環境: production
                  </p>
                </CardContent>
              </Card>

              {/* ログイン */}
              <Card>
                <CardHeader>
                  <CardTitle>認証</CardTitle>
                  <CardDescription>
                    システムにログイン
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/login">
                    <Button className="w-full">
                      ログイン画面へ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* API確認 */}
              <Card>
                <CardHeader>
                  <CardTitle>API確認</CardTitle>
                  <CardDescription>
                    システムAPI の動作確認
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/api">
                    <Button variant="outline" className="w-full">
                      API状態確認
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* 設定 */}
              <Card>
                <CardHeader>
                  <CardTitle>設定</CardTitle>
                  <CardDescription>
                    システム設定とマスターデータ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full">
                      設定画面へ
                    </Button>
                  </Link>
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
                      <strong>アプリケーション:</strong> 予算管理システム<br/>
                      <strong>バージョン:</strong> 1.0.0<br/>
                      <strong>状態:</strong> 正常動作中
                    </div>
                    <div>
                      <strong>環境:</strong> production<br/>
                      <strong>認証:</strong> NextAuth.js<br/>
                      <strong>データベース:</strong> PostgreSQL
                    </div>
                    <div>
                      <strong>フレームワーク:</strong> Next.js 14<br/>
                      <strong>デプロイ:</strong> Vercel<br/>
                      <strong>最終更新:</strong> {new Date().toLocaleString('ja-JP')}
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