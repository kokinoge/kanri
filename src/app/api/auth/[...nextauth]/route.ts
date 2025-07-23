import { NextRequest, NextResponse } from "next/server"
import { sign, verify } from "jsonwebtoken"

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret-key"

// 詳細ログ関数
function logRequest(req: NextRequest, context: string) {
  const url = new URL(req.url)
  console.log(`[AUTH_${context}]`, {
    method: req.method,
    pathname: url.pathname,
    searchParams: Object.fromEntries(url.searchParams),
    userAgent: req.headers.get('user-agent'),
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  })
}

// ログイン処理
async function handleSignIn(request: NextRequest) {
  try {
    logRequest(request, 'SIGNIN_START')
    
    // GETリクエストの場合は、ログインフォームを表示するためのレスポンスを返す
    if (request.method === 'GET') {
      const url = new URL(request.url)
      const callbackUrl = url.searchParams.get('callbackUrl') || '/'
      const redirectUrl = new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
      
      console.log('[AUTH_SIGNIN_REDIRECT]', {
        originalUrl: request.url,
        callbackUrl,
        redirectTo: redirectUrl.toString()
      })
      
      return NextResponse.redirect(redirectUrl)
    }

    // POSTリクエストの処理
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
    return NextResponse.json({ 
      error: "Internal error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

// セッション取得処理
async function handleSession(request: NextRequest) {
  try {
    logRequest(request, 'SESSION')
    
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
  logRequest(request, 'SIGNOUT')
  
  const response = NextResponse.json({ success: true })
  response.cookies.delete('next-auth.session-token')
  return response
}

export async function GET(request: NextRequest) {
  try {
    logRequest(request, 'GET_START')
    
    const url = new URL(request.url)
    const action = url.searchParams.get('action')
    const pathname = url.pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    
    console.log('[AUTH_GET_ANALYSIS]', {
      pathname,
      pathSegments,
      action,
      lastSegment: pathSegments[pathSegments.length - 1]
    })

    // パス解析を複数の方法で試行
    const isSigninPath = (
      pathname.includes('/signin') || 
      pathSegments.includes('signin') ||
      pathSegments[pathSegments.length - 1] === 'signin' ||
      action === 'signin'
    )
    
    const isSignoutPath = (
      pathname.includes('/signout') || 
      pathSegments.includes('signout') ||
      pathSegments[pathSegments.length - 1] === 'signout' ||
      action === 'signout'
    )
    
    const isSessionPath = (
      pathname.includes('/session') || 
      pathSegments.includes('session') ||
      pathSegments[pathSegments.length - 1] === 'session' ||
      action === 'session'
    )

    console.log('[AUTH_PATH_DETECTION]', {
      isSigninPath,
      isSignoutPath,
      isSessionPath
    })

    // NextAuth標準パスの処理
    if (isSigninPath) {
      console.log('[AUTH_HANDLING_SIGNIN]', 'Redirecting to login page')
      return handleSignIn(request)
    }

    if (isSignoutPath) {
      console.log('[AUTH_HANDLING_SIGNOUT]', 'Processing signout')
      return handleSignOut(request)
    }

    if (isSessionPath) {
      console.log('[AUTH_HANDLING_SESSION]', 'Getting session')
      return handleSession(request)
    }

    // デフォルトレスポンス
    console.log('[AUTH_DEFAULT_RESPONSE]', 'No specific handler matched')
    return NextResponse.json({ 
      message: "Auth API", 
      availableEndpoints: ["signin", "signout", "session"],
      receivedPath: pathname,
      receivedSegments: pathSegments,
      receivedAction: action,
      debug: {
        method: 'GET',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
      }
    })
    
  } catch (error) {
    console.error('[AUTH_GET_ERROR]', error)
    return NextResponse.json({ 
      error: "GET handler error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    logRequest(request, 'POST_START')
    
    const url = new URL(request.url)
    const action = url.searchParams.get('action')
    const pathname = url.pathname
    const pathSegments = pathname.split('/').filter(Boolean)

    console.log('[AUTH_POST_ANALYSIS]', {
      pathname,
      pathSegments,
      action
    })

    // パス解析
    const isSigninPath = (
      pathname.includes('/signin') || 
      pathSegments.includes('signin') ||
      pathSegments[pathSegments.length - 1] === 'signin' ||
      action === 'signin'
    )
    
    const isSignoutPath = (
      pathname.includes('/signout') || 
      pathSegments.includes('signout') ||
      pathSegments[pathSegments.length - 1] === 'signout' ||
      action === 'signout'
    )

    // NextAuth標準パスの処理
    if (isSigninPath) {
      console.log('[AUTH_POST_SIGNIN]', 'Processing signin')
      return handleSignIn(request)
    }

    if (isSignoutPath) {
      console.log('[AUTH_POST_SIGNOUT]', 'Processing signout')
      return handleSignOut(request)
    }

    // デフォルトエラー
    console.log('[AUTH_POST_INVALID]', 'Invalid action')
    return NextResponse.json({ 
      error: "Invalid action", 
      receivedPath: pathname,
      receivedAction: action 
    }, { status: 400 })
    
  } catch (error) {
    console.error('[AUTH_POST_ERROR]', error)
    return NextResponse.json({ 
      error: "POST handler error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
} 