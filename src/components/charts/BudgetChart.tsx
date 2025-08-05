"use client"

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BudgetData {
  month: string
  budget: number
  actual: number
}

export default function BudgetChart() {
  const [chartData, setChartData] = useState<BudgetData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBudgetData()
  }, [])

  const fetchBudgetData = async () => {
    try {
      const currentYear = new Date().getFullYear()
      const budgetRes = await fetch(`/api/budgets?year=${currentYear}`)
      const budgets = await budgetRes.json()
      
      const resultRes = await fetch(`/api/results?year=${currentYear}`)
      const results = await resultRes.json()
      
      // 月別に集計
      const monthlyData: Record<number, { budget: number; actual: number }> = {}
      
      budgets.forEach((budget: any) => {
        if (!monthlyData[budget.month]) {
          monthlyData[budget.month] = { budget: 0, actual: 0 }
        }
        monthlyData[budget.month].budget += budget.budgetAmount
      })
      
      results.forEach((result: any) => {
        if (!monthlyData[result.month]) {
          monthlyData[result.month] = { budget: 0, actual: 0 }
        }
        monthlyData[result.month].actual += result.actualSpend
      })
      
      // チャート用データに変換
      const data = Object.entries(monthlyData)
        .sort(([a], [b]) => Number(a) - Number(b))
        .slice(-6) // 直近6ヶ月
        .map(([month, data]) => ({
          month: `${month}月`,
          budget: data.budget,
          actual: data.actual
        }))
      
      setChartData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching budget data:', error)
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

  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        label: '予算',
        data: chartData.map(d => d.budget),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: '実績',
        data: chartData.map(d => d.actual),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  }

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        データがありません
      </div>
    )
  }

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  )
}