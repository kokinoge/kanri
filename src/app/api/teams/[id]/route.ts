import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: {
        campaignTeams: {
          include: {
            campaign: {
              include: {
                client: true,
              },
            },
          },
        },
        budgetTeams: {
          include: {
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
        },
        _count: {
          select: {
            campaignTeams: true,
            budgetTeams: true,
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "チームが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error("[TEAM_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "manager")) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, color, isActive } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "チーム名は必須です" }, { status: 400 });
    }

    // 重複チェック（自分以外）
    const existingTeam = await prisma.team.findFirst({
      where: { 
        name: name.trim(),
        NOT: { id: params.id },
      },
    });

    if (existingTeam) {
      return NextResponse.json({ error: "同じ名前のチームが既に存在します" }, { status: 400 });
    }

    const team = await prisma.team.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color || null,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: {
        _count: {
          select: {
            campaignTeams: true,
            budgetTeams: true,
          },
        },
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("[TEAM_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "admin")) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 401 });
    }

    // 関連データの確認
    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            campaignTeams: true,
            budgetTeams: true,
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "チームが見つかりません" }, { status: 404 });
    }

    if (team._count.campaignTeams > 0 || team._count.budgetTeams > 0) {
      return NextResponse.json({ 
        error: "このチームは施策や予算に関連付けられているため削除できません" 
      }, { status: 400 });
    }

    await prisma.team.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "チームが削除されました" });
  } catch (error) {
    console.error("[TEAM_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 