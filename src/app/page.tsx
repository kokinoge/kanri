"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, AlertCircle } from "lucide-react"
import BudgetChart from "@/components/charts/BudgetChart"
import ClientChart from "@/components/charts/ClientChart"

interface DashboardStats {
  activeCampaigns: number
  monthlyBudget: number
  budgetUtilization: number
  activeClients: number
  recentActivities: Activity[]
}

interface Activity {
  id: string
  type: "campaign" | "budget" | "client"
  title: string
  description: string
  timestamp: string
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    activeCampaigns: 12,
    monthlyBudget: 5420000,
    budgetUtilization: 68.5,
    activeClients: 8,
    recentActivities: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ダミーデータの生成
    const mockActivities: Activity[] = [
      {
        id: "1",
        type: "campaign",
        title: "Google広告キャンペーン開始",
        description: "クライアントA向けの新規キャンペーンを開始しました",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "2",
        type: "budget",
        title: "予算承認",
        description: "2025年8月の追加予算が承認されました",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "3",
        type: "client",
        title: "新規クライアント登録",
        description: "株式会社サンプルが新規クライアントとして登録されました",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "4",
        type: "campaign",
        title: "キャンペーン終了",
        description: "Facebook広告キャンペーンが予定通り終了しました",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      }
    ]

    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        recentActivities: mockActivities
      }))
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return "1時間以内"
    } else if (diffInHours < 24) {
      return `${diffInHours}時間前`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}日前`
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'campaign':
        return <BarChart3 className="h-5 w-5 text-blue-500" />
      case 'budget':
        return <DollarSign className="h-5 w-5 text-green-500" />
      case 'client':
        return <Users className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">進行中の施策</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.activeCampaigns}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500 opacity-50" />
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>先月比 +2</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">今月の予算</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(stats.monthlyBudget)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500 opacity-50" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            承認済み予算総額
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">予算執行率</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.budgetUtilization}%</p>
            </div>
            <div className="relative h-16 w-16">
              <svg className="h-16 w-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - stats.budgetUtilization / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
            </div>
          </div>
          {stats.budgetUtilization > 80 && (
            <div className="mt-2 text-sm text-amber-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>残り予算に注意</span>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">アクティブクライアント</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.activeClients}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            現在契約中
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">最近の活動</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
          </div>
        ) : stats.recentActivities.length > 0 ? (
          <div className="space-y-4">
            {stats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 py-3 border-b last:border-0">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">最近の活動はありません</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">予算使用状況（月別）</h2>
          <BudgetChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">クライアント別実績</h2>
          <ClientChart />
        </div>
      </div>
    </div>
  )
}