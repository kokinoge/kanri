import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const debugInfo = {
    providers: authOptions.providers.map(p => p.id),
    session: authOptions.session,
    pages: authOptions.pages,
    secret: authOptions.secret ? 'SET' : 'NOT SET',
    callbacks: {
      jwt: typeof authOptions.callbacks?.jwt === 'function' ? 'defined' : 'undefined',
      session: typeof authOptions.callbacks?.session === 'function' ? 'defined' : 'undefined'
    },
    adapter: authOptions.adapter ? 'PrismaAdapter' : 'none',
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV
    }
  };

  return NextResponse.json(debugInfo);
}