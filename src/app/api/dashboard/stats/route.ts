import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET(request: Request) {
  try {
    // 認証チェックを一時的にコメントアウト（開発環境）
    // const session = await auth();
    // if (!hasRequiredRole(session, "member")) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const monthParam = searchParams.get("month");

    console.log("[DASHBOARD_STATS_GET] パラメータ:", { year: yearParam, month: monthParam });

    // パラメータの適切な処理
    const year = yearParam && yearParam !== "all" ? parseInt(yearParam) : null;
    const month = monthParam && monthParam !== "all" ? parseInt(monthParam) : null;

    // 無効な数値の場合のエラーハンドリング
    if ((yearParam && yearParam !== "all" && isNaN(year!)) || 
        (monthParam && monthParam !== "all" && isNaN(month!))) {
      return new NextResponse("Invalid year or month parameter", { status: 400 });
    }

    // 基本的な統計
    const totalClients = await prisma.client.count();
    const totalCampaigns = await prisma.campaign.count();
    
    // 現在の年月を取得（ファイル全体で使用）
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    // 現在のアクティブな施策（終了年月が現在より未来、または終了日が未設定）
    const activeCampaigns = await prisma.campaign.count({
      where: {
        OR: [
          // 終了年月が未設定（継続中）
          {
            endYear: null,
            endMonth: null,
          },
          // 終了年が現在年より大きい
          {
            endYear: {
              gt: currentYear,
            },
          },
          // 終了年が現在年と同じで、終了月が現在月以降
          {
            endYear: currentYear,
            endMonth: {
              gte: currentMonth,
            },
          },
        ],
      },
    });

    // 予算・実績の集計条件を構築
    const dateFilter: { year?: number; month?: number } = {};
    if (year !== null) dateFilter.year = year;
    if (month !== null) dateFilter.month = month;

    console.log("[DASHBOARD_STATS_GET] フィルタ条件:", dateFilter);

    // 総予算
    const totalBudgetResult = await prisma.budget.aggregate({
      where: dateFilter,
      _sum: {
        amount: true,
      },
    });

    // 総実績支出
    const totalSpendResult = await prisma.result.aggregate({
      where: dateFilter,
      _sum: {
        actualSpend: true,
      },
    });

    // 総実績結果
    const totalResultsSum = await prisma.result.aggregate({
      where: dateFilter,
      _sum: {
        actualResult: true,
      },
    });

    // プラットフォーム別予算
    const budgetsByPlatform = await prisma.budget.groupBy({
      by: ['platform'],
      where: dateFilter,
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    // プラットフォーム別実績
    const resultsByPlatform = await prisma.result.groupBy({
      by: ['platform'],
      where: dateFilter,
      _sum: {
        actualSpend: true,
        actualResult: true,
      },
      orderBy: {
        _sum: {
          actualSpend: 'desc',
        },
      },
    });

    // 月別トレンド（過去12ヶ月）- 現在の年月を使用
    const monthlyTrends = [];
    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(currentYear, currentMonth - 1 - i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;

      const monthlyBudget = await prisma.budget.aggregate({
        where: {
          year: targetYear,
          month: targetMonth,
        },
        _sum: {
          amount: true,
        },
      });

      const monthlyResults = await prisma.result.aggregate({
        where: {
          year: targetYear,
          month: targetMonth,
        },
        _sum: {
          actualSpend: true,
          actualResult: true,
        },
      });

      monthlyTrends.push({
        year: targetYear,
        month: targetMonth,
        budget: monthlyBudget._sum.amount || 0,
        spend: monthlyResults._sum.actualSpend || 0,
        result: monthlyResults._sum.actualResult || 0,
      });
    }

    // クライアント別パフォーマンス（上位10件）
    const clientPerformance = await prisma.client.findMany({
      include: {
        campaigns: {
          include: {
            budgets: {
              where: dateFilter,
            },
            results: {
              where: dateFilter,
            },
          },
        },
      },
      take: 10,
    });

    const clientStats = clientPerformance.map(client => {
      const totalBudget = client.campaigns.reduce((sum, campaign) => 
        sum + campaign.budgets.reduce((budgetSum, budget) => budgetSum + Number(budget.amount), 0), 0
      );
      
      const totalSpend = client.campaigns.reduce((sum, campaign) => 
        sum + campaign.results.reduce((spendSum, result) => spendSum + Number(result.actualSpend), 0), 0
      );
      
      const totalResult = client.campaigns.reduce((sum, campaign) => 
        sum + campaign.results.reduce((resultSum, result) => resultSum + Number(result.actualResult), 0), 0
      );

      return {
        id: client.id,
        name: client.name,
        totalBudget,
        totalSpend,
        totalResult,
        efficiency: totalSpend > 0 ? (totalResult / totalSpend) : 0,
      };
    }).sort((a, b) => b.totalSpend - a.totalSpend);

    const stats = {
      totalClients,
      totalCampaigns,
      activeCampaigns,
      totalBudget: Number(totalBudgetResult._sum.amount || 0),
      totalActualSpend: Number(totalSpendResult._sum.actualSpend || 0),
      totalResults: Number(totalResultsSum._sum.actualResult || 0),
      efficiency: totalSpendResult._sum.actualSpend && Number(totalSpendResult._sum.actualSpend) > 0 
        ? Number(totalResultsSum._sum.actualResult || 0) / Number(totalSpendResult._sum.actualSpend) 
        : 0,
      overview: {
        totalClients,
        totalCampaigns,
        activeCampaigns,
        totalBudget: Number(totalBudgetResult._sum.amount || 0),
        totalSpend: Number(totalSpendResult._sum.actualSpend || 0),
        totalResults: Number(totalResultsSum._sum.actualResult || 0),
        efficiency: totalSpendResult._sum.actualSpend && Number(totalSpendResult._sum.actualSpend) > 0 
          ? Number(totalResultsSum._sum.actualResult || 0) / Number(totalSpendResult._sum.actualSpend) 
          : 0,
      },
      platformBreakdown: {
        budget: budgetsByPlatform.map(item => ({
          platform: item.platform,
          amount: item._sum.amount || 0,
        })),
        results: resultsByPlatform.map(item => ({
          platform: item.platform,
          spend: item._sum.actualSpend || 0,
          result: item._sum.actualResult || 0,
        })),
      },
      monthlyTrends,
      clientPerformance: clientStats,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[DASHBOARD_STATS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 