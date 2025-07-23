import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
  kpiId: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
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

    // 同じKPIタイプの重複チェック（自分以外）
    const existingKpi = await prisma.campaignKpi.findFirst({
      where: {
        campaignId: params.id,
        kpiType: kpiType.trim(),
        NOT: { id: params.kpiId },
      },
    });

    if (existingKpi) {
      return NextResponse.json({ error: "同じKPIタイプが既に存在します" }, { status: 400 });
    }

    const kpi = await prisma.campaignKpi.update({
      where: { id: params.kpiId },
      data: {
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
    console.error("[CAMPAIGN_KPI_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    
    if (!session?.user || !hasRequiredRole(session, "manager")) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 401 });
    }

    await prisma.campaignKpi.delete({
      where: { id: params.kpiId },
    });

    return NextResponse.json({ message: "KPIが削除されました" });
  } catch (error) {
    console.error("[CAMPAIGN_KPI_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 