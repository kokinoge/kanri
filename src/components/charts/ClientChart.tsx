"use client"

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ClientData {
  clientName: string
  monthlyData: {
    month: string
    spend: number
    result: number
  }[]
}

export default function ClientChart() {
  const [clientData, setClientData] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClientData()
  }, [])

  const fetchClientData = async () => {
    try {
      const currentYear = new Date().getFullYear()
      const resultRes = await fetch(`/api/results?year=${currentYear}`)
      const results = await resultRes.json()
      
      // クライアント別・月別に集計
      const clientMap: Record<string, Record<number, { spend: number; result: number }>> = {}
      
      results.forEach((result: any) => {
        const clientName = result.clientName
        if (!clientMap[clientName]) {
          clientMap[clientName] = {}
        }
        if (!clientMap[clientName][result.month]) {
          clientMap[clientName][result.month] = { spend: 0, result: 0 }
        }
        clientMap[clientName][result.month].spend += result.actualSpend
        clientMap[clientName][result.month].result += result.actualResult
      })
      
      // チャート用データに変換（上位5クライアント）
      const data = Object.entries(clientMap)
        .map(([clientName, monthlyData]) => {
          const totalSpend = Object.values(monthlyData).reduce((sum, d) => sum + d.spend, 0)
          return {
            clientName,
            totalSpend,
            monthlyData: Object.entries(monthlyData)
              .sort(([a], [b]) => Number(a) - Number(b))
              .slice(-6) // 直近6ヶ月
              .map(([month, data]) => ({
                month: `${month}月`,
                spend: data.spend,
                result: data.result
              }))
          }
        })
        .sort((a, b) => b.totalSpend - a.totalSpend)
        .slice(0, 5) // 上位5クライアント
      
      setClientData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching client data:', error)
      setLoading(false)
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || ''
            const value = new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: 'JPY'
            }).format(context.parsed.y)
            return `${label}: ${value}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: 'JPY',
              notation: 'compact'
            }).format(value)
          }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
      </div>
    )
  }

  if (clientData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        データがありません
      </div>
    )
  }

  // 月ラベルを取得（どのクライアントでも同じはず）
  const labels = clientData[0]?.monthlyData.map(d => d.month) || []

  // クライアントごとのデータセットを生成
  const datasets = clientData.map((client, index) => {
    const colors = [
      { border: 'rgb(59, 130, 246)', background: 'rgba(59, 130, 246, 0.5)' },
      { border: 'rgb(34, 197, 94)', background: 'rgba(34, 197, 94, 0.5)' },
      { border: 'rgb(168, 85, 247)', background: 'rgba(168, 85, 247, 0.5)' },
      { border: 'rgb(251, 146, 60)', background: 'rgba(251, 146, 60, 0.5)' },
      { border: 'rgb(14, 165, 233)', background: 'rgba(14, 165, 233, 0.5)' }
    ]
    const color = colors[index % colors.length]

    return {
      label: client.clientName,
      data: client.monthlyData.map(d => d.spend),
      borderColor: color.border,
      backgroundColor: color.background,
      tension: 0.1
    }
  })

  const data = {
    labels,
    datasets
  }

  return (
    <div className="h-64">
      <Line options={options} data={data} />
    </div>
  )
}