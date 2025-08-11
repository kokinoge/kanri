import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager", 
  MEMBER = "member"
}

export function hasPermission(userRole: string, action: string): boolean {
  const permissions = {
    [UserRole.ADMIN]: ["read", "write", "delete", "manage_users"],
    [UserRole.MANAGER]: ["read", "write"],
    [UserRole.MEMBER]: ["read"]
  }
  
  return permissions[userRole as UserRole]?.includes(action) || false
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // 一時的に無効化してテスト
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called with:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            return null
          }

          console.log('Attempting to find user:', credentials.email)
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            console.log('User not found:', credentials.email)
            return null
          }

          if (!user.isActive) {
            console.log('User is inactive:', credentials.email)
            return null
          }

          console.log('Comparing password for user:', credentials.email)
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log('Invalid password for user:', credentials.email)
            return null
          }

          console.log('Authentication successful for user:', credentials.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
          }
        } catch (error) {
          console.error('NextAuth authorize error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
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
        session.user.id = token.sub || ""
        session.user.role = token.role || "member"
        session.user.department = token.department || null
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}