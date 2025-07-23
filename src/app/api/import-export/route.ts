import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

// スプレッドシートの列定義
const SHEET_COLUMNS = [
  '案件', '会社名', '対象月', '部門', '媒体', '運用タイプ', '担当者',
  '金額', '実績', 'ジャンル', '営業先', '営業担当'
];

// データの型定義
interface SpreadsheetRow {
  案件: string;
  会社名: string;
  対象月: string;
  部門: string;
  媒体: string;
  運用タイプ: string;
  担当者: string;
  金額: string;
  実績: string;
  ジャンル: string;
  営業先: string;
  営業担当: string;
}

function parseAmount(amountStr: string | number): number {
  if (typeof amountStr === 'number') {
    return isNaN(amountStr) ? 0 : amountStr;
  }
  if (typeof amountStr !== 'string') {
    return 0;
  }
  return parseFloat(amountStr.replace(/[¥,]/g, '')) || 0;
}

function parseDate(dateStr: string | number): { year: number; month: number } {
  // Excelのシリアル番号の場合
  if (typeof dateStr === 'number') {
    const excelDate = new Date((dateStr - 25569) * 86400 * 1000);
    return { 
      year: excelDate.getFullYear(), 
      month: excelDate.getMonth() + 1 
    };
  }
  
  // 文字列の場合
  if (typeof dateStr === 'string') {
    // "YY/MM" 形式
    if (dateStr.includes('/')) {
      const [year, month] = dateStr.split('/').map(num => parseInt(num));
      return { year: 2000 + year, month };
    }
    
    // "YYYY-MM" 形式
    if (dateStr.includes('-')) {
      const [year, month] = dateStr.split('-').map(num => parseInt(num));
      return { year, month };
    }
    
    // 数値文字列の場合はExcelシリアル番号として扱う
    const numValue = parseFloat(dateStr);
    if (!isNaN(numValue)) {
      const excelDate = new Date((numValue - 25569) * 86400 * 1000);
      return { 
        year: excelDate.getFullYear(), 
        month: excelDate.getMonth() + 1 
      };
    }
  }
  
  // デフォルト値
  const now = new Date();
  return { 
    year: now.getFullYear(), 
    month: now.getMonth() + 1 
  };
}

function mapBusinessDivision(division: string): string {
  const divisionMap: { [key: string]: string } = {
    'SNSメディア部門': 'SNSメディア事業部',
    'インフルエンサー部門': 'インフルエンサー事業部',
    '広告部門': '広告事業部'
  };
  return divisionMap[division] || division;
}

// データ整合性チェック関数
async function validateDataIntegrity(tx: any) {
  const budgetCount = await tx.budget.count();
  const resultCount = await tx.result.count();
  const clientCount = await tx.client.count();
  const campaignCount = await tx.campaign.count();
  
  console.log('[DATA_INTEGRITY_CHECK]', {
    budgets: budgetCount,
    results: resultCount,
    clients: clientCount,
    campaigns: campaignCount
  });
  
  // 基本的な整合性チェック
  if (budgetCount === 0 && resultCount === 0) {
    throw new Error('データが完全に空です');
  }
  
  if (clientCount === 0 && campaignCount > 0) {
    throw new Error('クライアントなしでキャンペーンが存在します');
  }
  
  if (campaignCount === 0 && (budgetCount > 0 || resultCount > 0)) {
    throw new Error('キャンペーンなしで予算/実績データが存在します');
  }
  
  return {
    budgetCount,
    resultCount,
    clientCount,
    campaignCount,
    isHealthy: true
  };
}

// インポート処理
export async function POST(request: NextRequest) {
  let importStartTime = Date.now();
  let importedData: any[] = [];
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: SHEET_COLUMNS }) as SpreadsheetRow[];

    // ヘッダー行をスキップ
    const rows = data.slice(1);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'インポートするデータがありません' }, { status: 400 });
    }
    
    let importedCount = 0;
    const validBusinessDivisions = ['SNSメディア事業部', 'インフルエンサー事業部', '広告事業部'];

    // インポート前の整合性チェック
    console.log('[IMPORT_START] データ整合性チェック開始');
    const preImportIntegrity = await validateDataIntegrity(prisma);
    
    // トランザクション処理でデータ整合性を確保
    const results = await prisma.$transaction(async (tx) => {
      const transactionResults = [];
      
      for (const row of rows) {
        if (!row.案件 || !row.会社名 || !row.対象月) {
          console.log('スキップ: 必須フィールド不足', row);
          continue;
        }

        const businessDivision = mapBusinessDivision(row.部門);
        if (!validBusinessDivisions.includes(businessDivision)) {
          console.log('スキップ: 無効な事業部', { division: row.部門, mapped: businessDivision });
          continue;
        }

        try {
          // データ検証
          if (!row.媒体 || !row.運用タイプ) {
            console.log('スキップ: 媒体または運用タイプが不足', {
              案件: row.案件,
              媒体: row.媒体,
              運用タイプ: row.運用タイプ
            });
            continue;
          }

          console.log('処理中のデータ:', {
            案件: row.案件,
            会社名: row.会社名,
            対象月: row.対象月,
            対象月型: typeof row.対象月,
            媒体: row.媒体,
            運用タイプ: row.運用タイプ
          });
          
          // 予算・実績データの作成
          const { year, month } = parseDate(row.対象月);
          const budgetAmount = parseAmount(row.金額);
          const resultAmount = parseAmount(row.実績);

          // クライアントの検索または作成
          let client = await tx.client.findFirst({
            where: { name: row.会社名 },
          });

          if (!client) {
            client = await tx.client.create({
              data: {
                name: row.会社名,
                salesDepartment: row.営業先 || '国内営業部',
                businessDivision: businessDivision,
                priority: 'C'
              },
            });
          }

          // キャンペーンの検索または作成
          let campaign = await tx.campaign.findFirst({
            where: {
              name: row.案件,
              clientId: client.id,
            },
          });

          if (!campaign) {
            campaign = await tx.campaign.create({
              data: {
                clientId: client.id,
                name: row.案件,
                purpose: row.ジャンル || '投稿予算',
                totalBudget: new Prisma.Decimal(budgetAmount),
                startYear: year,
                startMonth: month,
              },
            });
          }

          // 既存データをチェック
          const budgetWhere = {
            campaignId: campaign.id,
            year: year,
            month: month,
            platform: row.媒体,
            operationType: row.運用タイプ,
          };

          const existingBudget = await tx.budget.findFirst({
            where: budgetWhere,
          });

          if (!existingBudget) {
            await tx.budget.create({
              data: {
                campaignId: campaign.id,
                year: year,
                month: month,
                platform: row.媒体,
                operationType: row.運用タイプ,
                amount: new Prisma.Decimal(budgetAmount),
                budgetType: row.ジャンル || '投稿予算',
              },
            });
          } else {
            await tx.budget.update({
              where: { id: existingBudget.id },
              data: {
                amount: new Prisma.Decimal(budgetAmount),
                budgetType: row.ジャンル || '投稿予算',
              },
            });
          }

          const existingResult = await tx.result.findFirst({
            where: budgetWhere,
          });

          if (!existingResult) {
            await tx.result.create({
              data: {
                campaignId: campaign.id,
                year: year,
                month: month,
                platform: row.媒体,
                operationType: row.運用タイプ,
                actualSpend: new Prisma.Decimal(resultAmount),
                actualResult: new Prisma.Decimal(resultAmount),
                budgetType: row.ジャンル || '投稿予算',
              },
            });
          } else {
            await tx.result.update({
              where: { id: existingResult.id },
              data: {
                actualSpend: new Prisma.Decimal(resultAmount),
                actualResult: new Prisma.Decimal(resultAmount),
                budgetType: row.ジャンル || '投稿予算',
              },
            });
          }

          importedData.push({
            campaign: row.案件,
            client: row.会社名,
            year,
            month,
            platform: row.媒体,
            operationType: row.運用タイプ
          });

          transactionResults.push({ success: true, row });
          importedCount++;
        } catch (error) {
          console.error(`データ処理エラー:`, row, error);
          transactionResults.push({ success: false, row, error: error.message });
          throw error; // トランザクションを失敗させる
        }
      }
      
      // インポート後の整合性チェック
      console.log('[IMPORT_INTEGRITY_CHECK] トランザクション内整合性チェック');
      await validateDataIntegrity(tx);
      
      return transactionResults;
    }, {
      timeout: 30000, // 30秒のタイムアウト
    });

    // 最終的な整合性チェック
    console.log('[IMPORT_COMPLETE] 最終整合性チェック');
    const postImportIntegrity = await validateDataIntegrity(prisma);
    
    const processingTime = Date.now() - importStartTime;
    
    console.log('[IMPORT_SUCCESS]', {
      importedCount,
      processingTime: `${processingTime}ms`,
      preImport: preImportIntegrity,
      postImport: postImportIntegrity,
      newData: importedData
    });

    return NextResponse.json({
      success: true,
      message: `${importedCount}件のデータをインポートしました`,
      details: {
        importedCount,
        processingTime,
        dataIntegrity: postImportIntegrity,
        importedData: importedData.slice(0, 5) // 最初の5件のみ表示
      }
    });

  } catch (error) {
    const processingTime = Date.now() - importStartTime;
    
    console.error('[IMPORT_ERROR]', {
      error: error.message,
      stack: error.stack,
      processingTime: `${processingTime}ms`,
      importedDataBeforeError: importedData
    });

    // エラー発生時のデータ整合性チェック
    try {
      const errorIntegrity = await validateDataIntegrity(prisma);
      console.log('[ERROR_INTEGRITY_CHECK]', errorIntegrity);
    } catch (integrityError) {
      console.error('[INTEGRITY_CHECK_FAILED]', integrityError.message);
    }

    return NextResponse.json({
      success: false,
      error: 'インポートに失敗しました',
      details: {
        message: error.message,
        processingTime,
        partialData: importedData.length > 0 ? `${importedData.length}件の部分データ` : 'データなし'
      }
    }, { status: 500 });
  }
}

// エクスポート処理
export async function GET(request: NextRequest) {
  try {
    console.log('[EXPORT_API] エクスポート処理開始');
    
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const clientId = searchParams.get('clientId');
    const platform = searchParams.get('platform');
    const operationType = searchParams.get('operationType');
    const department = searchParams.get('department');

    console.log('[EXPORT_API] フィルター条件:', {
      year, month, clientId, platform, operationType, department
    });

    // 数値変換のヘルパー関数（Decimal型対応）
    const parseNumber = (value: string | number | any): number => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[¥,]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      // Prisma Decimal型の場合
      if (value && typeof value.toNumber === 'function') {
        return value.toNumber();
      }
      if (value && typeof value.toString === 'function') {
        const parsed = parseFloat(value.toString().replace(/[¥,]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // 金額フォーマット関数（Decimal型対応）
    const formatAmount = (amount: string | number | any): string => {
      const numValue = parseNumber(amount);
      return `¥${numValue.toLocaleString()}`;
    };

    // データ取得条件を設定（より詳細なフィルタリング）
    const budgetWhereConditions: any = {};
    const resultWhereConditions: any = {};
    
    // 基本的な日付フィルター
    if (year && year !== 'all') {
      budgetWhereConditions.year = parseInt(year);
      resultWhereConditions.year = parseInt(year);
    }
    if (month && month !== 'all') {
      budgetWhereConditions.month = parseInt(month);
      resultWhereConditions.month = parseInt(month);
    }
    
    // プラットフォーム・運用タイプフィルター
    if (platform && platform !== 'all') {
      budgetWhereConditions.platform = platform;
      resultWhereConditions.platform = platform;
    }
    if (operationType && operationType !== 'all') {
      budgetWhereConditions.operationType = operationType;
      resultWhereConditions.operationType = operationType;
    }

    // クライアント・事業部フィルター用の中間処理
    let targetCampaignIds: string[] = [];
    if (clientId && clientId !== 'all') {
      const clientCampaigns = await prisma.campaign.findMany({
        where: { clientId: clientId },
        select: { id: true }
      });
      targetCampaignIds = clientCampaigns.map(c => c.id);
    } else if (department && department !== 'all') {
      const departmentClients = await prisma.client.findMany({
        where: { businessDivision: department },
        select: { id: true }
      });
      const departmentCampaigns = await prisma.campaign.findMany({
        where: { clientId: { in: departmentClients.map(c => c.id) } },
        select: { id: true }
      });
      targetCampaignIds = departmentCampaigns.map(c => c.id);
    }

    // キャンペーンIDフィルターを適用
    if (targetCampaignIds.length > 0) {
      budgetWhereConditions.campaignId = { in: targetCampaignIds };
      resultWhereConditions.campaignId = { in: targetCampaignIds };
    }

    console.log('[EXPORT_API] 予算データ取得条件:', budgetWhereConditions);
    console.log('[EXPORT_API] 実績データ取得条件:', resultWhereConditions);

    // データを取得
    const budgets = await prisma.budget.findMany({
      where: budgetWhereConditions,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { campaign: { name: 'asc' } }
      ]
    });

    const results = await prisma.result.findMany({
      where: resultWhereConditions,
      include: {
        campaign: {
          include: {
            client: true
          }
        }
      }
    });

    console.log('[EXPORT_API] データ取得完了:', {
      budgets: budgets.length,
      results: results.length
    });

    // 結果をマッピング（改良版）
    const resultMap = new Map();
    results.forEach(result => {
      const key = `${result.campaignId}-${result.year}-${result.month}-${result.platform}-${result.operationType}`;
      resultMap.set(key, {
        actualSpend: parseNumber(result.actualSpend),
        actualResult: parseNumber(result.actualResult)
      });
    });

    // スプレッドシート用データを生成（改良版）
    const spreadsheetData = budgets.map(budget => {
      const key = `${budget.campaignId}-${budget.year}-${budget.month}-${budget.platform}-${budget.operationType}`;
      const result = resultMap.get(key);
      
      // 部門名を逆マッピング
      const divisionMap: { [key: string]: string } = {
        'SNSメディア事業部': 'SNSメディア部門',
        'インフルエンサー事業部': 'インフルエンサー部門',
        '広告事業部': '広告部門'
      };
      
      const budgetAmount = parseNumber(budget.amount);
      const actualSpend = result ? result.actualSpend : 0;
      const actualResult = result ? result.actualResult : 0;
      
      return {
        案件: budget.campaign.name,
        会社名: budget.campaign.client.name,
        対象月: `${budget.year.toString().slice(-2)}/${budget.month.toString().padStart(2, '0')}`,
        部門: divisionMap[budget.campaign.client.businessDivision] || budget.campaign.client.businessDivision,
        媒体: budget.platform,
        運用タイプ: budget.operationType,
        担当者: '', // 担当者情報は別途管理が必要
        金額: formatAmount(budgetAmount),
        実績: formatAmount(actualResult),
        ジャンル: budget.budgetType,
        営業先: budget.campaign.client.salesDepartment || '国内営業部',
        営業担当: '' // 営業担当情報は別途管理が必要
      };
    });

    console.log('[EXPORT_API] スプレッドシートデータ生成完了:', spreadsheetData.length);

    // フィルター適用された場合のファイル名を生成
    let filename = 'budget-data';
    const filterParts = [];
    if (year && year !== 'all') filterParts.push(`Y${year}`);
    if (month && month !== 'all') filterParts.push(`M${month}`);
    if (clientId && clientId !== 'all') filterParts.push('client-filtered');
    if (platform && platform !== 'all') filterParts.push(`${platform}`);
    if (operationType && operationType !== 'all') filterParts.push(`${operationType}`);
    if (department && department !== 'all') filterParts.push('dept-filtered');
    
    if (filterParts.length > 0) {
      filename += `-${filterParts.join('-')}`;
    }
    filename += `-${new Date().toISOString().split('T')[0]}.xlsx`;

    // Excelファイルを生成
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(spreadsheetData, { header: SHEET_COLUMNS });
    XLSX.utils.book_append_sheet(workbook, worksheet, '予算実績データ');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    console.log('[EXPORT_API] Excelファイル生成完了:', filename);

    const response = new NextResponse(excelBuffer);
    response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.headers.set('Content-Disposition', `attachment; filename=${filename}`);

    return response;

  } catch (error) {
    console.error('[EXPORT_API] エクスポートエラー:', error);
    return NextResponse.json(
      { error: 'エクスポート中にエラーが発生しました', details: error.message },
      { status: 500 }
    );
  }
} 