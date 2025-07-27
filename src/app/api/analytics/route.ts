import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// 分析データを生成する関数
async function generateAnalyticsData(period: string) {
  try {
    // 期間フィルタリング
    let yearFilter = {};
    if (period !== 'all') {
      const year = parseInt(period);
      if (!isNaN(year)) {
        yearFilter = { year };
      }
    }

    // 予算データを取得
    const budgets = await prisma.budget.findMany({
      where: yearFilter,
      include: {
        campaign: {
          include: {
            client: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ]
    });

    // 総計算
    const totalBudgets = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
    
    // 実績データを取得
    const results = await prisma.result.findMany({
      where: yearFilter,
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ]
    });

    const totalUsed = results.reduce((sum, r) => sum + Number(r.actualSpend), 0);
    const totalResult = results.reduce((sum, r) => sum + Number(r.actualResult), 0);
    const totalRemaining = totalBudgets - totalUsed;
    const usagePercentage = totalBudgets > 0 ? Math.round((totalUsed / totalBudgets) * 100) : 0;

    // 月別集計
    const monthlyData: Record<number, { month: number; budget: number; used: number; result: number }> = {};
    
    budgets.forEach(budget => {
      const key = budget.month;
      if (!monthlyData[key]) {
        monthlyData[key] = { month: key, budget: 0, used: 0, result: 0 };
      }
      monthlyData[key].budget += Number(budget.amount);
    });

    results.forEach(result => {
      const key = result.month;
      if (!monthlyData[key]) {
        monthlyData[key] = { month: key, budget: 0, used: 0, result: 0 };
      }
      monthlyData[key].used += Number(result.actualSpend);
      monthlyData[key].result += Number(result.actualResult);
    });

    const budgetsByMonth = Object.values(monthlyData).map((item) => ({
      ...item,
      percentage: item.budget > 0 ? Math.round((item.used / item.budget) * 100) : 0,
      roi: item.used > 0 ? (item.result / item.used) : 0
    })).sort((a, b) => a.month - b.month);

    // 部署別集計
    const departmentData: Record<string, { department: string; budget: number; used: number; result: number }> = {};
    
    budgets.forEach(budget => {
      const department = budget.campaign.client?.name || 'その他';
      if (!departmentData[department]) {
        departmentData[department] = { department, budget: 0, used: 0, result: 0 };
      }
      departmentData[department].budget += Number(budget.amount);
    });

    // 対応する実績データを取得
    const budgetCampaignIds = budgets.map(b => b.campaignId);
    const departmentResults = await prisma.result.findMany({
      where: {
        ...yearFilter,
        campaignId: { in: budgetCampaignIds }
      },
      include: {
        campaign: {
          include: {
            client: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    departmentResults.forEach(result => {
      const department = result.campaign.client?.name || 'その他';
      if (departmentData[department]) {
        departmentData[department].used += Number(result.actualSpend);
        departmentData[department].result += Number(result.actualResult);
      }
    });

    const budgetsByDepartment = Object.values(departmentData).map(item => ({
      ...item,
      efficiency: item.used > 0 ? (item.result / item.used) : 0,
      percentage: totalBudgets > 0 ? Math.round((item.budget / totalBudgets) * 100) : 0
    }));

    return {
      summary: {
        totalBudgets,
        totalUsed,
        totalResult,
        totalRemaining,
        usagePercentage,
        efficiency: totalUsed > 0 ? (totalResult / totalUsed) : 0,
        activeCampaigns: await prisma.campaign.count({
          where: {
            startYear: { gte: period !== 'all' ? parseInt(period) : 2025 }
          }
        }),
        activeClients: await prisma.client.count()
      },
      budgetsByMonth,
      budgetsByDepartment
    };
  } catch (error) {
    console.error('Analytics data generation error:', error);
    // エラー時はデフォルトデータを返す
    return {
      summary: {
        totalBudgets: 0,
        totalUsed: 0,
        totalResult: 0,
        totalRemaining: 0,
        usagePercentage: 0,
        efficiency: 0,
        activeCampaigns: 0,
        activeClients: 0
      },
      budgetsByMonth: [],
      budgetsByDepartment: []
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('[ANALYTICS_API] Request received');

    // Next.jsの推奨方法でsearchParamsを取得
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const clientId = searchParams.get("clientId");
    const department = searchParams.get("department");

    const period = searchParams.get('period') || '2025';

    console.log('[ANALYTICS_API] 分析データ取得:', { period });

    const analyticsData = await generateAnalyticsData(period);

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('[ANALYTICS_API] 分析データ取得エラー:', error);
    
    return NextResponse.json(
      { 
        error: '分析データの取得に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 