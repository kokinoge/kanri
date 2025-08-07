// バックアップ: 最小限のミドルウェア（問題が発生した場合に使用）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // すべてのリクエストを通す（認証チェックなし）
  console.log(`[Middleware] Path: ${pathname} - Passing through`);
  return NextResponse.next();
}

export const config = {
  matcher: '/(.*)',
};