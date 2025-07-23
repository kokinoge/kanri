import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import Credentials from "next-auth/providers/credentials"
import { supabaseAdmin, authHelpers } from "@/lib/supabase"

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 🔒 セキュアなSupabase認証を使用
        const result = await authHelpers.signInSecure(
          credentials.email as string,
          credentials.password as string
        )

        if (!result.success || !result.user) {
          console.error('Authentication failed:', result.error)
          return null
        }

        return {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          department: result.user.department,
        }
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24時間（セキュリティ考慮）
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.department = user.department
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.department = token.department as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // 🛡️ 追加のセキュリティチェック
      if (!user.id || !user.email) {
        console.error('Invalid user data in signIn callback')
        return false
      }
      
      // アクティブユーザーのみログイン許可
      if (user.role && !['admin', 'manager', 'member'].includes(user.role)) {
        console.error('Invalid user role:', user.role)
        return false
      }
      
      return true
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // 🔒 セキュリティ設定強化
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `kanri.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60, // 24時間
      },
    },
  },
  
  // 🔍 ログ設定（開発環境のみ）
  debug: process.env.NODE_ENV === 'development',
  
  // 🛡️ セキュリティイベント
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`🔐 User signed in: ${user.email} (${user.role})`)
      
      // セキュリティ監査ログ（本番環境では外部ログシステムに送信）
      if (process.env.NODE_ENV === 'production') {
        // TODO: セキュリティログの送信
      }
    },
    async signOut({ session, token }) {
      console.log(`🚪 User signed out: ${session?.user?.email || 'unknown'}`)
    },
  },
}); 