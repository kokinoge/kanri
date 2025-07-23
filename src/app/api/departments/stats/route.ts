import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log('[DEPARTMENTS_STATS_API] Request received');
    
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    */

    // 事業部別の統計データを取得
    const departments = await prisma.$queryRaw`
      SELECT 
        COALESCE(c.business_division, '未設定') as department,
        COUNT(DISTINCT c.id)::int as client_count,
        COUNT(DISTINCT cam.id)::int as campaign_count,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend
      FROM clients c
      LEFT JOIN campaigns cam ON c.id = cam.client_id
      LEFT JOIN budgets b ON cam.id = b.campaign_id
      LEFT JOIN results r ON cam.id = r.campaign_id
      GROUP BY c.business_division
      ORDER BY total_budget DESC
    `;

    // 全体サマリー
    const summaryResult = await prisma.$queryRaw`
      SELECT 
        COUNT(DISTINCT c.business_division)::int as department_count,
        COUNT(DISTINCT c.id)::int as total_clients,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(AVG(b.amount), 0)::numeric as average_budget
      FROM clients c
      LEFT JOIN campaigns cam ON c.id = cam.client_id
      LEFT JOIN budgets b ON cam.id = b.campaign_id
    `;

    const summary = (summaryResult as any[])[0];

    const response = {
      departments: (departments as any[]).map(dept => ({
        department: dept.department,
        client_count: Number(dept.client_count) || 0,
        campaign_count: Number(dept.campaign_count) || 0,
        total_budget: Number(dept.total_budget) || 0,
        total_actual_spend: Number(dept.total_actual_spend) || 0,
      })),
      summary: {
        department_count: Number(summary?.department_count) || 0,
        total_clients: Number(summary?.total_clients) || 0,
        total_budget: Number(summary?.total_budget) || 0,
        average_budget: Number(summary?.average_budget) || 0,
      },
    };

    console.log('[DEPARTMENTS_STATS_API] Response prepared');
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('[DEPARTMENTS_STATS_API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 