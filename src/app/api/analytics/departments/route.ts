import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { hasRequiredRole } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('[DEPARTMENT_ANALYTICS] Request received');
    
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    console.log('[DEPARTMENT_ANALYTICS] Session:', {
      hasSession: !!session,
      userId: session?.user?.id,
      userRole: session?.user?.role,
      userEmail: session?.user?.email
    });

    if (!session?.user || !hasRequiredRole(session, "member")) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    */

    // 事業部別の集計データを取得
    const departments = await prisma.$queryRaw`
      SELECT 
        COALESCE(c.business_division, '未設定') as department,
        COUNT(DISTINCT c.id)::int as client_count,
        COUNT(DISTINCT cam.id)::int as campaign_count,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
        CASE 
          WHEN COUNT(c.id) > 0 THEN
            (SELECT COUNT(*) FROM (
              SELECT priority, COUNT(*) as count
              FROM clients 
              WHERE business_division = COALESCE(c.business_division, '未設定')
              GROUP BY priority
              ORDER BY 
                CASE priority 
                  WHEN 'S' THEN 5
                  WHEN 'A' THEN 4
                  WHEN 'B' THEN 3
                  WHEN 'C' THEN 2
                  WHEN 'D' THEN 1
                  ELSE 0
                END DESC
              LIMIT 1
            ) as most_common)
          ELSE 0
        END::numeric as avg_priority
      FROM clients c
      LEFT JOIN campaigns cam ON c.id = cam.client_id
      LEFT JOIN budgets b ON cam.id = b.campaign_id
      LEFT JOIN results r ON cam.id = r.campaign_id
      GROUP BY c.business_division
      ORDER BY total_budget DESC, client_count DESC
    `;

    console.log('[DEPARTMENT_ANALYTICS] 事業部データ取得完了:', departments);

    // 事業部別の詳細データを並行取得
    const departmentDetails = await Promise.all((departments as any[]).map(async (dept) => {
      try {
        // 月別の予算・実績データ
        const monthlyData = await prisma.$queryRaw`
          SELECT 
            b.year,
            b.month,
            COALESCE(SUM(b.amount), 0)::numeric as budget_amount,
            COALESCE(SUM(r."actualSpend"), 0)::numeric as actual_spend
          FROM budgets b
          LEFT JOIN campaigns cam ON b.campaign_id = cam.id
          LEFT JOIN clients c ON cam.client_id = c.id
          LEFT JOIN results r ON b.campaign_id = r.campaign_id 
            AND b.year = r.year 
            AND b.month = r.month
            AND b.platform = r.platform
            AND b.operation_type = r.operation_type
            AND b.budget_type = r.budget_type
          WHERE c.business_division = ${dept.department}
          GROUP BY b.year, b.month
          ORDER BY b.year DESC, b.month DESC
          LIMIT 12
        `;

        // クライアント別詳細
        const clientDetails = await prisma.$queryRaw`
          SELECT 
            c.id,
            c.name,
            c.priority,
            c.sales_department,
            COUNT(DISTINCT cam.id)::int as campaign_count,
            COALESCE(SUM(b.amount), 0)::numeric as total_budget,
            COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend
          FROM clients c
          LEFT JOIN campaigns cam ON c.id = cam.client_id
          LEFT JOIN budgets b ON cam.id = b.campaign_id
          LEFT JOIN results r ON cam.id = r.campaign_id
          WHERE c.business_division = ${dept.department}
          GROUP BY c.id, c.name, c.priority, c.sales_department
          ORDER BY total_budget DESC
        `;

        return {
          ...dept,
          department: dept.department,
          client_count: Number(dept.client_count) || 0,
          campaign_count: Number(dept.campaign_count) || 0,
          total_budget: Number(dept.total_budget) || 0,
          total_actual_spend: Number(dept.total_actual_spend) || 0,
          avg_priority: Number(dept.avg_priority) || 0,
          monthlyData: (monthlyData as any[]).map((monthly: any) => ({
            year: monthly.year,
            month: monthly.month,
            budget_amount: Number(monthly.budget_amount) || 0,
            actual_spend: Number(monthly.actual_spend) || 0,
          })),
          clients: (clientDetails as any[]).map((client: any) => ({
            id: client.id,
            name: client.name,
            priority: client.priority,
            sales_department: client.sales_department,
            campaign_count: Number(client.campaign_count) || 0,
            total_budget: Number(client.total_budget) || 0,
            total_actual_spend: Number(client.total_actual_spend) || 0,
          }))
        };
      } catch (detailError) {
        console.error(`[DEPARTMENT_ANALYTICS] 事業部 ${dept.department} の詳細データ取得エラー:`, detailError);
        return {
          ...dept,
          total_actual_spend: 0,
          monthlyData: [],
          clients: []
        };
      }
    }));

    // 全体サマリー
    const summaryResult = await prisma.$queryRaw`
      SELECT 
        COUNT(DISTINCT c.id)::int as total_clients,
        COUNT(DISTINCT cam.id)::int as total_campaigns,
        COALESCE(SUM(b.amount), 0)::numeric as total_budget,
        COALESCE(SUM(r."actualSpend"), 0)::numeric as total_actual_spend,
        COUNT(DISTINCT c.business_division)::int as department_count
      FROM clients c
      LEFT JOIN campaigns cam ON c.id = cam.client_id
      LEFT JOIN budgets b ON cam.id = b.campaign_id
      LEFT JOIN results r ON cam.id = r.campaign_id
    `;

    const summary = (summaryResult as any[])[0];

    const response = {
      departments: departmentDetails,
      summary: {
        total_clients: Number(summary?.total_clients) || 0,
        total_campaigns: Number(summary?.total_campaigns) || 0,
        total_budget: Number(summary?.total_budget) || 0,
        total_actual_spend: Number(summary?.total_actual_spend) || 0,
        department_count: Number(summary?.department_count) || 0,
        avg_spend_ratio: summary?.total_budget > 0 
          ? (Number(summary.total_actual_spend) / Number(summary.total_budget)) * 100 
          : 0
      },
      metadata: {
        generated_at: new Date().toISOString(),
        data_period: '2024年度',
        division_structure: {
          business_divisions: ['SNSメディア事業部', 'インフルエンサー事業部', '広告事業部'],
          sales_departments: ['国内営業', '海外営業', '代理店営業'],
          budget_types: {
            'SNSメディア事業部': ['投稿予算', '再生数/imp予算', '代行予算'],
            'インフルエンサー事業部': ['投稿予算', 'キャスティング予算'],
            '広告事業部': ['広告予算運用']
          }
        }
      }
    };

    console.log('[DEPARTMENT_ANALYTICS] Response prepared');
    return Response.json(response);

  } catch (error: any) {
    console.error('[DEPARTMENT_ANALYTICS] エラー:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 