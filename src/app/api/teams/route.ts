import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { hasRequiredRole } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('[TEAMS_API] Request received');

    // 認証チェック（開発時は一時的にスキップ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    */

    const teams = await prisma.team.findMany({
      where: {
        isActive: true,
      },
      include: {
        budgetTeams: {
          include: {
            budget: {
              include: {
                campaign: {
                  include: {
                    client: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        campaignTeams: {
          include: {
            campaign: {
              include: {
                client: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // チーム統計情報を計算
    const teamsWithStats = teams.map(team => {
      const totalBudgetAllocations = team.budgetTeams.reduce(
        (sum, bt) => sum + Number(bt.allocation), 0
      );
      const totalBudgetAmount = team.budgetTeams.reduce(
        (sum, bt) => sum + Number(bt.budget.amount) * (Number(bt.allocation) / 100), 0
      );
      const uniqueClients = new Set(
        [...team.budgetTeams.map(bt => bt.budget.campaign.clientId),
         ...team.campaignTeams.map(ct => ct.campaign.clientId)]
      ).size;
      const uniqueCampaigns = new Set(
        [...team.budgetTeams.map(bt => bt.budget.campaignId),
         ...team.campaignTeams.map(ct => ct.campaignId)]
      ).size;

      return {
        ...team,
        stats: {
          totalBudgetAllocations,
          totalBudgetAmount,
          uniqueClients,
          uniqueCampaigns,
          budgetItemCount: team.budgetTeams.length,
          campaignItemCount: team.campaignTeams.length,
        },
        budgetTeams: undefined, // 統計情報に置き換えるため除去
        campaignTeams: undefined, // 統計情報に置き換えるため除去
      };
    });

    console.log('[TEAMS_API] Teams retrieved:', teams.length);

    return NextResponse.json(teamsWithStats);

  } catch (error) {
    console.error('[TEAMS_API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch teams',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[TEAMS_API] POST request received');

    // 認証チェック（開発時は一時的にスキップ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    */

    const body = await request.json();
    const { name, description, color } = body;

    console.log('[TEAMS_API] Creating team:', { name, description, color });

    const team = await prisma.team.create({
      data: {
        name,
        description: description || null,
        color: color || null,
        isActive: true,
      },
    });

    console.log('[TEAMS_API] Team created:', team.id);

    return NextResponse.json({
      success: true,
      data: team,
      message: 'チームが作成されました',
    });

  } catch (error) {
    console.error('[TEAMS_API] POST Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create team',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 