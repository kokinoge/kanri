import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("AUTH: Attempting login with", { email: credentials?.email, env: process.env.NODE_ENV })
        
        // 開発環境では簡易認証
        if (process.env.NODE_ENV === "development") {
          if (credentials?.email === "admin@example.com" && credentials?.password === "admin") {
            console.log("AUTH: Development login successful")
            return {
              id: "1",
              name: "管理者ユーザー",
              email: "admin@example.com",
              role: "admin",
              department: "管理部"
            }
          }
        }
        
        // 本番環境では実際のユーザー認証ロジックを実装
        // ここでは簡易的にadmin認証のみ
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          console.log("AUTH: Production login successful")
          return {
            id: "1",
            name: "管理者ユーザー",
            email: "admin@example.com",
            role: "admin",
            department: "管理部"
          }
        }
        
        console.log("AUTH: Login failed - invalid credentials")
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login', // エラー時もログインページにリダイレクト
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.department = user.department
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.department = token.department
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

// NextAuth handlerを作成
const { handlers, auth } = NextAuth(authOptions)

// App Router用のエクスポート
export { handlers as GET, handlers as POST }
export { authOptions, auth }
export default auth 