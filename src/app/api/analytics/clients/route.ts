import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const clientId = searchParams.get('clientId');
    const campaignId = searchParams.get('campaignId');

    // 基本的な条件設定
    const whereCondition: any = {};
    if (year && year !== 'all') {
      whereCondition.year = parseInt(year);
    }
    if (month && month !== 'all') {
      whereCondition.month = parseInt(month);
    }

    // クライアント一覧を取得
    const clientsQuery = {
      include: {
        campaigns: {
          include: {
            budgets: {
              where: whereCondition
            },
            results: {
              where: whereCondition
            }
          }
        }
      },
      where: clientId && clientId !== 'all' ? { id: clientId } : undefined
    };

    const clients = await prisma.client.findMany(clientsQuery);

    // クライアント分析データを構築
    const clientsAnalysis = clients.map(client => {
      const campaigns = client.campaigns.map(campaign => {
        // 各案件の予算・実績を集計
        const totalBudget = campaign.budgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
        const totalSpend = campaign.results.reduce((sum, result) => sum + Number(result.actualSpend), 0);
        const totalResult = campaign.results.reduce((sum, result) => sum + Number(result.actualResult), 0);
        const efficiency = totalSpend > 0 ? totalResult / totalSpend : 0;

        // プラットフォーム別分析（重複除去）
        const platformMap = new Map();
        
        // 予算データを集計
        campaign.budgets.forEach(budget => {
          const key = budget.platform;
          if (!platformMap.has(key)) {
            platformMap.set(key, {
              platform: budget.platform,
              budget: 0,
              spend: 0,
              result: 0
            });
          }
          platformMap.get(key).budget += Number(budget.amount);
        });

        // 実績データを集計
        campaign.results.forEach(result => {
          const key = result.platform;
          if (platformMap.has(key)) {
            platformMap.get(key).spend += Number(result.actualSpend);
            platformMap.get(key).result += Number(result.actualResult);
          }
        });

        const platformBreakdown = Array.from(platformMap.values());

        // 月別トレンド（重複除去）
        const monthlyMap = new Map();
        
        // 予算データを集計
        campaign.budgets.forEach(budget => {
          const key = `${budget.year}-${budget.month}`;
          if (!monthlyMap.has(key)) {
            monthlyMap.set(key, {
              year: budget.year,
              month: budget.month,
              budget: 0,
              spend: 0,
              result: 0
            });
          }
          monthlyMap.get(key).budget += Number(budget.amount);
        });

        // 実績データを集計
        campaign.results.forEach(result => {
          const key = `${result.year}-${result.month}`;
          if (monthlyMap.has(key)) {
            monthlyMap.get(key).spend += Number(result.actualSpend);
            monthlyMap.get(key).result += Number(result.actualResult);
          }
        });

        const monthlyTrends = Array.from(monthlyMap.values()).sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return a.month - b.month;
        });

          return {
              id: campaign.id,
              name: campaign.name,
          totalBudget,
          totalSpend,
          totalResult,
          efficiency,
          platformBreakdown,
          monthlyTrends
        };
      }).filter(campaign => 
        !campaignId || campaignId === 'all' || campaign.id === campaignId
      );

      // クライアント全体の集計
      const clientTotalBudget = campaigns.reduce((sum, campaign) => sum + campaign.totalBudget, 0);
      const clientTotalSpend = campaigns.reduce((sum, campaign) => sum + campaign.totalSpend, 0);
      const clientTotalResult = campaigns.reduce((sum, campaign) => sum + campaign.totalResult, 0);
      const clientEfficiency = clientTotalSpend > 0 ? clientTotalResult / clientTotalSpend : 0;

          return {
            id: client.id,
        name: client.name,
        businessDivision: client.businessDivision || '未設定',
        totalBudget: clientTotalBudget,
        totalSpend: clientTotalSpend,
        totalResult: clientTotalResult,
        efficiency: clientEfficiency,
        campaignCount: campaigns.length,
        campaigns
      };
    }).filter(client => client.campaignCount > 0 || clientId === client.id);

    // 全体サマリー
    const summary = {
      totalClients: clientsAnalysis.length,
      totalCampaigns: clientsAnalysis.reduce((sum, client) => sum + client.campaignCount, 0),
      totalBudget: clientsAnalysis.reduce((sum, client) => sum + client.totalBudget, 0),
      totalSpend: clientsAnalysis.reduce((sum, client) => sum + client.totalSpend, 0),
      totalResult: clientsAnalysis.reduce((sum, client) => sum + client.totalResult, 0),
      averageEfficiency: clientsAnalysis.length > 0 
        ? clientsAnalysis.reduce((sum, client) => sum + client.efficiency, 0) / clientsAnalysis.length 
        : 0
    };

    return NextResponse.json({
      clients: clientsAnalysis,
      summary
    });

  } catch (error) {
    console.error('クライアント分析データ取得エラー:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    );
  }
} 
