import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const client = await prisma.client.findUnique({
            where: { id: params.id },
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                campaigns: {
                    include: {
                        budgets: {
                            orderBy: [
                                { year: "desc" },
                                { month: "desc" },
                                { platform: "asc" },
                            ],
                        },
                        results: {
                            orderBy: [
                                { year: "desc" },
                                { month: "desc" },
                                { platform: "asc" },
                            ],
                        },
                    },
                    orderBy: [
                        { startYear: 'desc' },
                        { startMonth: 'desc' }
                    ]
                }
            }
        });

        if (!client) {
            return new NextResponse("Client not found", { status: 404 });
        }

        // 統計情報を計算
        const totalBudget = client.campaigns.reduce((sum, campaign) => 
            sum + campaign.budgets.reduce((budgetSum, budget) => budgetSum + Number(budget.amount), 0), 0
        );
        
        const totalSpend = client.campaigns.reduce((sum, campaign) => 
            sum + campaign.results.reduce((spendSum, result) => spendSum + Number(result.actualSpend), 0), 0
        );
        
        const totalResults = client.campaigns.reduce((sum, campaign) => 
            sum + campaign.results.reduce((resultSum, result) => resultSum + Number(result.actualResult), 0), 0
        );

        // プラットフォーム別の集計
        const platformStats = client.campaigns.reduce((acc, campaign) => {
            campaign.budgets.forEach(budget => {
                if (!acc[budget.platform]) {
                    acc[budget.platform] = { budget: 0, spend: 0, result: 0 };
                }
                acc[budget.platform].budget += Number(budget.amount);
            });
            
            campaign.results.forEach(result => {
                if (!acc[result.platform]) {
                    acc[result.platform] = { budget: 0, spend: 0, result: 0 };
                }
                acc[result.platform].spend += Number(result.actualSpend);
                acc[result.platform].result += Number(result.actualResult);
            });
            
            return acc;
        }, {} as Record<string, { budget: number; spend: number; result: number; }>);

        // 月別パフォーマンス（過去12ヶ月）
        const currentDate = new Date();
        const monthlyPerformance = [];
        for (let i = 11; i >= 0; i--) {
            const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const targetYear = targetDate.getFullYear();
            const targetMonth = targetDate.getMonth() + 1;

            const monthBudget = client.campaigns.reduce((sum, campaign) => 
                sum + campaign.budgets
                    .filter(b => b.year === targetYear && b.month === targetMonth)
                    .reduce((budgetSum, budget) => budgetSum + Number(budget.amount), 0), 0
            );
            
            const monthSpend = client.campaigns.reduce((sum, campaign) => 
                sum + campaign.results
                    .filter(r => r.year === targetYear && r.month === targetMonth)
                    .reduce((spendSum, result) => spendSum + Number(result.actualSpend), 0), 0
            );
            
            const monthResult = client.campaigns.reduce((sum, campaign) => 
                sum + campaign.results
                    .filter(r => r.year === targetYear && r.month === targetMonth)
                    .reduce((resultSum, result) => resultSum + Number(result.actualResult), 0), 0
            );

            monthlyPerformance.push({
                year: targetYear,
                month: targetMonth,
                budget: monthBudget,
                spend: monthSpend,
                result: monthResult,
            });
        }

        const responseData = {
            ...client,
            stats: {
                totalBudget,
                totalSpend,
                totalResults,
                efficiency: totalSpend > 0 ? (totalResults / totalSpend) : 0,
                activeCampaigns: client.campaigns.filter(c => {
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    
                    // 終了年月が未設定（継続中）または現在より未来
                    return !c.endYear || !c.endMonth || 
                           c.endYear > currentYear || 
                           (c.endYear === currentYear && c.endMonth >= currentMonth);
                }).length,
                platformStats: Object.entries(platformStats).map(([platform, data]) => ({
                    platform,
                    ...data,
                    efficiency: data.spend > 0 ? (data.result / data.spend) : 0,
                })),
                monthlyPerformance,
            }
        };

        return NextResponse.json(responseData);

    } catch (error) {
        console.error(`[CLIENT_GET_${params.id}]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, managerId, priority, businessDivision, salesDepartment, agency, salesChannel } = body;

    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        managerId: managerId || null,
        priority: priority || undefined,
        businessDivision: businessDivision || null,
        salesDepartment: salesDepartment || null,
        agency: agency || null,
        salesChannel: salesChannel || null,
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error(`[CLIENT_UPDATE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "admin")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    
    // 関連する施策があると削除できないようにする（安全のため）
    const existingCampaigns = await prisma.campaign.count({
        where: { clientId: id }
    });
    if (existingCampaigns > 0) {
        return new NextResponse("Cannot delete client with active campaigns", { status: 400 });
    }
    
    await prisma.client.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`[CLIENT_DELETE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 