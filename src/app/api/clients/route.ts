import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: [
        { priority: 'desc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json(clients);
  } catch (error) {
    console.error('クライアント取得エラー:', error);
    return NextResponse.json(
      { error: 'クライアントデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, manager, businessDivision, priority, salesInfo } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアント名は必須です' },
        { status: 400 }
      );
    }

    // 同名クライアントの重複チェック
    const existingClient = await prisma.client.findFirst({
      where: { name: name.trim() }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: '同名のクライアントが既に存在します' },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        manager: manager || '',
        businessDivision: businessDivision || 'SNSメディア事業部',
        priority: priority || 3,
        salesInfo: salesInfo || ''
      }
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('クライアント作成エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの作成に失敗しました' },
      { status: 500 }
    );
  }
} 