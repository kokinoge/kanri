import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('[ASSIGNABLE_USERS_API] 割り当て可能ユーザー取得開始');

    // アクティブユーザーを取得
    const users = await prisma.user.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true
      },
      orderBy: [
        { role: 'asc' },  // admin -> manager -> member の順
        { name: 'asc' }
      ]
    });

    console.log('[ASSIGNABLE_USERS_API] 割り当て可能ユーザーを返却:', users.length, '件');
    return NextResponse.json(users);
  } catch (error) {
    console.error('[ASSIGNABLE_USERS_API] 割り当て可能ユーザー取得エラー:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: '割り当て可能ユーザーの取得に失敗しました',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 