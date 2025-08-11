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
import { createLineChartOptions, getChartColor, ChartLoadingSpinner, ChartNoData } from '@/lib/chart-config'

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
      setLoading(false)
    }
  }

  const options = createLineChartOptions()

  if (loading) {
    return <ChartLoadingSpinner />
  }

  if (clientData.length === 0) {
    return <ChartNoData />
  }

  // 月ラベルを取得（どのクライアントでも同じはず）
  const labels = clientData[0]?.monthlyData.map(d => d.month) || []

  // クライアントごとのデータセットを生成
  const datasets = clientData.map((client, index) => {
    const color = getChartColor(index)

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