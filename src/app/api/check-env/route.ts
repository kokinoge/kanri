import { NextResponse } from 'next/server'

export async function GET() {
  // セキュリティのため、本番環境でのみ実行し、結果を制限
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ error: 'Development only' }, { status: 403 })
  }

  const envVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT_SET',
    NEXTAUTH_SECRET_LENGTH: process.env.NEXTAUTH_SECRET?.length || 0,
    NEXTAUTH_SECRET_FIRST_4: process.env.NEXTAUTH_SECRET?.substring(0, 4) || 'N/A',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV
  }

  return NextResponse.json(envVars)
} 