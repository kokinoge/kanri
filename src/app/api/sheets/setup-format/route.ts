import { NextRequest, NextResponse } from 'next/server';
import { setupSpreadsheetFormat } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const { spreadsheetId } = await request.json();

    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, message: 'スプレッドシートIDが必要です' },
        { status: 400 }
      );
    }

    console.log('[SHEETS_SETUP_API] Setting up format for spreadsheet:', spreadsheetId);

    const result = await setupSpreadsheetFormat(spreadsheetId);

    console.log('[SHEETS_SETUP_API] Setup result:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[SHEETS_SETUP_API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `フォーマット設定中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
      },
      { status: 500 }
    );
  }
}