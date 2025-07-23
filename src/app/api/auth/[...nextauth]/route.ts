import { NextRequest, NextResponse } from "next/server"
import { sign, verify } from "jsonwebtoken"

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret-key"

// ログイン処理
async function handleSignIn(request: NextRequest) {
  try {
    // GETリクエストの場合は、ログインフォームを表示するためのレスポンスを返す
    if (request.method === 'GET') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const body = await request.json()
    const { email, password } = body

    console.log("AUTH: Attempting login with", { email, env: process.env.NODE_ENV })

    let isValid = false
    
    // 開発環境では簡易認証
    if (process.env.NODE_ENV === "development") {
      isValid = email === "admin@example.com" && password === "admin"
    } else {
      // 本番環境
      isValid = email === "admin@example.com" && password === "admin123"
    }

    if (isValid) {
      const user = {
        id: "1",
        name: "管理者ユーザー",
        email: "admin@example.com",
        role: "admin",
        department: "管理部"
      }

      const token = sign(user, JWT_SECRET, { expiresIn: "30d" })
      
      const response = NextResponse.json({ 
        user, 
        success: true 
      })
      
      response.cookies.set('next-auth.session-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })

      console.log("AUTH: Login successful")
      return response
    } else {
      console.log("AUTH: Login failed - invalid credentials")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("AUTH: Login error", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

// セッション取得処理
async function handleSession(request: NextRequest) {
  try {
    const token = request.cookies.get('next-auth.session-token')?.value
    
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded = verify(token, JWT_SECRET) as any
    return NextResponse.json({ user: decoded })
  } catch (error) {
    console.error("AUTH: Session error", error)
    return NextResponse.json({ user: null })
  }
}

// ログアウト処理
async function handleSignOut(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('next-auth.session-token')
  return response
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  const pathname = url.pathname

  // NextAuth標準パスの処理
  if (pathname.includes('/signin')) {
    const callbackUrl = url.searchParams.get('callbackUrl') || '/'
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url))
  }

  if (pathname.includes('/signout')) {
    return handleSignOut(request)
  }

  if (pathname.includes('/session')) {
    return handleSession(request)
  }

  // アクションパラメータベースの処理（後方互換性）
  if (action === 'session') {
    return handleSession(request)
  }

  return NextResponse.json({ message: "Auth API", availableEndpoints: ["signin", "signout", "session"] })
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  const pathname = url.pathname

  // NextAuth標準パスの処理
  if (pathname.includes('/signin')) {
    return handleSignIn(request)
  }

  if (pathname.includes('/signout')) {
    return handleSignOut(request)
  }

  // アクションパラメータベースの処理（後方互換性）
  if (action === 'signin') {
    return handleSignIn(request)
  } else if (action === 'signout') {
    return handleSignOut(request)
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
} 