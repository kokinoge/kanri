import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // /auth/signin は誰でもアクセス可能
        if (req.nextUrl.pathname.startsWith("/auth/signin")) {
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