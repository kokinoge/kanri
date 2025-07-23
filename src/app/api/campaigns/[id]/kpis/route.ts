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

    const kpis = await prisma.campaignKpi.findMany({
      where: {
        campaignId: params.id,
      },
      orderBy: [
        { priority: "asc" },
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json(kpis);
  } catch (error) {
    console.error("[CAMPAIGN_KPIS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "manager")) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 401 });
    }

    const body = await request.json();
    const { kpiType, targetValue, actualValue, unit, description, priority } = body;

    if (!kpiType || kpiType.trim() === "") {
      return NextResponse.json({ error: "KPIタイプは必須です" }, { status: 400 });
    }

    if (!targetValue || targetValue <= 0) {
      return NextResponse.json({ error: "目標値は必須です" }, { status: 400 });
    }

    if (!unit || unit.trim() === "") {
      return NextResponse.json({ error: "単位は必須です" }, { status: 400 });
    }

    // 施策の存在確認
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json({ error: "施策が見つかりません" }, { status: 404 });
    }

    // 同じKPIタイプの重複チェック
    const existingKpi = await prisma.campaignKpi.findFirst({
      where: {
        campaignId: params.id,
        kpiType: kpiType.trim(),
      },
    });

    if (existingKpi) {
      return NextResponse.json({ error: "同じKPIタイプが既に存在します" }, { status: 400 });
    }

    const kpi = await prisma.campaignKpi.create({
      data: {
        campaignId: params.id,
        kpiType: kpiType.trim(),
        targetValue: Number(targetValue),
        actualValue: actualValue ? Number(actualValue) : null,
        unit: unit.trim(),
        description: description?.trim() || null,
        priority: priority || 0,
      },
    });

    return NextResponse.json(kpi);
  } catch (error) {
    console.error("[CAMPAIGN_KPIS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 