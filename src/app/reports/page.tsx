"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Calendar, Filter, TrendingUp, Users, DollarSign, BarChart3, FileSpreadsheet } from "lucide-react"

interface Report {
  id: string
  name: string
  type: "monthly" | "campaign" | "client" | "budget"
  createdAt: string
  status: "ready" | "generating" | "scheduled"
  size?: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<"xlsx" | "csv" | "pdf">("xlsx")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    // 現在の年月を設定
    const now = new Date()
    setSelectedMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`)
    
    // ダミーデータの読み込み
    setTimeout(() => {
      setReports([
        {
          id: "1",
          name: "月次レポート 2025年8月",
          type: "monthly",
          createdAt: "2025-08-01T09:00:00",
          status: "ready",
          size: "2.5MB"
        },
        {
          id: "2",
          name: "Google広告キャンペーン実績",
          type: "campaign",
          createdAt: "2025-08-03T14:30:00",
          status: "ready",
          size: "1.8MB"
        },
        {
          id: "3",
          name: "クライアントA様 月次報告書",
          type: "client",
          createdAt: "2025-08-02T10:00:00",
          status: "ready",
          size: "3.2MB"
        },
        {
          id: "4",
          name: "予算執行状況レポート",
          type: "budget",
          createdAt: "2025-08-04T08:00:00",
          status: "generating"
        },
        {
          id: "5",
          name: "月次レポート 2025年7月",
          type: "monthly",
          createdAt: "2025-07-01T09:00:00",
          status: "ready",
          size: "2.3MB"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'monthly':
        return <Calendar className="h-5 w-5 text-blue-500" />
      case 'campaign':
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'client':
        return <Users className="h-5 w-5 text-purple-500" />
      case 'budget':
        return <DollarSign className="h-5 w-5 text-orange-500" />
    }
  }

  const getTypeName = (type: Report['type']) => {
    switch (type) {
      case 'monthly':
        return '月次レポート'
      case 'campaign':
        return 'キャンペーンレポート'
      case 'client':
        return 'クライアントレポート'
      case 'budget':
        return '予算レポート'
    }
  }

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">ダウンロード可能</span>
      case 'generating':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">生成中...</span>
      case 'scheduled':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">予約済み</span>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredReports = reports.filter(report => {
    if (selectedType !== 'all' && report.type !== selectedType) {
      return false
    }
    return true
  })

  const handleDownload = (report: Report) => {
    setSelectedReport(report)
    setShowExportModal(true)
  }

  const handleExport = async () => {
    if (!selectedReport) return

    try {
      // API エンドポイントを呼び出してエクスポート
      const response = await fetch("/api/reports/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: selectedReport.id,
          format: exportFormat,
          type: selectedReport.type,
          month: selectedMonth
        })
      })

      if (response.ok) {
        // ダウンロードリンクを作成
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${selectedReport.name}.${exportFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        setShowExportModal(false)
        setSelectedReport(null)
      } else {
        alert("エクスポートに失敗しました")
      }
    } catch (error) {
      console.error("Export error:", error)
      alert("エクスポート中にエラーが発生しました")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">レポート</h1>
        <p className="mt-1 text-sm text-gray-500">
          各種レポートのダウンロードと生成
        </p>
      </div>

      {/* フィルターセクション */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              レポートタイプ
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">すべて</option>
              <option value="monthly">月次レポート</option>
              <option value="campaign">キャンペーンレポート</option>
              <option value="client">クライアントレポート</option>
              <option value="budget">予算レポート</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              対象月
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Filter className="h-4 w-4" />
              フィルター適用
            </button>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 hover:border-blue-400">
          <div className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600">
            <BarChart3 className="h-8 w-8" />
            <span className="font-medium">新規レポート生成</span>
          </div>
        </button>
      </div>

      {/* レポート一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">レポート一覧</h2>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <div key={report.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {report.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span>{getTypeName(report.type)}</span>
                        <span>•</span>
                        <span>{formatDate(report.createdAt)}</span>
                        {report.size && (
                          <>
                            <span>•</span>
                            <span>{report.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(report.status)}
                    {report.status === 'ready' && (
                      <button
                        onClick={() => handleDownload(report)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        ダウンロード
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p>該当するレポートがありません</p>
          </div>
        )}
      </div>

      {/* エクスポートモーダル */}
      {showExportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">レポートエクスポート</h2>
            <p className="text-gray-600 mb-6">
              「{selectedReport.name}」をエクスポートします。
              フォーマットを選択してください。
            </p>
            
            <div className="space-y-4">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="format"
                  value="xlsx"
                  checked={exportFormat === "xlsx"}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="mr-3"
                />
                <FileSpreadsheet className="h-5 w-5 text-green-600 mr-2" />
                <div className="flex-1">
                  <div className="font-medium">Excel形式 (.xlsx)</div>
                  <div className="text-sm text-gray-500">グラフやフォーマットを含む詳細なレポート</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="mr-3"
                />
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <div className="flex-1">
                  <div className="font-medium">CSV形式 (.csv)</div>
                  <div className="text-sm text-gray-500">データ分析やインポート用のシンプルな形式</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportFormat === "pdf"}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="mr-3"
                />
                <FileText className="h-5 w-5 text-red-600 mr-2" />
                <div className="flex-1">
                  <div className="font-medium">PDF形式 (.pdf)</div>
                  <div className="text-sm text-gray-500">印刷や共有に適したプレゼンテーション形式</div>
                </div>
              </label>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowExportModal(false)
                  setSelectedReport(null)
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                エクスポート
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}