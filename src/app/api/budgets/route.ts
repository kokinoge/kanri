import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  BudgetWhereInput,
  BudgetQueryParams,
  BudgetCreateRequest,
  BudgetUpdateRequest,
  BudgetFormattedResponse
} from '@/types/api'
import { successResponse, validationError, handleApiError } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams: BudgetQueryParams = {
      year: searchParams.get('year') ?? undefined,
      month: searchParams.get('month') ?? undefined,
      campaignId: searchParams.get('campaignId') ?? undefined
    }
    
    const where: BudgetWhereInput = {}
    
    if (queryParams.year) {
      where.year = parseInt(queryParams.year)
    }
    
    if (queryParams.month) {
      where.month = parseInt(queryParams.month)
    }
    
    if (queryParams.campaignId) {
      where.campaignId = queryParams.campaignId
    }
    
    const budgets = await prisma.budget.findMany({
      where,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    
    // 予算データを整形
    const formattedBudgets: BudgetFormattedResponse[] = budgets.map(budget => ({
      ...budget,
      budgetAmount: Number(budget.budgetAmount),
      targetValue: Number(budget.targetValue),
      clientName: budget.campaign.client.name,
      campaignName: budget.campaign.name
    }))
    
    return successResponse(formattedBudgets)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BudgetCreateRequest = await request.json()
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
    if (!campaignId || !year || !month || !platform || !operationType || 
        !revenueType || !budgetAmount || !targetKpi || !targetValue) {
      return validationError('すべての項目を入力してください')
    }
    
    const budget = await prisma.budget.create({
      data: {
        campaignId,
        year: parseInt(String(year)),
        month: parseInt(String(month)),
        platform,
        operationType,
        revenueType,
        budgetAmount: parseFloat(String(budgetAmount)),
        targetKpi,
        targetValue: parseFloat(String(targetValue))
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return successResponse(budget, '予算を作成しました')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: BudgetUpdateRequest = await request.json()
    const { id, ...updateFields } = body
    
    if (!id) {
      return validationError('Budget ID is required')
    }
    
    // 型安全なupdateデータを構築
    const updateData: Partial<{
      campaignId: string
      year: number
      month: number
      platform: string
      operationType: string
      revenueType: string
      budgetAmount: number
      targetKpi: string
      targetValue: number
    }> = {}
    
    if (updateFields.campaignId !== undefined) updateData.campaignId = updateFields.campaignId
    if (updateFields.year !== undefined) updateData.year = parseInt(String(updateFields.year))
    if (updateFields.month !== undefined) updateData.month = parseInt(String(updateFields.month))
    if (updateFields.platform !== undefined) updateData.platform = updateFields.platform
    if (updateFields.operationType !== undefined) updateData.operationType = updateFields.operationType
    if (updateFields.revenueType !== undefined) updateData.revenueType = updateFields.revenueType
    if (updateFields.budgetAmount !== undefined) updateData.budgetAmount = parseFloat(String(updateFields.budgetAmount))
    if (updateFields.targetKpi !== undefined) updateData.targetKpi = updateFields.targetKpi
    if (updateFields.targetValue !== undefined) updateData.targetValue = parseFloat(String(updateFields.targetValue))
    
    const budget = await prisma.budget.update({
      where: { id },
      data: updateData,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return successResponse(budget, '予算を更新しました')
  } catch (error) {
    return handleApiError(error)
  }
}