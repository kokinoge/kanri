import { NextRequest, NextResponse } from 'next/server'

// マスタデータの初期定義（要件定義書準拠）
const MASTER_DATA = {
  platforms: [
    { id: 'x', name: 'X（Twitter）', order: 1 },
    { id: 'instagram', name: 'Instagram', order: 2 },
    { id: 'youtube', name: 'YouTube', order: 3 },
    { id: 'tiktok', name: 'TikTok', order: 4 },
    { id: 'threads', name: 'Threads', order: 5 }
  ],
  operationTypes: [
    { id: 'micro_influencer', name: 'マイクロインフルエンサー', order: 1 },
    { id: 'mega_influencer', name: 'メガインフルエンサー', order: 2 },
    { id: 'ad_operation', name: '広告運用', order: 3 },
    { id: 'content_creation', name: 'コンテンツ制作', order: 4 }
  ],
  revenueTypes: [
    { id: 'performance', name: '成果報酬', order: 1 },
    { id: 'fixed_post', name: '投稿固定費', order: 2 },
    { id: 'imp_guarantee', name: 'imp保証', order: 3 },
    { id: 'ad_budget_percent', name: '広告予算％', order: 4 },
    { id: 'monthly_fixed', name: '月額固定', order: 5 }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    if (category) {
      // 特定カテゴリのマスタデータを返す
      const data = MASTER_DATA[category as keyof typeof MASTER_DATA] || []
      return NextResponse.json({
        success: true,
        data: data,
        message: `${category}マスタデータを取得しました`
      })
    }

    // 全マスタデータを返す
    return NextResponse.json({
      success: true,
      data: MASTER_DATA,
      message: 'マスタデータを取得しました'
    })
  } catch (error) {
    console.error('マスタデータ取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'マスタデータの取得に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, name, order } = body

    if (!category || !name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'カテゴリと名前は必須です' 
        },
        { status: 400 }
      )
    }

    // 実際の実装では、ここでPrismaを使用してデータベースに保存
    const newItem = {
      id: `${category}_${Date.now()}`,
      name,
      order: order || 999
    }

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'マスタデータを作成しました'
    })
  } catch (error) {
    console.error('マスタデータ作成エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'マスタデータの作成に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}