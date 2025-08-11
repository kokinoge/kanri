import { NextResponse } from 'next/server'

export async function GET() {
  const result: any = {
    status: 'testing',
    timestamp: new Date().toISOString(),
    environment: {
      DATABASE_URL: process.env.DATABASE_URL ? 'present' : 'missing',
      DATABASE_URL_prefix: process.env.DATABASE_URL?.substring(0, 50) + '...',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'missing',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'present' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'missing'
    }
  }

  try {
    // 基本的なPrismaクライアントの読み込みテスト
    const { PrismaClient } = require('@prisma/client')
    result.prismaClientLoaded = true

    const prisma = new PrismaClient({
      log: ['error', 'warn']
    })
    result.prismaClientCreated = true

    // 基本的な接続テスト
    await prisma.$connect()
    result.databaseConnected = true

    // 基本的なクエリテスト
    await prisma.$queryRaw`SELECT NOW() as current_time`
    result.basicQueryWorked = true

    await prisma.$disconnect()
    result.status = 'success'

    return NextResponse.json(result)

  } catch (error) {
    result.status = 'error'
    result.error = error instanceof Error ? {
      name: error.name,
      message: error.message,
      cause: (error as any).cause?.message || null
    } : String(error)

    console.error('Database test error:', error)
    
    return NextResponse.json(result, { status: 500 })
  }
}