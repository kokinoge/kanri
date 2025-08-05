import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const priority = searchParams.get('priority')

    // Prismaクエリの構築
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { manager: { contains: search } }
      ]
    }
    
    if (priority) {
      where.priority = parseInt(priority)
    }
    
    const clients = await prisma.client.findMany({
      where,
      orderBy: [
        { priority: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: clients,
      total: clients.length,
      message: 'クライアント一覧を取得しました'
    })
  } catch (error) {
    console.error('クライアント取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'クライアントの取得に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, manager, priority } = body

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

    const newClient = await prisma.client.create({
      data: {
        name,
        manager,
        priority: priority || 999
      }
    })

    return NextResponse.json({
      success: true,
      data: newClient,
      message: 'クライアントを作成しました'
    }, { status: 201 })
  } catch (error) {
    console.error('クライアント作成エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'クライアントの作成に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}