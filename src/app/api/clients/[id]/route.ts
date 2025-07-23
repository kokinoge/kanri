import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

// サンプルクライアントデータ（clients/route.tsと共有すべきだが、簡潔にするため重複）
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
    updatedAt: new Date('2024-01-15'),
    campaigns: [
      {
        id: '1',
        name: 'Spring Campaign 2024',
        startYear: 2024,
        startMonth: 3,
        endYear: 2024,
        endMonth: 5,
        totalBudget: 5000000
      }
    ]
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
    updatedAt: new Date('2024-02-10'),
    campaigns: []
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
    updatedAt: new Date('2024-03-05'),
    campaigns: []
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const client = SAMPLE_CLIENTS.find(c => c.id === id);

    if (!client) {
      return NextResponse.json(
        { error: '指定されたクライアントが見つかりません' },
        { status: 404 }
      );
    }

    console.log('[CLIENT_DETAIL_API] クライアント詳細を返却:', client.name);
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
    const { name, managerId, priority, department, salesDepartment, agency, salesChannel } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアント名は必須です' },
        { status: 400 }
      );
    }

    const clientIndex = SAMPLE_CLIENTS.findIndex(c => c.id === id);
    if (clientIndex === -1) {
      return NextResponse.json(
        { error: '指定されたクライアントが見つかりません' },
        { status: 404 }
      );
    }

    // 同名クライアントの重複チェック（自身は除外）
    const existingClient = SAMPLE_CLIENTS.find(client => 
      client.id !== id && client.name.toLowerCase() === name.trim().toLowerCase()
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

    // クライアント情報を更新
    SAMPLE_CLIENTS[clientIndex] = {
      ...SAMPLE_CLIENTS[clientIndex],
      name: name.trim(),
      managerId: managerId || null,
      manager: managerInfo,
      priority: priority || 5,
      department: department || null,
      salesDepartment: salesDepartment || null,
      agency: agency || null,
      salesChannel: salesChannel || null,
      businessDivision: department || null,
      updatedAt: new Date()
    };

    console.log('[CLIENT_DETAIL_API] クライアントを更新:', SAMPLE_CLIENTS[clientIndex].name);
    return NextResponse.json(SAMPLE_CLIENTS[clientIndex]);
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

    const clientIndex = SAMPLE_CLIENTS.findIndex(c => c.id === id);
    if (clientIndex === -1) {
      return NextResponse.json(
        { error: '指定されたクライアントが見つかりません' },
        { status: 404 }
      );
    }

    // 関連キャンペーンがある場合は削除不可
    const client = SAMPLE_CLIENTS[clientIndex];
    if (client.campaigns && client.campaigns.length > 0) {
      return NextResponse.json(
        { error: '関連するキャンペーンがあるため削除できません' },
        { status: 400 }
      );
    }

    SAMPLE_CLIENTS.splice(clientIndex, 1);

    console.log('[CLIENT_DETAIL_API] クライアントを削除:', client.name);
    return NextResponse.json({ message: 'クライアントを削除しました' });
  } catch (error) {
    console.error('クライアント削除エラー:', error);
    return NextResponse.json(
      { error: 'クライアントの削除に失敗しました' },
      { status: 500 }
    );
  }
} 