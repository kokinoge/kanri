import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// サンプルマスターデータ
const MASTER_DATA = {
  department: [
    { id: '1', value: 'SNSメディア事業部', label: 'SNSメディア事業部' },
    { id: '2', value: 'デジタルマーケティング事業部', label: 'デジタルマーケティング事業部' },
    { id: '3', value: 'コンテンツ事業部', label: 'コンテンツ事業部' },
    { id: '4', value: 'テクノロジー事業部', label: 'テクノロジー事業部' },
  ],
  salesDepartment: [
    { id: '1', value: '国内営業', label: '国内営業' },
    { id: '2', value: '海外営業', label: '海外営業' },
    { id: '3', value: 'パートナー営業', label: 'パートナー営業' },
    { id: '4', value: 'ダイレクト営業', label: 'ダイレクト営業' },
  ],
  agency: [
    { id: '1', value: 'エージェンシーA', label: 'エージェンシーA' },
    { id: '2', value: 'エージェンシーB', label: 'エージェンシーB' },
    { id: '3', value: 'エージェンシーC', label: 'エージェンシーC' },
    { id: '4', value: '直販', label: '直販' },
  ],
  salesChannel: [
    { id: '1', value: 'Web', label: 'Web' },
    { id: '2', value: 'モバイル', label: 'モバイル' },
    { id: '3', value: 'イベント', label: 'イベント' },
    { id: '4', value: '紹介', label: '紹介' },
    { id: '5', value: 'パートナー', label: 'パートナー' },
  ],
  businessDivision: [
    { id: '1', value: 'SNSメディア事業部', label: 'SNSメディア事業部' },
    { id: '2', value: 'デジタルマーケティング事業部', label: 'デジタルマーケティング事業部' },
    { id: '3', value: 'コンテンツ事業部', label: 'コンテンツ事業部' },
  ],
  platform: [
    { id: '1', value: 'Facebook', label: 'Facebook' },
    { id: '2', value: 'Instagram', label: 'Instagram' },
    { id: '3', value: 'Twitter', label: 'Twitter' },
    { id: '4', value: 'TikTok', label: 'TikTok' },
    { id: '5', value: 'YouTube', label: 'YouTube' },
    { id: '6', value: 'LinkedIn', label: 'LinkedIn' },
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'カテゴリーパラメータが必要です' },
        { status: 400 }
      );
    }

    const data = MASTER_DATA[category as keyof typeof MASTER_DATA];

    if (!data) {
      return NextResponse.json(
        { error: '指定されたカテゴリーが見つかりません' },
        { status: 404 }
      );
    }

    console.log(`[MASTERS_API] ${category} データを返却:`, data.length, '件');
    return NextResponse.json(data);
  } catch (error) {
    console.error('マスターデータ取得エラー:', error);
    return NextResponse.json(
      { error: 'マスターデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, value, label } = body;

    if (!category || !value || !label) {
      return NextResponse.json(
        { error: 'category, value, labelは必須です' },
        { status: 400 }
      );
    }

    // 新しいアイテムの作成（実際の実装ではデータベースに保存）
    const newItem = {
      id: Date.now().toString(),
      value,
      label
    };

    console.log(`[MASTERS_API] ${category} に新しいアイテムを追加:`, newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('マスターデータ作成エラー:', error);
    return NextResponse.json(
      { error: 'マスターデータの作成に失敗しました' },
      { status: 500 }
    );
  }
} 