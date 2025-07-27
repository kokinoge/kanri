import { NextResponse } from "next/server";
// import auth from "@/auth"; // 一時的に無効化
import { hasRequiredRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

// Dynamic server usageを回避
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('[DATA_TABLES_API] Request received');
    
    // デバッグ用：リクエストヘッダーの確認
    console.log('[DATA_TABLES_API] Request headers:', {
      'user-agent': request.headers.get('user-agent'),
      'content-type': request.headers.get('content-type'),
      'origin': request.headers.get('origin'),
    });

    // 認証チェック（開発環境でのみコメントアウト）
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isDevelopment) {
      const session = await auth();
      console.log('[DATA_TABLES_API] Session:', {
        hasSession: !!session,
        userId: session?.user?.id,
        userRole: session?.user?.role,
        userEmail: session?.user?.email,
      });

      if (!session?.user || !hasRequiredRole(session, "member")) {
        console.log('[DATA_TABLES_API] Authorization failed');
        return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
      }
    } else {
      console.log('[DATA_TABLES_API] Development mode: Skipping auth check');
    }

    console.log('[DATA_TABLES_API] Authorization successful');

    // データベース接続確認
    try {
      await prisma.$connect();
      console.log('[DATA_TABLES_API] Database connection successful');
    } catch (dbError) {
      console.error('[DATA_TABLES_API] Database connection failed:', dbError);
      return NextResponse.json(
        { 
          error: "データベース接続エラー",
          details: dbError instanceof Error ? dbError.message : "不明なエラー"
        }, 
        { status: 503 }
      );
    }

    // Dynamic server usageを回避するため、new URLを使用
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const clientId = searchParams.get("clientId");
    const platform = searchParams.get("platform");
    const operationType = searchParams.get("operationType");
    const department = searchParams.get("department"); // これはbusinessDivisionとして扱う

    console.log('[DATA_TABLES_API] Query params:', {
      year,
      month,
      clientId,
      platform,
      operationType,
      department
    });

    console.log('[DATA_TABLES_API] Starting database queries');

    // 日付フィルタ
    const dateFilter = {
      ...(year && month ? { year: parseInt(year), month: parseInt(month) } : {}),
    };

    // クライアント・部門フィルタ用のプロジェクトIDを取得
    let targetCampaignIds: string[] = [];
    if (clientId || department) {
      try {
        const departmentProjectFilter = department ? {
          client: { 
            businessDivision: department // departmentをbusinessDivisionとして扱う
          }
        } : {};

        const filteredProjects = await prisma.campaign.findMany({
          where: {
            ...(clientId ? { clientId } : {}),
            ...departmentProjectFilter,
          },
          select: {
            id: true,
          },
        });
        targetCampaignIds = filteredProjects.map(c => c.id);
        
        console.log('[DATA_TABLES_API] Filtered campaigns:', targetCampaignIds.length);
        
        // 対象プロジェクトが存在しない場合は空の結果を返す
        if (targetCampaignIds.length === 0) {
          console.log('[DATA_TABLES_API] No matching projects found for filters');
          return NextResponse.json({
            budgets: [],
            results: [],
            clients: [],
            campaigns: [],
            statistics: {
              totalBudget: 0,
              totalSpend: 0,
              totalResults: 0,
              efficiency: 0,
              recordCounts: {
                budgets: 0,
                results: 0,
                clients: 0,
                campaigns: 0,
              },
            },
            filterOptions: {
              platforms: [],
              operationTypes: [],
              departments: [],
              clients: [],
            },
          });
        }
      } catch (filterError) {
        console.error('[DATA_TABLES_API] Error filtering campaigns:', filterError);
        throw filterError;
      }
    }

    // プラットフォーム・運用タイプフィルタ
    const platformFilter = platform ? { platform } : {};
    const operationTypeFilter = operationType ? { operationType } : {};

    // 予算データの取得
    let budgets = [];
    try {
      console.log('[DATA_TABLES_API] Fetching budgets...');
      budgets = await prisma.budget.findMany({
        where: {
          ...dateFilter,
          ...(targetCampaignIds.length > 0 ? { campaignId: { in: targetCampaignIds } } : {}),
          ...platformFilter,
          ...operationTypeFilter,
        },
        include: {
          campaign: {
            include: {
              client: {
                include: {
                  manager: {
                    select: {
                      id: true,
                      name: true,
                      role: true,
                    },
                  },
                },
              },
            },
          },
          budgetTeams: true,
        },
        orderBy: [
          { year: "desc" },
          { month: "desc" },
          { platform: "asc" },
        ],
      });
      console.log('[DATA_TABLES_API] Budgets retrieved:', budgets.length);
    } catch (budgetError) {
      console.error('[DATA_TABLES_API] Error fetching budgets:', budgetError);
      throw new Error(`予算データの取得に失敗しました: ${budgetError instanceof Error ? budgetError.message : '不明なエラー'}`);
    }

    // 実績データの取得
    let results = [];
    try {
      console.log('[DATA_TABLES_API] Fetching results...');
      results = await prisma.result.findMany({
        where: {
          ...dateFilter,
          ...(targetCampaignIds.length > 0 ? { campaignId: { in: targetCampaignIds } } : {}),
          ...platformFilter,
          ...operationTypeFilter,
        },
        include: {
          campaign: {
            include: {
              client: {
                include: {
                  manager: {
                    select: {
                      id: true,
                      name: true,
                      role: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [
          { year: "desc" },
          { month: "desc" },
          { platform: "asc" },
        ],
      });
      console.log('[DATA_TABLES_API] Results retrieved:', results.length);
    } catch (resultError) {
      console.error('[DATA_TABLES_API] Error fetching results:', resultError);
      throw new Error(`実績データの取得に失敗しました: ${resultError instanceof Error ? resultError.message : '不明なエラー'}`);
    }

    // クライアントデータの取得
    const clientsFilter = {
      ...(clientId ? { id: clientId } : {}),
      ...(department ? { businessDivision: department } : {}), // departmentをbusinessDivisionとして扱う
    };
    const clients = await prisma.client.findMany({
      where: clientsFilter,
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        campaigns: {
          select: {
            id: true,
            name: true,
            startYear: true,
            startMonth: true,
            endYear: true,
            endMonth: true,
            totalBudget: true,
          },
        },
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });

    console.log('[DATA_TABLES_API] Clients retrieved:', clients.length);

    // 施策データの取得
    const campaignsFilter = {
      ...(clientId ? { clientId } : {}),
      ...(department ? { 
        client: { 
          businessDivision: department // departmentをbusinessDivisionとして扱う
        }
      } : {}),
    };
    const campaigns = await prisma.campaign.findMany({
      where: campaignsFilter,
      include: {
        client: {
          include: {
            manager: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
        budgets: {
          where: dateFilter,
        },
        results: {
          where: dateFilter,
        },
      },
      orderBy: [
        { startYear: "desc" },
        { startMonth: "desc" },
      ],
    });

    console.log('[DATA_TABLES_API] Campaigns retrieved:', campaigns.length);

    // 統計情報の計算
    const totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
    const totalSpend = results.reduce((sum, result) => sum + Number(result.actualSpend), 0);
    const totalResults = results.reduce((sum, result) => sum + Number(result.actualResult), 0);

    // プラットフォーム・運用タイプ・事業部のオプション
    const platforms = [...new Set([
      ...budgets.map(b => b.platform),
      ...results.map(r => r.platform)
    ])].filter(p => p && p.trim() !== "").sort();

    const operationTypes = [...new Set([
      ...budgets.map(b => b.operationType),
      ...results.map(r => r.operationType)
    ])].filter(ot => ot && ot.trim() !== "").sort();

    // 事業部のオプション（全クライアントから取得）- 修正版
    let departments: string[] = [];
    try {
      const allClientsForDepartments = await prisma.client.findMany({
        select: {
          businessDivision: true, // departmentではなくbusinessDivisionを使用
        },
        distinct: ['businessDivision'], // フィールド名を修正
      });

      departments = [...new Set(
        allClientsForDepartments
          .map(c => c.businessDivision)
          .filter(d => d !== null && d !== undefined && d.trim() !== "")
      )].sort();
    } catch (error) {
      console.error('[DATA_TABLES_API] Error fetching departments:', error);
      // フォールバック: 既存のクライアントから事業部を取得
      departments = [...new Set(
        clients
          .map(c => c.businessDivision)
          .filter(d => d !== null && d !== undefined && d.trim() !== "")
      )].sort();
    }

    // レスポンスデータの構築
    const responseData = {
      budgets,
      results,
      clients,
      campaigns,
      statistics: {
        totalBudget,
        totalSpend,
        totalResults,
        efficiency: totalSpend > 0 ? (totalResults / totalSpend) : 0,
        recordCounts: {
          budgets: budgets.length,
          results: results.length,
          clients: clients.length,
          campaigns: campaigns.length,
        },
      },
      filterOptions: {
        platforms,
        operationTypes,
        departments,
        clients: clients.map(c => ({ id: c.id, name: c.name })),
      },
    };

    console.log('[DATA_TABLES_API] Response prepared successfully');
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('[DATA_TABLES_GET] Error:', error);
    
    // エラーの詳細ログ
    if (error instanceof Error) {
      console.error('[DATA_TABLES_GET] Error stack:', error.stack);
    }
    
    // エラーレスポンスのヘッダー追加
    const response = NextResponse.json(
      { 
        error: "データの取得に失敗しました",
        details: error instanceof Error ? error.message : "不明なエラー",
        timestamp: new Date().toISOString(),
        endpoint: "data-tables"
      }, 
      { status: 500 }
    );
    
    // CORS ヘッダーの追加（フロントエンドからのリクエスト用）
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } finally {
    // データベース接続のクリーンアップ
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('[DATA_TABLES_API] Error disconnecting from database:', disconnectError);
    }
  }
} 