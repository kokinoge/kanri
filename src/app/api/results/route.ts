import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  ResultWhereInput,
  ResultQueryParams,
  ResultCreateRequest,
  ResultUpdateRequest,
  ResultFormattedResponse
} from '@/types/api'
import { successResponse, validationError, handleApiError } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams: ResultQueryParams = {
      year: searchParams.get('year') ?? undefined,
      month: searchParams.get('month') ?? undefined,
      campaignId: searchParams.get('campaignId') ?? undefined,
      platform: searchParams.get('platform') ?? undefined
    }
    
    const where: ResultWhereInput = {}
    
    if (queryParams.year) {
      where.year = parseInt(queryParams.year)
    }
    
    if (queryParams.month) {
      where.month = parseInt(queryParams.month)
    }
    
    if (queryParams.campaignId) {
      where.campaignId = queryParams.campaignId
    }
    
    if (queryParams.platform) {
      where.platform = queryParams.platform
    }
    
    const results = await prisma.result.findMany({
      where,
      include: {
        campaign: {
          include: {
            client: true,
            budgets: {
              where: {
                ...(queryParams.year && { year: parseInt(queryParams.year) }),
                ...(queryParams.month && { month: parseInt(queryParams.month) }),
                ...(queryParams.platform && { platform: queryParams.platform })
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
    const formattedResults: ResultFormattedResponse[] = results.map(result => {
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
    
    return successResponse(formattedResults)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ResultCreateRequest = await request.json()
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
      return validationError('すべての項目を入力してください')
    }
    
    // 既存の実績をチェック（重複防止）
    const existing = await prisma.result.findFirst({
      where: {
        campaignId,
        year: parseInt(String(year)),
        month: parseInt(String(month)),
        platform,
        operationType
      }
    })
    
    if (existing) {
      // 既存の場合は更新
      const result = await prisma.result.update({
        where: { id: existing.id },
        data: {
          actualSpend: parseFloat(String(actualSpend)),
          actualResult: parseFloat(String(actualResult))
        },
        include: {
          campaign: {
            include: {
              client: true
            }
          }
        }
      })
      return successResponse(result, '実績を更新しました')
    }
    
    // 新規作成
    const result = await prisma.result.create({
      data: {
        campaignId,
        year: parseInt(String(year)),
        month: parseInt(String(month)),
        platform,
        operationType,
        actualSpend: parseFloat(String(actualSpend)),
        actualResult: parseFloat(String(actualResult))
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return successResponse(result, '実績を作成しました')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: ResultUpdateRequest = await request.json()
    const { id, actualSpend, actualResult } = body
    
    if (!id) {
      return validationError('Result ID is required')
    }
    
    const result = await prisma.result.update({
      where: { id },
      data: {
        ...(actualSpend !== undefined && { actualSpend: parseFloat(String(actualSpend)) }),
        ...(actualResult !== undefined && { actualResult: parseFloat(String(actualResult)) })
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return successResponse(result, '実績を更新しました')
  } catch (error) {
    return handleApiError(error)
  }
}