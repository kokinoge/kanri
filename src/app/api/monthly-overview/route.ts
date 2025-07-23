import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('[MONTHLY_OVERVIEW_API] Request received');

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const format = searchParams.get('format');

    if (!month) {
      return NextResponse.json({ error: '月が指定されていません' }, { status: 400 });
    }

    const [year, monthNum] = month.split('-').map(Number);

    // 月次データを取得
    const budgets = await prisma.budget.findMany({
      where: {
        year,
        month: monthNum
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        },
        budgetTeams: {
          include: {
            team: true
          }
        }
      }
    });

    const results = await prisma.result.findMany({
      where: {
        year,
        month: monthNum
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    // データを統合
    const monthlyData = {
      year,
      month: monthNum,
      budgets: budgets.map(budget => ({
        id: budget.id,
        campaignId: budget.campaignId,
        campaignName: budget.campaign.name,
        clientName: budget.campaign.client.name,
        platform: budget.platform,
        operationType: budget.operationType,
        budgetType: budget.budgetType,
        amount: Number(budget.amount),
        targetKpi: budget.targetKpi,
        targetValue: budget.targetValue ? Number(budget.targetValue) : null,
        teamAllocations: budget.budgetTeams.map(bt => ({
          teamName: bt.team.name,
          allocation: Number(bt.allocation)
        }))
      })),
      results: results.map(result => ({
        id: result.id,
        campaignId: result.campaignId,
        campaignName: result.campaign.name,
        clientName: result.campaign.client.name,
        platform: result.platform,
        operationType: result.operationType,
        actualSpend: Number(result.actualSpend),
        actualResult: Number(result.actualResult)
      }))
    };

    // CSVエクスポート
    if (format === 'csv') {
      const csvHeaders = [
        'type', 'campaignId', 'campaignName', 'clientName', 'platform', 
        'operationType', 'budgetType', 'amount', 'targetKpi', 'targetValue',
        'actualSpend', 'actualResult', 'teamAllocations'
      ];

      const csvRows: string[][] = [];

      // 予算データ
      monthlyData.budgets.forEach(budget => {
        csvRows.push([
          'budget',
          budget.campaignId,
          budget.campaignName,
          budget.clientName,
          budget.platform,
          budget.operationType,
          budget.budgetType,
          budget.amount.toString(),
          budget.targetKpi || '',
          budget.targetValue?.toString() || '',
          '',
          '',
          budget.teamAllocations.map(ta => `${ta.teamName}:${ta.allocation}%`).join(';')
        ]);
      });

      // 実績データ
      monthlyData.results.forEach(result => {
        csvRows.push([
          'result',
          result.campaignId,
          result.campaignName,
          result.clientName,
          result.platform,
          result.operationType,
          '',
          '',
          '',
          '',
          result.actualSpend.toString(),
          result.actualResult.toString(),
          ''
        ]);
      });

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="monthly-overview-${year}-${monthNum.toString().padStart(2, '0')}.csv"`
        }
      });
    }

    // 統計計算
    const totalBudget = monthlyData.budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpend = monthlyData.results.reduce((sum, r) => sum + r.actualSpend, 0);
    const totalResult = monthlyData.results.reduce((sum, r) => sum + r.actualResult, 0);

    return NextResponse.json({
      success: true,
      data: monthlyData,
      summary: {
        totalBudget,
        totalSpend,
        totalResult,
        budgetCount: monthlyData.budgets.length,
        resultCount: monthlyData.results.length,
        roi: totalSpend > 0 ? ((totalResult - totalSpend) / totalSpend) * 100 : 0
      }
    });

  } catch (error) {
    console.error('[MONTHLY_OVERVIEW_API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch monthly overview data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 