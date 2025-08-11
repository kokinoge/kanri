import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  MasterWhereInput,
  MasterQueryParams,
  MasterCreateRequest,
  MasterUpdateRequest,
  GroupedMasters
} from '@/types/api'
import { successResponse, validationError, handleApiError } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams: MasterQueryParams = {
      category: searchParams.get('category') ?? undefined
    }
    
    const where: MasterWhereInput = queryParams.category ? { category: queryParams.category } : {}
    
    const masters = await prisma.master.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ]
    })
    
    // カテゴリ別にグループ化
    const groupedMasters: GroupedMasters = masters.reduce((acc, master) => {
      if (!acc[master.category]) {
        acc[master.category] = []
      }
      acc[master.category].push({
        id: master.id,
        value: master.value,
        order: master.order
      })
      return acc
    }, {} as GroupedMasters)
    
    return successResponse(groupedMasters)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MasterCreateRequest = await request.json()
    const { category, value, order } = body
    
    if (!category || !value) {
      return validationError('カテゴリと値は必須です')
    }
    
    // 既存の最大orderを取得
    const maxOrderItem = await prisma.master.findFirst({
      where: { category },
      orderBy: { order: 'desc' }
    })
    
    const newOrder = order || (maxOrderItem ? maxOrderItem.order + 1 : 1)
    
    const master = await prisma.master.create({
      data: {
        category,
        value,
        order: newOrder
      }
    })
    
    return successResponse(master, 'マスタデータを作成しました')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: MasterUpdateRequest = await request.json()
    const { id, value, order } = body
    
    if (!id) {
      return validationError('Master ID is required')
    }
    
    const master = await prisma.master.update({
      where: { id },
      data: {
        ...(value !== undefined && { value }),
        ...(order !== undefined && { order })
      }
    })
    
    return successResponse(master, 'マスタデータを更新しました')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return validationError('Master ID is required')
    }
    
    await prisma.master.delete({
      where: { id }
    })
    
    return successResponse({ message: 'Master deleted successfully' }, 'マスタデータを削除しました')
  } catch (error) {
    return handleApiError(error)
  }
}