"use client"

import { useState, useEffect } from "react"
import { Users, Plus, Search, Building2, Phone, Mail, Calendar, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  name: string
  companyName: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  contractStartDate: string
  monthlyBudget: number
  totalSpent: number
  campaigns: number
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "pending">("all")
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    // ダミーデータの生成
    const mockClients: Client[] = [
      {
        id: "1",
        name: "田中 太郎",
        companyName: "株式会社ABC商事",
        email: "tanaka@abc-corp.jp",
        phone: "03-1234-5678",
        status: "active",
        contractStartDate: "2024-01-15",
        monthlyBudget: 1500000,
        totalSpent: 8500000,
        campaigns: 5
      },
      {
        id: "2",
        name: "鈴木 花子",
        companyName: "デジタルマーケティング株式会社",
        email: "suzuki@digital-marketing.co.jp",
        phone: "03-2345-6789",
        status: "active",
        contractStartDate: "2024-03-01",
        monthlyBudget: 2000000,
        totalSpent: 6000000,
        campaigns: 8
      },
      {
        id: "3",
        name: "佐藤 健一",
        companyName: "イノベーション合同会社",
        email: "sato@innovation-llc.jp",
        phone: "03-3456-7890",
        status: "inactive",
        contractStartDate: "2023-06-15",
        monthlyBudget: 0,
        totalSpent: 12000000,
        campaigns: 0
      },
      {
        id: "4",
        name: "高橋 美咲",
        companyName: "グローバルソリューションズ株式会社",
        email: "takahashi@global-solutions.jp",
        phone: "03-4567-8901",
        status: "active",
        contractStartDate: "2024-02-01",
        monthlyBudget: 3000000,
        totalSpent: 9000000,
        campaigns: 12
      },
      {
        id: "5",
        name: "山田 次郎",
        companyName: "スタートアップXYZ",
        email: "yamada@startup-xyz.com",
        phone: "03-5678-9012",
        status: "pending",
        contractStartDate: "2025-01-01",
        monthlyBudget: 500000,
        totalSpent: 0,
        campaigns: 0
      }
    ]

    setTimeout(() => {
      setClients(mockClients)
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: Client['status']) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    const labels = {
      active: "契約中",
      inactive: "停止中",
      pending: "準備中"
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const activeClientsCount = clients.filter(c => c.status === "active").length
  const totalMonthlyBudget = clients
    .filter(c => c.status === "active")
    .reduce((sum, c) => sum + c.monthlyBudget, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">クライアント管理</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規クライアント
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">アクティブクライアント</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{activeClientsCount}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">月間予算合計</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(totalMonthlyBudget)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">総クライアント数</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{clients.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="クライアント名、会社名、メールアドレスで検索"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">すべて</option>
                <option value="active">契約中</option>
                <option value="inactive">停止中</option>
                <option value="pending">準備中</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    クライアント
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    連絡先
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    月間予算
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    累計支出
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン数
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.companyName}</div>
                        <div className="text-sm text-gray-500">{client.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {client.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(client.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(client.monthlyBudget)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(client.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.campaigns}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/clients/${client.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">クライアントが見つかりません</h3>
            <p className="mt-1 text-sm text-gray-500">検索条件を変更してください</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">新規クライアント追加</h3>
            <p className="text-sm text-gray-500 mb-4">
              この機能は現在開発中です。
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}