import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname
        
        // 公開ページ・APIのリスト
        const publicPaths = [
          '/auth/signin',
          '/api/public',
          '/debug'
        ]
        
        // 公開パスの場合は認証不要
        if (publicPaths.some(path => pathname.startsWith(path))) {
          return true
        }
        
        // その他のページは認証が必要
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}