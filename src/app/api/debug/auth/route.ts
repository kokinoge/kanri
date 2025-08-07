import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('=== 認証デバッグ開始 ===');
    console.log('入力されたメール:', email);
    console.log('環境変数チェック:');
    console.log('- DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');
    console.log('- NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '設定済み' : '未設定');
    console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

    // データベース接続テスト
    let dbConnection = false;
    try {
      await prisma.$connect();
      dbConnection = true;
      console.log('データベース接続: 成功');
    } catch (dbError) {
      console.error('データベース接続エラー:', dbError);
      return NextResponse.json({
        error: 'データベース接続エラー',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

    // ユーザーを検索
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('ユーザーが見つかりません');
      
      // 全ユーザーをリスト（デバッグ用）
      const allUsers = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true, isActive: true }
      });
      console.log('データベース内の全ユーザー:', allUsers);

      return NextResponse.json({
        error: 'ユーザーが見つかりません',
        totalUsers: allUsers.length,
        users: allUsers
      }, { status: 404 });
    }

    console.log('ユーザー情報:');
    console.log('- ID:', user.id);
    console.log('- Email:', user.email);
    console.log('- Name:', user.name);
    console.log('- Role:', user.role);
    console.log('- isActive:', user.isActive);
    console.log('- パスワードハッシュ長:', user.password.length);
    console.log('- パスワードハッシュプレフィックス:', user.password.substring(0, 7));

    // パスワード検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('パスワード検証結果:', isPasswordValid);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      },
      passwordValid: isPasswordValid,
      debug: {
        dbConnection,
        passwordHashPrefix: user.password.substring(0, 7),
        passwordHashLength: user.password.length
      }
    });

  } catch (error) {
    console.error('デバッグAPIエラー:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}