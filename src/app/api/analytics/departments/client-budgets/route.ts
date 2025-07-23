import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    */

    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");

    console.log("[CLIENT_BUDGETS_ANALYTICS] Request received for department:", department);

    // クライアントごとの予算データを取得
    let clientBudgets;
    if (department && department !== 'all') {
      clientBudgets = await prisma.$queryRaw`
        SELECT 
          c.id,
          c.name,
          c.priority,
          c.business_division as department,
          c.sales_department,
          COUNT(DISTINCT cam.id)::int as campaign_count,
          COUNT(DISTINCT b.id)::int as budget_count,
          COALESCE(SUM(b.amount), 0)::numeric as total_budget,
          COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
          COALESCE(AVG(b.amount), 0)::numeric as avg_budget_per_item,
          CASE 
            WHEN COALESCE(SUM(b.amount), 0) > 0 
            THEN (COALESCE(SUM(r."actualSpend"), 0) / COALESCE(SUM(b.amount), 0)) * 100
            ELSE 0
          END::numeric as budget_utilization,
          -- プラットフォーム別の予算（JSON形式）
          (
            SELECT COALESCE(json_agg(platform_data), '[]')
            FROM (
              SELECT 
                b2.platform,
                COALESCE(SUM(b2.amount), 0) as budget,
                COALESCE(SUM(r2."actualSpend"), 0) as spend
              FROM budgets b2
              LEFT JOIN campaigns cam2 ON b2.campaign_id = cam2.id
              LEFT JOIN results r2 ON b2.campaign_id = r2.campaign_id 
                AND b2.platform = r2.platform
                AND b2.operation_type = r2.operation_type
              WHERE cam2.client_id = c.id
              GROUP BY b2.platform
              ORDER BY SUM(b2.amount) DESC
            ) platform_data
          ) as platform_breakdown,
          -- 運用タイプ別の予算（JSON形式）
          (
            SELECT COALESCE(json_agg(operation_data), '[]')
            FROM (
              SELECT 
                b3.operation_type,
                COALESCE(SUM(b3.amount), 0) as budget,
                COALESCE(SUM(r3."actualSpend"), 0) as spend
              FROM budgets b3
              LEFT JOIN campaigns cam3 ON b3.campaign_id = cam3.id
              LEFT JOIN results r3 ON b3.campaign_id = r3.campaign_id 
                AND b3.platform = r3.platform
                AND b3.operation_type = r3.operation_type
              WHERE cam3.client_id = c.id
              GROUP BY b3.operation_type
              ORDER BY SUM(b3.amount) DESC
            ) operation_data
          ) as operation_breakdown
        FROM clients c
        LEFT JOIN campaigns cam ON c.id = cam.client_id
        LEFT JOIN budgets b ON cam.id = b.campaign_id
        LEFT JOIN results r ON cam.id = r.campaign_id
          AND b.platform = r.platform
          AND b.operation_type = r.operation_type
        WHERE c.business_division = ${department}
        GROUP BY c.id, c.name, c.priority, c.business_division, c.sales_department
        ORDER BY total_budget DESC
      `;
    } else {
      clientBudgets = await prisma.$queryRaw`
        SELECT 
          c.id,
          c.name,
          c.priority,
          c.business_division as department,
          c.sales_department,
          COUNT(DISTINCT cam.id)::int as campaign_count,
          COUNT(DISTINCT b.id)::int as budget_count,
          COALESCE(SUM(b.amount), 0)::numeric as total_budget,
          COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
          COALESCE(AVG(b.amount), 0)::numeric as avg_budget_per_item,
          CASE 
            WHEN COALESCE(SUM(b.amount), 0) > 0 
            THEN (COALESCE(SUM(r."actualSpend"), 0) / COALESCE(SUM(b.amount), 0)) * 100
            ELSE 0
          END::numeric as budget_utilization,
          -- プラットフォーム別の予算（JSON形式）
          (
            SELECT COALESCE(json_agg(platform_data), '[]')
            FROM (
              SELECT 
                b2.platform,
                COALESCE(SUM(b2.amount), 0) as budget,
                COALESCE(SUM(r2."actualSpend"), 0) as spend
              FROM budgets b2
              LEFT JOIN campaigns cam2 ON b2.campaign_id = cam2.id
              LEFT JOIN results r2 ON b2.campaign_id = r2.campaign_id 
                AND b2.platform = r2.platform
                AND b2.operation_type = r2.operation_type
              WHERE cam2.client_id = c.id
              GROUP BY b2.platform
              ORDER BY SUM(b2.amount) DESC
            ) platform_data
          ) as platform_breakdown,
          -- 運用タイプ別の予算（JSON形式）
          (
            SELECT COALESCE(json_agg(operation_data), '[]')
            FROM (
              SELECT 
                b3.operation_type,
                COALESCE(SUM(b3.amount), 0) as budget,
                COALESCE(SUM(r3."actualSpend"), 0) as spend
              FROM budgets b3
              LEFT JOIN campaigns cam3 ON b3.campaign_id = cam3.id
              LEFT JOIN results r3 ON b3.campaign_id = r3.campaign_id 
                AND b3.platform = r3.platform
                AND b3.operation_type = r3.operation_type
              WHERE cam3.client_id = c.id
              GROUP BY b3.operation_type
              ORDER BY SUM(b3.amount) DESC
            ) operation_data
          ) as operation_breakdown
        FROM clients c
        LEFT JOIN campaigns cam ON c.id = cam.client_id
        LEFT JOIN budgets b ON cam.id = b.campaign_id
        LEFT JOIN results r ON cam.id = r.campaign_id
          AND b.platform = r.platform
          AND b.operation_type = r.operation_type
        GROUP BY c.id, c.name, c.priority, c.business_division, c.sales_department
        ORDER BY total_budget DESC
      `;
    }

    // 運用タイプごとの予算集計
    let operationTypeBudgets;
    if (department && department !== 'all') {
      operationTypeBudgets = await prisma.$queryRaw`
        SELECT 
          b.operation_type,
          COUNT(DISTINCT b.id)::int as budget_count,
          COUNT(DISTINCT cam.id)::int as campaign_count,
          COUNT(DISTINCT c.id)::int as client_count,
          COALESCE(SUM(b.amount), 0)::numeric as total_budget,
          COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
          COALESCE(AVG(b.amount), 0)::numeric as avg_budget_per_item,
          CASE 
            WHEN COALESCE(SUM(b.amount), 0) > 0 
            THEN (COALESCE(SUM(r."actualSpend"), 0) / COALESCE(SUM(b.amount), 0)) * 100
            ELSE 0
          END::numeric as budget_utilization,
          -- プラットフォーム別内訳（JSON形式）
          (
            SELECT COALESCE(json_agg(platform_data), '[]')
            FROM (
              SELECT 
                b2.platform,
                COALESCE(SUM(b2.amount), 0) as budget,
                COALESCE(SUM(r2."actualSpend"), 0) as spend,
                COUNT(DISTINCT cam2.id) as campaign_count
              FROM budgets b2
              LEFT JOIN campaigns cam2 ON b2.campaign_id = cam2.id
              LEFT JOIN clients c2 ON cam2.client_id = c2.id
              LEFT JOIN results r2 ON b2.campaign_id = r2.campaign_id 
                AND b2.platform = r2.platform
                AND b2.operation_type = r2.operation_type
              WHERE b2.operation_type = b.operation_type
                AND c2.business_division = ${department}
              GROUP BY b2.platform
              ORDER BY SUM(b2.amount) DESC
            ) platform_data
          ) as platform_breakdown
        FROM budgets b
        LEFT JOIN campaigns cam ON b.campaign_id = cam.id
        LEFT JOIN clients c ON cam.client_id = c.id
        LEFT JOIN results r ON b.campaign_id = r.campaign_id 
          AND b.platform = r.platform
          AND b.operation_type = r.operation_type
        WHERE c.business_division = ${department}
        GROUP BY b.operation_type
        ORDER BY total_budget DESC
      `;
    } else {
      operationTypeBudgets = await prisma.$queryRaw`
        SELECT 
          b.operation_type,
          COUNT(DISTINCT b.id)::int as budget_count,
          COUNT(DISTINCT cam.id)::int as campaign_count,
          COUNT(DISTINCT c.id)::int as client_count,
          COALESCE(SUM(b.amount), 0)::numeric as total_budget,
          COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
          COALESCE(AVG(b.amount), 0)::numeric as avg_budget_per_item,
          CASE 
            WHEN COALESCE(SUM(b.amount), 0) > 0 
            THEN (COALESCE(SUM(r."actualSpend"), 0) / COALESCE(SUM(b.amount), 0)) * 100
            ELSE 0
          END::numeric as budget_utilization,
          -- プラットフォーム別内訳（JSON形式）
          (
            SELECT COALESCE(json_agg(platform_data), '[]')
            FROM (
              SELECT 
                b2.platform,
                COALESCE(SUM(b2.amount), 0) as budget,
                COALESCE(SUM(r2."actualSpend"), 0) as spend,
                COUNT(DISTINCT cam2.id) as campaign_count
              FROM budgets b2
              LEFT JOIN campaigns cam2 ON b2.campaign_id = cam2.id
              LEFT JOIN clients c2 ON cam2.client_id = c2.id
              LEFT JOIN results r2 ON b2.campaign_id = r2.campaign_id 
                AND b2.platform = r2.platform
                AND b2.operation_type = r2.operation_type
              WHERE b2.operation_type = b.operation_type
              GROUP BY b2.platform
              ORDER BY SUM(b2.amount) DESC
            ) platform_data
          ) as platform_breakdown
        FROM budgets b
        LEFT JOIN campaigns cam ON b.campaign_id = cam.id
        LEFT JOIN clients c ON cam.client_id = c.id
        LEFT JOIN results r ON b.campaign_id = r.campaign_id 
          AND b.platform = r.platform
          AND b.operation_type = r.operation_type
        GROUP BY b.operation_type
        ORDER BY total_budget DESC
      `;
    }

    console.log("[CLIENT_BUDGETS_ANALYTICS] Data retrieved:", {
      clientBudgets: Array.isArray(clientBudgets) ? clientBudgets.length : 0,
      operationTypeBudgets: Array.isArray(operationTypeBudgets) ? operationTypeBudgets.length : 0
    });

    // データの型変換処理（PostgreSQLのnumeric型を数値に変換）
    const convertToNumber = (value: any): number => {
      if (value === null || value === undefined) return 0;
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    // クライアントデータの型変換
    const convertedClientBudgets = Array.isArray(clientBudgets) ? 
      clientBudgets.map((client: any) => ({
        ...client,
        campaign_count: convertToNumber(client.campaign_count),
        budget_count: convertToNumber(client.budget_count),
        total_budget: convertToNumber(client.total_budget),
        total_actual_spend: convertToNumber(client.total_actual_spend),
        avg_budget_per_item: convertToNumber(client.avg_budget_per_item),
        budget_utilization: convertToNumber(client.budget_utilization),
        platform_breakdown: Array.isArray(client.platform_breakdown) ? 
          client.platform_breakdown.map((platform: any) => ({
            ...platform,
            budget: convertToNumber(platform.budget),
            spend: convertToNumber(platform.spend)
          })) : [],
        operation_breakdown: Array.isArray(client.operation_breakdown) ? 
          client.operation_breakdown.map((operation: any) => ({
            ...operation,
            budget: convertToNumber(operation.budget),
            spend: convertToNumber(operation.spend)
          })) : []
      })) : [];

    // 運用タイプデータの型変換
    const convertedOperationTypeBudgets = Array.isArray(operationTypeBudgets) ? 
      operationTypeBudgets.map((operation: any) => ({
        ...operation,
        budget_count: convertToNumber(operation.budget_count),
        campaign_count: convertToNumber(operation.campaign_count),
        client_count: convertToNumber(operation.client_count),
        total_budget: convertToNumber(operation.total_budget),
        total_actual_spend: convertToNumber(operation.total_actual_spend),
        avg_budget_per_item: convertToNumber(operation.avg_budget_per_item),
        budget_utilization: convertToNumber(operation.budget_utilization),
        platform_breakdown: Array.isArray(operation.platform_breakdown) ? 
          operation.platform_breakdown.map((platform: any) => ({
            ...platform,
            budget: convertToNumber(platform.budget),
            spend: convertToNumber(platform.spend),
            campaign_count: convertToNumber(platform.campaign_count)
          })) : []
      })) : [];

    // サマリー情報を計算（変換後のデータを使用）
    const summary = {
      total_clients: convertedClientBudgets.length,
      total_budget: convertedClientBudgets.reduce((sum: number, client: any) => sum + client.total_budget, 0),
      total_actual_spend: convertedClientBudgets.reduce((sum: number, client: any) => sum + client.total_actual_spend, 0),
      total_campaigns: convertedClientBudgets.reduce((sum: number, client: any) => sum + client.campaign_count, 0),
      average_utilization: convertedClientBudgets.length > 0 ? 
        convertedClientBudgets.reduce((sum: number, client: any) => sum + client.budget_utilization, 0) / convertedClientBudgets.length : 0
    };

    console.log("[CLIENT_BUDGETS_ANALYTICS] Summary calculated:", summary);
    console.log("[CLIENT_BUDGETS_ANALYTICS] Sample client data types:", {
      budget_utilization_type: typeof convertedClientBudgets[0]?.budget_utilization,
      budget_utilization_value: convertedClientBudgets[0]?.budget_utilization
    });

    return NextResponse.json({
      clientBudgets: convertedClientBudgets,
      operationTypeBudgets: convertedOperationTypeBudgets,
      summary,
      department: department || 'all',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("[CLIENT_BUDGETS_ANALYTICS] Error:", error);
    return NextResponse.json(
      { error: "データ取得に失敗しました" },
      { status: 500 }
    );
  }
} 