import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[SHEETS_SETUP_API] Request received');
    
    const { spreadsheetId } = await request.json();

    if (!spreadsheetId) {
      console.log('[SHEETS_SETUP_API] Missing spreadsheetId');
      return NextResponse.json(
        { success: false, message: 'スプレッドシートIDが必要です' },
        { status: 400 }
      );
    }

    console.log('[SHEETS_SETUP_API] Setting up format for spreadsheet:', spreadsheetId);

    // 環境変数チェック
    const hasEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const hasKey = !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    
    console.log('[SHEETS_SETUP_API] Environment check:', { hasEmail, hasKey });

    if (!hasEmail || !hasKey) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Service Account環境変数が設定されていません',
          debug: { hasEmail, hasKey }
        },
        { status: 500 }
      );
    }

    // Google Sheets API実行
    try {
      const { setupSpreadsheetFormat } = await import('@/lib/google-sheets');
      const result = await setupSpreadsheetFormat(spreadsheetId);
      
      if (result.success) {
        console.log('[SHEETS_SETUP_API] Format setup completed successfully');
        return NextResponse.json(result);
      } else {
        console.error('[SHEETS_SETUP_API] Format setup failed:', result.message);
        return NextResponse.json(result, { status: 500 });
      }
    } catch (importError) {
      console.error('[SHEETS_SETUP_API] Import or execution error:', importError);
      return NextResponse.json(
        { 
          success: false, 
          message: `Google Sheets処理エラー: ${importError instanceof Error ? importError.message : '不明なエラー'}`,
          error: importError instanceof Error ? importError.stack : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[SHEETS_SETUP_API] Unexpected error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `フォーマット設定中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
        error: error instanceof Error ? error.stack : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GETエンドポイントも追加して基本的な動作確認
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Google Sheets Setup Format API is working',
    timestamp: new Date().toISOString(),
    environment: {
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      hasProjectId: !!process.env.GOOGLE_PROJECT_ID
    }
  });
}