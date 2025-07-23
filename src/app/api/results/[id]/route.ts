import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await prisma.result.findUnique({
      where: { id },
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

    if (!result) {
      return NextResponse.json(
        { error: '指定された実績が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('実績詳細取得エラー:', error);
    return NextResponse.json(
      { error: '実績詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { campaignId, year, month, platform, operationType, budgetType, actualSpend, actualResult } = body;

    if (!campaignId) {
      return NextResponse.json(
        { error: '案件IDは必須です' },
        { status: 400 }
      );
    }

    // 同じ条件の実績が既に存在するかチェック（自身は除外）
    const existingResult = await prisma.result.findFirst({
      where: {
        campaignId,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        platform: platform || '',
        operationType: operationType || '',
        NOT: { id }
      }
    });

    if (existingResult) {
      return NextResponse.json(
        { error: '同じ条件の実績が既に存在します' },
        { status: 400 }
      );
    }

    const result = await prisma.result.update({
      where: { id },
      data: {
        campaignId,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        platform: platform || '',
        operationType: operationType || '',
        actualSpend: actualSpend ? parseFloat(actualSpend.toString()) : 0,
        actualResult: actualResult ? parseFloat(actualResult.toString()) : 0
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

    return NextResponse.json(result);
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

    await prisma.result.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: '実績を削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('実績削除エラー:', error);
    return NextResponse.json(
      { error: '実績の削除に失敗しました' },
      { status: 500 }
    );
  }
} 