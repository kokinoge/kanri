import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { hasRequiredRole } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import Papa from 'papaparse';

// サポートされるデータ型
type DataType = 'results' | 'budgets' | 'clients' | 'campaigns';

// インポートオプション
interface ImportOptions {
  delimiter: ',' | ';' | '\t' | 'auto';
  encoding: 'utf-8' | 'shift_jis';
  skipEmptyLines: boolean;
  trimWhitespace: boolean;
  validateData: boolean;
}

// フィールドマッピング定義
const FIELD_CONFIGS = {
  results: {
    requiredFields: ['campaign_id', 'year', 'month', 'platform', 'operation_type'],
    optionalFields: ['budget_type', 'actual_spend', 'actual_result'],
    defaults: {
      budget_type: '月次予算',
      actual_spend: 0,
      actual_result: 0
    }
  },
  budgets: {
    requiredFields: ['campaign_id', 'year', 'month', 'platform', 'operation_type'],
    optionalFields: ['budget_type', 'amount', 'targetKpi', 'targetValue'],
    defaults: {
      budget_type: '月次予算',
      amount: 0,
      targetKpi: '',
      targetValue: 0
    }
  },
  clients: {
    requiredFields: ['name'],
    optionalFields: ['business_division', 'sales_department', 'sales_channel', 'agency', 'priority'],
    defaults: {
      business_division: 'SNSメディア事業部',
      sales_department: 'マーケティング部',
      sales_channel: '',
      agency: '',
      priority: 'B'
    }
  },
  campaigns: {
    requiredFields: ['client_id', 'name', 'start_year', 'start_month'],
    optionalFields: ['purpose', 'end_year', 'end_month', 'totalBudget'],
    defaults: {
      purpose: '広告運用',
      totalBudget: 0
    }
  }
};

// データ型自動判定（改良版）
function detectDataType(data: any[]): DataType | 'unknown' {
  if (!data || data.length === 0) return 'unknown';
  
  const headers = Object.keys(data[0]).map(h => h.toLowerCase().trim());
  console.log('[CSV_IMPORT] Headers detected:', headers);
  
  // 各データ型の判定
  for (const [type, config] of Object.entries(FIELD_CONFIGS)) {
    const requiredFields = config.requiredFields.map(f => f.toLowerCase());
    const hasAllRequired = requiredFields.every(field => 
      headers.includes(field) || 
      headers.includes(field.replace('_', '')) ||
      headers.some(h => h.includes(field.split('_')[0]))
    );
    
    if (hasAllRequired) {
      console.log(`[CSV_IMPORT] Detected type: ${type}`);
      return type as DataType;
    }
  }
  
  // フォールバック判定
  if (headers.includes('actual_spend') || headers.includes('actualspend')) return 'results';
  if (headers.includes('amount') && headers.includes('targetkpi')) return 'budgets';
  if (headers.includes('business_division') || headers.includes('businessdivision')) return 'clients';
  if (headers.includes('totalbudget') || headers.includes('total_budget')) return 'campaigns';
  
  console.log('[CSV_IMPORT] Could not detect data type');
  return 'unknown';
}

// CSV ファイル診断機能（拡張版）
function diagnoseCSVFile(fileContent: string): {
  suggestedDelimiter: ',' | ';' | '\t';
  lineCount: number;
  firstLineFieldCount: number;
  detectedEncoding: string;
  issues: string[];
  cleanedContent: string;
  hasComments: boolean;
  actualDataStartLine: number;
} {
  const lines = fileContent.split('\n');
  const issues: string[] = [];
  let hasComments = false;
  let actualDataStartLine = 0;
  
  // コメント行とBOMを除去
  let cleanedContent = fileContent;
  
  // BOM除去
  if (fileContent.charCodeAt(0) === 0xFEFF) {
    cleanedContent = fileContent.slice(1);
    issues.push('BOM（Byte Order Mark）を除去しました。');
  }
  
  // コメント行の検出と除去
  const nonEmptyLines = lines.filter(line => line.trim());
  let dataLines: string[] = [];
  let foundDataStart = false;
  
  nonEmptyLines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // コメント行の検出（#で始まる、または説明的な内容）
    if (trimmed.startsWith('#') || 
        trimmed.includes('必須フィールド') || 
        trimmed.includes('オプションフィールド') ||
        trimmed.includes('フィールド説明')) {
      hasComments = true;
      return;
    }
    
    // 実際のヘッダー行を検出
    if (!foundDataStart) {
      const commaCount = (trimmed.match(/,/g) || []).length;
      const validFieldPattern = /^[a-zA-Z_]+,/; // 英数字_で始まるフィールド名
      
      if (commaCount >= 2 && (validFieldPattern.test(trimmed) || 
          trimmed.includes('campaign_id') || 
          trimmed.includes('name') ||
          trimmed.includes('year'))) {
        foundDataStart = true;
        actualDataStartLine = index;
        dataLines.push(line);
      }
    } else {
      dataLines.push(line);
    }
  });
  
  if (hasComments) {
    cleanedContent = dataLines.join('\n');
    issues.push('説明行・コメント行を除去しました。');
  }
  
  // 区切り文字判定（クリーンなデータで）
  const firstDataLine = dataLines[0] || '';
  const commaCount = (firstDataLine.match(/,/g) || []).length;
  const semicolonCount = (firstDataLine.match(/;/g) || []).length;
  const tabCount = (firstDataLine.match(/\t/g) || []).length;
  
  let suggestedDelimiter: ',' | ';' | '\t' = ',';
  let firstLineFieldCount = 1;
  
  if (commaCount > 0) {
    suggestedDelimiter = ',';
    firstLineFieldCount = commaCount + 1;
  } else if (semicolonCount > 0) {
    suggestedDelimiter = ';';
    firstLineFieldCount = semicolonCount + 1;
    issues.push('セミコロン区切り（;）が検出されました。カンマ区切り（,）に変更することを推奨します。');
  } else if (tabCount > 0) {
    suggestedDelimiter = '\t';
    firstLineFieldCount = tabCount + 1;
    issues.push('タブ区切りが検出されました。カンマ区切り（,）に変更することを推奨します。');
  } else {
    issues.push('区切り文字が検出されませんでした。カンマ区切り（,）のCSVファイルである必要があります。');
  }
  
  // エンコーディング判定
  let detectedEncoding = 'UTF-8';
  if (fileContent.includes('') || 
      fileContent.includes('ã') ||
      fileContent.includes('')) {
    detectedEncoding = 'Shift_JIS (問題あり)';
    issues.push('文字化けが検出されました。UTF-8エンコーディングで保存し直してください。');
  }
  
  // その他の問題チェック
  if (dataLines.length < 2) {
    issues.push('ヘッダー行のみでデータ行がありません。');
  }
  
  if (firstLineFieldCount < 3) {
    issues.push(`フィールド数が少なすぎます（${firstLineFieldCount}個）。テンプレートと比較してください。`);
  }
  
  return {
    suggestedDelimiter,
    lineCount: dataLines.length,
    firstLineFieldCount,
    detectedEncoding,
    issues,
    cleanedContent,
    hasComments,
    actualDataStartLine
  };
}

// 安全なCSV解析（診断機能付き・拡張版）
async function parseCSVFile(file: File, options: ImportOptions): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileContent = await file.text();
      
      // ファイル診断（拡張版）
      const diagnosis = diagnoseCSVFile(fileContent);
      console.log('[CSV_IMPORT] File diagnosis:', diagnosis);
      
      // 文字化け警告
      if (diagnosis.detectedEncoding.includes('問題あり')) {
        console.warn('[CSV_IMPORT] Character encoding issues detected');
      }
      
      // 診断結果に基づく区切り文字設定
      let delimiter = options.delimiter;
      if (delimiter === 'auto') {
        delimiter = diagnosis.suggestedDelimiter;
      }
      
      console.log('[CSV_IMPORT] Using delimiter:', delimiter);
      console.log('[CSV_IMPORT] Using cleaned content:', diagnosis.hasComments);
      
      // クリーンなコンテンツを使用
      const contentToParse = diagnosis.cleanedContent || fileContent;
      
      Papa.parse(contentToParse, {
        header: true,
        delimiter: delimiter,
        skipEmptyLines: options.skipEmptyLines,
        transformHeader: (header: string) => {
          const cleaned = options.trimWhitespace && typeof header === 'string' 
            ? header.trim().toLowerCase() 
            : header.toLowerCase();
          
          // 無効なヘッダーを除外
          if (cleaned.startsWith('#') || 
              cleaned.includes('説明') ||
              cleaned.includes('フィールド') ||
              cleaned === '' ||
              cleaned.startsWith('_')) {
            return null; // この列をスキップ
          }
          
          return cleaned;
        },
        transform: (value: any, header: string) => {
          // 無効なヘッダーの列はスキップ
          if (!header || header.startsWith('#')) {
            return null;
          }
          
          if (options.trimWhitespace && typeof value === 'string') {
            return value.trim();
          }
          return value;
        },
        complete: (results: Papa.ParseResult<any>) => {
          console.log('[CSV_IMPORT] Parse complete:', {
            rows: results.data.length,
            errors: results.errors.length,
            meta: results.meta
          });
          
          // データフィルタリング（無効なデータを除去）
          const filteredData = results.data.filter(row => {
            // 空行やコメント行を除外
            if (!row || Object.keys(row).length === 0) return false;
            
            // すべての値が空の行を除外
            const values = Object.values(row);
            if (values.every(v => !v || String(v).trim() === '')) return false;
            
            // コメント行っぽいデータを除外
            const firstValue = String(values[0] || '').trim();
            if (firstValue.startsWith('#') || 
                firstValue.includes('必須フィールド') ||
                firstValue.includes('説明')) return false;
            
            return true;
          });
          
          console.log('[CSV_IMPORT] Filtered data rows:', filteredData.length);
          
          if (results.errors.length > 0) {
            console.error('[CSV_IMPORT] Parse errors:', results.errors);
            
            // TooManyFields エラーの場合は詳細診断を含める
            const tooManyFieldsErrors = results.errors.filter(e => e.code === 'TooManyFields');
            if (tooManyFieldsErrors.length > 0) {
              let errorMessage = `CSV形式エラー: ファイル形式に問題があります。\n\n`;
              errorMessage += `📊 ファイル診断結果:\n`;
              errorMessage += `• ファイル行数: ${diagnosis.lineCount}\n`;
              errorMessage += `• 推奨区切り文字: "${diagnosis.suggestedDelimiter}"\n`;
              errorMessage += `• 1行目フィールド数: ${diagnosis.firstLineFieldCount}\n`;
              errorMessage += `• エンコーディング: ${diagnosis.detectedEncoding}\n`;
              errorMessage += `• コメント行検出: ${diagnosis.hasComments ? 'あり' : 'なし'}\n\n`;
              
              if (diagnosis.issues.length > 0) {
                errorMessage += `⚠️ 検出された問題:\n`;
                diagnosis.issues.forEach((issue, index) => {
                  errorMessage += `${index + 1}. ${issue}\n`;
                });
                errorMessage += `\n`;
              }
              
              errorMessage += `🔧 解決方法:\n`;
              errorMessage += `• テンプレートから新しいファイルを作成\n`;
              errorMessage += `• 説明行やコメント行を削除\n`;
              errorMessage += `• UTF-8エンコーディングで保存\n`;
              errorMessage += `• カンマ区切り（,）のCSVファイルとして保存`;
              
              reject(new Error(errorMessage));
              return;
            }
            
            reject(new Error(`CSV解析エラー: ${results.errors[0].message}`));
            return;
          }
          
          // データが空の場合のチェック
          if (!filteredData || filteredData.length === 0) {
            reject(new Error(
              'CSVファイルに有効なデータが含まれていません。\n\n' +
              '以下を確認してください:\n' +
              '• ヘッダー行が正しい形式（campaign_id, year, month等）\n' +
              '• データ行が存在する\n' +
              '• 説明行やコメント行（#で始まる行）を削除\n' +
              '• テンプレートからファイルを作成し直す'
            ));
            return;
          }
          
          resolve(filteredData);
        },
        error: (error: any) => {
          reject(new Error(`ファイル読み込みエラー: ${error.message}`));
        }
      });
    } catch (error) {
      reject(new Error(`ファイル処理エラー: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

// データバリデーション
function validateData(data: any[], dataType: DataType): { valid: any[], errors: string[] } {
  const config = FIELD_CONFIGS[dataType];
  const validData: any[] = [];
  const errors: string[] = [];
  
  data.forEach((row, index) => {
    const rowNum = index + 2;
    
    // 空行スキップ
    if (Object.values(row).every(v => !v || String(v).trim() === '')) {
      return;
    }
    
    const processedRow: any = {};
    let hasErrors = false;
    
    // 必須フィールドチェック
    config.requiredFields.forEach(field => {
      const value = row[field] || row[field.replace('_', '')] || row[field + 'id'];
      if (!value || String(value).trim() === '') {
        errors.push(`${rowNum}行目: ${field}は必須です`);
        hasErrors = true;
      } else {
        processedRow[field] = value;
      }
    });
    
    // オプションフィールド処理
    config.optionalFields.forEach(field => {
      const value = row[field] || row[field.replace('_', '')] || row[field + 'id'];
      processedRow[field] = value || config.defaults[field as keyof typeof config.defaults];
    });
    
    // 数値フィールドの変換
    ['campaign_id', 'client_id', 'year', 'month', 'actual_spend', 'actual_result', 'amount', 'targetValue', 'totalBudget'].forEach(field => {
      if (processedRow[field] !== undefined) {
        const numValue = parseFloat(String(processedRow[field]).replace(/[¥,]/g, ''));
        if (!isNaN(numValue)) {
          processedRow[field] = numValue;
        }
      }
    });
    
    if (!hasErrors) {
      validData.push(processedRow);
    }
  });
  
  return { valid: validData, errors };
}

// 統一インポート処理
async function importData(data: any[], dataType: DataType) {
  const result = { created: 0, updated: 0, errors: [] as string[] };
  
  await prisma.$transaction(async (tx) => {
    for (const [index, row] of data.entries()) {
      try {
        switch (dataType) {
          case 'results':
            await importResultRow(tx, row, result);
            break;
          case 'budgets':
            await importBudgetRow(tx, row, result);
            break;
          case 'clients':
            await importClientRow(tx, row, result);
            break;
          case 'campaigns':
            await importCampaignRow(tx, row, result);
            break;
        }
      } catch (error) {
        const errorMsg = `${index + 2}行目: ${error instanceof Error ? error.message : '不明なエラー'}`;
        result.errors.push(errorMsg);
        console.error('[CSV_IMPORT] Row import error:', errorMsg, row);
      }
    }
  });
  
  return result;
}

// 個別インポート関数
async function importResultRow(tx: any, row: any, result: any) {
  // 案件存在チェック（IDを文字列に変換）
  const campaign = await tx.campaign.findUnique({ where: { id: String(row.campaign_id || row.campaignid) } });
  if (!campaign) {
    throw new Error(`案件ID ${row.campaign_id || row.campaignid} が見つかりません`);
  }
  
  // CSVフィールド名からデータベースカラム名へのマッピング
  const resultData = {
    campaignId: String(row.campaign_id || row.campaignid),
    year: parseInt(row.year),
    month: parseInt(row.month),
    platform: row.platform,
    operationType: row.operation_type || row.operationtype,
    budgetType: row.budget_type || row.budgettype || '月次予算',
    actualSpend: parseFloat(row.actual_spend || row.actualspend || 0),
    actualResult: parseFloat(row.actual_result || row.actualresult || 0)
  };
  
  const existing = await tx.result.findFirst({
    where: {
      campaignId: resultData.campaignId,
      year: resultData.year,
      month: resultData.month,
      platform: resultData.platform,
      operationType: resultData.operationType
    }
  });
  
  if (existing) {
    await tx.result.update({
      where: { id: existing.id },
      data: {
        budgetType: resultData.budgetType,
        actualSpend: resultData.actualSpend,
        actualResult: resultData.actualResult
      }
    });
    result.updated++;
  } else {
    await tx.result.create({
      data: resultData
    });
    result.created++;
  }
}

async function importBudgetRow(tx: any, row: any, result: any) {
  const campaign = await tx.campaign.findUnique({ where: { id: String(row.campaign_id || row.campaignid) } });
  if (!campaign) {
    throw new Error(`案件ID ${row.campaign_id || row.campaignid} が見つかりません`);
  }
  
  // CSVフィールド名からデータベースカラム名へのマッピング
  const budgetData = {
    campaignId: String(row.campaign_id || row.campaignid),
    year: parseInt(row.year),
    month: parseInt(row.month),
    platform: row.platform,
    operationType: row.operation_type || row.operationtype,
    budgetType: row.budget_type || row.budgettype || '月次予算',
    amount: parseFloat(row.amount || 0),
    targetKpi: row.targetKpi || row.targetkpi || '',
    targetValue: parseFloat(row.targetValue || row.targetvalue || 0)
  };
  
  const existing = await tx.budget.findFirst({
    where: {
      campaignId: budgetData.campaignId,
      year: budgetData.year,
      month: budgetData.month,
      platform: budgetData.platform,
      operationType: budgetData.operationType
    }
  });
  
  if (existing) {
    await tx.budget.update({
      where: { id: existing.id },
      data: {
        budgetType: budgetData.budgetType,
        amount: budgetData.amount,
        targetKpi: budgetData.targetKpi,
        targetValue: budgetData.targetValue
      }
    });
    result.updated++;
  } else {
    await tx.budget.create({
      data: budgetData
    });
    result.created++;
  }
}

async function importClientRow(tx: any, row: any, result: any) {
  const existing = await tx.client.findFirst({
    where: { name: row.name }
  });
  
  // CSVフィールド名からデータベースカラム名へのマッピング
  const clientData = {
    name: row.name,
    businessDivision: row.business_division || row.businessdivision || row.businessDivision,
    salesDepartment: row.sales_department || row.salesdepartment || row.salesDepartment,
    salesChannel: row.sales_channel || row.saleschannel || row.salesChannel,
    agency: row.agency || '',
    priority: row.priority || 'B'
  };
  
  console.log('[CSV_IMPORT] Client data mapping:', {
    csv: row,
    mapped: clientData
  });
  
  if (existing) {
    await tx.client.update({
      where: { id: existing.id },
      data: clientData
    });
    result.updated++;
  } else {
    await tx.client.create({
      data: clientData
    });
    result.created++;
  }
}

async function importCampaignRow(tx: any, row: any, result: any) {
  const client = await tx.client.findUnique({ where: { id: String(row.client_id || row.clientid) } });
  if (!client) {
    throw new Error(`クライアントID ${row.client_id || row.clientid} が見つかりません`);
  }
  
  // CSVフィールド名からデータベースカラム名へのマッピング
  const campaignData = {
    name: row.name,
    clientId: String(row.client_id || row.clientid),
    purpose: row.purpose || '広告運用',
    startYear: parseInt(row.start_year || row.startyear),
    startMonth: parseInt(row.start_month || row.startmonth),
    endYear: row.end_year || row.endyear ? parseInt(row.end_year || row.endyear) : null,
    endMonth: row.end_month || row.endmonth ? parseInt(row.end_month || row.endmonth) : null,
    totalBudget: parseFloat(row.totalBudget || row.totalbudget || 0)
  };
  
  const existing = await tx.campaign.findFirst({
    where: {
      name: campaignData.name,
      clientId: campaignData.clientId
    }
  });
  
  if (existing) {
    await tx.campaign.update({
      where: { id: existing.id },
      data: {
        purpose: campaignData.purpose,
        startYear: campaignData.startYear,
        startMonth: campaignData.startMonth,
        endYear: campaignData.endYear,
        endMonth: campaignData.endMonth,
        totalBudget: campaignData.totalBudget
      }
    });
    result.updated++;
  } else {
    await tx.campaign.create({
      data: campaignData
    });
    result.created++;
  }
}

// メインAPI
export async function POST(request: NextRequest) {
  try {
    console.log('[CSV_IMPORT] Import request received');

    // 認証チェック（開発時は一時的にスキップ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    */

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const dataType = formData.get('dataType') as string;
    const options = JSON.parse(formData.get('options') as string || '{}') as ImportOptions;

    if (!file) {
      return NextResponse.json({ 
        success: false, 
        message: "ファイルが提供されていません" 
      }, { status: 400 });
    }

    console.log('[CSV_IMPORT] Processing file:', {
      name: file.name,
      size: file.size,
      type: file.type,
      dataType,
      options
    });

    // CSV解析
    const csvData = await parseCSVFile(file, {
      delimiter: 'auto',
      encoding: 'utf-8',
      skipEmptyLines: true,
      trimWhitespace: true,
      validateData: true,
      ...options
    });

    console.log('[CSV_IMPORT] CSV parsed successfully, rows:', csvData.length);

    // データ型判定
    const detectedType = dataType !== 'auto' ? dataType as DataType : detectDataType(csvData);
    
    if (detectedType === 'unknown') {
      const headers = csvData.length > 0 ? Object.keys(csvData[0]) : [];
      return NextResponse.json({
        success: false,
        message: "CSVの形式を判定できませんでした。データ型を手動で選択してください。",
        error: `検出されたヘッダー: ${headers.join(', ')}`,
        supportedFormats: FIELD_CONFIGS
      }, { status: 400 });
    }

    console.log('[CSV_IMPORT] Data type:', detectedType);

    // データバリデーション
    const { valid, errors } = validateData(csvData, detectedType);
    
    if (valid.length === 0) {
      return NextResponse.json({
        success: false,
        message: "有効なデータが見つかりませんでした",
        validationErrors: errors
      }, { status: 400 });
    }

    // インポート実行
    const importResult = await importData(valid, detectedType);

    console.log('[CSV_IMPORT] Import completed:', importResult);

    return NextResponse.json({
      success: true,
      message: `${detectedType}データのインポートが完了しました`,
      dataType: detectedType,
      ...importResult,
      validationErrors: errors // バリデーションエラーも返す
    });

  } catch (error) {
    console.error('[CSV_IMPORT] Import error:', error);
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "インポート処理でエラーが発生しました",
      error: error instanceof Error ? error.toString() : "Unknown error"
    }, { status: 500 });
  }
} 