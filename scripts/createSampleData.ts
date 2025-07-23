import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function createSampleData() {
  try {
    console.log('🚀 サンプルデータの作成を開始します...');

    // 既存データのクリーンアップ
    console.log('🧹 既存データをクリーンアップ中...');
    await prisma.result.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.campaign.deleteMany();
    await prisma.client.deleteMany();
    await prisma.master.deleteMany();

    // マスターデータの作成
    console.log('📋 マスターデータを作成中...');
    await prisma.master.createMany({
      data: [
        { category: 'platform', value: 'Google', order: 1 },
        { category: 'platform', value: 'Meta', order: 2 },
        { category: 'platform', value: 'Yahoo', order: 3 },
        { category: 'platform', value: 'LINE', order: 4 },
        { category: 'platform', value: 'TikTok', order: 5 },
        { category: 'operationType', value: '運用代行', order: 1 },
        { category: 'operationType', value: 'コンサルティング', order: 2 },
        { category: 'operationType', value: '内製支援', order: 3 },
      ]
    });

    // ユーザーの作成
    console.log('👤 ユーザーを作成中...');
    let user = await prisma.user.findFirst({
      where: { email: 'admin@example.com' }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: '管理者',
          email: 'admin@example.com',
          role: 'admin',
          department: 'マーケティング部',
          isActive: true
        }
      });
    }

    // クライアントの作成
    console.log('🏢 クライアントを作成中...');
    const clientData = [
      {
        name: 'サンプル株式会社',
        businessDivision: 'SNSメディア事業部',
        salesDepartment: 'マーケティング部',
        salesChannel: '直接営業',
        agency: '',
        priority: 'A',
        managerId: user.id
      },
      {
        name: 'テスト商事',
        businessDivision: 'コマース事業部',
        salesDepartment: 'セールス部',
        salesChannel: '代理店経由',
        agency: 'エージェンシーA',
        priority: 'B',
        managerId: user.id
      },
      {
        name: 'デモ企業',
        businessDivision: 'SNSメディア事業部',
        salesDepartment: 'マーケティング部',
        salesChannel: '直接営業',
        agency: '',
        priority: 'A'
      }
    ];

    const clients = [];
    for (const data of clientData) {
      const client = await prisma.client.create({ data });
      clients.push(client);
    }

    // 案件の作成
    console.log('📋 案件を作成中...');
    const campaignData = [
      {
        name: 'ブランド認知キャンペーン',
        clientId: clients[0].id,
        purpose: 'ブランド認知向上',
        startYear: 2024,
        startMonth: 1,
        endYear: 2024,
        endMonth: 12,
        totalBudget: 1200000
      },
      {
        name: 'EC売上向上',
        clientId: clients[1].id,
        purpose: 'EC売上拡大',
        startYear: 2024,
        startMonth: 3,
        endYear: 2024,
        endMonth: 12,
        totalBudget: 800000
      },
      {
        name: 'リードジェネレーション',
        clientId: clients[2].id,
        purpose: 'リード獲得',
        startYear: 2024,
        startMonth: 2,
        endYear: 2024,
        endMonth: 11,
        totalBudget: 600000
      }
    ];

    const campaigns = [];
    for (const data of campaignData) {
      const campaign = await prisma.campaign.create({ data });
      campaigns.push(campaign);
    }

    // 予算データの作成
    console.log('💰 予算データを作成中...');
    const budgets = [];
    for (let month = 1; month <= 12; month++) {
      for (const campaign of campaigns) {
        if (month >= campaign.startMonth && (!campaign.endMonth || month <= campaign.endMonth)) {
          const monthlyBudget = Number(campaign.totalBudget) / 
            (campaign.endMonth ? campaign.endMonth - campaign.startMonth + 1 : 12 - campaign.startMonth + 1);
          
          budgets.push({
            campaignId: campaign.id,
            year: 2024,
            month,
            platform: 'Google',
            operationType: '運用代行',
            budgetType: '月次予算',
            amount: Math.round(monthlyBudget),
            targetKpi: 'ROAS',
            targetValue: 3.0
          });
        }
      }
    }

    await prisma.budget.createMany({
      data: budgets
    });

    // 実績データの作成
    console.log('📊 実績データを作成中...');
    const results = [];
    for (let month = 1; month <= 10; month++) { // 10月まで実績を作成
      for (const campaign of campaigns) {
        if (month >= campaign.startMonth && (!campaign.endMonth || month <= campaign.endMonth)) {
          const monthlyBudget = Number(campaign.totalBudget) / 
            (campaign.endMonth ? campaign.endMonth - campaign.startMonth + 1 : 12 - campaign.startMonth + 1);
          
          const actualSpend = Math.round(monthlyBudget * (0.8 + Math.random() * 0.4)); // 80-120%
          const actualResult = Math.round(actualSpend * (2.5 + Math.random() * 1.5)); // ROAS 2.5-4.0
          
          results.push({
            campaignId: campaign.id,
            year: 2024,
            month,
            platform: 'Google',
            operationType: '運用代行',
            budgetType: '月次予算',
            actualSpend,
            actualResult
          });
        }
      }
    }

    await prisma.result.createMany({
      data: results
    });

    console.log('✅ サンプルデータの作成が完了しました！');
    console.log(`📊 作成されたデータ:`);
    console.log(`  - クライアント: ${clients.length}件`);
    console.log(`  - 案件: ${campaigns.length}件`);
    console.log(`  - 予算: ${budgets.length}件`);
    console.log(`  - 実績: ${results.length}件`);

  } catch (error) {
    console.error('❌ サンプルデータ作成中にエラーが発生しました:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleData(); 