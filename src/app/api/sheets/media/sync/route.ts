import { NextRequest, NextResponse } from 'next/server';
import { syncDataToSheets } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const { spreadsheetId, syncMode = 'replace' } = await request.json();

    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, message: 'スプレッドシートIDが必要です' },
        { status: 400 }
      );
    }

    console.log('[SHEETS_SYNC_API] Syncing media data to spreadsheet:', spreadsheetId);

    // 媒体データを取得（モックデータ）
    const mediaData = await fetchMediaData();

    console.log(`[SHEETS_SYNC_API] Found ${mediaData.length} media records`);

    // スプレッドシートに同期
    const result = await syncDataToSheets(
      spreadsheetId,
      'media',
      mediaData,
      syncMode
    );

    console.log('[SHEETS_SYNC_API] Media sync result:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[SHEETS_SYNC_API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `媒体データ同期中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
      },
      { status: 500 }
    );
  }
}

// 媒体データを取得（モックデータ）
async function fetchMediaData(): Promise<any[]> {
  console.log('[SHEETS_SYNC_API] Using mock media data');
  
  return [
    {
      id: 'media-1',
      name: 'Google Ads',
      platform: 'Google',
      impressions: 125000,
      clicks: 3200,
      ctr: '2.56%',
      cost: 48000,
      conversions: 85,
      cpa: 565,
      roas: 2.8,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'メインの検索広告キャンペーン',
    },
    {
      id: 'media-2',
      name: 'Facebook Ads',
      platform: 'Meta',
      impressions: 98000,
      clicks: 2800,
      ctr: '2.86%',
      cost: 35000,
      conversions: 72,
      cpa: 486,
      roas: 3.2,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'ソーシャルメディア広告',
    },
    {
      id: 'media-3',
      name: 'Instagram Ads',
      platform: 'Meta',
      impressions: 86000,
      clicks: 2400,
      ctr: '2.79%',
      cost: 28000,
      conversions: 58,
      cpa: 483,
      roas: 2.9,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'ビジュアル重視キャンペーン',
    },
    {
      id: 'media-4',
      name: 'YouTube Ads',
      platform: 'Google',
      impressions: 156000,
      clicks: 1800,
      ctr: '1.15%',
      cost: 42000,
      conversions: 45,
      cpa: 933,
      roas: 2.1,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '動画広告キャンペーン',
    },
    {
      id: 'media-5',
      name: 'TikTok Ads',
      platform: 'TikTok',
      impressions: 210000,
      clicks: 4200,
      ctr: '2.00%',
      cost: 32000,
      conversions: 96,
      cpa: 333,
      roas: 3.8,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '若年層ターゲット広告',
    },
    {
      id: 'media-6',
      name: 'Twitter Ads',
      platform: 'Twitter',
      impressions: 75000,
      clicks: 1500,
      ctr: '2.00%',
      cost: 18000,
      conversions: 32,
      cpa: 563,
      roas: 2.4,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'リアルタイム広告',
    },
    {
      id: 'media-7',
      name: 'LINE Ads',
      platform: 'LINE',
      impressions: 120000,
      clicks: 2200,
      ctr: '1.83%',
      cost: 25000,
      conversions: 55,
      cpa: 455,
      roas: 3.1,
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '日本国内向け広告',
    },
  ];
}