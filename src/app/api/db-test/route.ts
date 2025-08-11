import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // データベース接続のテスト
    console.log('Testing database connection...')
    
    // 基本的な接続テスト
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // ユーザー数の確認
    const userCount = await prisma.user.count()
    console.log(`User count: ${userCount}`)
    
    // テストユーザーの確認
    const testUser = await prisma.user.findUnique({
      where: { email: 'admin@company.com' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })
    
    console.log('Test user found:', testUser ? 'Yes' : 'No')
    
    return NextResponse.json({
      status: 'success',
      databaseConnection: 'OK',
      userCount,
      testUser: testUser ? {
        found: true,
        email: testUser.email,
        name: testUser.name,
        role: testUser.role,
        isActive: testUser.isActive
      } : { found: false }
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}