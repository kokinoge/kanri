import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const platform = searchParams.get('platform');

    const whereClause: any = {};
    
    if (campaignId) {
      whereClause.campaignId = campaignId;
    }
    
    if (year) {
      whereClause.year = parseInt(year);
    }
    
    if (month) {
      whereClause.month = parseInt(month);
    }
    
    if (platform) {
      whereClause.platform = platform;
    }

    const results = await prisma.result.findMany({
      where: whereClause,
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true
              }
            }
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('実績取得エラー:', error);
    return NextResponse.json(
      { error: '実績データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, year, month, platform, operationType, budgetType, actualSpend, actualResult } = body;

    if (!campaignId) {
      return NextResponse.json(
        { error: '案件IDは必須です' },
        { status: 400 }
      );
    }

    // 案件存在チェック
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign) {
      return NextResponse.json(
        { error: '指定された案件が見つかりません' },
        { status: 400 }
      );
    }

    // 同じ条件の実績が既に存在するかチェック
    const existingResult = await prisma.result.findFirst({
      where: {
        campaignId,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        platform: platform || '',
        operationType: operationType || '',
        budgetType: budgetType || ''
      }
    });

    if (existingResult) {
      return NextResponse.json(
        { error: '同じ条件の実績が既に存在します' },
        { status: 400 }
      );
    }

    const result = await prisma.result.create({
      data: {
        campaignId,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1,
        platform: platform || '',
        operationType: operationType || '',
        budgetType: budgetType || '',
        actualSpend: actualSpend ? parseFloat(actualSpend.toString()) : 0,
        actualResult: actualResult ? parseFloat(actualResult.toString()) : 0
      },
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true,
                businessDivision: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('実績作成エラー:', error);
    return NextResponse.json(
      { error: '実績の作成に失敗しました' },
      { status: 500 }
    );
  }
} 