import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // データベース接続テスト
    await prisma.$queryRaw`SELECT 1`;
    
    // データ整合性チェック
    const [
      budgetCount,
      resultCount,
      clientCount,
      campaignCount,
      recentBudgets,
      recentResults
    ] = await Promise.all([
      prisma.budget.count(),
      prisma.result.count(),
      prisma.client.count(),
      prisma.campaign.count(),
      prisma.budget.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 過去24時間
          }
        }
      }),
      prisma.result.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 過去24時間
          }
        }
      })
    ]);
    
    const dbResponseTime = Date.now() - startTime;
    
    // 健全性評価
    const healthChecks = {
      database: {
        status: 'healthy',
        responseTime: `${dbResponseTime}ms`,
        connection: 'ok'
      },
      dataIntegrity: {
        status: 'healthy',
        budgets: budgetCount,
        results: resultCount,
        clients: clientCount,
        campaigns: campaignCount,
        ratio: budgetCount > 0 ? (resultCount / budgetCount).toFixed(2) : '0.00'
      },
      recentActivity: {
        status: 'healthy',
        newBudgets24h: recentBudgets,
        newResults24h: recentResults,
        lastUpdate: new Date().toISOString()
      }
    };
    
    // 警告条件のチェック
    const warnings = [];
    
    if (budgetCount === 0 && resultCount === 0) {
      warnings.push('データが完全に空です');
      healthChecks.dataIntegrity.status = 'critical';
    }
    
    if (clientCount === 0 && campaignCount > 0) {
      warnings.push('クライアントなしでキャンペーンが存在します');
      healthChecks.dataIntegrity.status = 'warning';
    }
    
    if (campaignCount === 0 && (budgetCount > 0 || resultCount > 0)) {
      warnings.push('キャンペーンなしで予算/実績データが存在します');
      healthChecks.dataIntegrity.status = 'warning';
    }
    
    if (budgetCount > 0 && resultCount === 0) {
      warnings.push('予算データがあるのに実績データがありません');
      healthChecks.dataIntegrity.status = 'warning';
    }
    
    if (dbResponseTime > 1000) {
      warnings.push('データベースの応答が遅いです');
      healthChecks.database.status = 'warning';
    }
    
    const overallStatus = warnings.length === 0 ? 'healthy' : 
                         warnings.some(w => w.includes('完全に空') || w.includes('critical')) ? 'critical' : 'warning';
    
    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      systemHealth: healthChecks,
      warnings: warnings,
      summary: {
        totalRecords: budgetCount + resultCount + clientCount + campaignCount,
        dbResponseTime: `${dbResponseTime}ms`,
        warningCount: warnings.length
      }
    });
    
  } catch (error) {
    console.error('[SYSTEM_HEALTH_ERROR]', error);
    
    return NextResponse.json({
      status: 'critical',
      timestamp: new Date().toISOString(),
      error: 'システムヘルスチェックに失敗しました',
      details: error.message,
      systemHealth: {
        database: {
          status: 'error',
          connection: 'failed'
        }
      }
    }, { status: 500 });
  }
} 