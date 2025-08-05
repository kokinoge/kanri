import { NextRequest, NextResponse } from 'next/server'

// サンプル予算データ（開発用）
let budgets = [
  {
    id: 'budget_1',
    campaignId: 'campaign_1',
    year: 2024,
    month: 3,
    platform: 'instagram',
    operationType: 'micro_influencer',
    revenueType: 'performance',
    budgetAmount: 500000,
    targetKpi: 'reach',
    targetValue: 100000,
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 'budget_2',
    campaignId: 'campaign_1',
    year: 2024,
    month: 3,
    platform: 'x',
    operationType: 'ad_operation',
    revenueType: 'ad_budget_percent',
    budgetAmount: 800000,
    targetKpi: 'click',
    targetValue: 50000,
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 'budget_3',
    campaignId: 'campaign_2',
    year: 2024,
    month: 4,
    platform: 'youtube',
    operationType: 'mega_influencer',
    revenueType: 'fixed_post',
    budgetAmount: 1200000,
    targetKpi: 'view',
    targetValue: 200000,
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date('2024-03-15').toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaignId')
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const platform = searchParams.get('platform')

    let filteredBudgets = [...budgets]

    // フィルタリング
    if (campaignId) {
      filteredBudgets = filteredBudgets.filter(budget => budget.campaignId === campaignId)
    }
    if (year) {
      filteredBudgets = filteredBudgets.filter(budget => budget.year === parseInt(year))
    }
    if (month) {
      filteredBudgets = filteredBudgets.filter(budget => budget.month === parseInt(month))
    }
    if (platform) {
      filteredBudgets = filteredBudgets.filter(budget => budget.platform === platform)
    }

    // 年月順でソート
    filteredBudgets.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })

    // 集計データも含める
    const totalBudget = filteredBudgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)
    const platformSummary = filteredBudgets.reduce((acc, budget) => {
      acc[budget.platform] = (acc[budget.platform] || 0) + budget.budgetAmount
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: filteredBudgets,
      summary: {
        total: totalBudget,
        count: filteredBudgets.length,
        platformBreakdown: platformSummary
      },
      message: '予算一覧を取得しました'
    })
  } catch (error) {
    console.error('予算取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '予算の取得に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      campaignId, 
      year, 
      month, 
      platform, 
      operationType, 
      revenueType, 
      budgetAmount, 
      targetKpi, 
      targetValue 
    } = body

    // バリデーション
    if (!campaignId || !year || !month || !platform || !operationType || !revenueType) {
      return NextResponse.json(
        { 
          success: false, 
          error: '必須フィールドが不足しています' 
        },
        { status: 400 }
      )
    }

    // 重複チェック
    const existing = budgets.find(budget => 
      budget.campaignId === campaignId &&
      budget.year === year &&
      budget.month === month &&
      budget.platform === platform &&
      budget.operationType === operationType
    )

    if (existing) {
      return NextResponse.json(
        { 
          success: false, 
          error: '同じ条件の予算が既に存在します' 
        },
        { status: 400 }
      )
    }

    const newBudget = {
      id: `budget_${Date.now()}`,
      campaignId,
      year: parseInt(year),
      month: parseInt(month),
      platform,
      operationType,
      revenueType,
      budgetAmount: parseFloat(budgetAmount) || 0,
      targetKpi: targetKpi || '',
      targetValue: parseFloat(targetValue) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    budgets.push(newBudget)

    return NextResponse.json({
      success: true,
      data: newBudget,
      message: '予算を作成しました'
    }, { status: 201 })
  } catch (error) {
    console.error('予算作成エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '予算の作成に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}