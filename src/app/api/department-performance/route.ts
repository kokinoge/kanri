import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('[DEPARTMENT_PERFORMANCE_API] Request received');

    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const timeRange = searchParams.get('timeRange');
    const format = searchParams.get('format');

    // フィルタ条件構築
    let clientConditions: any = {};
    if (department && department !== 'all') {
      clientConditions.businessDivision = department;
    }

    // 時間範囲の計算（デフォルトは12ヶ月）
    const months = parseInt(timeRange || '12');
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months);

    // クライアント・予算・実績データを取得
    const clients = await prisma.client.findMany({
      where: clientConditions,
      include: {
        campaigns: {
          include: {
            budgets: {
              where: {
                year: { gte: startDate.getFullYear() },
                month: { gte: startDate.getMonth() + 1 }
              }
            },
            results: {
              where: {
                year: { gte: startDate.getFullYear() },
                month: { gte: startDate.getMonth() + 1 }
              }
            }
          }
        }
      }
    });

    // 事業部別データの集計
    const departmentMap = new Map();

    clients.forEach(client => {
      const dept = client.businessDivision;
      if (!departmentMap.has(dept)) {
        departmentMap.set(dept, {
          department: dept,
          clientCount: 0,
          campaignCount: 0,
          totalBudget: 0,
          totalSpend: 0,
          clients: []
        });
      }

      const deptData = departmentMap.get(dept);
      deptData.clientCount++;
      deptData.clients.push({
        clientId: client.id,
        clientName: client.name,
        priority: client.priority,
        salesDepartment: client.salesDepartment,
        campaigns: client.campaigns.map(campaign => ({
          campaignId: campaign.id,
          campaignName: campaign.name,
          totalBudget: Number(campaign.totalBudget),
          budgets: campaign.budgets.map(budget => ({
            id: budget.id,
            year: budget.year,
            month: budget.month,
            platform: budget.platform,
            operationType: budget.operationType,
            budgetType: budget.budgetType,
            amount: Number(budget.amount),
            targetKpi: budget.targetKpi,
            targetValue: budget.targetValue ? Number(budget.targetValue) : null
          })),
          results: campaign.results.map(result => ({
            id: result.id,
            year: result.year,
            month: result.month,
            platform: result.platform,
            operationType: result.operationType,
            actualSpend: Number(result.actualSpend),
            actualResult: Number(result.actualResult)
          }))
        }))
      });

      // 事業部の合計値を更新
      client.campaigns.forEach(campaign => {
        deptData.campaignCount++;
        deptData.totalBudget += campaign.budgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
        deptData.totalSpend += campaign.results.reduce((sum, result) => sum + Number(result.actualSpend), 0);
      });
    });

    const departmentData = Array.from(departmentMap.values());

    // CSVエクスポート
    if (format === 'csv') {
      const csvHeaders = [
        'department', 'clientId', 'clientName', 'clientPriority', 'salesDepartment',
        'campaignId', 'campaignName', 'campaignTotalBudget',
        'budgetYear', 'budgetMonth', 'platform', 'operationType', 'budgetType', 'budgetAmount',
        'targetKpi', 'targetValue', 'actualSpend', 'actualResult'
      ];

      const csvRows: string[][] = [];

      departmentData.forEach(dept => {
        dept.clients.forEach((client: any) => {
          client.campaigns.forEach((campaign: any) => {
            // 予算・実績データを統合
            const budgetResultMap = new Map();
            
            campaign.budgets.forEach((budget: any) => {
              const key = `${budget.year}-${budget.month}-${budget.platform}-${budget.operationType}`;
              budgetResultMap.set(key, { ...budget, actualSpend: 0, actualResult: 0 });
            });
            
            campaign.results.forEach((result: any) => {
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
                  actualResult: result.actualResult
                });
              }
            });

            if (budgetResultMap.size === 0) {
              // データがない場合はキャンペーン情報のみ
              csvRows.push([
                dept.department,
                client.clientId,
                client.clientName,
                client.priority || '',
                client.salesDepartment || '',
                campaign.campaignId,
                campaign.campaignName,
                campaign.totalBudget.toString(),
                '', '', '', '', '', '', '', '', '', ''
              ]);
            } else {
              budgetResultMap.forEach(item => {
                csvRows.push([
                  dept.department,
                  client.clientId,
                  client.clientName,
                  client.priority || '',
                  client.salesDepartment || '',
                  campaign.campaignId,
                  campaign.campaignName,
                  campaign.totalBudget.toString(),
                  item.year.toString(),
                  item.month.toString(),
                  item.platform,
                  item.operationType,
                  item.budgetType,
                  item.amount.toString(),
                  item.targetKpi || '',
                  item.targetValue?.toString() || '',
                  item.actualSpend.toString(),
                  item.actualResult.toString()
                ]);
              });
            }
          });
        });
      });

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="department-performance.csv"'
        }
      });
    }

    // 統計計算
    const totalBudget = departmentData.reduce((sum, dept) => sum + dept.totalBudget, 0);
    const totalSpend = departmentData.reduce((sum, dept) => sum + dept.totalSpend, 0);
    const totalClients = departmentData.reduce((sum, dept) => sum + dept.clientCount, 0);
    const totalCampaigns = departmentData.reduce((sum, dept) => sum + dept.campaignCount, 0);

    return NextResponse.json({
      success: true,
      data: departmentData,
      summary: {
        totalDepartments: departmentData.length,
        totalClients,
        totalCampaigns,
        totalBudget,
        totalSpend,
        budgetUtilization: totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0,
        averagePerDepartment: {
          budget: departmentData.length > 0 ? totalBudget / departmentData.length : 0,
          spend: departmentData.length > 0 ? totalSpend / departmentData.length : 0,
          clients: departmentData.length > 0 ? totalClients / departmentData.length : 0
        }
      }
    });

  } catch (error) {
    console.error('[DEPARTMENT_PERFORMANCE_API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch department performance data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 