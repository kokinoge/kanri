import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 部署削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 部署が存在するかチェック
    const department = await prisma.department.findUnique({
      where: { id }
    });

    if (!department) {
      return NextResponse.json(
        { error: '指定された部署が見つかりません' },
        { status: 404 }
      );
    }

    // 部署を削除
    await prisma.department.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: '部署を削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('部署削除エラー:', error);
    return NextResponse.json(
      { error: '部署の削除に失敗しました' },
      { status: 500 }
    );
  }
} 