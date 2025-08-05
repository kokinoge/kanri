const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('シードデータの作成を開始します...')

  // 管理者ユーザーの作成
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理者',
      password: hashedPassword,
      role: 'admin',
      department: 'システム管理部',
    },
  })

  console.log('管理者ユーザーを作成しました:', adminUser)

  // マスターデータの作成
  const masters = [
    { category: 'platform', value: 'Google', order: 1 },
    { category: 'platform', value: 'Yahoo', order: 2 },
    { category: 'platform', value: 'Facebook', order: 3 },
    { category: 'platform', value: 'Twitter', order: 4 },
    { category: 'platform', value: 'Instagram', order: 5 },
    { category: 'platform', value: 'Line', order: 6 },
    { category: 'operationType', value: '運用代行', order: 1 },
    { category: 'operationType', value: 'コンサルティング', order: 2 },
    { category: 'operationType', value: 'インハウス支援', order: 3 },
    { category: 'revenueType', value: '運用手数料', order: 1 },
    { category: 'revenueType', value: 'コンサル費', order: 2 },
    { category: 'revenueType', value: '制作費', order: 3 },
  ]

  for (const master of masters) {
    await prisma.master.upsert({
      where: {
        id: `${master.category}-${master.value}`,
      },
      update: {},
      create: {
        id: `${master.category}-${master.value}`,
        ...master,
      },
    })
  }

  console.log('マスターデータを作成しました')

  // サンプルクライアントの作成
  const client1 = await prisma.client.create({
    data: {
      name: '株式会社サンプルA',
      manager: '田中太郎',
      priority: 1,
      industry: 'IT・通信',
    },
  })

  const client2 = await prisma.client.create({
    data: {
      name: '株式会社サンプルB',
      manager: '佐藤花子',
      priority: 2,
      industry: '小売・EC',
    },
  })

  console.log('サンプルクライアントを作成しました')

  // サンプルキャンペーンの作成
  const campaign1 = await prisma.campaign.create({
    data: {
      clientId: client1.id,
      name: '夏季プロモーション2025',
      purpose: '新商品の認知拡大',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-09-30'),
      totalBudget: 5000000,
      status: 'active',
    },
  })

  const campaign2 = await prisma.campaign.create({
    data: {
      clientId: client2.id,
      name: 'ブランドリニューアルキャンペーン',
      purpose: 'ブランドイメージの刷新',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-12-31'),
      totalBudget: 8000000,
      status: 'active',
    },
  })

  console.log('サンプルキャンペーンを作成しました')

  // サンプル予算の作成
  await prisma.budget.createMany({
    data: [
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 8,
        platform: 'Google',
        operationType: '運用代行',
        revenueType: '運用手数料',
        budgetAmount: 1500000,
        targetKpi: 'CV',
        targetValue: 300,
        status: 'approved',
      },
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 8,
        platform: 'Facebook',
        operationType: '運用代行',
        revenueType: '運用手数料',
        budgetAmount: 1000000,
        targetKpi: 'リーチ',
        targetValue: 500000,
        status: 'approved',
      },
      {
        campaignId: campaign2.id,
        year: 2025,
        month: 8,
        platform: 'Google',
        operationType: 'コンサルティング',
        revenueType: 'コンサル費',
        budgetAmount: 2000000,
        targetKpi: 'CV',
        targetValue: 400,
        status: 'approved',
      },
    ],
  })

  console.log('サンプル予算を作成しました')

  // サンプル実績の作成
  await prisma.result.createMany({
    data: [
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 7,
        platform: 'Google',
        operationType: '運用代行',
        actualSpend: 1200000,
        actualResult: 250,
      },
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 7,
        platform: 'Facebook',
        operationType: '運用代行',
        actualSpend: 800000,
        actualResult: 420000,
      },
    ],
  })

  console.log('サンプル実績を作成しました')
  console.log('シードデータの作成が完了しました！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })