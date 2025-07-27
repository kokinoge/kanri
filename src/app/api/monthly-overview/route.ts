import { NextResponse } from "next/server";
import auth from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

// Dynamic server usageを回避
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('[MONTHLY_OVERVIEW_API] Request received');
    
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    console.log('[MONTHLY_OVERVIEW_API] Session:', session);

    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    */

    // Next.jsの推奨方法でsearchParamsを取得
    const searchParams = request.nextUrl.searchParams;
    const monthParam = searchParams.get("month");
    
    // デフォルトは現在月
    const now = new Date();
    const [year, month] = monthParam 
      ? monthParam.split("-").map(Number)
      : [now.getFullYear(), now.getMonth() + 1];

    console.log(`[MONTHLY_OVERVIEW] Fetching data for ${year}/${month}`);

    // 指定月の予算・実績データを取得
    const budgets = await prisma.budget.findMany({
      where: {
        year,
        month,
      },
      include: {
        campaign: {
          include: {
            client: {
              include: {
                manager: {
                  select: {
                    id: true,
                    name: true,
                    role: true,
                  },
                },
              },
            },
            campaignTeams: {
              include: {
                team: true,
              },
            },
            campaignKpis: {
              orderBy: {
                priority: "asc",
              },
            },
          },
        },
        budgetTeams: {
          include: {
            team: true,
          },
        },
      },
    });

    const results = await prisma.result.findMany({
      where: {
        year,
        month,
      },
      include: {
        campaign: {
          include: {
            client: true,
          },
        },
      },
    });

    // クライアント別にデータを集約
    const clientMap = new Map();
    
    // 予算データからクライアント情報を構築
    budgets.forEach(budget => {
      const client = budget.project.client;
      if (!clientMap.has(client.id)) {
        clientMap.set(client.id, {
          id: client.id,
          name: client.name,
          priority: client.priority,
          department: client.businessDivision,
          manager: client.manager,
          monthlyBudget: 0,
          monthlySpend: 0,
          campaigns: new Map(),
        });
      }
      
      const clientData = clientMap.get(client.id);
      clientData.monthlyBudget += Number(budget.amount);
      
      // 案件情報を追加
      if (!clientData.campaigns.has(budget.project.id)) {
        clientData.campaigns.set(budget.project.id, {
          id: budget.project.id,
          name: budget.project.name,
          purpose: budget.project.purpose,
          startYear: budget.project.startYear,
          startMonth: budget.project.startMonth,
          endYear: budget.project.endYear,
          endMonth: budget.project.endMonth,
          totalBudget: Number(budget.project.totalBudget),
          teams: budget.project.campaignTeams.map(ct => ({
            id: ct.team.id,
            name: ct.team.name,
            color: ct.team.color,
            role: ct.role,
            isLead: ct.isLead,
          })),
          kpis: budget.project.campaignKpis.map(kpi => ({
            id: kpi.id,
            kpiType: kpi.kpiType,
            targetValue: Number(kpi.targetValue),
            actualValue: kpi.actualValue ? Number(kpi.actualValue) : null,
            unit: kpi.unit,
            description: kpi.description,
          })),
          budgets: [],
        });
      }
      
      // 予算詳細を追加
      const campaign = clientData.campaigns.get(budget.project.id);
      campaign.budgets.push({
        id: budget.id,
        platform: budget.platform,
        operationType: budget.operationType,
        amount: Number(budget.amount),
        teams: budget.budgetTeams.map(bt => ({
          id: bt.team.id,
          name: bt.team.name,
          allocation: Number(bt.allocation),
        })),
      });
    });

    // 実績データを追加
    results.forEach(result => {
      const client = result.project.client;
      if (clientMap.has(client.id)) {
        const clientData = clientMap.get(client.id);
        clientData.monthlySpend += Number(result.actualSpend);
      }
    });

    // レスポンス用にデータを整形
    const clients = Array.from(clientMap.values()).map(client => ({
      ...client,
      campaigns: Array.from(client.campaigns.values()),
    }));

    // サマリー計算
    const summary = {
      totalClients: clients.length,
      totalCampaigns: clients.reduce((sum, client) => sum + client.campaigns.length, 0),
      totalBudget: clients.reduce((sum, client) => sum + client.monthlyBudget, 0),
      totalSpend: clients.reduce((sum, client) => sum + client.monthlySpend, 0),
      budgetUtilization: 0,
    };

    if (summary.totalBudget > 0) {
      summary.budgetUtilization = (summary.totalSpend / summary.totalBudget) * 100;
    }

    const response = {
      currentMonth: { year, month },
      clients: clients.sort((a, b) => {
        // 優先度順、次に予算順
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        return b.monthlyBudget - a.monthlyBudget;
      }),
      summary,
    };

    console.log(`[MONTHLY_OVERVIEW] Response: ${clients.length} clients, ${summary.totalCampaigns} campaigns`);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("[MONTHLY_OVERVIEW]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 