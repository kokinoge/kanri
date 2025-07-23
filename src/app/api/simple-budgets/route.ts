import { NextRequest, NextResponse } from 'next/server';

// 簡単な予算管理のためのメモリ内ストレージ（開発用）
let budgets: any[] = [
  {
    id: '1',
    name: 'Q1広告予算',
    totalAmount: 1000000,
    usedAmount: 250000,
    year: 2025,
    month: 1,
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z',
    client: { name: 'Sample Client' },
    department: { name: 'Marketing' }
  },
  {
    id: '2',
    name: 'デジタルマーケティング予算',
    totalAmount: 2000000,
    usedAmount: 800000,
    year: 2025,
    month: 2,
    status: 'active',
    createdAt: '2025-02-01T00:00:00Z',
    client: { name: 'Tech Corp' },
    department: { name: 'Digital' }
  }
];

// 予算一覧取得
export async function GET() {
  try {
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('予算取得エラー:', error);
    return NextResponse.json(
      { error: '予算データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 予算新規作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, totalAmount, year, month } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: '予算名は必須です' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: '予算額は0より大きい値を入力してください' },
        { status: 400 }
      );
    }

    // 新しい予算を作成
    const newBudget = {
      id: (budgets.length + 1).toString(),
      name: name.trim(),
      totalAmount: parseFloat(totalAmount),
      usedAmount: 0,
      year: year || new Date().getFullYear(),
      month: month || new Date().getMonth() + 1,
      status: 'active',
      createdAt: new Date().toISOString(),
      client: { name: 'デフォルトクライアント' },
      department: { name: 'デフォルト部署' }
    };

    budgets.push(newBudget);

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error('予算作成エラー:', error);
    return NextResponse.json(
      { error: '予算の作成に失敗しました' },
      { status: 500 }
    );
  }
} 