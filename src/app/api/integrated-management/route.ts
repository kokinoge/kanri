import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('[INTEGRATED_MANAGEMENT_API] Request received');

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const clientId = searchParams.get('clientId');
    const businessDivision = searchParams.get('businessDivision');
    const format = searchParams.get('format');

    // フィルタ条件構築
    const whereConditions: any = {};
    
    if (year && year !== 'all') {
      whereConditions.year = parseInt(year);
    }
    
    if (month && month !== 'all') {
      whereConditions.month = parseInt(month);
    }

    // クライアント条件
    let clientConditions: any = {};
    if (clientId && clientId !== 'all') {
      clientConditions.id = clientId;
    }
    if (businessDivision && businessDivision !== 'all') {
      clientConditions.businessDivision = businessDivision;
    }

    // キャンペーン条件（クライアント条件経由）
    let campaignConditions: any = {};
    if (Object.keys(clientConditions).length > 0) {
      campaignConditions.client = clientConditions;
    }

    // 統合データを取得
    const campaigns = await prisma.campaign.findMany({
      where: campaignConditions,
      include: {
        client: true,
        budgets: {
          where: whereConditions,
          include: {
            budgetTeams: {
              include: {
                team: true
              }
            }
          }
        },
        results: {
          where: whereConditions
        },
        campaignKpis: true,
        campaignTeams: {
          include: {
            team: true
          }
        }
      }
    });

    // 統合データの構築
    const integratedData = campaigns.map(campaign => ({
      campaignId: campaign.id,
      campaignName: campaign.name,
      campaignPurpose: campaign.purpose,
      clientId: campaign.client.id,
      clientName: campaign.client.name,
      businessDivision: campaign.client.businessDivision,
      salesDepartment: campaign.client.salesDepartment,
      priority: campaign.client.priority,
      totalBudget: Number(campaign.totalBudget),
      startYear: campaign.startYear,
      startMonth: campaign.startMonth,
      endYear: campaign.endYear,
      endMonth: campaign.endMonth,
      
      // 予算データ
      budgets: campaign.budgets.map(budget => ({
        id: budget.id,
        year: budget.year,
        month: budget.month,
        platform: budget.platform,
        operationType: budget.operationType,
        budgetType: budget.budgetType,
        amount: Number(budget.amount),
        targetKpi: budget.targetKpi,
        targetValue: budget.targetValue ? Number(budget.targetValue) : null,
        teamAllocations: budget.budgetTeams.map(bt => ({
          teamName: bt.team.name,
          allocation: Number(bt.allocation),
          color: bt.team.color
        }))
      })),
      
      // 実績データ
      results: campaign.results.map(result => ({
        id: result.id,
        year: result.year,
        month: result.month,
        platform: result.platform,
        operationType: result.operationType,
        actualSpend: Number(result.actualSpend),
        actualResult: Number(result.actualResult)
      })),
      
      // KPIデータ
      kpis: campaign.campaignKpis.map(kpi => ({
        id: kpi.id,
        kpiType: kpi.kpiType,
        targetValue: Number(kpi.targetValue),
        actualValue: kpi.actualValue ? Number(kpi.actualValue) : null,
        unit: kpi.unit,
        description: kpi.description
      })),
      
      // チームデータ
      teams: campaign.campaignTeams.map(ct => ({
        teamId: ct.team.id,
        teamName: ct.team.name,
        role: ct.role,
        isLead: ct.isLead,
        color: ct.team.color
      }))
    }));

    // CSVエクスポート
    if (format === 'csv') {
      const csvHeaders = [
        'campaignId', 'campaignName', 'clientName', 'businessDivision', 'priority',
        'totalBudget', 'startYear', 'startMonth', 'endYear', 'endMonth',
        'budgetYear', 'budgetMonth', 'platform', 'operationType', 'budgetType', 'budgetAmount',
        'targetKpi', 'targetValue', 'actualSpend', 'actualResult', 'teamAllocations'
      ];

      const csvRows: string[][] = [];

      integratedData.forEach(campaign => {
        // 予算・実績データを展開
        const budgetResultMap = new Map();
        
        // 予算データをマップに追加
        campaign.budgets.forEach(budget => {
          const key = `${budget.year}-${budget.month}-${budget.platform}-${budget.operationType}`;
          budgetResultMap.set(key, {
            ...budget,
            actualSpend: 0,
            actualResult: 0
          });
        });
        
        // 実績データをマップに統合
        campaign.results.forEach(result => {
          const key = `${result.year}-${result.month}-${result.platform}-${result.operationType}`;
          if (budgetResultMap.has(key)) {
            const item = budgetResultMap.get(key);
            item.actualSpend = result.actualSpend;
            item.actualResult = result.actualResult;
          } else {
            budgetResultMap.set(key, {
              year: result.year,
              month: result.month,
              platform: result.platform,
              operationType: result.operationType,
              budgetType: '',
              amount: 0,
              targetKpi: '',
              targetValue: null,
              actualSpend: result.actualSpend,
              actualResult: result.actualResult,
              teamAllocations: []
            });
          }
        });

        // CSVデータ生成
        if (budgetResultMap.size === 0) {
          // 予算・実績データがない場合はキャンペーン情報のみ
          csvRows.push([
            campaign.campaignId,
            campaign.campaignName,
            campaign.clientName,
            campaign.businessDivision,
            campaign.priority || '',
            campaign.totalBudget.toString(),
            campaign.startYear.toString(),
            campaign.startMonth.toString(),
            campaign.endYear?.toString() || '',
            campaign.endMonth?.toString() || '',
            '', '', '', '', '', '', '', '', '', '', ''
          ]);
        } else {
          budgetResultMap.forEach(item => {
            csvRows.push([
              campaign.campaignId,
              campaign.campaignName,
              campaign.clientName,
              campaign.businessDivision,
              campaign.priority || '',
              campaign.totalBudget.toString(),
              campaign.startYear.toString(),
              campaign.startMonth.toString(),
              campaign.endYear?.toString() || '',
              campaign.endMonth?.toString() || '',
              item.year.toString(),
              item.month.toString(),
              item.platform,
              item.operationType,
              item.budgetType,
              item.amount.toString(),
              item.targetKpi || '',
              item.targetValue?.toString() || '',
              item.actualSpend.toString(),
              item.actualResult.toString(),
              item.teamAllocations.map((ta: any) => `${ta.teamName}:${ta.allocation}%`).join(';')
            ]);
          });
        }
      });

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="integrated-management.csv"'
        }
      });
    }

    // 統計計算
    const totalBudget = integratedData.reduce((sum, campaign) => 
      sum + campaign.budgets.reduce((budgetSum, budget) => budgetSum + budget.amount, 0), 0);
    const totalSpend = integratedData.reduce((sum, campaign) => 
      sum + campaign.results.reduce((resultSum, result) => resultSum + result.actualSpend, 0), 0);
    const totalResult = integratedData.reduce((sum, campaign) => 
      sum + campaign.results.reduce((resultSum, result) => resultSum + result.actualResult, 0), 0);

    return NextResponse.json({
      success: true,
      data: integratedData,
      summary: {
        totalCampaigns: integratedData.length,
        totalBudget,
        totalSpend,
        totalResult,
        budgetUtilization: totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0,
        roi: totalSpend > 0 ? ((totalResult - totalSpend) / totalSpend) * 100 : 0
      }
    });

  } catch (error) {
    console.error('[INTEGRATED_MANAGEMENT_API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch integrated management data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, campaignId, data } = body;

    switch (action) {
      case "copy_budget":
        // 予算を他の月にコピー
        const { sourceYear, sourceMonth, targetYear, targetMonth } = data;
        
        const sourceBudgets = await prisma.budget.findMany({
          where: {
            campaignId: campaignId,
            year: sourceYear,
            month: sourceMonth,
          },
        });

        const copiedBudgets = await Promise.all(
          sourceBudgets.map(budget =>
            prisma.budget.create({
              data: {
                campaignId: budget.campaignId,
                year: targetYear,
                month: targetMonth,
                platform: budget.platform,
                operationType: budget.operationType,
                budgetType: budget.budgetType,
                amount: budget.amount,
                targetKpi: budget.targetKpi,
                targetValue: budget.targetValue,
              },
            })
          )
        );

        return NextResponse.json({ 
          success: true, 
          message: `${sourceBudgets.length}件の予算を${targetYear}年${targetMonth}月にコピーしました`,
          copiedCount: copiedBudgets.length 
        });

      case "bulk_result_input":
        // 実績の一括入力
        const { results } = data;
        
        const createdResults = await Promise.all(
          results.map((result: any) =>
            prisma.result.create({
              data: {
                campaignId: result.campaignId,
                year: result.year,
                month: result.month,
                platform: result.platform,
                operationType: result.operationType,
                budgetType: result.budgetType,
                actualSpend: result.actualSpend,
                actualResult: result.actualResult,
              },
            })
          )
        );

        return NextResponse.json({ 
          success: true, 
          message: `${results.length}件の実績を入力しました`,
          createdCount: createdResults.length 
        });

      default:
        return new NextResponse("Invalid action", { status: 400 });
    }
  } catch (error) {
    console.error("[INTEGRATED_MANAGEMENT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 