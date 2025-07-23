import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const clientId = searchParams.get('clientId');
    const platform = searchParams.get('platform');

    // 年月フィルター
    const yearFilter = year ? parseInt(year) : undefined;
    const monthFilter = month ? parseInt(month) : undefined;

    // 予算データを取得
    const budgets = await prisma.budget.findMany({
      where: {
        ...(yearFilter && { year: yearFilter }),
        ...(monthFilter && { month: monthFilter }),
        ...(clientId && { 
          campaign: {
            clientId: clientId
          }
        }),
        ...(platform && { platform: platform })
      },
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true
              }
            }
          }
        }
      }
    });

    // 実績データを取得
    const results = await prisma.result.findMany({
      where: {
        ...(yearFilter && { year: yearFilter }),
        ...(monthFilter && { month: monthFilter }),
        ...(clientId && { 
          campaign: {
            clientId: clientId
          }
        }),
        ...(platform && { platform: platform })
      },
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true
              }
            }
          }
        }
      }
    });

    // データを統合してマッピング
    const integratedData: any[] = [];
    const processedKeys = new Set<string>();

    // 予算データを基準に統合
    budgets.forEach(budget => {
      const key = `${budget.campaignId}-${budget.year}-${budget.month}-${budget.platform}-${budget.operationType}`;
      
      if (!processedKeys.has(key)) {
        const correspondingResult = results.find(result => 
          result.campaignId === budget.campaignId &&
          result.year === budget.year &&
          result.month === budget.month &&
          result.platform === budget.platform &&
          result.operationType === budget.operationType
        );

        integratedData.push({
          id: budget.id,
          year: budget.year,
          month: budget.month,
          client: budget.campaign.client,
          campaign: budget.campaign,
          platform: budget.platform,
          operationType: budget.operationType,
          budgetType: budget.budgetType,
          budgetAmount: budget.amount,
          targetKpi: budget.targetKpi,
          targetValue: budget.targetValue,
          actualSpend: correspondingResult?.actualSpend || 0,
          actualResult: correspondingResult?.actualResult || 0,
          resultId: correspondingResult?.id || null,
          efficiency: correspondingResult?.actualSpend ? 
            (Number(correspondingResult.actualResult) / Number(correspondingResult.actualSpend)) : 0,
          achievementRate: budget.targetValue ? 
            ((Number(correspondingResult?.actualResult) || 0) / Number(budget.targetValue) * 100) : 0
        });

        processedKeys.add(key);
      }
    });

    // 予算がない実績データも追加
    results.forEach(result => {
      const key = `${result.campaignId}-${result.year}-${result.month}-${result.platform}-${result.operationType}`;
      
      if (!processedKeys.has(key)) {
        integratedData.push({
          id: result.id,
          year: result.year,
          month: result.month,
          client: result.campaign.client,
          campaign: result.campaign,
          platform: result.platform,
          operationType: result.operationType,
          budgetType: '',
          budgetAmount: 0,
          targetKpi: '',
          targetValue: 0,
          actualSpend: result.actualSpend,
          actualResult: result.actualResult,
          resultId: result.id,
          efficiency: result.actualSpend ? (Number(result.actualResult) / Number(result.actualSpend)) : 0,
          achievementRate: 0
        });
      }
    });

    // 年月順でソート
    integratedData.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.month !== b.month) return b.month - a.month;
      return a.campaign.name.localeCompare(b.campaign.name);
    });

    return NextResponse.json(integratedData);
  } catch (error) {
    console.error('統合管理データ取得エラー:', error);
    return NextResponse.json(
      { error: '統合管理データの取得に失敗しました' },
      { status: 500 }
    );
  }
} 