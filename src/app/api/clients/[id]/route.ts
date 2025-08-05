import { NextRequest, NextResponse } from 'next/server'

// 一時的なデータストレージ（実際のアプリではPrismaを使用）
let clients = [
  {
    id: 'client_1',
    name: '株式会社サンプルA',
    manager: '田中太郎',
    priority: 1,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'client_2', 
    name: '株式会社サンプルB',
    manager: '佐藤花子',
    priority: 2,
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString()
  },
  {
    id: 'client_3',
    name: '株式会社サンプルC',
    manager: '鈴木一郎',
    priority: 3,
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString()
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params
    const client = clients.find(c => c.id === clientId)

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'クライアントが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: client,
      message: 'クライアント詳細を取得しました'
    })
  } catch (error) {
    console.error('クライアント詳細取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'クライアント詳細の取得に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params
    const body = await request.json()
    const { name, manager, priority } = body

    const clientIndex = clients.findIndex(c => c.id === clientId)

    if (clientIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'クライアントが見つかりません' },
        { status: 404 }
      )
    }

    // バリデーション
    if (!name || !manager) {
      return NextResponse.json(
        { 
          success: false, 
          error: '企業名と担当者は必須です' 
        },
        { status: 400 }
      )
    }

    // 更新
    clients[clientIndex] = {
      ...clients[clientIndex],
      name,
      manager,
      priority: priority || clients[clientIndex].priority,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: clients[clientIndex],
      message: 'クライアントを更新しました'
    })
  } catch (error) {
    console.error('クライアント更新エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'クライアントの更新に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params
    const clientIndex = clients.findIndex(c => c.id === clientId)

    if (clientIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'クライアントが見つかりません' },
        { status: 404 }
      )
    }

    const deletedClient = clients[clientIndex]
    clients.splice(clientIndex, 1)

    return NextResponse.json({
      success: true,
      data: deletedClient,
      message: 'クライアントを削除しました'
    })
  } catch (error) {
    console.error('クライアント削除エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'クライアントの削除に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}