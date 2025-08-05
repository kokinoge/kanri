import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const where = category ? { category } : {}
    
    const masters = await prisma.master.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ]
    })
    
    // カテゴリ別にグループ化
    const groupedMasters = masters.reduce((acc, master) => {
      if (!acc[master.category]) {
        acc[master.category] = []
      }
      acc[master.category].push({
        id: master.id,
        value: master.value,
        order: master.order
      })
      return acc
    }, {} as Record<string, any[]>)
    
    return NextResponse.json(groupedMasters)
  } catch (error) {
    console.error('Error fetching masters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch masters' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, value, order } = body
    
    if (!category || !value) {
      return NextResponse.json(
        { error: 'カテゴリと値は必須です' },
        { status: 400 }
      )
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
    
    return NextResponse.json(master, { status: 201 })
  } catch (error) {
    console.error('Error creating master:', error)
    return NextResponse.json(
      { error: 'Failed to create master' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, value, order } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Master ID is required' },
        { status: 400 }
      )
    }
    
    const master = await prisma.master.update({
      where: { id },
      data: {
        ...(value !== undefined && { value }),
        ...(order !== undefined && { order })
      }
    })
    
    return NextResponse.json(master)
  } catch (error) {
    console.error('Error updating master:', error)
    return NextResponse.json(
      { error: 'Failed to update master' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Master ID is required' },
        { status: 400 }
      )
    }
    
    await prisma.master.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Master deleted successfully' })
  } catch (error) {
    console.error('Error deleting master:', error)
    return NextResponse.json(
      { error: 'Failed to delete master' },
      { status: 500 }
    )
  }
}