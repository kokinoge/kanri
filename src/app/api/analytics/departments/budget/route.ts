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

    console.log('[DEPARTMENT_BUDGET_ANALYTICS] データ取得開始');

    // 事業部別の予算集計データを取得
    const departmentBudgetAnalytics = await prisma.$queryRaw`
      SELECT 
        COALESCE(c.business_division, '未設定') as department,
        COUNT(DISTINCT c.id)::int as client_count,
        COUNT(DISTINCT cam.id)::int as campaign_count,
        COUNT(DISTINCT b.id)::int as budget_count,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(AVG(b.amount), 0)::numeric as avg_budget_per_campaign,
        COALESCE(MIN(b.amount), 0)::numeric as min_budget,
        COALESCE(MAX(b.amount), 0)::numeric as max_budget,
        COUNT(DISTINCT CONCAT(b.year, '-', b.month))::int as active_months,
        COALESCE(AVG(CASE 
          WHEN c.priority = 'S' THEN 5
          WHEN c.priority = 'A' THEN 4
          WHEN c.priority = 'B' THEN 3
          WHEN c.priority = 'C' THEN 2
          WHEN c.priority = 'D' THEN 1
          ELSE 0
        END), 0)::numeric as avg_client_priority
      FROM "clients" c
      LEFT JOIN "campaigns" cam ON c.id = cam.client_id
      LEFT JOIN "budgets" b ON cam.id = b.campaign_id
      WHERE b.id IS NOT NULL
      GROUP BY c.business_division
      ORDER BY total_budget DESC
    `;

    if (!departmentBudgetAnalytics || !Array.isArray(departmentBudgetAnalytics)) {
      console.log('[DEPARTMENT_BUDGET_ANALYTICS] データが見つかりません');
      return NextResponse.json({
        departments: [],
        summary: {
          total_departments: 0,
          total_clients: 0,
          total_campaigns: 0,
          total_budget_records: 0,
          total_budget_amount: 0,
          average_budget_per_department: 0,
          average_budget_per_campaign: 0,
        },
      });
    }

    console.log('[DEPARTMENT_BUDGET_ANALYTICS] 事業部データ取得完了:', departmentBudgetAnalytics.length);

    // 事業部別の詳細データを並行取得
    const departmentDetails = await Promise.all(
      (departmentBudgetAnalytics as any[]).map(async (dept) => {
        try {
          // 月別の予算データ
          const monthlyBudgets = await prisma.$queryRaw`
            SELECT 
              b.year,
              b.month,
              COUNT(DISTINCT b.id)::int as budget_count,
              COALESCE(SUM(b.amount), 0)::numeric as total_amount,
              COALESCE(AVG(b.amount), 0)::numeric as avg_amount,
              COUNT(DISTINCT cam.id)::int as campaign_count,
              COUNT(DISTINCT c.id)::int as client_count
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "clients" c ON cam.client_id = c.id
            WHERE ${dept.department === '未設定' ? 
              prisma.$queryRaw`c.business_division IS NULL` : 
              prisma.$queryRaw`c.business_division = ${dept.department}`}
            GROUP BY b.year, b.month
            ORDER BY b.year DESC, b.month DESC
            LIMIT 12
          `;

          // プラットフォーム別予算
          const platformBudgets = await prisma.$queryRaw`
            SELECT 
              b.platform,
              COUNT(DISTINCT b.id)::int as budget_count,
              COALESCE(SUM(b.amount), 0)::numeric as total_amount,
              COALESCE(AVG(b.amount), 0)::numeric as avg_amount,
              COUNT(DISTINCT cam.id)::int as campaign_count
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "clients" c ON cam.client_id = c.id
            WHERE ${dept.department === '未設定' ? 
              prisma.$queryRaw`c.business_division IS NULL` : 
              prisma.$queryRaw`c.business_division = ${dept.department}`}
            GROUP BY b.platform
            ORDER BY total_amount DESC
          `;

          // 運用タイプ別予算
          const operationTypeBudgets = await prisma.$queryRaw`
            SELECT 
              b.operation_type,
              COUNT(DISTINCT b.id)::int as budget_count,
              COALESCE(SUM(b.amount), 0)::numeric as total_amount,
              COALESCE(AVG(b.amount), 0)::numeric as avg_amount,
              COUNT(DISTINCT cam.id)::int as campaign_count
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "clients" c ON cam.client_id = c.id
            WHERE ${dept.department === '未設定' ? 
              prisma.$queryRaw`c.business_division IS NULL` : 
              prisma.$queryRaw`c.business_division = ${dept.department}`}
            GROUP BY b.operation_type
            ORDER BY total_amount DESC
          `;

          // 売上タイプ別予算
          const revenueTypeBudgets = await prisma.$queryRaw`
            SELECT 
              b.budget_type as revenue_type,
              COUNT(DISTINCT b.id)::int as budget_count,
              COALESCE(SUM(b.amount), 0)::numeric as total_amount,
              COALESCE(AVG(b.amount), 0)::numeric as avg_amount,
              COUNT(DISTINCT cam.id)::int as campaign_count
            FROM "budgets" b
            LEFT JOIN "campaigns" cam ON b.campaign_id = cam.id
            LEFT JOIN "clients" c ON cam.client_id = c.id
            WHERE ${dept.department === '未設定' ? 
              prisma.$queryRaw`c.business_division IS NULL` : 
              prisma.$queryRaw`c.business_division = ${dept.department}`}
            GROUP BY b.budget_type
            ORDER BY total_amount DESC
          `;

          // クライアント別予算
          const clientBudgets = await prisma.$queryRaw`
            SELECT 
              c.id,
              c.name,
              c.priority,
              COUNT(DISTINCT b.id)::int as budget_count,
              COALESCE(SUM(b.amount), 0)::numeric as total_amount,
              COALESCE(AVG(b.amount), 0)::numeric as avg_amount,
              COUNT(DISTINCT cam.id)::int as campaign_count
            FROM "clients" c
            LEFT JOIN "campaigns" cam ON c.id = cam.client_id
            LEFT JOIN "budgets" b ON cam.id = b.campaign_id
            WHERE ${dept.department === '未設定' ? 
              prisma.$queryRaw`c.business_division IS NULL` : 
              prisma.$queryRaw`c.business_division = ${dept.department}`}
              AND b.id IS NOT NULL
            GROUP BY c.id, c.name, c.priority
            ORDER BY total_amount DESC
          `;

          // 数値変換関数
          const convertToNumber = (value: any): number => {
            if (value === null || value === undefined) return 0;
            const num = Number(value);
            return isNaN(num) ? 0 : num;
          };

          return {
            ...dept,
            department: dept.department || '未設定',
            client_count: convertToNumber(dept.client_count),
            campaign_count: convertToNumber(dept.campaign_count),
            budget_count: convertToNumber(dept.budget_count),
            total_budget: convertToNumber(dept.total_budget),
            avg_budget_per_campaign: convertToNumber(dept.avg_budget_per_campaign),
            min_budget: convertToNumber(dept.min_budget),
            max_budget: convertToNumber(dept.max_budget),
            active_months: convertToNumber(dept.active_months),
            avg_client_priority: convertToNumber(dept.avg_client_priority),
            monthlyBudgets: Array.isArray(monthlyBudgets) ? monthlyBudgets.map((month: any) => ({
              ...month,
              budget_count: convertToNumber(month.budget_count),
              total_amount: convertToNumber(month.total_amount),
              avg_amount: convertToNumber(month.avg_amount),
              campaign_count: convertToNumber(month.campaign_count),
              client_count: convertToNumber(month.client_count),
            })) : [],
            platformBudgets: Array.isArray(platformBudgets) ? platformBudgets.map((platform: any) => ({
              ...platform,
              budget_count: convertToNumber(platform.budget_count),
              total_amount: convertToNumber(platform.total_amount),
              avg_amount: convertToNumber(platform.avg_amount),
              campaign_count: convertToNumber(platform.campaign_count),
            })) : [],
            operationTypeBudgets: Array.isArray(operationTypeBudgets) ? operationTypeBudgets.map((operation: any) => ({
              ...operation,
              budget_count: convertToNumber(operation.budget_count),
              total_amount: convertToNumber(operation.total_amount),
              avg_amount: convertToNumber(operation.avg_amount),
              campaign_count: convertToNumber(operation.campaign_count),
            })) : [],
            revenueTypeBudgets: Array.isArray(revenueTypeBudgets) ? revenueTypeBudgets.map((revenue: any) => ({
              ...revenue,
              budget_count: convertToNumber(revenue.budget_count),
              total_amount: convertToNumber(revenue.total_amount),
              avg_amount: convertToNumber(revenue.avg_amount),
              campaign_count: convertToNumber(revenue.campaign_count),
            })) : [],
            clientBudgets: Array.isArray(clientBudgets) ? clientBudgets.map((client: any) => ({
              ...client,
              priority: convertToNumber(client.priority),
              budget_count: convertToNumber(client.budget_count),
              total_amount: convertToNumber(client.total_amount),
              avg_amount: convertToNumber(client.avg_amount),
              campaign_count: convertToNumber(client.campaign_count),
            })) : [],
          };
        } catch (error) {
          console.error(`[DEPARTMENT_BUDGET_ANALYTICS] Error processing department ${dept.department}:`, error);
          return {
            ...dept,
            department: dept.department || '未設定',
            client_count: 0,
            campaign_count: 0,
            budget_count: 0,
            total_budget: 0,
            avg_budget_per_campaign: 0,
            min_budget: 0,
            max_budget: 0,
            active_months: 0,
            avg_client_priority: 0,
            monthlyBudgets: [],
            platformBudgets: [],
            operationTypeBudgets: [],
            revenueTypeBudgets: [],
            clientBudgets: [],
          };
        }
      })
    );

    // 全体の統計情報を計算
    const totalBudgetAmount = departmentDetails.reduce((sum, dept) => sum + Number(dept.total_budget), 0);
    const totalClients = departmentDetails.reduce((sum, dept) => sum + Number(dept.client_count), 0);
    const totalCampaigns = departmentDetails.reduce((sum, dept) => sum + Number(dept.campaign_count), 0);
    const totalBudgetRecords = departmentDetails.reduce((sum, dept) => sum + Number(dept.budget_count), 0);
    const averageBudgetPerDepartment = departmentDetails.length > 0 ?
      totalBudgetAmount / departmentDetails.length : 0;
    const averageBudgetPerCampaign = totalCampaigns > 0 ?
      totalBudgetAmount / totalCampaigns : 0;

    const summary = {
      total_departments: departmentDetails.length,
      total_clients: totalClients,
      total_campaigns: totalCampaigns,
      total_budget_records: totalBudgetRecords,
      total_budget_amount: totalBudgetAmount,
      average_budget_per_department: averageBudgetPerDepartment,
      average_budget_per_campaign: averageBudgetPerCampaign,
    };

    console.log('[DEPARTMENT_BUDGET_ANALYTICS] 処理完了');

    return NextResponse.json({
      departments: departmentDetails,
      summary,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[DEPARTMENT_BUDGET_ANALYTICS] Error:', error);
    return NextResponse.json(
      { 
        error: "事業部別予算分析の取得に失敗しました",
        details: error instanceof Error ? error.message : "不明なエラー"
      }, 
      { status: 500 }
    );
  }
} 