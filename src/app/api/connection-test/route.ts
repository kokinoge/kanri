import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 基本的な環境変数の確認
    const env = {
      DATABASE_URL: process.env.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NODE_ENV: process.env.NODE_ENV
    }
    
    console.log('Environment variables check:')
    console.log('DATABASE_URL:', env.DATABASE_URL ? `${env.DATABASE_URL.substring(0, 30)}...` : 'NOT SET')
    console.log('NEXTAUTH_URL:', env.NEXTAUTH_URL)
    console.log('NEXTAUTH_SECRET:', env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET')
    console.log('NODE_ENV:', env.NODE_ENV)
    
    // データベース接続のテスト（基本的なモジュール読み込みから）
    try {
      const { PrismaClient } = require('@prisma/client')
      console.log('Prisma Client loaded successfully')
      
      const prisma = new PrismaClient()
      console.log('Prisma Client instantiated')
      
      // 基本的な接続テスト
      await prisma.$connect()
      console.log('Database connection successful')
      
      // 簡単なクエリテスト
      const result = await prisma.$queryRaw`SELECT 1 as test`
      console.log('Basic query successful:', result)
      
      await prisma.$disconnect()
      
      return NextResponse.json({
        status: 'success',
        message: 'Database connection successful',
        environment: {
          hasDATABASE_URL: !!env.DATABASE_URL,
          hasNEXTAUTH_URL: !!env.NEXTAUTH_URL,
          hasNEXTAUTH_SECRET: !!env.NEXTAUTH_SECRET,
          NODE_ENV: env.NODE_ENV
        }
      })
      
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json({
        status: 'db_error',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
        environment: {
          hasDATABASE_URL: !!env.DATABASE_URL,
          hasNEXTAUTH_URL: !!env.NEXTAUTH_URL,
          hasNEXTAUTH_SECRET: !!env.NEXTAUTH_SECRET,
          NODE_ENV: env.NODE_ENV,
          databaseUrlPrefix: env.DATABASE_URL ? env.DATABASE_URL.substring(0, 30) : null
        }
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('General error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}