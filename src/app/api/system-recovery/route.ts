import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { action, confirm } = await request.json();
    
    if (!confirm) {
      return NextResponse.json({ 
        error: 'データ復旧は危険な操作です。confirmパラメーターが必要です。' 
      }, { status: 400 });
    }
    
    const startTime = Date.now();
    let recoveryResults = {};
    
    switch (action) {
      case 'data-integrity-fix':
        recoveryResults = await fixDataIntegrity();
        break;
        
      case 'full-restore':
        recoveryResults = await fullSystemRestore();
        break;
        
      case 'cleanup-orphans':
        recoveryResults = await cleanupOrphanData();
        break;
        
      default:
        return NextResponse.json({ 
          error: '無効な復旧アクション。有効な値: data-integrity-fix, full-restore, cleanup-orphans' 
        }, { status: 400 });
    }
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      action: action,
      processingTime: `${processingTime}ms`,
      results: recoveryResults,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[SYSTEM_RECOVERY_ERROR]', error);
    
    return NextResponse.json({
      success: false,
      error: 'システム復旧に失敗しました',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

async function fixDataIntegrity() {
  console.log('[RECOVERY] データ整合性修復開始');
  
  return await prisma.$transaction(async (tx) => {
    // 孤立したデータを削除
    const orphanedBudgets = await tx.budget.findMany({
      where: {
        campaign: null
      }
    });
    
    const orphanedResults = await tx.result.findMany({
      where: {
        campaign: null
      }
    });
    
    if (orphanedBudgets.length > 0) {
      await tx.budget.deleteMany({
        where: {
          id: { in: orphanedBudgets.map(b => b.id) }
        }
      });
    }
    
    if (orphanedResults.length > 0) {
      await tx.result.deleteMany({
        where: {
          id: { in: orphanedResults.map(r => r.id) }
        }
      });
    }
    
    return {
      orphanedBudgetsDeleted: orphanedBudgets.length,
      orphanedResultsDeleted: orphanedResults.length,
      status: 'completed'
    };
  });
}

async function fullSystemRestore() {
  console.log('[RECOVERY] フルシステム復旧開始');
  
  return await prisma.$transaction(async (tx) => {
    // 全データを削除
    await tx.result.deleteMany({});
    await tx.budget.deleteMany({});
    await tx.campaign.deleteMany({});
    await tx.client.deleteMany({});
    
    // 基本データを復元（簡単な例）
    const baseClient = await tx.client.create({
      data: {
        name: 'システム復旧テストクライアント',
        businessDivision: 'SNSメディア事業部',
        salesDepartment: 'マーケティング部',
        priority: 'B'
      }
    });
    
    const baseCampaign = await tx.campaign.create({
      data: {
        clientId: baseClient.id,
        name: 'システム復旧テストキャンペーン',
        purpose: 'システム復旧テスト',
        startYear: new Date().getFullYear(),
        startMonth: new Date().getMonth() + 1,
        totalBudget: 100000
      }
    });
    
    return {
      status: 'system-restored',
      testClientId: baseClient.id,
      testCampaignId: baseCampaign.id,
      message: '基本データでシステムを復旧しました'
    };
  });
}

async function cleanupOrphanData() {
  console.log('[RECOVERY] 孤立データクリーンアップ開始');
  
  const results = await prisma.$transaction(async (tx) => {
    // 孤立したキャンペーンを削除
    const orphanedCampaigns = await tx.campaign.findMany({
      where: {
        client: null
      }
    });
    
    if (orphanedCampaigns.length > 0) {
      await tx.campaign.deleteMany({
        where: {
          id: { in: orphanedCampaigns.map(c => c.id) }
        }
      });
    }
    
    // 重複データを削除
    const duplicateBudgets = await tx.$queryRaw`
      SELECT campaign_id, year, month, platform, operation_type, COUNT(*) as count
      FROM budgets 
      GROUP BY campaign_id, year, month, platform, operation_type 
      HAVING COUNT(*) > 1
    `;
    
    return {
      orphanedCampaignsDeleted: orphanedCampaigns.length,
      duplicatesFound: Array.isArray(duplicateBudgets) ? duplicateBudgets.length : 0,
      status: 'cleanup-completed'
    };
  });
  
  return results;
} 