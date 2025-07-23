import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    console.log('[RESULTS_UPDATE_API] PUT request data:', data);
    
    const {
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

    // Decimal型変換のヘルパー関数
    const parseDecimal = (value: any) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[¥,]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // 年月データの処理
    let finalYear = year;
    let finalMonth = month;
    
    if (yearMonth && !year && !month) {
      const [yearStr, monthStr] = yearMonth.split('-');
      finalYear = parseInt(yearStr);
      finalMonth = parseInt(monthStr);
    }

    // 更新データの構築
    const updateData: any = {
      updatedAt: new Date()
    };

    if (campaignId !== undefined) updateData.campaignId = campaignId;
    if (finalYear !== undefined) updateData.year = finalYear;
    if (finalMonth !== undefined) updateData.month = finalMonth;
    if (platform !== undefined) updateData.platform = platform;
    if (operationType !== undefined) updateData.operationType = operationType;
    if (budgetType !== undefined) updateData.budgetType = budgetType;
    if (actualSpend !== undefined) updateData.actualSpend = parseDecimal(actualSpend);
    if (actualResult !== undefined) updateData.actualResult = parseDecimal(actualResult);

    console.log('[RESULTS_UPDATE_API] 更新データ:', updateData);

    // 実績データを更新
    const updatedResult = await prisma.result.update({
      where: { id },
      data: updateData,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    return NextResponse.json(updatedResult);
  } catch (error) {
    console.error('実績更新エラー:', error);
    return NextResponse.json(
      { error: '実績の更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 実績データを削除
    await prisma.result.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('実績削除エラー:', error);
    return NextResponse.json(
      { error: '実績の削除に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 実績データを取得
    const result = await prisma.result.findUnique({
      where: { id },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    if (!result) {
      return NextResponse.json(
        { error: '実績データが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('実績取得エラー:', error);
    return NextResponse.json(
      { error: '実績の取得に失敗しました' },
      { status: 500 }
    );
  }
} 