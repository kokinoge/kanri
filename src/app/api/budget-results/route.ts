import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { hasRequiredRole } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

// 予算と実績を統合したデータ構造
interface BudgetResultItem {
  id: string;
  campaignId: string;
  year: number;
  month: number;
  platform: string;
  operationType: string;
  budgetType: string;
  
  // 予算情報
  budgetId?: string;
  budgetAmount?: number;
  targetKpi?: string;
  targetValue?: number;
  
  // 実績情報
  resultId?: string;
  actualSpend?: number;
  actualResult?: number;
  
  // 関連情報
  campaign: {
    id: string;
    name: string;
    client: {
      id: string;
      name: string;
      businessDivision: string;
    };
  };
  
  // チーム配分情報
  teamAllocations?: Array<{
    id: string;
    teamId: string;
    teamName: string;
    allocation: number;
    color?: string;
  }>;
  
  // 計算値
  budgetUtilization?: number;
  roi?: number;
  variance?: number;
}

export async function GET(request: NextRequest) {
  try {
    console.log('[BUDGET_RESULTS_API] Request received');

    // 認証チェック（開発時は一時的にスキップ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    */

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
    const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : null;
    const clientId = searchParams.get('client');
    const platform = searchParams.get('platform');
    const format = searchParams.get('format');

    console.log('[BUDGET_RESULTS_API] Query params:', { year, month, clientId, platform });

    // フィルタ条件構築
    const dateFilter: any = {};
    if (year !== null) dateFilter.year = year;
    if (month !== null) dateFilter.month = month;

    const platformFilter = platform && platform !== 'all' ? { platform } : {};

    // クライアント条件（campaignを通じて）
    let campaignFilter = {};
    if (clientId && clientId !== 'all') {
      campaignFilter = { clientId };
    }

    // 予算データ取得
    const budgets = await prisma.budget.findMany({
      where: {
        ...dateFilter,
        ...platformFilter,
        campaign: campaignFilter,
      },
      include: {
        campaign: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true,
              },
            },
          },
        },
        budgetTeams: {
          include: {
            team: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { platform: 'asc' },
      ],
    });

    console.log('[BUDGET_RESULTS_API] Budgets retrieved:', budgets.length);

    // 実績データ取得
    const results = await prisma.result.findMany({
      where: {
        ...dateFilter,
        ...platformFilter,
        campaign: campaignFilter,
      },
      include: {
        campaign: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true,
              },
            },
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { platform: 'asc' },
      ],
    });

    console.log('[BUDGET_RESULTS_API] Results retrieved:', results.length);

    // 統合データ作成
    const budgetResultMap = new Map<string, BudgetResultItem>();

    // 予算データから統合データを構築
    budgets.forEach(budget => {
      const key = `${budget.campaignId}-${budget.year}-${budget.month}-${budget.platform}-${budget.operationType}`;
      
      const item: BudgetResultItem = {
        id: key,
        campaignId: budget.campaignId,
        year: budget.year,
        month: budget.month,
        platform: budget.platform,
        operationType: budget.operationType,
        budgetType: budget.budgetType,
        
        // 予算情報
        budgetId: budget.id,
        budgetAmount: Number(budget.amount),
        targetKpi: budget.targetKpi || undefined,
        targetValue: budget.targetValue ? Number(budget.targetValue) : undefined,
        
        // 関連情報
        campaign: {
          id: budget.campaign.id,
          name: budget.campaign.name,
          client: {
            id: budget.campaign.client.id,
            name: budget.campaign.client.name,
            businessDivision: budget.campaign.client.businessDivision,
          },
        },
        
        // チーム配分情報
        teamAllocations: budget.budgetTeams.map(bt => ({
          id: bt.id,
          teamId: bt.teamId,
          teamName: bt.team.name,
          allocation: Number(bt.allocation),
          color: bt.team.color || undefined,
        })),
      };

      budgetResultMap.set(key, item);
    });

    // 実績データを統合データに追加
    results.forEach(result => {
      const key = `${result.campaignId}-${result.year}-${result.month}-${result.platform}-${result.operationType}`;
      
      if (budgetResultMap.has(key)) {
        // 既存の予算データに実績を追加
        const item = budgetResultMap.get(key)!;
        item.resultId = result.id;
        item.actualSpend = Number(result.actualSpend);
        item.actualResult = Number(result.actualResult);
      } else {
        // 実績のみのデータを作成
        const item: BudgetResultItem = {
          id: key,
          campaignId: result.campaignId,
          year: result.year,
          month: result.month,
          platform: result.platform,
          operationType: result.operationType,
          budgetType: result.budgetType,
          
          // 実績情報
          resultId: result.id,
          actualSpend: Number(result.actualSpend),
          actualResult: Number(result.actualResult),
          
          // 関連情報
          campaign: {
            id: result.campaign.id,
            name: result.campaign.name,
            client: {
              id: result.campaign.client.id,
              name: result.campaign.client.name,
              businessDivision: result.campaign.client.businessDivision,
            },
          },
        };

        budgetResultMap.set(key, item);
      }
    });

    // 計算値を追加
    const data = Array.from(budgetResultMap.values()).map(item => {
      // 予算達成率
      if (item.budgetAmount && item.actualSpend) {
        item.budgetUtilization = (item.actualSpend / item.budgetAmount) * 100;
      }

      // ROI
      if (item.actualSpend && item.actualResult) {
        item.roi = ((item.actualResult - item.actualSpend) / item.actualSpend) * 100;
      }

      // 予算差異
      if (item.budgetAmount && item.actualSpend) {
        item.variance = item.budgetAmount - item.actualSpend;
      }

      return item;
    });

    console.log('[BUDGET_RESULTS_API] Integrated data count:', data.length);

    // CSVエクスポート
    if (format === 'csv') {
      const csvHeaders = [
        'campaignId', 'campaignName', 'clientName', 'year', 'month', 'platform', 
        'operationType', 'budgetType', 'budgetAmount', 'targetKpi', 'targetValue',
        'actualSpend', 'actualResult', 'budgetUtilization', 'roi', 'variance'
      ];

      const csvRows = data.map(item => [
        item.campaignId,
        item.campaign.name,
        item.campaign.client.name,
        item.year,
        item.month,
        item.platform,
        item.operationType,
        item.budgetType,
        item.budgetAmount || '',
        item.targetKpi || '',
        item.targetValue || '',
        item.actualSpend || '',
        item.actualResult || '',
        item.budgetUtilization ? item.budgetUtilization.toFixed(2) : '',
        item.roi ? item.roi.toFixed(2) : '',
        item.variance ? item.variance.toFixed(2) : ''
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="budget-results.csv"'
        }
      });
    }

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalBudget: data.reduce((sum, item) => sum + (item.budgetAmount || 0), 0),
        totalSpend: data.reduce((sum, item) => sum + (item.actualSpend || 0), 0),
        totalResult: data.reduce((sum, item) => sum + (item.actualResult || 0), 0),
        itemCount: data.length,
        budgetItemCount: data.filter(item => item.budgetAmount).length,
        resultItemCount: data.filter(item => item.actualSpend).length,
      },
    });

  } catch (error) {
    console.error('[BUDGET_RESULTS_API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch budget-results data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[BUDGET_RESULTS_API] POST request received');

    // 認証チェック（開発時は一時的にスキップ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    */

    const body = await request.json();
    const {
      campaignId,
      year,
      month,
      platform,
      operationType,
      budgetType,
      budgetAmount,
      targetKpi,
      targetValue,
      actualSpend,
      actualResult,
      teamAllocations = [],
    } = body;

    console.log('[BUDGET_RESULTS_API] Creating budget-result:', {
      campaignId,
      year,
      month,
      platform,
      operationType,
      budgetType,
      budgetAmount,
      actualSpend,
      teamAllocations: teamAllocations.length,
    });

    // トランザクションで予算と実績を同時作成
    const result = await prisma.$transaction(async (tx) => {
      let budget = null;
      let resultRecord = null;

      // 予算作成
      if (budgetAmount !== undefined && budgetAmount !== null) {
        budget = await tx.budget.create({
          data: {
            campaignId,
            year,
            month,
            platform,
            operationType,
            budgetType,
            amount: budgetAmount,
            targetKpi: targetKpi || null,
            targetValue: targetValue || null,
          },
        });

        // チーム配分作成
        if (teamAllocations.length > 0) {
          await tx.budgetTeam.createMany({
            data: teamAllocations.map((allocation: any) => ({
              budgetId: budget.id,
              teamId: allocation.teamId,
              allocation: allocation.allocation,
            })),
          });
        }
      }

      // 実績作成
      if (actualSpend !== undefined && actualSpend !== null) {
        resultRecord = await tx.result.create({
          data: {
            campaignId,
            year,
            month,
            platform,
            operationType,
            budgetType,
            actualSpend: actualSpend || 0,
            actualResult: actualResult || 0,
          },
        });
      }

      return { budget, result: resultRecord };
    });

    console.log('[BUDGET_RESULTS_API] Created:', {
      budgetId: result.budget?.id,
      resultId: result.result?.id,
    });

    return NextResponse.json({
      success: true,
      data: {
        budgetId: result.budget?.id,
        resultId: result.result?.id,
      },
      message: '予算・実績データを作成しました',
    });

  } catch (error) {
    console.error('[BUDGET_RESULTS_API] POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create budget-result data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 