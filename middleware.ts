import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('[MIDDLEWARE]', {
    path: request.nextUrl.pathname,
    method: request.method,
    userAgent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  })
  
  // 認証APIの特別な処理
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    console.log('[MIDDLEWARE_AUTH]', {
      fullPath: request.nextUrl.pathname,
      searchParams: Object.fromEntries(request.nextUrl.searchParams)
    })
    
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Cache', 'no-cache')
    response.headers.set('X-Auth-Debug', 'middleware-processed')
    return response
  }
  
  // その他のAPIルート
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Cache', 'no-cache')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*'
  ]
} 