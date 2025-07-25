import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    console.log('[CLIENT_DETAIL_API] クライアント詳細取得:', { id });

    // データベースからクライアント詳細を取得
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        campaigns: {
          select: {
            id: true,
            name: true,
            purpose: true,
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
        { error: 'クライアントが見つかりません' },
        { status: 404 }
      );
    }

    // レスポンス用にデータを整形
    const formattedClient = {
      id: client.id,
      name: client.name,
      managerId: client.managerId,
      manager: client.manager,
      priority: client.priority,
      department: client.businessDivision,
      salesDepartment: client.salesDepartment,
      agency: client.agency,
      salesChannel: client.salesChannel,
      businessDivision: client.businessDivision,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      campaigns: client.campaigns
    };

    console.log('[CLIENT_DETAIL_API] クライアント詳細を返却:', formattedClient.name);
    return NextResponse.json(formattedClient);
  } catch (error) {
    console.error('[CLIENT_DETAIL_API] クライアント詳細取得エラー:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'クライアントの取得に失敗しました',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { 
      name, 
      managerId, 
      priority, 
      businessDivision, 
      salesDepartment, 
      agency, 
      salesChannel 
    } = body;

    console.log('[CLIENT_DETAIL_API] クライアント更新:', { id, name });

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアント名は必須です' },
        { status: 400 }
      );
    }

    if (!businessDivision || !salesDepartment) {
      return NextResponse.json(
        { error: '事業部と営業部門は必須です' },
        { status: 400 }
      );
    }

    // 同名クライアントの重複チェック（自分以外）
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

    // クライアントを更新
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        managerId: managerId || null,
        priority: priority || 'C',
        businessDivision,
        salesDepartment,
        agency: agency || null,
        salesChannel: salesChannel || null
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        campaigns: {
          select: {
            id: true,
            name: true,
            totalBudget: true
          }
        }
      }
    });

    console.log('[CLIENT_DETAIL_API] クライアントを更新:', updatedClient.name);
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('[CLIENT_DETAIL_API] クライアント更新エラー:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'クライアントの更新に失敗しました',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    console.log('[CLIENT_DETAIL_API] クライアント削除:', { id });

    // クライアントが存在するかチェック
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        campaigns: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!client) {
      return NextResponse.json(
        { error: 'クライアントが見つかりません' },
        { status: 404 }
      );
    }

    // 関連するキャンペーンがある場合は削除を拒否
    if (client.campaigns.length > 0) {
      return NextResponse.json(
        { 
          error: 'このクライアントには関連するキャンペーンがあるため削除できません',
          campaigns: client.campaigns.map(c => c.name)
        },
        { status: 400 }
      );
    }

    // クライアントを削除
    await prisma.client.delete({
      where: { id }
    });

    console.log('[CLIENT_DETAIL_API] クライアントを削除:', client.name);
    return NextResponse.json({ message: 'クライアントを削除しました' });
  } catch (error) {
    console.error('[CLIENT_DETAIL_API] クライアント削除エラー:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'クライアントの削除に失敗しました',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 