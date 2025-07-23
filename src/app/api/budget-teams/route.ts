import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('[BUDGET_TEAMS_API] POST request received');

    const body = await request.json();
    const { budgetId, teamId, allocation } = body;

    console.log('[BUDGET_TEAMS_API] Creating team allocation:', { budgetId, teamId, allocation });

    // 既存の配分があるかチェック
    const existingAllocation = await prisma.budgetTeam.findFirst({
      where: {
        budgetId,
        teamId,
      },
    });

    let result;
    if (existingAllocation) {
      // 更新
      result = await prisma.budgetTeam.update({
        where: { id: existingAllocation.id },
        data: { allocation },
        include: {
          team: true,
          budget: {
            include: {
              campaign: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });
    } else {
      // 新規作成
      result = await prisma.budgetTeam.create({
        data: {
          budgetId,
          teamId,
          allocation,
        },
        include: {
          team: true,
          budget: {
            include: {
              campaign: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });
    }

    console.log('[BUDGET_TEAMS_API] Team allocation created/updated:', result.id);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'チーム配分が設定されました',
    });

  } catch (error) {
    console.error('[BUDGET_TEAMS_API] POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create team allocation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const budgetId = searchParams.get('budgetId');

    let teamAllocations;
    if (budgetId) {
      // 特定の予算のチーム配分を取得
      teamAllocations = await prisma.budgetTeam.findMany({
        where: { budgetId },
        include: {
          team: true,
          budget: {
            include: {
              campaign: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });
    } else {
      // 全チーム配分を取得
      teamAllocations = await prisma.budgetTeam.findMany({
        include: {
          team: true,
          budget: {
            include: {
              campaign: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });
    }

    return NextResponse.json(teamAllocations);

  } catch (error) {
    console.error('[BUDGET_TEAMS_API] GET Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch team allocations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 