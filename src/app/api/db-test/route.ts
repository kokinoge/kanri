import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || '';
  
  // URLをパースして情報を抽出（パスワードは隠す）
  let urlInfo: any = {
    isSet: !!dbUrl,
    length: dbUrl.length
  };

  if (dbUrl) {
    try {
      // postgresql://user:pass@host:port/db の形式をパース
      const match = dbUrl.match(/^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
      
      if (match) {
        const [, user, password, host, port, database] = match;
        urlInfo = {
          ...urlInfo,
          valid: true,
          user,
          passwordLength: password.length,
          passwordHasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
          passwordPreview: password.substring(0, 3) + '***',
          host,
          port,
          database,
          portIsNumber: !isNaN(Number(port))
        };
      } else {
        urlInfo.valid = false;
        urlInfo.format = 'Invalid format';
        
        // 一般的な問題をチェック
        if (dbUrl.includes(' ')) {
          urlInfo.issue = 'Contains spaces';
        } else if (dbUrl.includes('\n')) {
          urlInfo.issue = 'Contains newlines';
        } else if (!dbUrl.startsWith('postgresql://')) {
          urlInfo.issue = 'Does not start with postgresql://';
        } else {
          urlInfo.issue = 'Format parsing failed';
        }
      }
    } catch (error) {
      urlInfo.parseError = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  // 正しいフォーマットの例
  const correctFormat = {
    example: 'postgresql://postgres.PROJECT_ID:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres',
    notes: [
      'Special characters in password must be URL encoded',
      '! becomes %21',
      '@ becomes %40',
      ': becomes %3A'
    ]
  };

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    databaseUrl: urlInfo,
    correctFormat,
    recommendation: urlInfo.valid ? 'URL format looks correct' : 'Please check DATABASE_URL format in Vercel settings'
  });
}