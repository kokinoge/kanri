import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 予算一覧取得
export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      include: {
        client: {
          select: {
            name: true
          }
        },
        department: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('予算取得エラー:', error);
    return NextResponse.json(
      { error: '予算データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 予算新規作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, clientId, departmentId, totalAmount, year, month } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: '予算名は必須です' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: '予算額は0より大きい値を入力してください' },
        { status: 400 }
      );
    }

    // 同じ期間・クライアント・部署の予算が存在するかチェック（オプション）
    const existingBudget = await prisma.budget.findFirst({
      where: {
        name: name.trim(),
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1
      }
    });

    if (existingBudget) {
      return NextResponse.json(
        { error: '同じ名前・期間の予算が既に存在します' },
        { status: 400 }
      );
    }

    const budget = await prisma.budget.create({
      data: {
        name: name.trim(),
        clientId: clientId || null,
        departmentId: departmentId || null,
        totalAmount: parseFloat(totalAmount),
        usedAmount: 0,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        status: 'active'
      },
      include: {
        client: {
          select: {
            name: true
          }
        },
        department: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error('予算作成エラー:', error);
    return NextResponse.json(
      { error: '予算の作成に失敗しました' },
      { status: 500 }
    );
  }
} 