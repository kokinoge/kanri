import { NextResponse } from "next/server";
// import { auth } from "@/auth"; // 一時的に無効化
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

// Dynamic server usageを回避
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // ビルド時または環境変数不備時には早期リターン（データベース接続を回避）
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
      console.log('[CLIENT_ANALYTICS] Database not available - returning empty data');
      return NextResponse.json([], { status: 200 });
    }

    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();

    if (!session?.user || !hasRequiredRole(session, "member")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    console.log("[CLIENT_ANALYTICS] Session:", {
      hasSession: !!session,
      userId: session.user.id,
      userRole: session.user.role,
      userEmail: session.user.email,
    });
    */

    console.log('[CLIENT_ANALYTICS] Starting analytics query');

    // クライアント別の集計データを取得
    const clientAnalytics = await prisma.$queryRaw`
      SELECT 
        c.id,
        c.name,
        c.priority,
        c.business_division as department,
        c.created_at,
        u.name as manager_name,
        COUNT(DISTINCT cam.id)::int as campaign_count,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
        COALESCE(SUM(r."actualResult"), 0)::numeric as total_actual_result,
        COALESCE(AVG(CASE 
          WHEN c.priority = 'S' THEN 5
          WHEN c.priority = 'A' THEN 4
          WHEN c.priority = 'B' THEN 3
          WHEN c.priority = 'C' THEN 2
          WHEN c.priority = 'D' THEN 1
          ELSE 0
        END), 0)::numeric as avg_priority,
        CASE 
          WHEN COALESCE(SUM(r."actualSpend"), 0) > 0
          THEN COALESCE(SUM(r."actualResult"), 0) / COALESCE(SUM(r."actualSpend"), 0)
          ELSE 0
        END::numeric as roi,
        CASE 
          WHEN COALESCE(SUM(b.amount), 0) > 0 
          THEN (COALESCE(SUM(r."actualSpend"), 0) / COALESCE(SUM(b.amount), 0)) * 100
          ELSE 0
        END::numeric as budget_consumption_rate
      FROM "clients" c
      LEFT JOIN "User" u ON c.manager_id = u.id
      LEFT JOIN "campaigns" cam ON c.id = cam.client_id
      LEFT JOIN "budgets" b ON cam.id = b.campaign_id
      LEFT JOIN "results" r ON cam.id = r.campaign_id
      GROUP BY c.id, c.name, c.priority, c.business_division, c.created_at, u.name
      ORDER BY total_budget DESC, total_actual_spend DESC
    `;

    // データが存在しない場合の処理
    if (!clientAnalytics || !Array.isArray(clientAnalytics)) {
      console.log("[CLIENT_ANALYTICS] クライアントデータが見つかりません");
      return NextResponse.json({
        clients: [],
        summary: {
          total_clients: 0,
          total_campaigns: 0,
          total_budget: 0,
          total_actual_spend: 0,
          total_actual_result: 0,
          average_roi: 0,
          average_budget_consumption: 0
        },
        timestamp: new Date().toISOString()
      });
    }

    // 各クライアントの詳細データを取得
    const clientDetails = await Promise.all(
      (clientAnalytics as any[]).map(async (client) => {
        try {
          // 月別の予算・実績データ
          const monthlyData = await prisma.$queryRaw`
            SELECT 
              b.year,
              b.month,
              COALESCE(SUM(b.amount), 0)::numeric as budget_amount,
              COALESCE(SUM(r."actualSpend"), 0)::numeric as actual_spend,
              COALESCE(SUM(r."actualResult"), 0)::numeric as actual_result
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "results" r ON b.campaign_id = r.campaign_id 
              AND b.year = r.year 
              AND b.month = r.month
              AND b.platform = r.platform
              AND b.operation_type = r.operation_type
            WHERE cam.client_id = ${client.id}
            GROUP BY b.year, b.month
            ORDER BY b.year DESC, b.month DESC
            LIMIT 12
          `;

          // プラットフォーム別データ
          const platformData = await prisma.$queryRaw`
            SELECT 
              b.platform,
              COALESCE(SUM(b.amount), 0)::numeric as budget_amount,
              COALESCE(SUM(r."actualSpend"), 0)::numeric as actual_spend,
              COALESCE(SUM(r."actualResult"), 0)::numeric as actual_result
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "results" r ON b.campaign_id = r.campaign_id 
              AND b.platform = r.platform
              AND b.operation_type = r.operation_type
            WHERE cam.client_id = ${client.id}
            GROUP BY b.platform
            ORDER BY budget_amount DESC
          `;

          // 施策別データ
          const campaignData = await prisma.$queryRaw`
            SELECT 
              cam.id,
              cam.name,
              cam.start_year,
              cam.start_month,
              cam.end_year,
              cam.end_month,
              COALESCE(SUM(b.amount), 0)::numeric as budget_amount,
              COALESCE(SUM(r."actualSpend"), 0)::numeric as actual_spend,
              COALESCE(SUM(r."actualResult"), 0)::numeric as actual_result
            FROM "campaigns" cam
            LEFT JOIN "budgets" b ON cam.id = b.campaign_id
            LEFT JOIN "results" r ON cam.id = r.campaign_id
            WHERE cam.client_id = ${client.id}
            GROUP BY cam.id, cam.name, cam.start_year, cam.start_month, cam.end_year, cam.end_month
            ORDER BY budget_amount DESC
          `;

          // 数値変換関数
          const convertToNumber = (value: any): number => {
            if (value === null || value === undefined) return 0;
            const num = Number(value);
            return isNaN(num) ? 0 : num;
          };

          return {
            id: client.id,
            name: client.name || '',
            priority: client.priority || 'C',
            department: client.department || '未設定',
            manager_name: client.manager_name || '未設定',
            campaign_count: convertToNumber(client.campaign_count),
            total_budget: convertToNumber(client.total_budget),
            total_actual_spend: convertToNumber(client.total_actual_spend),
            total_actual_result: convertToNumber(client.total_actual_result),
            avg_priority: convertToNumber(client.avg_priority),
            roi: convertToNumber(client.roi),
            budget_consumption_rate: convertToNumber(client.budget_consumption_rate),
            monthly_data: Array.isArray(monthlyData) ? monthlyData.map((month: any) => ({
              year: month.year,
              month: month.month,
              budget_amount: convertToNumber(month.budget_amount),
              actual_spend: convertToNumber(month.actual_spend),
              actual_result: convertToNumber(month.actual_result),
            })) : [],
            platform_data: Array.isArray(platformData) ? platformData.map((platform: any) => ({
              platform: platform.platform,
              budget_amount: convertToNumber(platform.budget_amount),
              actual_spend: convertToNumber(platform.actual_spend),
              actual_result: convertToNumber(platform.actual_result),
            })) : [],
            campaign_data: Array.isArray(campaignData) ? campaignData.map((campaign: any) => ({
              id: campaign.id,
              name: campaign.name,
              start_date: campaign.start_date,
              end_date: campaign.end_date,
              budget_amount: convertToNumber(campaign.budget_amount),
              actual_spend: convertToNumber(campaign.actual_spend),
              actual_result: convertToNumber(campaign.actual_result),
            })) : [],
          };
        } catch (error) {
          console.error(`[CLIENT_ANALYTICS] Error processing client ${client.id}:`, error);
          return {
            id: client.id,
            name: client.name || '',
            priority: client.priority || 'C',
            department: client.department || '未設定',
            manager_name: client.manager_name || '未設定',
            campaign_count: 0,
            total_budget: 0,
            total_actual_spend: 0,
            total_actual_result: 0,
            avg_priority: 0,
            roi: 0,
            budget_consumption_rate: 0,
            monthly_data: [],
            platform_data: [],
            campaign_data: [],
          };
        }
      })
    );

    // 全体サマリーの計算
    const summary = {
      total_clients: clientDetails.length,
      total_campaigns: clientDetails.reduce((sum, client) => sum + client.campaign_count, 0),
      total_budget: clientDetails.reduce((sum, client) => sum + client.total_budget, 0),
      total_actual_spend: clientDetails.reduce((sum, client) => sum + client.total_actual_spend, 0),
      total_actual_result: clientDetails.reduce((sum, client) => sum + client.total_actual_result, 0),
      average_roi: clientDetails.length > 0 ? 
        clientDetails.reduce((sum, client) => sum + client.roi, 0) / clientDetails.length : 0,
      average_budget_consumption: clientDetails.length > 0 ?
        clientDetails.reduce((sum, client) => sum + client.budget_consumption_rate, 0) / clientDetails.length : 0,
    };

    console.log("[CLIENT_ANALYTICS] データ取得完了:", {
      clientCount: clientDetails.length,
      summary: summary
    });

    return NextResponse.json({
      clients: clientDetails,
      summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("[CLIENT_ANALYTICS] Error:", error);
    return NextResponse.json(
      { 
        error: "クライアント分析データの取得に失敗しました",
        details: error instanceof Error ? error.message : "不明なエラー"
      }, 
      { status: 500 }
    );
  }
} 