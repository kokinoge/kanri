import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 部署一覧取得
export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(departments);
  } catch (error) {
    console.error('部署取得エラー:', error);
    return NextResponse.json(
      { error: '部署データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 部署新規作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: '部署名は必須です' },
        { status: 400 }
      );
    }

    // 同じ名前の部署が存在するかチェック
    const existingDept = await prisma.department.findFirst({
      where: { name: name.trim() }
    });

    if (existingDept) {
      return NextResponse.json(
        { error: '同じ名前の部署が既に存在します' },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null
      }
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('部署作成エラー:', error);
    return NextResponse.json(
      { error: '部署の作成に失敗しました' },
      { status: 500 }
    );
  }
} 