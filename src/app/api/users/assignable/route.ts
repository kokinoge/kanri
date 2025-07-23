import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// サンプルユーザーデータ
const SAMPLE_USERS = [
  {
    id: '1',
    name: '管理者ユーザー',
    email: 'admin@example.com',
    role: 'admin',
    department: '管理部',
    isActive: true
  },
  {
    id: '2',
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: 'manager',
    department: 'SNSメディア事業部',
    isActive: true
  },
  {
    id: '3',
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'manager',
    department: 'デジタルマーケティング事業部',
    isActive: true
  },
  {
    id: '4',
    name: '鈴木次郎',
    email: 'suzuki@example.com',
    role: 'member',
    department: 'SNSメディア事業部',
    isActive: true
  },
  {
    id: '5',
    name: '高橋美咲',
    email: 'takahashi@example.com',
    role: 'member',
    department: 'コンテンツ事業部',
    isActive: true
  }
];

export async function GET(request: NextRequest) {
  try {
    // アクティブユーザーのみを返す
    const assignableUsers = SAMPLE_USERS.filter(user => user.isActive);

    console.log('[ASSIGNABLE_USERS_API] 割り当て可能ユーザーを返却:', assignableUsers.length, '件');
    return NextResponse.json(assignableUsers);
  } catch (error) {
    console.error('割り当て可能ユーザー取得エラー:', error);
    return NextResponse.json(
      { error: '割り当て可能ユーザーの取得に失敗しました' },
      { status: 500 }
    );
  }
} 