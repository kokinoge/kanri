import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    console.log('[CLEAN_DATABASE_API] データベースクリーニング開始...');

    // 外部キー制約を考慮した順序で削除
    
    // 実績データ削除
    const deletedResults = await prisma.result.deleteMany({});
    console.log(`✅ ${deletedResults.count} 件の実績データを削除`);

    // 予算チーム配分削除
    const deletedBudgetTeams = await prisma.budgetTeam.deleteMany({});
    console.log(`✅ ${deletedBudgetTeams.count} 件の予算チーム配分を削除`);

    // 予算データ削除
    const deletedBudgets = await prisma.budget.deleteMany({});
    console.log(`✅ ${deletedBudgets.count} 件の予算データを削除`);

    // 案件チーム配分削除
    const deletedCampaignTeams = await prisma.campaignTeam.deleteMany({});
    console.log(`✅ ${deletedCampaignTeams.count} 件の案件チーム配分を削除`);

    // 案件KPI削除
    const deletedCampaignKpis = await prisma.campaignKpi.deleteMany({});
    console.log(`✅ ${deletedCampaignKpis.count} 件の案件KPIを削除`);

    // 案件データ削除
    const deletedCampaigns = await prisma.campaign.deleteMany({});
    console.log(`✅ ${deletedCampaigns.count} 件の案件データを削除`);

    // クライアントデータ削除
    const deletedClients = await prisma.client.deleteMany({});
    console.log(`✅ ${deletedClients.count} 件のクライアントデータを削除`);

    // チームデータ削除
    const deletedTeams = await prisma.team.deleteMany({});
    console.log(`✅ ${deletedTeams.count} 件のチームデータを削除`);

    // マスターデータ削除
    const deletedMasters = await prisma.master.deleteMany({});
    console.log(`✅ ${deletedMasters.count} 件のマスターデータを削除`);

    // 認証データ削除
    const deletedAccounts = await prisma.account.deleteMany({});
    const deletedSessions = await prisma.session.deleteMany({});
    const deletedVerificationTokens = await prisma.verificationToken.deleteMany({});
    console.log(`✅ ${deletedAccounts.count} 件のアカウント、${deletedSessions.count} 件のセッション、${deletedVerificationTokens.count} 件の認証トークンを削除`);

    // ユーザーデータ削除
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`✅ ${deletedUsers.count} 件のユーザーデータを削除`);

    const summary = {
      results: deletedResults.count,
      budgetTeams: deletedBudgetTeams.count,
      budgets: deletedBudgets.count,
      campaignTeams: deletedCampaignTeams.count,
      campaignKpis: deletedCampaignKpis.count,
      campaigns: deletedCampaigns.count,
      clients: deletedClients.count,
      teams: deletedTeams.count,
      masters: deletedMasters.count,
      users: deletedUsers.count,
      accounts: deletedAccounts.count,
      sessions: deletedSessions.count,
      verificationTokens: deletedVerificationTokens.count,
      total: deletedResults.count + deletedBudgetTeams.count + deletedBudgets.count + 
             deletedCampaignTeams.count + deletedCampaignKpis.count + deletedCampaigns.count + 
             deletedClients.count + deletedTeams.count + deletedMasters.count + 
             deletedUsers.count + deletedAccounts.count + deletedSessions.count + 
             deletedVerificationTokens.count
    };

    console.log('[CLEAN_DATABASE_API] データベースクリーニング完了');

    return NextResponse.json({
      success: true,
      message: 'データベースが完全にクリーニングされました',
      summary,
    });

  } catch (error) {
    console.error('[CLEAN_DATABASE_API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clean database',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 