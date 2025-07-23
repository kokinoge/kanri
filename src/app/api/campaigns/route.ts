import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const businessDivision = searchParams.get('businessDivision');

    const whereClause: any = {};
    
    if (clientId) {
      whereClause.clientId = clientId;
    }
    
    if (businessDivision) {
      whereClause.client = {
        businessDivision: businessDivision
      };
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            businessDivision: true
          }
        },
        budgets: {
          select: {
            id: true,
            amount: true
          }
        },
        results: {
          select: {
            id: true,
            actualSpend: true,
            actualResult: true
          }
        }
      },
      orderBy: [
        { startYear: 'desc' },
        { startMonth: 'desc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('案件取得エラー:', error);
    return NextResponse.json(
      { error: '案件データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, name, purpose, startYear, startMonth, endYear, endMonth, totalBudget } = body;

    if (!clientId || !name || !name.trim()) {
      return NextResponse.json(
        { error: 'クライアントIDと案件名は必須です' },
        { status: 400 }
      );
    }

    // クライアント存在チェック
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return NextResponse.json(
        { error: '指定されたクライアントが見つかりません' },
        { status: 400 }
      );
    }

    // 同名案件の重複チェック（同一クライアント内）
    const existingCampaign = await prisma.campaign.findFirst({
      where: { 
        clientId,
        name: name.trim()
      }
    });

    if (existingCampaign) {
      return NextResponse.json(
        { error: '同名の案件が既に存在します' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        clientId,
        name: name.trim(),
        purpose: purpose || '',
        startYear: startYear || new Date().getFullYear(),
        startMonth: startMonth || new Date().getMonth() + 1,
        endYear: endYear || null,
        endMonth: endMonth || null,
        totalBudget: totalBudget ? parseFloat(totalBudget.toString()) : 0
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            businessDivision: true
          }
        }
      }
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('案件作成エラー:', error);
    return NextResponse.json(
      { error: '案件の作成に失敗しました' },
      { status: 500 }
    );
  }
} 