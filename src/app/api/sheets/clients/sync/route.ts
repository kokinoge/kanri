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

    console.log('[SHEETS_SYNC_API] Syncing clients data to spreadsheet:', spreadsheetId);

    // クライアントデータを取得（データベースから、またはモックデータ）
    const clientsData = await fetchClientsData();

    console.log(`[SHEETS_SYNC_API] Found ${clientsData.length} clients records`);

    // スプレッドシートに同期
    const result = await syncDataToSheets(
      spreadsheetId,
      'clients',
      clientsData,
      syncMode
    );

    console.log('[SHEETS_SYNC_API] Sync result:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[SHEETS_SYNC_API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `データ同期中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
      },
      { status: 500 }
    );
  }
}

// クライアントデータを取得（モックデータのみ）
async function fetchClientsData(): Promise<any[]> {
  console.log('[SHEETS_SYNC_API] Using mock client data');
  
  return [
    {
      id: 'client-1',
      name: 'サンプルクライアント1',
      email: 'client1@example.com',
      phone: '03-1234-5678',
      contactPerson: '田中太郎',
      department: 'マーケティング部',
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'サンプルデータ',
    },
    {
      id: 'client-2',
      name: 'サンプルクライアント2',
      email: 'client2@example.com',
      phone: '03-9876-5432',
      contactPerson: '佐藤花子',
      department: 'セールス部',
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'サンプルデータ',
    },
    {
      id: 'client-3',
      name: 'テストクライアント3',
      email: 'client3@example.com',
      phone: '03-5555-5555',
      contactPerson: '山田次郎',
      department: 'プロダクト部',
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'サンプルデータ',
    },
    {
      id: 'client-4',
      name: '株式会社テックソリューション',
      email: 'contact@techsolution.co.jp',
      phone: '03-6789-0123',
      contactPerson: '鈴木一郎',
      department: 'IT部',
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'システム開発案件担当',
    },
    {
      id: 'client-5',
      name: 'グローバル商事株式会社',
      email: 'info@global-trade.com',
      phone: '03-4567-8901',
      contactPerson: '高橋美穂',
      department: '企画部',
      status: 'アクティブ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'マーケティング支援案件',
    },
  ];
}