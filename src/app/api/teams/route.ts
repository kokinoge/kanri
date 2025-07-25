import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    */

    const teams = await prisma.team.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            campaignTeams: true,
            budgetTeams: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error("[TEAMS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "manager")) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, color } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "チーム名は必須です" }, { status: 400 });
    }

    // 重複チェック
    const existingTeam = await prisma.team.findFirst({
      where: { name: name.trim() },
    });

    if (existingTeam) {
      return NextResponse.json({ error: "同じ名前のチームが既に存在します" }, { status: 400 });
    }

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color || null,
        isActive: true,
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
    console.error("[TEAMS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 