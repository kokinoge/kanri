import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  CampaignWhereInput,
  CampaignQueryParams,
  CampaignCreateRequest,
  CampaignFormattedResponse
} from '@/types/api'
import { successResponse, validationError, handleApiError } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams: CampaignQueryParams = {
      clientId: searchParams.get('clientId') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      search: searchParams.get('search') ?? undefined
    }
    
    const where: CampaignWhereInput = {}
    
    if (queryParams.clientId) {
      where.clientId = queryParams.clientId
    }
    
    if (queryParams.search) {
      where.OR = [
        { name: { contains: queryParams.search } },
        { purpose: { contains: queryParams.search } }
      ]
    }
    
    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        client: true,
        budgets: true,
        results: true
      },
      orderBy: [
        { startDate: 'desc' },
        { name: 'asc' }
      ]
    })
    
    // ステータスの計算
    const now = new Date()
    const campaignsWithStatus: CampaignFormattedResponse[] = campaigns.map(campaign => {
      let status = 'planned'
      if (campaign.startDate <= now && campaign.endDate >= now) {
        status = 'active'
      } else if (campaign.endDate < now) {
        status = 'completed'
      }
      
      // 予算合計と実績合計の計算
      const totalBudgetAmount = campaign.budgets.reduce((sum, b) => 
        sum + Number(b.budgetAmount), 0
      )
      const totalActualSpend = campaign.results.reduce((sum, r) => 
        sum + Number(r.actualSpend), 0
      )
      
      return {
        ...campaign,
        status,
        clientName: campaign.client.name,
        totalBudgetAmount,
        totalActualSpend,
        totalBudget: Number(campaign.totalBudget)
      }
    })
    
    // ステータスフィルタ
    const filteredCampaigns = queryParams.status 
      ? campaignsWithStatus.filter(c => c.status === queryParams.status)
      : campaignsWithStatus
    
    return successResponse(filteredCampaigns)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CampaignCreateRequest = await request.json()
    const { clientId, name, purpose, startDate, endDate, totalBudget } = body
    
    if (!clientId || !name || !purpose || !startDate || !endDate || !totalBudget) {
      return validationError('すべての項目を入力してください')
    }
    
    const campaign = await prisma.campaign.create({
      data: {
        clientId,
        name,
        purpose,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalBudget: parseFloat(String(totalBudget))
      },
      include: {
        client: true
      }
    })
    
    return successResponse(campaign, 'キャンペーンを作成しました')
  } catch (error) {
    return handleApiError(error)
  }
}