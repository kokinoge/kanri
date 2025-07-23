import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

// サンプルクライアントデータ
let SAMPLE_CLIENTS = [
  {
    id: '1',
    name: 'クライアントA',
    managerId: '2',
    manager: {
      id: '2',
      name: '田中太郎',
      email: 'tanaka@example.com'
    },
    priority: 8,
    department: 'SNSメディア事業部',
    salesDepartment: '国内営業',
    agency: 'エージェンシーA',
    salesChannel: 'Web',
    businessDivision: 'SNSメディア事業部',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'クライアントB',
    managerId: '3',
    manager: {
      id: '3',
      name: '佐藤花子',
      email: 'sato@example.com'
    },
    priority: 6,
    department: 'デジタルマーケティング事業部',
    salesDepartment: '海外営業',
    agency: '直販',
    salesChannel: 'モバイル',
    businessDivision: 'デジタルマーケティング事業部',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    name: 'クライアントC',
    managerId: '4',
    manager: {
      id: '4',
      name: '鈴木次郎',
      email: 'suzuki@example.com'
    },
    priority: 4,
    department: 'コンテンツ事業部',
    salesDepartment: 'パートナー営業',
    agency: 'エージェンシーB',
    salesChannel: 'イベント',
    businessDivision: 'コンテンツ事業部',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log('[CLIENTS_API] クライアント一覧を返却:', SAMPLE_CLIENTS.length, '件');
    return NextResponse.json(SAMPLE_CLIENTS);
  } catch (error) {
    console.error('クライアント取得エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, managerId, priority, department, salesDepartment, agency, salesChannel } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアント名は必須です' },
        { status: 400 }
      );
    }

    // 同名クライアントの重複チェック
    const existingClient = SAMPLE_CLIENTS.find(client => 
      client.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (existingClient) {
      return NextResponse.json(
        { error: '同名のクライアントが既に存在します' },
        { status: 400 }
      );
    }

    // 担当者情報の取得（実際にはユーザーDBから取得）
    const managerInfo = managerId ? {
      id: managerId,
      name: managerId === '2' ? '田中太郎' : managerId === '3' ? '佐藤花子' : '鈴木次郎',
      email: managerId === '2' ? 'tanaka@example.com' : managerId === '3' ? 'sato@example.com' : 'suzuki@example.com'
    } : null;

    const newClient = {
      id: (SAMPLE_CLIENTS.length + 1).toString(),
      name: name.trim(),
      managerId: managerId || null,
      manager: managerInfo,
      priority: priority || 5,
      department: department || null,
      salesDepartment: salesDepartment || null,
      agency: agency || null,
      salesChannel: salesChannel || null,
      businessDivision: department || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    SAMPLE_CLIENTS.push(newClient);

    console.log('[CLIENTS_API] 新しいクライアントを作成:', newClient);
    return NextResponse.json(newClient);
  } catch (error) {
    console.error('クライアント作成エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの作成に失敗しました' },
      { status: 500 }
    );
  }
} 