import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const campaignId = searchParams.get('campaignId')
    
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
    const formattedBudgets = budgets.map(budget => ({
      ...budget,
      budgetAmount: Number(budget.budgetAmount),
      targetValue: Number(budget.targetValue),
      clientName: budget.campaign.client.name,
      campaignName: budget.campaign.name
    }))
    
    return NextResponse.json(formattedBudgets)
  } catch (error) {
    console.error('Error fetching budgets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
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
    if (!campaignId || !year || !month || !platform || !operationType || 
        !revenueType || !budgetAmount || !targetKpi || !targetValue) {
      return NextResponse.json(
        { error: 'すべての項目を入力してください' },
        { status: 400 }
      )
    }
    
    const budget = await prisma.budget.create({
      data: {
        campaignId,
        year: parseInt(year),
        month: parseInt(month),
        platform,
        operationType,
        revenueType,
        budgetAmount: parseFloat(budgetAmount),
        targetKpi,
        targetValue: parseFloat(targetValue)
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    })
    
    return NextResponse.json(budget, { status: 201 })
  } catch (error) {
    console.error('Error creating budget:', error)
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Budget ID is required' },
        { status: 400 }
      )
    }
    
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
    
    return NextResponse.json(budget)
  } catch (error) {
    console.error('Error updating budget:', error)
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    )
  }
}