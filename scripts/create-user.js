// テストユーザー作成スクリプト
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('Connecting to database...')
    
    // データベースに接続
    await prisma.$connect()
    console.log('Connected successfully!')
    
    // 既存のユーザーを確認
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@company.com' }
    })
    
    if (existingUser) {
      console.log('Test user already exists:', existingUser.email)
      return
    }
    
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    // テストユーザーを作成
    const user = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@company.com',
        password: hashedPassword,
        role: 'admin',
        department: 'IT',
        isActive: true
      }
    })
    
    console.log('Test user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()