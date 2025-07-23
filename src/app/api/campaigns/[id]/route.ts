import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            businessDivision: true
          }
        },
        budgets: {
          select: {
            id: true,
            year: true,
            month: true,
            platform: true,
            operationType: true,
            budgetType: true,
            amount: true,
            targetKpi: true,
            targetValue: true
          }
        },
        results: {
          select: {
            id: true,
            year: true,
            month: true,
            platform: true,
            operationType: true,
            actualSpend: true,
            actualResult: true
          }
        }
      }
    });

    if (!campaign) {
      return NextResponse.json(
        { error: '指定された案件が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('案件詳細取得エラー:', error);
    return NextResponse.json(
      { error: '案件詳細の取得に失敗しました' },
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
    const { clientId, name, purpose, startYear, startMonth, endYear, endMonth, totalBudget } = body;

    if (!clientId || !name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアントIDと案件名は必須です' },
        { status: 400 }
      );
    }

    // 同名案件の重複チェック（自身は除外）
    const existingCampaign = await prisma.campaign.findFirst({
      where: { 
        clientId,
        name: name.trim(),
        NOT: { id }
      }
    });

    if (existingCampaign) {
      return NextResponse.json(
        { error: '同名の案件が既に存在します' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        clientId,
        name: name.trim(),
        purpose: purpose || '',
        startYear: startYear || new Date().getFullYear(),
        startMonth: startMonth || new Date().getMonth() + 1,
        endYear: endYear || null,
        endMonth: endMonth || null,
        totalBudget: totalBudget ? parseFloat(totalBudget.toString()) : 0
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            businessDivision: true
          }
        }
      }
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('案件更新エラー:', error);
    return NextResponse.json(
      { error: '案件の更新に失敗しました' },
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

    // 関連するデータをカスケード削除
    await prisma.$transaction(async (tx) => {
      // 予算データを削除
      await tx.budget.deleteMany({
        where: { campaignId: id }
      });

      // 実績データを削除
      await tx.result.deleteMany({
        where: { campaignId: id }
      });

      // 案件を削除
      await tx.campaign.delete({
        where: { id }
      });
    });

    return NextResponse.json(
      { message: '案件を削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('案件削除エラー:', error);
    return NextResponse.json(
      { error: '案件の削除に失敗しました' },
      { status: 500 }
    );
  }
} 