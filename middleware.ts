import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // 認証が必要なページでの追加チェック
    return
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // 公開ページは認証不要
        const publicPaths = ['/login', '/api/auth']
        const isPublicPath = publicPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        )
        
        if (isPublicPath) {
          return true
        }
        
        // その他のページは認証が必要
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
} 