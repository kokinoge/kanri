import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 分析データを生成する関数
function generateAnalyticsData(period: string) {
  // サンプル予算データ（実際にはDBから取得）
  const budgets = [
    { id: '1', name: 'Q1広告予算', totalAmount: 1000000, usedAmount: 250000, year: 2025, month: 1, client: { name: 'Sample Client' } },
    { id: '2', name: 'デジタルマーケティング予算', totalAmount: 2000000, usedAmount: 800000, year: 2025, month: 2, client: { name: 'Tech Corp' } },
    { id: '3', name: 'テスト予算', totalAmount: 500000, usedAmount: 0, year: 2025, month: 7, client: { name: 'デフォルトクライアント' } },
    { id: '4', name: 'Q2キャンペーン予算', totalAmount: 1500000, usedAmount: 900000, year: 2025, month: 4, client: { name: 'Enterprise Co' } },
    { id: '5', name: 'ソーシャルメディア予算', totalAmount: 800000, usedAmount: 320000, year: 2025, month: 3, client: { name: 'Social Brand' } }
  ];

  // 期間フィルタリング
  let filteredBudgets = budgets;
  if (period !== 'all') {
    const year = parseInt(period);
    filteredBudgets = budgets.filter(b => b.year === year);
  }

  // 総計算
  const totalBudgets = filteredBudgets.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalUsed = filteredBudgets.reduce((sum, b) => sum + b.usedAmount, 0);
  const totalRemaining = totalBudgets - totalUsed;
  const usagePercentage = totalBudgets > 0 ? Math.round((totalUsed / totalBudgets) * 100) : 0;

  // 月別集計
  const monthlyData = {};
  filteredBudgets.forEach(budget => {
    const key = budget.month;
    if (!monthlyData[key]) {
      monthlyData[key] = { month: key, budget: 0, used: 0 };
    }
    monthlyData[key].budget += budget.totalAmount;
    monthlyData[key].used += budget.usedAmount;
  });

  const budgetsByMonth = Object.values(monthlyData).map((item: any) => ({
    ...item,
    percentage: item.budget > 0 ? Math.round((item.used / item.budget) * 100) : 0
  })).sort((a, b) => a.month - b.month);

  // トップ予算（使用額順）
  const topBudgets = filteredBudgets
    .sort((a, b) => b.usedAmount - a.usedAmount)
    .slice(0, 5);

  // 部署別集計（サンプル）
  const departmentSummary = [
    { name: 'マーケティング', budget: 2000000, used: 800000, percentage: 40 },
    { name: 'セールス', budget: 1500000, used: 900000, percentage: 60 },
    { name: 'デジタル', budget: 1000000, used: 570000, percentage: 57 }
  ];

  return {
    totalBudgets,
    totalUsed,
    totalRemaining,
    usagePercentage,
    budgetsByMonth,
    topBudgets,
    departmentSummary
  };
}

// 分析データ取得
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '2025';

    const analyticsData = generateAnalyticsData(period);

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('分析データ取得エラー:', error);
    return NextResponse.json(
      { error: '分析データの取得に失敗しました' },
      { status: 500 }
    );
  }
} 