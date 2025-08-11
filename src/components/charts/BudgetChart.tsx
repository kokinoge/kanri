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
import { createBarChartOptions, chartColors, ChartLoadingSpinner, ChartNoData } from '@/lib/chart-config'

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
      setLoading(false)
    }
  }

  const options = createBarChartOptions()

  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        label: '予算',
        data: chartData.map(d => d.budget),
        backgroundColor: chartColors[0].background,
        borderColor: chartColors[0].border,
        borderWidth: 1
      },
      {
        label: '実績',
        data: chartData.map(d => d.actual),
        backgroundColor: chartColors[1].background,
        borderColor: chartColors[1].border,
        borderWidth: 1
      }
    ]
  }

  if (loading) {
    return <ChartLoadingSpinner />
  }

  if (chartData.length === 0) {
    return <ChartNoData />
  }

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  )
}