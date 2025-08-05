import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const where: any = {}
    
    if (clientId) {
      where.clientId = clientId
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { purpose: { contains: search } }
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
    const campaignsWithStatus = campaigns.map(campaign => {
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
    const filteredCampaigns = status 
      ? campaignsWithStatus.filter(c => c.status === status)
      : campaignsWithStatus
    
    return NextResponse.json(filteredCampaigns)
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientId, name, purpose, startDate, endDate, totalBudget } = body
    
    if (!clientId || !name || !purpose || !startDate || !endDate || !totalBudget) {
      return NextResponse.json(
        { error: 'すべての項目を入力してください' },
        { status: 400 }
      )
    }
    
    const campaign = await prisma.campaign.create({
      data: {
        clientId,
        name,
        purpose,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalBudget
      },
      include: {
        client: true
      }
    })
    
    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}