import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        campaigns: {
          select: {
            id: true,
            name: true,
            startYear: true,
            startMonth: true,
            endYear: true,
            endMonth: true,
            totalBudget: true
          }
        }
      }
    });

    if (!client) {
      return NextResponse.json(
        { error: '指定されたクライアントが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('クライアント詳細取得エラー:', error);
    return NextResponse.json(
      { error: 'クライアント詳細の取得に失敗しました' },
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
    const { name, manager, businessDivision, priority, salesInfo } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアント名は必須です' },
        { status: 400 }
      );
    }

    // 同名クライアントの重複チェック（自身は除外）
    const existingClient = await prisma.client.findFirst({
      where: { 
        name: name.trim(),
        NOT: { id }
      }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: '同名のクライアントが既に存在します' },
        { status: 400 }
      );
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        manager: manager || '',
        businessDivision: businessDivision || 'SNSメディア事業部',
        priority: priority || 3,
        salesInfo: salesInfo || ''
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('クライアント更新エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの更新に失敗しました' },
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

    // 関連する案件があるかチェック
    const relatedCampaigns = await prisma.campaign.count({
      where: { clientId: id }
    });

    if (relatedCampaigns > 0) {
      return NextResponse.json(
        { error: 'このクライアントには関連する案件があるため削除できません' },
        { status: 400 }
      );
    }

    await prisma.client.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'クライアントを削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('クライアント削除エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの削除に失敗しました' },
      { status: 500 }
    );
  }
} 