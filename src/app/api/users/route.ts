import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'manager')) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        lastLogin: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '管理者権限が必要です' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, password, role, department } = body
    
    // バリデーション
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      )
    }
    
    // メール重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に使用されています' },
        { status: 400 }
      )
    }
    
    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        department
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        lastLogin: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true
          }
        }
      }
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, name, email, password, role, department } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // 権限チェック（管理者は全てのユーザー、それ以外は自分のみ編集可能）
    if (session.user.role !== 'admin' && session.user.id !== id) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 403 }
      )
    }
    
    // 権限変更は管理者のみ可能
    if (role && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '権限の変更は管理者のみ可能です' },
        { status: 403 }
      )
    }
    
    // 更新データ準備
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (department !== undefined) updateData.department = department
    if (role !== undefined && session.user.role === 'admin') updateData.role = role
    
    // パスワード更新がある場合
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    
    // ユーザー更新
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        lastLogin: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true
          }
        }
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '管理者権限が必要です' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // 自分自身は削除できない
    if (session.user.id === id) {
      return NextResponse.json(
        { error: '自分自身は削除できません' },
        { status: 400 }
      )
    }
    
    // ユーザー削除（関連データはカスケード削除）
    await prisma.user.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}