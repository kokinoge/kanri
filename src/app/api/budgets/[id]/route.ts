import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 予算削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 予算が存在するかチェック
    const budget = await prisma.budget.findUnique({
      where: { id }
    });

    if (!budget) {
      return NextResponse.json(
        { error: '指定された予算が見つかりません' },
        { status: 404 }
      );
    }

    // 関連する実績データがあるかチェック（オプション）
    const relatedResults = await prisma.result.count({
      where: { campaignId: budget.campaignId }
    });

    if (relatedResults > 0) {
      return NextResponse.json(
        { error: 'この予算には関連する実績データがあるため削除できません' },
        { status: 400 }
      );
    }

    // 予算を削除
    await prisma.budget.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: '予算を削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('予算削除エラー:', error);
    return NextResponse.json(
      { error: '予算の削除に失敗しました' },
      { status: 500 }
    );
  }
}

// 予算詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const budget = await prisma.budget.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!budget) {
      return NextResponse.json(
        { error: '指定された予算が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(budget);
  } catch (error) {
    console.error('予算詳細取得エラー:', error);
    return NextResponse.json(
      { error: '予算詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
} 