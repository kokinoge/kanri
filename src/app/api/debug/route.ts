import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    console.log('Debug API called - checking database connection and user data')
    
    // 1. データベース接続テスト
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('Database connection successful')
    
    // 2. ユーザーテーブルの存在確認
    console.log('Checking users table...')
    const userCount = await prisma.user.count()
    console.log(`Total users found: ${userCount}`)
    
    // 3. 全ユーザーの詳細情報を取得
    console.log('Fetching all user details...')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
        password: true // パスワードハッシュも確認
      }
    })
    
    console.log('Users found:', users.map(u => ({ 
      email: u.email, 
      isActive: u.isActive, 
      hasPassword: !!u.password,
      passwordLength: u.password ? u.password.length : 0
    })))
    
    // 4. 特定のテストユーザーでログインテスト
    const testEmail = 'admin@company.com'
    const testPassword = 'admin123'
    
    console.log(`Testing login for ${testEmail}...`)
    const testUser = await prisma.user.findUnique({
      where: { email: testEmail }
    })
    
    if (testUser) {
      console.log(`Test user found: ${testUser.email}, isActive: ${testUser.isActive}`)
      
      // パスワード確認
      const isPasswordValid = await bcrypt.compare(testPassword, testUser.password)
      console.log(`Password validation for ${testEmail}: ${isPasswordValid}`)
      
      // 環境変数確認
      console.log('Environment variables check:')
      console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
      console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)
      console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
      console.log('NODE_ENV:', process.env.NODE_ENV)
      
      return NextResponse.json({
        status: 'success',
        databaseConnection: 'OK',
        totalUsers: userCount,
        testUser: {
          found: true,
          email: testUser.email,
          isActive: testUser.isActive,
          passwordValid: isPasswordValid,
          role: testUser.role
        },
        environment: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          hasNEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
          hasDATABASE_URL: !!process.env.DATABASE_URL,
          NODE_ENV: process.env.NODE_ENV
        },
        allUsers: users.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          isActive: u.isActive,
          hasPassword: !!u.password,
          createdAt: u.createdAt
        }))
      })
    } else {
      console.log(`Test user not found: ${testEmail}`)
      return NextResponse.json({
        status: 'warning',
        databaseConnection: 'OK',
        totalUsers: userCount,
        testUser: {
          found: false,
          email: testEmail
        },
        environment: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          hasNEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
          hasDATABASE_URL: !!process.env.DATABASE_URL,
          NODE_ENV: process.env.NODE_ENV
        },
        allUsers: users.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          isActive: u.isActive,
          hasPassword: !!u.password,
          createdAt: u.createdAt
        }))
      })
    }
    
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        hasNEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        hasDATABASE_URL: !!process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV
      }
    }, { status: 500 })
  }
}