// Googleapisの動的インポートを使用してバンドルサイズを最適化
let google: any;

// Google Sheets APIクライアントの初期化
export async function getGoogleSheetsClient() {
  // Googleapisを動的にインポート
  if (!google) {
    const googleapis = await import('googleapis');
    google = googleapis.google;
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  return google.sheets({ version: 'v4', auth });
}

// スプレッドシートのフォーマット設定
export async function setupSpreadsheetFormat(spreadsheetId: string) {
  const sheets = await getGoogleSheetsClient();

  try {
    console.log('[SHEETS_SETUP] Setting up format for spreadsheet:', spreadsheetId);

    // 新しいシートを作成
    const requests = [
      // Clientsシート作成
      {
        addSheet: {
          properties: {
            title: 'Clients',
            gridProperties: {
              rowCount: 1000,
              columnCount: 10,
            },
          },
        },
      },
      // Campaignsシート作成
      {
        addSheet: {
          properties: {
            title: 'Campaigns',
            gridProperties: {
              rowCount: 1000,
              columnCount: 15,
            },
          },
        },
      },
      // Budgetsシート作成
      {
        addSheet: {
          properties: {
            title: 'Budgets',
            gridProperties: {
              rowCount: 1000,
              columnCount: 12,
            },
          },
        },
      },
      // Resultsシート作成
      {
        addSheet: {
          properties: {
            title: 'Results',
            gridProperties: {
              rowCount: 1000,
              columnCount: 15,
            },
          },
        },
      },
      // Mediaシート作成
      {
        addSheet: {
          properties: {
            title: 'Media',
            gridProperties: {
              rowCount: 1000,
              columnCount: 14,
            },
          },
        },
      },
      // Summaryシート作成
      {
        addSheet: {
          properties: {
            title: 'Summary',
            gridProperties: {
              rowCount: 50,
              columnCount: 10,
            },
          },
        },
      },
    ];

    // シートを作成
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests,
      },
    });

    // ヘッダーを設定
    await setupHeaders(spreadsheetId);

    console.log('[SHEETS_SETUP] Format setup completed successfully');
    return { success: true, message: 'スプレッドシートのフォーマット設定が完了しました' };
  } catch (error) {
    console.error('[SHEETS_SETUP] Error:', error);
    return { 
      success: false, 
      message: `フォーマット設定に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
    };
  }
}

// ヘッダー設定
async function setupHeaders(spreadsheetId: string) {
  const sheets = await getGoogleSheetsClient();

  const updates = [
    // Clientsシートのヘッダー
    {
      range: 'Clients!A1:J1',
      values: [['ID', 'クライアント名', 'メールアドレス', '電話番号', '担当者', '部署', 'ステータス', '登録日', '更新日', '備考']],
    },
    // Campaignsシートのヘッダー
    {
      range: 'Campaigns!A1:O1',
      values: [['ID', 'キャンペーン名', 'クライアントID', 'クライアント名', '開始日', '終了日', '予算', '媒体', 'プラットフォーム', 'ターゲット', 'ステータス', '登録日', '更新日', '備考', 'KPI目標']],
    },
    // Budgetsシートのヘッダー
    {
      range: 'Budgets!A1:L1',
      values: [['ID', '年', '月', '部署', '予算カテゴリ', '予算額', '実績額', '差異', '進捗率', '担当者', '登録日', '更新日']],
    },
    // Resultsシートのヘッダー
    {
      range: 'Results!A1:O1',
      values: [['ID', 'キャンペーンID', 'キャンペーン名', '日付', 'インプレッション', 'クリック数', 'CTR', 'CPC', '費用', 'コンバージョン', 'CVR', 'CPA', 'ROAS', '登録日', '更新日']],
    },
    // Mediaシートのヘッダー
    {
      range: 'Media!A1:N1',
      values: [['ID', '媒体名', 'プラットフォーム', 'インプレッション', 'クリック数', 'CTR', '費用', 'コンバージョン', 'CPA', 'ROAS', 'ステータス', '登録日', '更新日', '備考']],
    },
    // Summaryシートのヘッダー
    {
      range: 'Summary!A1:J1',
      values: [['項目', '今月', '先月', '前年同月', '目標', '達成率', '前月比', '前年比', 'ステータス', '備考']],
    },
  ];

  for (const update of updates) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: update.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: update.values,
      },
    });
  }
}

// データ同期（既存データをスプレッドシートに書き込み）
export async function syncDataToSheets(
  spreadsheetId: string,
  entityType: 'clients' | 'campaigns' | 'budgets' | 'results' | 'media',
  data: any[],
  syncMode: 'append' | 'replace' | 'update' = 'replace'
) {
  const sheets = await getGoogleSheetsClient();

  try {
    console.log(`[SHEETS_SYNC] Syncing ${data.length} ${entityType} records to spreadsheet`);
    
    const sheetName = getSheetName(entityType);
    const range = `${sheetName}!A2:Z1000`; // ヘッダー行をスキップ

    if (syncMode === 'replace') {
      // 既存データをクリア
      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
      });
    }

    // データを変換
    const values = data.map(item => convertToSheetRow(item, entityType));

    if (values.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A2:Z${values.length + 1}`,
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });
    }

    console.log(`[SHEETS_SYNC] Successfully synced ${values.length} rows to ${sheetName} sheet`);
    return {
      success: true,
      message: `${data.length}件のデータを${sheetName}シートに同期しました`,
      recordCount: data.length,
      sheetName,
      syncMode,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    };
  } catch (error) {
    console.error('[SHEETS_SYNC] Error:', error);
    return {
      success: false,
      message: `データ同期に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
    };
  }
}

// エンティティタイプからシート名を取得
function getSheetName(entityType: string): string {
  const sheetNames = {
    clients: 'Clients',
    campaigns: 'Campaigns',
    budgets: 'Budgets',
    results: 'Results',
    media: 'Media',
  };
  return sheetNames[entityType as keyof typeof sheetNames] || 'Data';
}

// データオブジェクトをシート行に変換
function convertToSheetRow(item: any, entityType: string): string[] {
  switch (entityType) {
    case 'clients':
      return [
        item.id || '',
        item.name || '',
        item.email || '',
        item.phone || '',
        item.contactPerson || '',
        item.department || '',
        item.status || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('ja-JP') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '',
        item.notes || '',
      ];
    case 'campaigns':
      return [
        item.id || '',
        item.name || '',
        item.clientId || '',
        item.clientName || '',
        item.startDate ? new Date(item.startDate).toLocaleDateString('ja-JP') : '',
        item.endDate ? new Date(item.endDate).toLocaleDateString('ja-JP') : '',
        item.budget || '',
        item.media || '',
        item.platform || '',
        item.target || '',
        item.status || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('ja-JP') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '',
        item.notes || '',
        item.kpiTarget || '',
      ];
    case 'budgets':
      return [
        item.id || '',
        item.year || '',
        item.month || '',
        item.department || '',
        item.category || '',
        item.budgetAmount || '',
        item.actualAmount || '',
        item.variance || '',
        item.progressRate || '',
        item.assignee || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('ja-JP') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '',
      ];
    case 'results':
      return [
        item.id || '',
        item.campaignId || '',
        item.campaignName || '',
        item.date ? new Date(item.date).toLocaleDateString('ja-JP') : '',
        item.impressions || '',
        item.clicks || '',
        item.ctr || '',
        item.cpc || '',
        item.cost || '',
        item.conversions || '',
        item.cvr || '',
        item.cpa || '',
        item.roas || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('ja-JP') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '',
      ];
    case 'media':
      return [
        item.id || '',
        item.name || '',
        item.platform || '',
        item.impressions || '',
        item.clicks || '',
        item.ctr || '',
        item.cost || '',
        item.conversions || '',
        item.cpa || '',
        item.roas || '',
        item.status || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('ja-JP') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '',
        item.notes || '',
      ];
    default:
      return Object.values(item).map(val => String(val || ''));
  }
}