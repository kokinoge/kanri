import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET(request: Request) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    */

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const businessDivision = searchParams.get("businessDivision");

    console.log('[MASTERS_API] Request params:', { category, businessDivision });

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    // 事業部に応じたbudgetTypeの返却
    if (category === "budgetType" && businessDivision) {
      console.log('[MASTERS_API] Processing budget type for division:', businessDivision);
      const budgetTypes = getBudgetTypesByDivision(businessDivision);
      console.log('[MASTERS_API] Budget types:', budgetTypes);
      const formattedBudgetTypes = budgetTypes.map((type, index) => ({
        id: `bt_${businessDivision}_${index}`,
        category: "budgetType",
        value: type,
        order: index
      }));
      console.log('[MASTERS_API] Formatted response:', formattedBudgetTypes);
      return NextResponse.json(formattedBudgetTypes);
    }

    // 通常のマスターデータ取得
    const masters = await prisma.master.findMany({
      where: { category },
      orderBy: [{ order: "asc" }, { value: "asc" }],
    });

    return NextResponse.json(masters);
  } catch (error) {
    console.error("[MASTERS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 事業部別の予算タイプを返す関数
function getBudgetTypesByDivision(businessDivision: string): string[] {
  const budgetTypeMap: { [key: string]: string[] } = {
    "SNSメディア事業部": ["投稿予算", "再生数/imp予算", "代行予算"],
    "インフルエンサー事業部": ["投稿予算", "キャスティング予算"],
    "広告事業部": ["広告予算運用"]
  };

  return budgetTypeMap[businessDivision] || [];
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "admin")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { category, value, order } = body;

    if (!category || !value) {
      return new NextResponse("Category and value are required", { status: 400 });
    }

    const master = await prisma.master.create({
      data: {
        category,
        value,
        order: order || 0,
      },
    });

    return NextResponse.json(master);
  } catch (error) {
    console.error("[MASTERS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 