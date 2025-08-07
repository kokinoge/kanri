import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 公開パス（認証不要）
const publicPaths = [
  '/auth/signin',
  '/api/auth',
  '/api/public',
  '/public-debug',
  '/debug',
];

// 静的ファイルとAPIパス
const staticPaths = [
  '/_next',
  '/favicon.ico',
  '/debug.html',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 静的ファイルはスキップ
  if (staticPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 公開パスはスキップ
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // トークンを確認
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 認証が必要なパスでトークンがない場合はサインインページへ
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};