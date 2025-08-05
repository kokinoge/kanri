import { NextRequest, NextResponse } from 'next/server'

// サンプル施策データ（開発用）
let campaigns = [
  {
    id: 'campaign_1',
    clientId: 'client_1',
    name: '春の新商品プロモーション',
    purpose: 'ブランド認知向上とリード獲得',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    totalBudget: 2000000,
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString()
  },
  {
    id: 'campaign_2',
    clientId: 'client_1', 
    name: 'インフルエンサーコラボ企画',
    purpose: '若年層へのリーチ拡大',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    totalBudget: 1500000,
    createdAt: new Date('2024-03-10').toISOString(),
    updatedAt: new Date('2024-03-10').toISOString()
  },
  {
    id: 'campaign_3',
    clientId: 'client_2',
    name: 'サマーセール告知キャンペーン',
    purpose: 'セール期間中の売上最大化',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    totalBudget: 3000000,
    createdAt: new Date('2024-06-15').toISOString(),
    updatedAt: new Date('2024-06-15').toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const search = searchParams.get('search')

    let filteredCampaigns = [...campaigns]

    // クライアント別フィルタ
    if (clientId) {
      filteredCampaigns = filteredCampaigns.filter(campaign => 
        campaign.clientId === clientId
      )
    }

    // 検索フィルタ
    if (search) {
      filteredCampaigns = filteredCampaigns.filter(campaign => 
        campaign.name.includes(search) || 
        campaign.purpose.includes(search)
      )
    }

    // 作成日時順でソート（新しい順）
    filteredCampaigns.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      success: true,
      data: filteredCampaigns,
      total: filteredCampaigns.length,
      message: '施策一覧を取得しました'
    })
  } catch (error) {
    console.error('施策取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '施策の取得に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientId, name, purpose, startDate, endDate, totalBudget } = body

    // バリデーション
    if (!clientId || !name || !purpose || !startDate || !endDate) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'クライアントID、施策名、目的、開始日、終了日は必須です' 
        },
        { status: 400 }
      )
    }

    // 日付検証
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start >= end) {
      return NextResponse.json(
        { 
          success: false, 
          error: '終了日は開始日より後である必要があります' 
        },
        { status: 400 }
      )
    }

    const newCampaign = {
      id: `campaign_${Date.now()}`,
      clientId,
      name,
      purpose,
      startDate,
      endDate,
      totalBudget: totalBudget || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    campaigns.push(newCampaign)

    return NextResponse.json({
      success: true,
      data: newCampaign,
      message: '施策を作成しました'
    }, { status: 201 })
  } catch (error) {
    console.error('施策作成エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '施策の作成に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}