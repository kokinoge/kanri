import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const results = await prisma.result.findMany({
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
        { platform: 'asc' }
      ]
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('実績取得エラー:', error);
    return NextResponse.json(
      { error: '実績の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('[RESULTS_API] POST request data:', data);
    
    const {
      projectId,
      campaignId,
      yearMonth,
      year,
      month,
      platform,
      operationType,
      budgetType,
      actualSpend,
      actualResult
    } = data;

    // 年月データの処理
    let finalYear = year;
    let finalMonth = month;
    
    if (yearMonth && !year && !month) {
      const [yearStr, monthStr] = yearMonth.split('-');
      finalYear = parseInt(yearStr);
      finalMonth = parseInt(monthStr);
    } else {
      finalYear = parseInt(year) || new Date().getFullYear();
      finalMonth = parseInt(month) || new Date().getMonth() + 1;
    }

    // データバリデーション
    if (!finalYear || !finalMonth || !platform || !operationType) {
      console.error('[RESULTS_API] バリデーションエラー:', {
        finalYear,
        finalMonth,
        platform,
        operationType,
        campaignId: projectId || campaignId
      });
      return NextResponse.json(
        { error: '必須項目が不足しています', details: { finalYear, finalMonth, platform, operationType } },
        { status: 400 }
      );
    }

    if (!projectId && !campaignId) {
      console.error('[RESULTS_API] campaignId が未設定');
      return NextResponse.json(
        { error: 'キャンペーンIDが必要です' },
        { status: 400 }
      );
    }

    // Decimal型変換のヘルパー関数
    const parseDecimal = (value: any) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[¥,]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const finalCampaignId = projectId || campaignId;
    const finalActualSpend = parseDecimal(actualSpend);
    const finalActualResult = parseDecimal(actualResult);

    console.log('[RESULTS_API] 処理データ:', {
      campaignId: finalCampaignId,
      year: finalYear,
      month: finalMonth,
      platform,
      operationType,
      budgetType: budgetType || '投稿予算',
      actualSpend: finalActualSpend,
      actualResult: finalActualResult
    });

    // 既存の実績データをチェック
    const existingResult = await prisma.result.findFirst({
      where: {
        campaignId: finalCampaignId,
        year: finalYear,
        month: finalMonth,
        platform,
        operationType,
        budgetType: budgetType || '投稿予算'
      }
    });

    let result;
    if (existingResult) {
      // 既存データを更新
      console.log('[RESULTS_API] 既存データ更新:', existingResult.id);
      result = await prisma.result.update({
        where: { id: existingResult.id },
        data: {
          actualSpend: finalActualSpend,
          actualResult: finalActualResult,
          updatedAt: new Date()
        },
        include: {
          campaign: {
            include: {
              client: true
            }
          }
        }
      });
    } else {
      // 新規作成
      console.log('[RESULTS_API] 新規データ作成');
      result = await prisma.result.create({
        data: {
          campaignId: finalCampaignId,
          year: finalYear,
          month: finalMonth,
          platform,
          operationType,
          budgetType: budgetType || '投稿予算',
          actualSpend: finalActualSpend,
          actualResult: finalActualResult
        },
        include: {
          campaign: {
            include: {
              client: true
            }
          }
        }
      });
    }

    console.log('[RESULTS_API] 結果保存成功:', result.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('実績登録エラー:', error);
    return NextResponse.json(
      { error: '実績の登録に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { results } = data;

    if (!Array.isArray(results)) {
      return NextResponse.json(
        { error: '一括データの形式が正しくありません' },
        { status: 400 }
      );
    }

    const updatedResults = [];
    
    for (const resultData of results) {
      const {
        projectId,
        campaignId,
        year,
        month,
        platform,
        operationType,
        budgetType,
        actualSpend,
        actualResult
      } = resultData;

      // 既存の実績データをチェック
      const existingResult = await prisma.result.findFirst({
        where: {
          campaignId: projectId || campaignId,
          year: parseInt(year),
          month: parseInt(month),
          platform,
          operationType,
          budgetType: budgetType || 'general'
        }
      });

      let result;
      if (existingResult) {
        // 既存データを更新
        result = await prisma.result.update({
          where: { id: existingResult.id },
          data: {
            actualSpend: parseFloat(actualSpend) || 0,
            actualResult: parseFloat(actualResult) || 0,
            updatedAt: new Date()
          }
        });
      } else {
        // 新規作成
        result = await prisma.result.create({
          data: {
            campaignId: projectId || campaignId,
            year: parseInt(year),
            month: parseInt(month),
            platform,
            operationType,
            budgetType: budgetType || 'general',
            actualSpend: parseFloat(actualSpend) || 0,
            actualResult: parseFloat(actualResult) || 0
          }
        });
      }

      updatedResults.push(result);
    }

    return NextResponse.json({
      success: true,
      count: updatedResults.length,
      results: updatedResults
    });
  } catch (error) {
    console.error('一括実績登録エラー:', error);
    return NextResponse.json(
      { error: '一括実績の登録に失敗しました' },
      { status: 500 }
    );
  }
} 