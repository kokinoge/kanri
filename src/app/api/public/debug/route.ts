import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      DATABASE_URL_PREFIX: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'NOT SET',
    },
    database: {
      connected: false,
      error: null,
      userCount: 0,
      users: []
    }
  };

  try {
    // データベース接続テスト
    await prisma.$connect();
    debugInfo.database.connected = true;

    // ユーザー数を取得
    const userCount = await prisma.user.count();
    debugInfo.database.userCount = userCount;

    // 全ユーザーを取得（パスワード以外）
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    debugInfo.database.users = users;

  } catch (error) {
    debugInfo.database.error = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(debugInfo);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({
        error: 'Email and password are required'
      }, { status: 400 });
    }

    const result: any = {
      input: { email },
      database: { connected: false },
      user: null,
      authentication: { tested: false, valid: false, error: null }
    };

    // データベース接続
    try {
      await prisma.$connect();
      result.database.connected = true;
    } catch (dbError) {
      result.database.error = dbError instanceof Error ? dbError.message : 'Unknown error';
      return NextResponse.json(result, { status: 500 });
    }

    // ユーザー検索
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (user) {
        result.user = {
          found: true,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          passwordHashPrefix: user.password.substring(0, 7),
          passwordHashLength: user.password.length
        };

        // パスワード検証
        try {
          result.authentication.tested = true;
          const isValid = await bcrypt.compare(password, user.password);
          result.authentication.valid = isValid;
          
          // bcryptの詳細情報
          result.authentication.details = {
            inputPassword: password,
            hashRounds: user.password.substring(4, 6),
            hashVersion: user.password.substring(0, 3)
          };
        } catch (authError) {
          result.authentication.error = authError instanceof Error ? authError.message : 'Unknown error';
        }
      } else {
        result.user = { found: false };
        
        // 全ユーザーリスト（デバッグ用）
        const allUsers = await prisma.user.findMany({
          select: { email: true, name: true }
        });
        result.allUsers = allUsers;
      }
    } catch (userError) {
      result.userSearchError = userError instanceof Error ? userError.message : 'Unknown error';
    }

    await prisma.$disconnect();
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}