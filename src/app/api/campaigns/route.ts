import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    const where = clientId ? { clientId } : {};

    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        client: true,
      },
      orderBy: [
        { startYear: "desc" },
        { startMonth: "desc" },
      ],
    });

    // totalBudgetを数値型に変換
    const campaignsWithNumberBudget = campaigns.map(campaign => ({
      ...campaign,
      totalBudget: Number(campaign.totalBudget) || 0
    }));

    return NextResponse.json(campaignsWithNumberBudget);
  } catch (error) {
    console.error("[CAMPAIGNS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 認証チェックを一時的にコメントアウト（開発環境）
    // const session = await auth();
    // if (!hasRequiredRole(session, "manager")) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { clientId, name, purpose, businessDivision, startYear, startMonth, endYear, endMonth, totalBudget } = body;

    if (!clientId || !name || !startYear || !startMonth || !totalBudget) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 2025年以降の制限
    if (startYear < 2025) {
      return new NextResponse("Start year must be 2025 or later", { status: 400 });
    }

    // 月の範囲チェック
    if (startMonth < 1 || startMonth > 12) {
      return new NextResponse("Start month must be between 1 and 12", { status: 400 });
    }

    if (endYear && endMonth) {
      if (endYear < 2025) {
        return new NextResponse("End year must be 2025 or later", { status: 400 });
      }
      if (endMonth < 1 || endMonth > 12) {
        return new NextResponse("End month must be between 1 and 12", { status: 400 });
      }
    }

    const campaign = await prisma.campaign.create({
      data: {
        clientId,
        name,
        purpose,
        startYear: Number(startYear),
        startMonth: Number(startMonth),
        endYear: endYear ? Number(endYear) : null,
        endMonth: endMonth ? Number(endMonth) : null,
        totalBudget: Number(totalBudget),
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("[CAMPAIGNS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 