import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// デバッグフラグ（本番環境では無効）
const DEBUG = process.env.NODE_ENV === 'development';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // APIルートは全てスキップ
  if (pathname.startsWith('/api/')) {
    // API routes are always skipped
    return NextResponse.next();
  }

  // 認証不要なページ
  const publicPages = [
    '/auth/signin',
  ];
  
  // 開発環境でのみアクセス可能なページ
  const devOnlyPages = ['/public-debug', '/debug', '/test', '/env-test'];
  if (process.env.NODE_ENV === 'development') {
    publicPages.push(...devOnlyPages);
  }

  // 公開ページチェック
  const isPublicPage = publicPages.some(page => pathname.startsWith(page));
  
  if (isPublicPage) {
    // Public pages are allowed
    return NextResponse.next();
  }

  // 認証チェック
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // No token, redirect to signin
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }

    // Authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    // Auth check failed, allow access to prevent lockout
    return NextResponse.next();
  }
}

// シンプルなmatcher - APIを除外
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};