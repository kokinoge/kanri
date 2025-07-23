import { NextRequest, NextResponse } from 'next/server';

// 外部の budgets 配列をインポート（実際にはDBまたは共有ストレージを使用）
let budgets: any[] = [];

// 初期データ（メモリ内ストレージ）
if (budgets.length === 0) {
  budgets = [
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
}

// 予算削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 予算が存在するかチェック
    const budgetIndex = budgets.findIndex(budget => budget.id === id);

    if (budgetIndex === -1) {
      return NextResponse.json(
        { error: '指定された予算が見つかりません' },
        { status: 404 }
      );
    }

    // 予算を削除
    budgets.splice(budgetIndex, 1);

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