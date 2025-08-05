import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 既存のデータを削除
  await prisma.result.deleteMany()
  await prisma.budget.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.client.deleteMany()
  await prisma.master.deleteMany()
  await prisma.user.deleteMany()

  // ユーザーの作成
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@company.com',
      name: 'システム管理者',
      password: hashedPassword,
      role: 'admin',
      department: 'システム部',
    },
  })

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@company.com',
      name: '田中太郎',
      password: hashedPassword,
      role: 'manager',
      department: '営業部',
    },
  })

  const memberUser = await prisma.user.create({
    data: {
      email: 'member@company.com',
      name: '佐藤花子',
      password: hashedPassword,
      role: 'member',
      department: 'マーケティング部',
    },
  })

  // マスターデータの作成
  const platforms = ['Google広告', 'Facebook広告', 'Instagram広告', 'Twitter広告', 'LINE広告']
  const operationTypes = ['運用代行', 'インハウス支援', 'コンサルティング']
  const revenueTypes = ['運用手数料', '固定報酬', '成果報酬']
  const priorities = ['高', '中', '低']

  for (let i = 0; i < platforms.length; i++) {
    await prisma.master.create({
      data: {
        category: 'platform',
        value: platforms[i],
        order: i + 1,
      },
    })
  }

  for (let i = 0; i < operationTypes.length; i++) {
    await prisma.master.create({
      data: {
        category: 'operationType',
        value: operationTypes[i],
        order: i + 1,
      },
    })
  }

  for (let i = 0; i < revenueTypes.length; i++) {
    await prisma.master.create({
      data: {
        category: 'revenueType',
        value: revenueTypes[i],
        order: i + 1,
      },
    })
  }

  for (let i = 0; i < priorities.length; i++) {
    await prisma.master.create({
      data: {
        category: 'priority',
        value: priorities[i],
        order: i + 1,
      },
    })
  }

  // クライアントの作成
  const client1 = await prisma.client.create({
    data: {
      name: '株式会社ABC商事',
      manager: '田中太郎',
      priority: 1,
    },
  })

  const client2 = await prisma.client.create({
    data: {
      name: '株式会社DEFコーポレーション',
      manager: '佐藤花子',
      priority: 2,
    },
  })

  const client3 = await prisma.client.create({
    data: {
      name: '株式会社GHI産業',
      manager: '田中太郎',
      priority: 1,
    },
  })

  // キャンペーンの作成
  const campaign1 = await prisma.campaign.create({
    data: {
      clientId: client1.id,
      name: '2025年夏季販促キャンペーン',
      purpose: '夏季商品の売上向上',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-09-30'),
      totalBudget: 5000000,
    },
  })

  const campaign2 = await prisma.campaign.create({
    data: {
      clientId: client2.id,
      name: 'ブランド認知度向上キャンペーン',
      purpose: 'ブランド認知度の向上',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-12-31'),
      totalBudget: 10000000,
    },
  })

  // 予算の作成
  await prisma.budget.createMany({
    data: [
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 7,
        platform: 'Google広告',
        operationType: '運用代行',
        revenueType: '運用手数料',
        budgetAmount: 1500000,
        targetKpi: 'CV',
        targetValue: 300,
      },
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 8,
        platform: 'Google広告',
        operationType: '運用代行',
        revenueType: '運用手数料',
        budgetAmount: 2000000,
        targetKpi: 'CV',
        targetValue: 400,
      },
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 9,
        platform: 'Google広告',
        operationType: '運用代行',
        revenueType: '運用手数料',
        budgetAmount: 1500000,
        targetKpi: 'CV',
        targetValue: 300,
      },
      {
        campaignId: campaign2.id,
        year: 2025,
        month: 8,
        platform: 'Facebook広告',
        operationType: 'インハウス支援',
        revenueType: '固定報酬',
        budgetAmount: 1000000,
        targetKpi: 'リーチ',
        targetValue: 1000000,
      },
    ],
  })

  // 実績の作成
  await prisma.result.createMany({
    data: [
      {
        campaignId: campaign1.id,
        year: 2025,
        month: 7,
        platform: 'Google広告',
        operationType: '運用代行',
        actualSpend: 1450000,
        actualResult: 320,
      },
    ],
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })