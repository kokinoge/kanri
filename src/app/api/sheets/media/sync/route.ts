import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[MEDIA_SYNC_API] Request received');
    
    const { spreadsheetId, syncMode = 'replace' } = await request.json();

    if (!spreadsheetId) {
      console.log('[MEDIA_SYNC_API] Missing spreadsheetId');
      return NextResponse.json(
        { success: false, message: 'スプレッドシートIDが必要です' },
        { status: 400 }
      );
    }

    console.log('[MEDIA_SYNC_API] Syncing media data to spreadsheet:', spreadsheetId);

    // 環境変数チェック
    const hasEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const hasKey = !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    
    console.log('[MEDIA_SYNC_API] Environment check:', { hasEmail, hasKey });

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

    // Mock媒体データ
    const mockMediaData = [
      { id: 'm1', name: 'Google Ads', platform: 'Google', impressions: 125000, clicks: 3200, ctr: 2.56, cost: 48000, conversions: 150, cpa: 320, roas: 250, status: 'Active', notes: '検索広告、ディスプレイ広告' },
      { id: 'm2', name: 'Facebook Ads', platform: 'Facebook', impressions: 98000, clicks: 2800, ctr: 2.86, cost: 35000, conversions: 120, cpa: 291.67, roas: 300, status: 'Active', notes: 'SNS広告、動画広告' },
      { id: 'm3', name: 'Instagram Ads', platform: 'Instagram', impressions: 86000, clicks: 2400, ctr: 2.79, cost: 28000, conversions: 90, cpa: 311.11, roas: 280, status: 'Active', notes: 'SNS広告、ストーリーズ広告' },
      { id: 'm4', name: 'YouTube Ads', platform: 'YouTube', impressions: 156000, clicks: 1800, ctr: 1.15, cost: 42000, conversions: 80, cpa: 525, roas: 200, status: 'Active', notes: '動画広告、TrueView' },
      { id: 'm5', name: 'TikTok Ads', platform: 'TikTok', impressions: 210000, clicks: 4200, ctr: 2.00, cost: 32000, conversions: 110, cpa: 290.91, roas: 350, status: 'Active', notes: 'ショート動画広告' },
    ];

    // Google Sheets API実行
    try {
      const { syncDataToSheets } = await import('@/lib/google-sheets');
      const result = await syncDataToSheets(spreadsheetId, 'media', mockMediaData, syncMode);
      
      if (result.success) {
        console.log('[MEDIA_SYNC_API] Media sync completed successfully');
        return NextResponse.json({
          success: true,
          message: `媒体データ${mockMediaData.length}件をスプレッドシートに同期しました`,
          data: {
            entityType: 'media',
            recordCount: mockMediaData.length,
            syncMode,
            spreadsheetId
          }
        });
      } else {
        console.error('[MEDIA_SYNC_API] Media sync failed:', result.message);
        return NextResponse.json(result, { status: 500 });
      }
    } catch (importError) {
      console.error('[MEDIA_SYNC_API] Import or execution error:', importError);
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
    console.error('[MEDIA_SYNC_API] Unexpected error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `媒体データ同期中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
        error: error instanceof Error ? error.stack : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GETエンドポイントも追加
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Media Sync API is working',
    timestamp: new Date().toISOString(),
    environment: {
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      hasProjectId: !!process.env.GOOGLE_PROJECT_ID
    }
  });
}