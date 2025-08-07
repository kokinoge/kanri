import { NextResponse } from 'next/server';

export async function GET() {
  // DATABASE_URLを詳細に解析
  const dbUrl = process.env.DATABASE_URL || '';
  
  // 各文字をチェック
  const chars = dbUrl.split('').map((char, index) => ({
    index,
    char,
    code: char.charCodeAt(0),
    isSpace: char === ' ',
    isNewline: char === '\n' || char === '\r',
    isTab: char === '\t'
  }));
  
  // 特殊文字の位置を特定
  const specialChars = chars.filter(c => 
    c.isSpace || c.isNewline || c.isTab || c.code < 32 || c.code > 126
  );

  // パスワード部分を抽出（安全に）
  let passwordInfo = null;
  const passwordMatch = dbUrl.match(/:([^@]+)@/);
  if (passwordMatch) {
    const password = passwordMatch[1];
    passwordInfo = {
      length: password.length,
      chars: password.split('').map((char, i) => ({
        position: i,
        char: i < 3 || i >= password.length - 2 ? char : '*',
        code: char.charCodeAt(0),
        encoded: char === '%' ? 'possible encoding' : null
      }))
    };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
      VERCEL: process.env.VERCEL,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    databaseUrl: {
      totalLength: dbUrl.length,
      firstChars: dbUrl.substring(0, 30),
      lastChars: dbUrl.substring(dbUrl.length - 20),
      hasNewlines: dbUrl.includes('\n') || dbUrl.includes('\r'),
      hasSpaces: dbUrl.includes(' '),
      hasTabs: dbUrl.includes('\t'),
      specialCharsFound: specialChars.length,
      specialChars: specialChars.slice(0, 5), // 最初の5個だけ
      passwordInfo
    },
    recommendations: [
      'Vercelで環境変数を再設定してください',
      'NEXTAUTH_URL を https://kanri-six.vercel.app に変更',
      'DATABASE_URL に余分な文字（スペース、改行）がないか確認',
      '設定後、必ず Redeploy を実行'
    ]
  });
}