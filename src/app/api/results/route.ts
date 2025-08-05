import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const campaignId = searchParams.get('campaignId')
    const platform = searchParams.get('platform')
    
    const where: any = {}
    
    if (year) {
      where.year = parseInt(year)
    }
    
    if (month) {
      where.month = parseInt(month)
    }
    
    if (campaignId) {
      where.campaignId = campaignId
    }
    
    if (platform) {
      where.platform = platform
    }
    
    const results = await prisma.result.findMany({
      where,
      include: {
        campaign: {
          include: {
            client: true,
            budgets: {
              where: {
                ...(year && { year: parseInt(year) }),
                ...(month && { month: parseInt(month) }),
                ...(platform && { platform })
              }
            }
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    
    // 実績データを整形（予算との比較を含む）
    const formattedResults = results.map(result => {
      const budget = result.campaign.budgets.find(
        b => b.platform === result.platform && 
            b.operationType === result.operationType
      )
      
      return {
        ...result,
        actualSpend: Number(result.actualSpend),
        actualResult: Number(result.actualResult),
        clientName: result.campaign.client.name,
        campaignName: result.campaign.name,
        budgetAmount: budget ? Number(budget.budgetAmount) : 0,
        targetValue: budget ? Number(budget.targetValue) : 0,
        spendAchievement: budget ? 
          (Number(result.actualSpend) / Number(budget.budgetAmount) * 100).toFixed(1) : 0,
        resultAchievement: budget ? 
          (Number(result.actualResult) / Number(budget.targetValue) * 100).toFixed(1) : 0
      }
    })
    
    return NextResponse.json(formattedResults)
  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch results' },
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
      actualSpend,
      actualResult
    } = body
    
    // バリデーション
    if (!campaignId || !year || !month || !platform || 
        !operationType || actualSpend === undefined || actualResult === undefined) {
      return NextResponse.json(
        { error: 'すべての項目を入力してください' },
        { status: 400 }
      )
    }
    
    // 既存の実績をチェック（重複防止）
    const existing = await prisma.result.findFirst({
      where: {
        campaignId,
        year: parseInt(year),
        month: parseInt(month),
        platform,
        operationType
      }
    })
    
    if (existing) {
      // 既存の場合は更新
      const result = await prisma.result.update({
        where: { id: existing.id },
        data: {
          actualSpend: parseFloat(actualSpend),
          actualResult: parseFloat(actualResult)
        },
        include: {
          campaign: {
            include: {
              client: true
            }
          }
        }
      })
      return NextResponse.json(result)
    }
    
    // 新規作成
    const result = await prisma.result.create({
      data: {
        campaignId,
        year: parseInt(year),
        month: parseInt(month),
        platform,
        operationType,
        actualSpend: parseFloat(actualSpend),
        actualResult: parseFloat(actualResult)
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating result:', error)
    return NextResponse.json(
      { error: 'Failed to create result' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, actualSpend, actualResult } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Result ID is required' },
        { status: 400 }
      )
    }
    
    const result = await prisma.result.update({
      where: { id },
      data: {
        ...(actualSpend !== undefined && { actualSpend: parseFloat(actualSpend) }),
        ...(actualResult !== undefined && { actualResult: parseFloat(actualResult) })
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating result:', error)
    return NextResponse.json(
      { error: 'Failed to update result' },
      { status: 500 }
    )
  }
}