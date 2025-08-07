import { NextResponse } from 'next/server';

// 認証なしでアクセス可能なテストエンドポイント
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (length: ' + process.env.NEXTAUTH_SECRET.length + ')' : 'NOT SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET (starts with: ' + process.env.DATABASE_URL.substring(0, 20) + '...)' : 'NOT SET',
    },
    headers: {
      host: 'will be set by request',
      origin: 'will be set by request',
    }
  });
}