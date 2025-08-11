import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  ClientWhereInput,
  ClientQueryParams,
  ClientCreateRequest,
  ApiResponse,
  ApiError
} from '@/types/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams: ClientQueryParams = {
      search: searchParams.get('search') ?? undefined,
      priority: searchParams.get('priority') ?? undefined
    }

    // Prismaクエリの構築
    const where: ClientWhereInput = {}
    
    if (queryParams.search) {
      where.OR = [
        { name: { contains: queryParams.search } },
        { manager: { contains: queryParams.search } }
      ]
    }
    
    if (queryParams.priority) {
      where.priority = parseInt(queryParams.priority)
    }
    
    const clients = await prisma.client.findMany({
      where,
      orderBy: [
        { priority: 'asc' },
        { name: 'asc' }
      ]
    })

    const response: ApiResponse = {
      success: true,
      data: clients,
      total: clients.length,
      message: 'クライアント一覧を取得しました'
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error('クライアント取得エラー:', error)
    const errorResponse: ApiResponse = { 
      success: false, 
      error: 'クライアントの取得に失敗しました',
      details: error instanceof Error ? error.message : '不明なエラー'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ClientCreateRequest = await request.json()
    const { name, manager, priority } = body

    // バリデーション
    if (!name || !manager) {
      const errorResponse: ApiResponse = { 
        success: false, 
        error: '企業名と担当者は必須です' 
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        manager,
        priority: priority || 999
      }
    })

    const response: ApiResponse = {
      success: true,
      data: newClient,
      message: 'クライアントを作成しました'
    }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('クライアント作成エラー:', error)
    const errorResponse: ApiResponse = { 
      success: false, 
      error: 'クライアントの作成に失敗しました',
      details: error instanceof Error ? error.message : '不明なエラー'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}