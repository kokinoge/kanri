import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('[CLIENTS_API] GET リクエスト受信:', {
      pathname: request.nextUrl.pathname,
      searchParams: Object.fromEntries(request.nextUrl.searchParams),
      method: request.method,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV
    });

    // データベースからクライアント一覧を取得
    const clients = await prisma.client.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // レスポンス用にデータを整形
    const formattedClients = clients.map(client => ({
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
    }));

    console.log('[CLIENTS_API] クライアント一覧を返却:', formattedClients.length, '件');
    
    const response = NextResponse.json(formattedClients);
    response.headers.set('X-Debug-Clients-Count', formattedClients.length.toString());
    response.headers.set('X-Debug-Timestamp', new Date().toISOString());
    
    return response;
  } catch (error) {
    console.error('[CLIENTS_API] クライアント取得エラー:', {
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

export async function POST(request: NextRequest) {
  try {
    console.log('[CLIENTS_API] POST リクエスト受信:', {
      pathname: request.nextUrl.pathname,
      method: request.method,
      timestamp: new Date().toISOString()
    });

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

    // 同名クライアントの重複チェック
    const existingClient = await prisma.client.findFirst({
      where: {
        name: name.trim()
      }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: '同名のクライアントが既に存在します' },
        { status: 400 }
      );
    }

    // 新しいクライアントを作成
    const newClient = await prisma.client.create({
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

    console.log('[CLIENTS_API] 新しいクライアントを作成:', newClient.name);
    return NextResponse.json(newClient);
  } catch (error) {
    console.error('[CLIENTS_API] クライアント作成エラー:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'クライアントの作成に失敗しました',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 