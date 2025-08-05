import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 最近の活動をチェック（例: 新しいキャンペーン、予算の承認など）
    const notifications = []
    
    // 1. 新しいキャンペーンをチェック
    const recentCampaigns = await prisma.campaign.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000) // 過去30分
        }
      },
      include: {
        client: true
      },
      take: 5
    })

    for (const campaign of recentCampaigns) {
      notifications.push({
        type: 'info',
        title: '新しいキャンペーンが作成されました',
        message: `${campaign.client.name}の「${campaign.name}」が開始されました`
      })
    }

    // 2. 予算の警告をチェック
    const highBudgetUtilization = await prisma.$queryRaw`
      SELECT 
        c.name as campaign_name,
        cl.name as client_name,
        SUM(CAST(b.budget_amount AS DECIMAL)) as total_budget,
        SUM(CAST(r.actual_spend AS DECIMAL)) as total_spend
      FROM campaigns c
      JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN budgets b ON c.id = b.campaign_id
      LEFT JOIN results r ON c.id = r.campaign_id
      WHERE c.status = 'active'
      GROUP BY c.id, c.name, cl.name
      HAVING SUM(CAST(r.actual_spend AS DECIMAL)) / NULLIF(SUM(CAST(b.budget_amount AS DECIMAL)), 0) > 0.8
    `

    for (const item of highBudgetUtilization as any[]) {
      const utilization = (item.total_spend / item.total_budget * 100).toFixed(1)
      notifications.push({
        type: 'warning',
        title: '予算執行率が高くなっています',
        message: `${item.client_name}の「${item.campaign_name}」が予算の${utilization}%を消費しています`
      })
    }

    // 3. 最近の実績登録をチェック
    const recentResults = await prisma.result.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000) // 過去30分
        }
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      },
      take: 3
    })

    for (const result of recentResults) {
      notifications.push({
        type: 'success',
        title: '実績が更新されました',
        message: `${result.campaign.client.name}の${result.year}年${result.month}月分実績が登録されました`
      })
    }

    return NextResponse.json({
      hasNewNotifications: notifications.length > 0,
      notifications
    })
  } catch (error) {
    console.error('Error checking notifications:', error)
    return NextResponse.json(
      { error: 'Failed to check notifications' },
      { status: 500 }
    )
  }
}