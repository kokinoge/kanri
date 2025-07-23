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
    const campaignId = searchParams.get("campaignId");

    let budgets;
    if (campaignId) {
      budgets = await prisma.budget.findMany({
        where: { campaignId },
        include: {
          campaign: {
            include: {
              client: true,
            },
          },
        },
        orderBy: [
          { year: "desc" },
          { month: "desc" },
          { platform: "asc" },
        ],
      });
    } else {
      budgets = await prisma.budget.findMany({
        include: {
          campaign: {
            include: {
              client: true,
            },
          },
        },
        orderBy: [
          { year: "desc" },
          { month: "desc" },
          { platform: "asc" },
        ],
      });
    }

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("[BUDGETS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    */

    const body = await request.json();
    console.log('[BUDGETS_API] POST request data:', body);
    
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
      // yearMonthが "YYYY-MM" 形式であることを簡易的にチェック
      if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
        return new NextResponse("Invalid yearMonth format. Expected YYYY-MM", { status: 400 });
      }
      const [yearStr, monthStr] = yearMonth.split('-');
      finalYear = parseInt(yearStr);
      finalMonth = parseInt(monthStr);
    } else {
      finalYear = parseInt(inputYear) || new Date().getFullYear();
      finalMonth = parseInt(inputMonth) || new Date().getMonth() + 1;
    }

    if (!campaignId || !finalYear || !finalMonth || !amount || !platform || !operationType || !budgetType) {
      console.error('[BUDGETS_API] バリデーションエラー:', {
        campaignId, finalYear, finalMonth, amount, platform, operationType, budgetType
      });
      return new NextResponse("Missing required fields", { status: 400 });
    }

    console.log('[BUDGETS_API] 作成データ:', {
      campaignId,
      year: finalYear,
      month: finalMonth,
      amount: Number(amount),
      platform,
      operationType,
      budgetType,
      targetKpi,
      targetValue
    });

    const budget = await prisma.budget.create({
      data: {
        campaignId,
        year: finalYear,
        month: finalMonth,
        amount: Number(amount),
        platform,
        operationType,
        budgetType: budgetType,
        targetKpi,
        targetValue: targetValue ? Number(targetValue) : null,
      },
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    console.log('[BUDGETS_API] 予算作成成功:', budget.id);

    return NextResponse.json(budget);
  } catch (error) {
    console.error("[BUDGETS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 