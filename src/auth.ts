import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials", 
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 本番環境では環境変数から認証情報を取得
        const isProduction = process.env.NODE_ENV === 'production'
        const validEmail = process.env.ADMIN_EMAIL || "admin@example.com"
        const validPassword = process.env.ADMIN_PASSWORD || "admin"

        if (credentials?.email === validEmail && credentials?.password === validPassword) {
          return {
            id: "1",
            name: "管理者ユーザー",
            email: validEmail,
            role: "admin"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const { handlers, auth } = NextAuth(authOptions)
export { handlers, auth, authOptions }
export const { GET, POST } = handlers
export default auth
