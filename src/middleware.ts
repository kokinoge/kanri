import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// デバッグフラグ
const DEBUG = true;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // APIルートは全てスキップ
  if (pathname.startsWith('/api/')) {
    if (DEBUG) console.log(`[MW] API route, skipping: ${pathname}`);
    return NextResponse.next();
  }

  // 認証不要なページ
  const publicPages = [
    '/auth/signin',
    '/public-debug',
    '/debug',
    '/test',
    '/env-test',
  ];

  // 公開ページチェック
  const isPublicPage = publicPages.some(page => pathname.startsWith(page));
  
  if (isPublicPage) {
    if (DEBUG) console.log(`[MW] Public page, allowing: ${pathname}`);
    return NextResponse.next();
  }

  // 認証チェック
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      if (DEBUG) console.log(`[MW] No token, redirecting: ${pathname}`);
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }

    if (DEBUG) console.log(`[MW] Authenticated, allowing: ${pathname}`);
    return NextResponse.next();
  } catch (error) {
    console.error('[MW] Error checking auth:', error);
    return NextResponse.next();
  }
}

// シンプルなmatcher - APIを除外
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};