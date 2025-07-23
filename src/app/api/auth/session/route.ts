import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret-key"

export async function GET(request: NextRequest) {
  try {
    console.log('[AUTH_SESSION_DIRECT]', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
    
    const token = request.cookies.get('next-auth.session-token')?.value
    
    if (!token) {
      console.log('[AUTH_SESSION_DIRECT] No token found')
      return NextResponse.json({ user: null })
    }

    const decoded = verify(token, JWT_SECRET) as any
    console.log('[AUTH_SESSION_DIRECT] Token verified successfully')
    return NextResponse.json({ user: decoded })
    
  } catch (error) {
    console.error('[AUTH_SESSION_DIRECT_ERROR]', error)
    return NextResponse.json({ user: null })
  }
} 