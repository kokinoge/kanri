import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('[AUTH_SIGNIN_DIRECT]', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
    
    const url = new URL(request.url)
    const callbackUrl = url.searchParams.get('callbackUrl') || '/'
    
    // ログインページにリダイレクト
    const redirectUrl = new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
    
    console.log('[AUTH_SIGNIN_DIRECT_REDIRECT]', {
      callbackUrl,
      redirectTo: redirectUrl.toString()
    })
    
    return NextResponse.redirect(redirectUrl)
    
  } catch (error) {
    console.error('[AUTH_SIGNIN_DIRECT_ERROR]', error)
    return NextResponse.json({ 
      error: "Signin endpoint error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[AUTH_SIGNIN_DIRECT_POST]', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
    
    // POSTリクエストは[...nextauth]ルートハンドラーに転送
    const url = new URL(request.url)
    url.pathname = '/api/auth/nextauth'
    url.searchParams.set('action', 'signin')
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: await request.text()
    })
    
    const data = await response.json()
    
    if (response.ok) {
      const nextResponse = NextResponse.json(data)
      // Cookieを転送
      const setCookieHeader = response.headers.get('set-cookie')
      if (setCookieHeader) {
        nextResponse.headers.set('set-cookie', setCookieHeader)
      }
      return nextResponse
    } else {
      return NextResponse.json(data, { status: response.status })
    }
    
  } catch (error) {
    console.error('[AUTH_SIGNIN_DIRECT_POST_ERROR]', error)
    return NextResponse.json({ 
      error: "Signin POST error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 