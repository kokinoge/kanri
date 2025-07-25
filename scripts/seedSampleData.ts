import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function seedSampleData() {
  try {
    console.log('🚀 本番データベースにサンプルデータを投入開始...');

    // 既存データの確認
    const existingClients = await prisma.client.count();
    console.log(`📊 現在のクライアント数: ${existingClients}件`);

    // マスターデータを投入
    console.log('📋 マスターデータを投入中...');
    
    // 既存のマスターデータをクリア
    await prisma.master.deleteMany();
    
    // 新しいマスターデータを追加
    await prisma.master.createMany({
      data: [
        // プラットフォーム
        { category: 'platform', value: 'Instagram', order: 1 },
        { category: 'platform', value: 'X', order: 2 },
        { category: 'platform', value: 'YouTube', order: 3 },
        { category: 'platform', value: 'TikTok', order: 4 },
        { category: 'platform', value: 'Facebook', order: 5 },
        { category: 'platform', value: 'LinkedIn', order: 6 },
        { category: 'platform', value: 'Threads', order: 7 },
        
        // 運用タイプ
        { category: 'operationType', value: 'インフルエンサー投稿', order: 1 },
        { category: 'operationType', value: 'インハウス運用', order: 2 },
        { category: 'operationType', value: '運用代行', order: 3 },
        { category: 'operationType', value: 'コンテンツ制作', order: 4 },
        { category: 'operationType', value: 'コンサルティング', order: 5 },
        
        // 予算タイプ  
        { category: 'budgetType', value: '投稿予算', order: 1 },
        { category: 'budgetType', value: '広告予算', order: 2 },
        { category: 'budgetType', value: '制作予算', order: 3 },
        { category: 'budgetType', value: 'その他', order: 4 },
      ]
    });

    // ユーザーを作成
    console.log('👤 ユーザーを作成中...');
    
    // 管理者ユーザー
    let adminUser = await prisma.user.findFirst({
      where: { email: 'admin@kanri.com' }
    });
    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          name: '管理者',
          email: 'admin@kanri.com',
          role: 'admin',
          department: '管理部',
          isActive: true
        }
      });
    }

    // マネージャーユーザー
    const managerData = [
      { name: '田中太郎', email: 'tanaka@kanri.com', department: 'SNSメディア事業部', role: 'manager' },
      { name: '佐藤花子', email: 'sato@kanri.com', department: 'デジタルマーケティング事業部', role: 'manager' },
      { name: '鈴木次郎', email: 'suzuki@kanri.com', department: 'コンテンツ事業部', role: 'member' },
      { name: '高橋美咲', email: 'takahashi@kanri.com', department: 'SNSメディア事業部', role: 'member' }
    ];

    const managers = [];
    for (const userData of managerData) {
      let user = await prisma.user.findFirst({
        where: { email: userData.email }
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: userData.name,
            email: userData.email,
            role: userData.role,
            department: userData.department,
            isActive: true
          }
        });
      }
      managers.push(user);
    }

    console.log(`✅ ユーザー ${managers.length + 1}名を作成/更新しました`);

    // クライアントを作成
    console.log('🏢 クライアントを作成中...');
    
    const clientData = [
      {
        name: 'テクノロジー株式会社',
        managerId: managers[0].id,
        businessDivision: 'SNSメディア事業部',
        salesDepartment: '国内営業部',
        salesChannel: 'Web',
        agency: null,
        priority: 'A'
      },
      {
        name: 'マーケティング商事',
        managerId: managers[1].id,
        businessDivision: 'デジタルマーケティング事業部',
        salesDepartment: '海外営業部',
        salesChannel: 'パートナー',
        agency: 'エージェンシーA',
        priority: 'B'
      },
      {
        name: 'コンテンツ企業',
        managerId: managers[2].id,
        businessDivision: 'コンテンツ事業部',
        salesDepartment: 'パートナー営業部',
        salesChannel: 'イベント',
        agency: 'エージェンシーB',
        priority: 'C'
      },
      {
        name: 'スタートアップ株式会社',
        managerId: managers[3].id,
        businessDivision: 'SNSメディア事業部',
        salesDepartment: '国内営業部',
        salesChannel: '直接営業',
        agency: null,
        priority: 'A'
      },
      {
        name: 'エンタープライズ・コーポレーション',
        managerId: managers[0].id,
        businessDivision: 'デジタルマーケティング事業部',
        salesDepartment: '大手営業部',
        salesChannel: 'パートナー',
        agency: 'エージェンシーC',
        priority: 'S'
      }
    ];

    const clients = [];
    for (const data of clientData) {
      let client = await prisma.client.findFirst({
        where: { name: data.name }
      });
      if (!client) {
        client = await prisma.client.create({ data });
      }
      clients.push(client);
    }

    console.log(`✅ クライアント ${clients.length}社を作成/更新しました`);

    // キャンペーンを作成
    console.log('📋 キャンペーンを作成中...');
    
    const campaignData = [
      // テクノロジー株式会社のキャンペーン
      {
        name: 'ブランド認知向上キャンペーン',
        clientId: clients[0].id,
        purpose: 'ブランド認知度の向上とリーチ拡大',
        startYear: 2025,
        startMonth: 1,
        endYear: 2025,
        endMonth: 6,
        totalBudget: 2500000
      },
      {
        name: '製品プロモーション',
        clientId: clients[0].id,
        purpose: '新製品の認知とトライアル獲得',
        startYear: 2025,
        startMonth: 3,
        endYear: 2025,
        endMonth: 8,
        totalBudget: 1800000
      },
      
      // マーケティング商事のキャンペーン
      {
        name: 'EC売上拡大施策',
        clientId: clients[1].id,
        purpose: 'ECサイトでの売上向上',
        startYear: 2025,
        startMonth: 2,
        endYear: 2025,
        endMonth: 7,
        totalBudget: 3200000
      },
      
      // コンテンツ企業のキャンペーン
      {
        name: 'コンテンツ拡散キャンペーン',
        clientId: clients[2].id,
        purpose: 'オリジナルコンテンツの拡散',
        startYear: 2025,
        startMonth: 4,
        endYear: 2025,
        endMonth: 10,
        totalBudget: 1500000
      },
      
      // スタートアップ株式会社のキャンペーン
      {
        name: 'リードジェネレーション',
        clientId: clients[3].id,
        purpose: '質の高いリード獲得',
        startYear: 2025,
        startMonth: 1,
        endYear: 2025,
        endMonth: 12,
        totalBudget: 4000000
      },
      
      // エンタープライズ・コーポレーションのキャンペーン
      {
        name: '大規模ブランディング戦略',
        clientId: clients[4].id,
        purpose: '企業ブランドの確立と信頼性向上',
        startYear: 2025,
        startMonth: 2,
        endYear: 2025,
        endMonth: 12,
        totalBudget: 8000000
      }
    ];

    const campaigns = [];
    for (const data of campaignData) {
      let campaign = await prisma.campaign.findFirst({
        where: { name: data.name }
      });
      if (!campaign) {
        campaign = await prisma.campaign.create({ data });
      }
      campaigns.push(campaign);
    }

    console.log(`✅ キャンペーン ${campaigns.length}件を作成/更新しました`);

    // 予算データを作成
    console.log('💰 予算データを作成中...');
    
    let budgetCount = 0;
    const currentYear = 2025;
    const currentMonth = 7; // 7月まで実績データを作成
    
    for (const campaign of campaigns) {
      // 各キャンペーンの期間に応じて月次予算を作成
      const startDate = new Date(campaign.startYear, campaign.startMonth - 1);
      const endDate = campaign.endYear ? new Date(campaign.endYear, campaign.endMonth! - 1) : new Date(2025, 11);
      
      let currentDate = new Date(startDate);
      const totalMonths = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthlyBudget = Number(campaign.totalBudget) / totalMonths;
      
      const platforms = ['Instagram', 'X', 'YouTube'];
      const operationTypes = ['インフルエンサー投稿', 'インハウス運用'];
      
      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        
        for (const platform of platforms) {
          for (const operationType of operationTypes) {
            const budgetAmount = Math.floor(monthlyBudget / (platforms.length * operationTypes.length));
            
            try {
              const existingBudget = await prisma.budget.findFirst({
                where: {
                  campaignId: campaign.id,
                  year: year,
                  month: month,
                  platform: platform,
                  operationType: operationType
                }
              });
              
              if (!existingBudget) {
                await prisma.budget.create({
                  data: {
                    campaignId: campaign.id,
                    year: year,
                    month: month,
                    platform: platform,
                    operationType: operationType,
                    amount: budgetAmount,
                    budgetType: '投稿予算',
                    targetKpi: 'リーチ数',
                    targetValue: budgetAmount * 10
                  }
                });
                budgetCount++;
              }
            } catch (error) {
              console.log(`予算データスキップ: ${campaign.name} - ${year}/${month} - ${platform} - ${operationType}`);
            }
          }
        }
        
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    console.log(`✅ 予算データ ${budgetCount}件を作成しました`);

    // 実績データを作成（過去の月のみ）
    console.log('📈 実績データを作成中...');
    
    let resultCount = 0;
    
    for (const campaign of campaigns) {
      const startDate = new Date(campaign.startYear, campaign.startMonth - 1);
      const currentDate = new Date(currentYear, currentMonth - 1);
      
      let monthDate = new Date(startDate);
      
      while (monthDate <= currentDate) {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth() + 1;
        
        // 該当する予算データを取得
        const budgets = await prisma.budget.findMany({
          where: {
            campaignId: campaign.id,
            year: year,
            month: month
          }
        });
        
        for (const budget of budgets) {
          const existingResult = await prisma.result.findFirst({
            where: {
              campaignId: campaign.id,
              year: year,
              month: month,
              platform: budget.platform,
              operationType: budget.operationType
            }
          });
          
          if (!existingResult) {
            const budgetAmount = Number(budget.amount);
            // 実績は予算の80-120%の範囲で設定
            const actualSpend = Math.floor(budgetAmount * (0.8 + Math.random() * 0.4));
            const actualResult = Math.floor(actualSpend * (2.0 + Math.random() * 2.0)); // ROI 2.0-4.0
            
            try {
              await prisma.result.create({
                data: {
                  campaignId: campaign.id,
                  year: year,
                  month: month,
                  platform: budget.platform,
                  operationType: budget.operationType,
                  actualSpend: actualSpend,
                  actualResult: actualResult,
                  budgetType: budget.budgetType
                }
              });
              resultCount++;
            } catch (error) {
              console.log(`実績データスキップ: ${campaign.name} - ${year}/${month} - ${budget.platform}`);
            }
          }
        }
        
        monthDate.setMonth(monthDate.getMonth() + 1);
      }
    }

    console.log(`✅ 実績データ ${resultCount}件を作成しました`);

    // 最終データカウント
    const finalCounts = {
      users: await prisma.user.count(),
      clients: await prisma.client.count(),
      campaigns: await prisma.campaign.count(),
      budgets: await prisma.budget.count(),
      results: await prisma.result.count(),
      masters: await prisma.master.count()
    };

    console.log('\n🎉 サンプルデータの投入が完了しました！');
    console.log('📊 投入されたデータ:');
    console.log(`  - ユーザー: ${finalCounts.users}名`);
    console.log(`  - クライアント: ${finalCounts.clients}社`);
    console.log(`  - キャンペーン: ${finalCounts.campaigns}件`);
    console.log(`  - 予算データ: ${finalCounts.budgets}件`);
    console.log(`  - 実績データ: ${finalCounts.results}件`);
    console.log(`  - マスターデータ: ${finalCounts.masters}件`);

  } catch (error) {
    console.error('❌ サンプルデータ投入中にエラーが発生しました:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプト実行
if (require.main === module) {
  seedSampleData()
    .then(() => {
      console.log('✅ サンプルデータ投入スクリプトが正常に完了しました');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ サンプルデータ投入スクリプトでエラーが発生しました:', error);
      process.exit(1);
    });
}

export default seedSampleData; 