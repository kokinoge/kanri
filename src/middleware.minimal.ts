// 最小限のミドルウェア - APIルートを完全に除外
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // すべてのリクエストを通す（デバッグ用）
  return NextResponse.next();
}

export const config = {
  matcher: [
    // ページのみ対象（APIルートは完全に除外）
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};