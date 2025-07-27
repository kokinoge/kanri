import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // ビルド時または環境変数不備時には早期リターン（データベース接続を回避）
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
      console.log('[MASTERS_API] Database not available - returning empty data');
      return NextResponse.json([], { status: 200 });
    }

    // Next.jsの推奨方法でsearchParamsを取得
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    console.log('[MASTERS_API] マスターデータ取得:', { category });

    if (category) {
      // 特定カテゴリのマスターデータを取得
      const masters = await prisma.master.findMany({
        where: {
          category: category
        },
        orderBy: {
          order: 'asc'
        }
      });

      const formattedData = masters.map(master => ({
        id: master.id,
        value: master.value,
        label: master.value
      }));

      return NextResponse.json(formattedData);
    } else {
      // 全カテゴリのマスターデータを取得
      const masters = await prisma.master.findMany({
        orderBy: [
          { category: 'asc' },
          { order: 'asc' }
        ]
      });

      // カテゴリ別にグループ化
      const groupedMasters: Record<string, Array<{ id: string; value: string; label: string }>> = {};
      
      masters.forEach(master => {
        if (!groupedMasters[master.category]) {
          groupedMasters[master.category] = [];
        }
        groupedMasters[master.category].push({
          id: master.id,
          value: master.value,
          label: master.value
        });
      });

      return NextResponse.json(groupedMasters);
    }
  } catch (error) {
    console.error('[MASTERS_API] マスターデータ取得エラー:', error);
    
    return NextResponse.json(
      { 
        error: 'マスターデータの取得に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, value, label } = body;

    if (!category || !value || !label) {
      return NextResponse.json(
        { error: 'category, value, labelは必須です' },
        { status: 400 }
      );
    }

    // 新しいアイテムの作成（実際の実装ではデータベースに保存）
    const newItem = {
      id: Date.now().toString(),
      value,
      label
    };

    console.log(`[MASTERS_API] ${category} に新しいアイテムを追加:`, newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('マスターデータ作成エラー:', error);
    return NextResponse.json(
      { error: 'マスターデータの作成に失敗しました' },
      { status: 500 }
    );
  }
} 