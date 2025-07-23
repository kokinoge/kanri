import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const budget = await prisma.budget.findUnique({
      where: { id: params.id },
      include: {
        campaign: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!budget) {
      return new NextResponse("Budget not found", { status: 404 });
    }

    return NextResponse.json(budget);
  } catch (error) {
    console.error("[BUDGET_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    */

    const { id } = params;
    const body = await request.json();
    console.log('[BUDGETS_UPDATE_API] PUT request data:', body);
    
    const {
      campaignId,
      yearMonth,
      year: inputYear,
      month: inputMonth,
      amount,
      platform,
      operationType,
      budgetType,
      targetKpi,
      targetValue
    } = body;

    // 年月データの処理
    let finalYear = inputYear;
    let finalMonth = inputMonth;
    
    if (yearMonth && !inputYear && !inputMonth) {
      const [yearStr, monthStr] = yearMonth.split('-');
      finalYear = parseInt(yearStr);
      finalMonth = parseInt(monthStr);
    }

    // 更新データの構築
    const updateData: any = {
      updatedAt: new Date()
    };

    if (campaignId !== undefined) updateData.campaignId = campaignId;
    if (finalYear !== undefined) updateData.year = finalYear;
    if (finalMonth !== undefined) updateData.month = finalMonth;
    if (amount !== undefined) updateData.amount = Number(amount);
    if (platform !== undefined) updateData.platform = platform;
    if (operationType !== undefined) updateData.operationType = operationType;
    if (budgetType !== undefined) updateData.budgetType = budgetType;
    if (targetKpi !== undefined) updateData.targetKpi = targetKpi;
    if (targetValue !== undefined) updateData.targetValue = targetValue ? Number(targetValue) : null;

    console.log('[BUDGETS_UPDATE_API] 更新データ:', updateData);

    const budget = await prisma.budget.update({
      where: { id },
      data: updateData,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.error("[BUDGET_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    */

    await prisma.budget.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[BUDGET_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 