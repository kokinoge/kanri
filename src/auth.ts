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
        if (credentials?.email === "admin@example.com" && 
           (credentials?.password === "admin" || credentials?.password === "admin123")) {
          return {
            id: "1",
            name: "管理者ユーザー",
            email: "admin@example.com"
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
