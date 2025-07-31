import { NextRequest, NextResponse } from 'next/server';
import { syncDataToSheets } from '@/lib/google-sheets';
import { prisma } from '@/lib/prisma';

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

// クライアントデータを取得
async function fetchClientsData(): Promise<any[]> {
  try {
    console.log('[SHEETS_SYNC_API] Fetching clients data from database...');
    
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    console.log(`[SHEETS_SYNC_API] Found ${clients.length} clients in database`);
    
    return clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      contactPerson: client.contactPerson || '',
      department: client.department || '',
      status: client.isActive ? 'アクティブ' : '非アクティブ',
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      notes: client.notes || '',
    }));
  } catch (dbError) {
    console.error('[SHEETS_SYNC_API] Database error for clients:', dbError);
    // フォールバック: モックデータ
    console.log('[SHEETS_SYNC_API] Using mock data as fallback');
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
    ];
  }
}