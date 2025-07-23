import Papa from 'papaparse';

export interface CSVExportOptions {
  format: 'standard' | 'detailed' | 'summary';
  dateFormat: 'YY/MM' | 'YYYY-MM-DD' | 'YYYY年MM月';
  numberFormat: 'raw' | 'formatted' | 'currency';
  encoding: 'utf-8' | 'shift_jis';
  delimiter: ',' | ';' | '\t';
  includeHeaders: boolean;
}

export interface CSVImportOptions {
  delimiter: ',' | ';' | '\t' | 'auto';
  encoding: 'utf-8' | 'shift_jis';
  skipEmptyLines: boolean;
  trimWhitespace: boolean;
  validateData: boolean;
}

export const DEFAULT_CSV_OPTIONS: CSVExportOptions = {
  format: 'standard',
  dateFormat: 'YYYY年MM月',
  numberFormat: 'formatted',
  encoding: 'utf-8',
  delimiter: ',',
  includeHeaders: true
};

export const DEFAULT_IMPORT_OPTIONS: CSVImportOptions = {
  delimiter: 'auto',
  encoding: 'utf-8',
  skipEmptyLines: true,
  trimWhitespace: true,
  validateData: true
};

// 日付フォーマット
export function formatDateForCSV(year: number, month: number, format: CSVExportOptions['dateFormat']): string {
  switch (format) {
    case 'YY/MM':
      return `${year.toString().slice(-2)}/${month.toString().padStart(2, '0')}`;
    case 'YYYY-MM-DD':
      return `${year}-${month.toString().padStart(2, '0')}-01`;
    case 'YYYY年MM月':
    default:
      return `${year}年${month}月`;
  }
}

// 数値フォーマット
export function formatNumberForCSV(value: number | string, format: CSVExportOptions['numberFormat']): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  
  switch (format) {
    case 'currency':
      return `¥${num.toLocaleString('ja-JP')}`;
    case 'formatted':
      return num.toLocaleString('ja-JP');
    case 'raw':
    default:
      return num.toString();
  }
}

// 日付パース（インポート用）
export function parseDateFromCSV(dateStr: any): { year: number; month: number } | null {
  if (!dateStr) return null;
  
  const stringValue = typeof dateStr === 'string' ? dateStr : String(dateStr);
  if (stringValue.trim() === '') return null;
  
  // YYYY年MM月 形式
  const yearMonthMatch = stringValue.match(/(\d{4})年(\d{1,2})月/);
  if (yearMonthMatch) {
    return { year: parseInt(yearMonthMatch[1]), month: parseInt(yearMonthMatch[2]) };
  }
  
  // YYYY-MM-DD 形式
  const isoMatch = stringValue.match(/(\d{4})-(\d{1,2})-\d{1,2}/);
  if (isoMatch) {
    return { year: parseInt(isoMatch[1]), month: parseInt(isoMatch[2]) };
  }
  
  // YY/MM 形式
  const shortMatch = stringValue.match(/(\d{2})\/(\d{1,2})/);
  if (shortMatch) {
    const year = parseInt(shortMatch[1]);
    const fullYear = year < 50 ? 2000 + year : 1900 + year; // 50年未満は2000年代と仮定
    return { year: fullYear, month: parseInt(shortMatch[2]) };
  }
  
  return null;
}

// 数値パース（インポート用）
export function parseNumberFromCSV(value: any): number {
  if (!value) return 0;
  
  const stringValue = typeof value === 'string' ? value : String(value);
  if (stringValue.trim() === '') return 0;
  
  // ¥記号やカンマを除去
  const cleanValue = stringValue.replace(/[¥,]/g, '').trim();
  const num = parseFloat(cleanValue);
  return isNaN(num) ? 0 : num;
}

// 実績データのCSV変換
export function convertResultsToCSV(results: any[], options: CSVExportOptions = DEFAULT_CSV_OPTIONS): string {
  const csvData = results.map(result => ({
    '年月': formatDateForCSV(result.year, result.month, options.dateFormat),
    'クライアント': result.campaign?.client?.name || '',
    '案件名': result.campaign?.name || '',
    'プラットフォーム': result.platform,
    '運用タイプ': result.operationType,
    '予算タイプ': result.budgetType,
    '支出額': formatNumberForCSV(result.actualSpend, options.numberFormat),
    '実績': formatNumberForCSV(result.actualResult, options.numberFormat),
    'ROAS': result.actualSpend > 0 ? (result.actualResult / result.actualSpend).toFixed(2) : '0',
    '事業部': result.campaign?.client?.businessDivision || '',
    '作成日時': new Date().toISOString().split('T')[0]
  }));

  return Papa.unparse(csvData, {
    header: options.includeHeaders,
    delimiter: options.delimiter
  });
}

// クライアントデータのCSV変換
export function convertClientsToCSV(clients: any[], options: CSVExportOptions = DEFAULT_CSV_OPTIONS): string {
  const csvData = clients.map(client => ({
    'クライアント名': client.name,
    '事業部': client.businessDivision || '',
    '営業担当': client.manager?.name || '',
    '営業部門': client.salesDepartment || '',
    '営業チャネル': client.salesChannel || '',
    '代理店': client.agency || '',
    '優先度': client.priority || '',
    '作成日時': formatDateForCSV(
      new Date(client.createdAt).getFullYear(),
      new Date(client.createdAt).getMonth() + 1,
      options.dateFormat
    )
  }));

  return Papa.unparse(csvData, {
    header: options.includeHeaders,
    delimiter: options.delimiter
  });
}

// 案件データのCSV変換
export function convertCampaignsToCSV(campaigns: any[], options: CSVExportOptions = DEFAULT_CSV_OPTIONS): string {
  const csvData = campaigns.map(campaign => ({
    '案件名': campaign.name,
    'クライアント': campaign.client?.name || '',
    '事業部': campaign.client?.businessDivision || '',
    '目的': campaign.purpose || '',
    '開始年月': formatDateForCSV(campaign.startYear, campaign.startMonth, options.dateFormat),
    '終了年月': campaign.endYear && campaign.endMonth 
      ? formatDateForCSV(campaign.endYear, campaign.endMonth, options.dateFormat) 
      : '継続中',
    '総予算': formatNumberForCSV(campaign.totalBudget, options.numberFormat),
    '作成日時': formatDateForCSV(
      new Date(campaign.createdAt).getFullYear(),
      new Date(campaign.createdAt).getMonth() + 1,
      options.dateFormat
    )
  }));

  return Papa.unparse(csvData, {
    header: options.includeHeaders,
    delimiter: options.delimiter
  });
}

// 予算データのCSV変換
export function convertBudgetsToCSV(budgets: any[], options: CSVExportOptions = DEFAULT_CSV_OPTIONS): string {
  const csvData = budgets.map(budget => ({
    '年月': formatDateForCSV(budget.year, budget.month, options.dateFormat),
    'クライアント': budget.campaign?.client?.name || '',
    '案件名': budget.campaign?.name || '',
    'プラットフォーム': budget.platform,
    '運用タイプ': budget.operationType,
    '予算タイプ': budget.budgetType,
    '予算金額': formatNumberForCSV(budget.amount, options.numberFormat),
    '目標KPI': budget.targetKpi || '',
    '目標値': budget.targetValue ? formatNumberForCSV(budget.targetValue, options.numberFormat) : '',
    '事業部': budget.campaign?.client?.businessDivision || '',
    '作成日時': formatDateForCSV(
      new Date(budget.createdAt).getFullYear(),
      new Date(budget.createdAt).getMonth() + 1,
      options.dateFormat
    )
  }));

  return Papa.unparse(csvData, {
    header: options.includeHeaders,
    delimiter: options.delimiter
  });
}

// 全データ統合CSV変換
export function convertAllDataToCSV(
  data: {
    results: any[];
    budgets: any[];
    clients: any[];
    campaigns: any[];
  },
  options: CSVExportOptions = DEFAULT_CSV_OPTIONS
): string {
  const sections = [
    '# 実績データ',
    convertResultsToCSV(data.results, options),
    '',
    '# 予算データ',
    convertBudgetsToCSV(data.budgets, options),
    '',
    '# クライアントデータ',
    convertClientsToCSV(data.clients, options),
    '',
    '# 案件データ',
    convertCampaignsToCSV(data.campaigns, options)
  ];

  return sections.join('\n');
}

// CSVブロブ作成（文字エンコーディング対応）
export function createCSVBlob(csvContent: string, encoding: 'utf-8' | 'shift_jis' = 'utf-8'): Blob {
  if (encoding === 'shift_jis') {
    // Shift_JISエンコーディングの場合は、BOMを追加
    const bom = '\uFEFF';
    return new Blob([bom + csvContent], { type: 'text/csv;charset=shift_jis' });
  } else {
    // UTF-8の場合
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  }
}

// CSVダウンロード実行
export function downloadCSV(
  csvContent: string, 
  filename: string, 
  options: CSVExportOptions = DEFAULT_CSV_OPTIONS
): void {
  const blob = createCSVBlob(csvContent, options.encoding);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

// CSVインポート機能（サーバー側対応版）
export function parseCSVFile(file: File, options: CSVImportOptions = DEFAULT_IMPORT_OPTIONS): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // サーバー側でのFile処理
      const fileContent = await file.text();
      
      Papa.parse(fileContent, {
        header: true,
        delimiter: options.delimiter === 'auto' ? '' : options.delimiter,
        skipEmptyLines: options.skipEmptyLines,
        transformHeader: (header: string) => options.trimWhitespace && typeof header === 'string' ? header.trim() : header,
        transform: (value: any) => {
          // 安全なtrim処理：文字列の場合のみtrimを実行
          if (options.trimWhitespace && typeof value === 'string') {
            return value.trim();
          }
          // デバッグ用ログ（必要に応じて）
          if (typeof value !== 'string' && value !== null && value !== undefined) {
            console.log(`[CSV_TRANSFORM] Non-string value detected: ${typeof value}`, value);
          }
          return value;
        },
        complete: (results: Papa.ParseResult<any>) => {
          if (results.errors.length > 0) {
            console.error('CSV解析エラー:', results.errors);
            reject(new Error(`CSV解析に失敗しました: ${results.errors[0].message}`));
            return;
          }
          
          if (options.validateData) {
            try {
              const validatedData = validateCSVData(results.data);
              resolve(validatedData);
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(results.data);
          }
        },
        error: (error: any) => {
          reject(new Error(`ファイル読み込みエラー: ${error.message}`));
        }
      });
    } catch (error) {
      reject(new Error(`ファイル読み込みエラー: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

// CSVデータ検証
export function validateCSVData(data: any[]): any[] {
  const validatedData: any[] = [];
  const errors: string[] = [];
  
  data.forEach((row, index) => {
    const rowNumber = index + 2; // ヘッダー行 + 1行目から開始
    
    // 空行をスキップ
    if (Object.values(row).every(value => {
      if (!value) return true;
      const stringValue = typeof value === 'string' ? value : String(value);
      return stringValue.trim() === '';
    })) {
      return;
    }
    
    try {
      // データ型に応じた検証とパース
      const validatedRow = { ...row };
      
      // 年月データの検証
      if (row['年月']) {
        const dateInfo = parseDateFromCSV(row['年月']);
        if (dateInfo) {
          validatedRow.year = dateInfo.year;
          validatedRow.month = dateInfo.month;
        } else {
          errors.push(`${rowNumber}行目: 年月の形式が正しくありません (${row['年月']})`);
        }
      }
      
      // 数値データの検証
      ['支出額', '実績', '予算金額', '目標値', '総予算'].forEach(field => {
        if (row[field]) {
          const numValue = parseNumberFromCSV(row[field]);
          if (numValue < 0) {
            errors.push(`${rowNumber}行目: ${field}は正の数値である必要があります (${row[field]})`);
          }
          validatedRow[field] = numValue;
        }
      });
      
      // 必須フィールドの検証
      if (row['クライアント名'] && !row['クライアント名'].trim()) {
        errors.push(`${rowNumber}行目: クライアント名は必須です`);
      }
      
      validatedData.push(validatedRow);
    } catch (error) {
      errors.push(`${rowNumber}行目: データ検証エラー - ${error}`);
    }
  });
  
  if (errors.length > 0) {
    throw new Error(`データ検証に失敗しました:\n${errors.join('\n')}`);
  }
  
  return validatedData;
}

// データ型判定（日本語・英語ヘッダー対応）
export function detectCSVDataType(data: any[]): 'results' | 'budgets' | 'clients' | 'campaigns' | 'unknown' {
  if (!data || data.length === 0) return 'unknown';
  
  const firstRow = data[0];
  const headers = Object.keys(firstRow).map(h => h.toLowerCase());
  
  console.log('[CSV_TYPE_DETECTION] Headers found:', headers);
  
  // 実績データの判定（日本語・英語対応）
  if ((headers.includes('支出額') && headers.includes('実績')) ||
      (headers.includes('actual_spend') && headers.includes('actual_result')) ||
      (headers.includes('actualspend') && headers.includes('actualresult'))) {
    console.log('[CSV_TYPE_DETECTION] Detected type: results');
    return 'results';
  }
  
  // 予算データの判定（日本語・英語対応）
  if ((headers.includes('予算金額') && headers.includes('目標kpi')) ||
      (headers.includes('amount') && headers.includes('targetkpi')) ||
      (headers.includes('budget') && headers.includes('target'))) {
    console.log('[CSV_TYPE_DETECTION] Detected type: budgets');
    return 'budgets';
  }
  
  // クライアントデータの判定（日本語・英語対応）
  if ((headers.includes('クライアント名') && headers.includes('事業部')) ||
      (headers.includes('client_name') && headers.includes('business_division')) ||
      (headers.includes('name') && headers.includes('businessdivision'))) {
    console.log('[CSV_TYPE_DETECTION] Detected type: clients');
    return 'clients';
  }
  
  // 案件データの判定（日本語・英語対応）
  if ((headers.includes('案件名') && headers.includes('総予算')) ||
      (headers.includes('campaign_name') && headers.includes('total_budget')) ||
      (headers.includes('name') && headers.includes('totalbudget'))) {
    console.log('[CSV_TYPE_DETECTION] Detected type: campaigns');
    return 'campaigns';
  }
  
  // 英語ベースの基本判定（フィールド数とキーワードベース）
  if (headers.includes('campaign_id') || headers.includes('campaignid')) {
    if (headers.includes('actual_spend') || headers.includes('actualspend')) {
      console.log('[CSV_TYPE_DETECTION] Detected type by field pattern: results');
      return 'results';
    } else if (headers.includes('amount') || headers.includes('target')) {
      console.log('[CSV_TYPE_DETECTION] Detected type by field pattern: budgets');
      return 'budgets';
    }
  }
  
  // クライアントIDベースの判定
  if (headers.includes('client_id') || headers.includes('clientid')) {
    if (headers.includes('name') && (headers.includes('business') || headers.includes('division'))) {
      console.log('[CSV_TYPE_DETECTION] Detected type by client pattern: clients');
      return 'clients';
    } else if (headers.includes('purpose') || headers.includes('total')) {
      console.log('[CSV_TYPE_DETECTION] Detected type by campaign pattern: campaigns');
      return 'campaigns';
    }
  }
  
  console.log('[CSV_TYPE_DETECTION] Unable to detect type, returning unknown');
  return 'unknown';
}

// CSVテンプレート生成（英語・日本語対応）
export function generateCSVTemplate(dataType: 'results' | 'budgets' | 'clients' | 'campaigns'): string {
  const templates = {
    results: [
      // 英語ヘッダー（データベース対応）
      ['campaign_id', 'year', 'month', 'platform', 'operation_type', 'budget_type', 'actual_spend', 'actual_result'],
      ['1', '2024', '1', 'Google', '運用代行', '月次予算', '100000', '300000'],
      ['1', '2024', '2', 'Google', '運用代行', '月次予算', '120000', '350000']
    ],
    budgets: [
      // 英語ヘッダー（データベース対応）
      ['campaign_id', 'year', 'month', 'platform', 'operation_type', 'budget_type', 'amount', 'targetKpi', 'targetValue'],
      ['1', '2024', '1', 'Google', '運用代行', '月次予算', '100000', 'ROAS', '3.0'],
      ['1', '2024', '2', 'Google', '運用代行', '月次予算', '120000', 'ROAS', '3.0']
    ],
    clients: [
      // 英語ヘッダー（データベース対応）
      ['name', 'business_division', 'sales_department', 'sales_channel', 'agency', 'priority'],
      ['サンプルクライアント', 'SNSメディア事業部', 'マーケティング部', '直接営業', '', 'A'],
      ['テストクライアント', 'コマース事業部', 'セールス部', '代理店経由', 'エージェンシーA', 'B']
    ],
    campaigns: [
      // 英語ヘッダー（データベース対応）
      ['client_id', 'name', 'purpose', 'start_year', 'start_month', 'end_year', 'end_month', 'totalBudget'],
      ['1', 'ブランド認知キャンペーン', 'ブランド認知向上', '2024', '1', '2024', '12', '1200000'],
      ['1', 'EC売上向上', 'EC売上拡大', '2024', '3', '2024', '12', '800000']
    ]
  };

  return Papa.unparse(templates[dataType], {
    delimiter: ',',
    header: true
  });
}

// CSV一括エクスポート（フィルター適用）
export function exportFilteredDataToCSV(
  data: any,
  filters: any,
  filename: string,
  options: CSVExportOptions = DEFAULT_CSV_OPTIONS
): void {
  let csvContent = '';
  
  if (data.results && data.results.length > 0) {
    csvContent += '# 実績データ\n';
    csvContent += convertResultsToCSV(data.results, options) + '\n\n';
  }
  
  if (data.budgets && data.budgets.length > 0) {
    csvContent += '# 予算データ\n';
    csvContent += convertBudgetsToCSV(data.budgets, options) + '\n\n';
  }
  
  if (data.clients && data.clients.length > 0) {
    csvContent += '# クライアントデータ\n';
    csvContent += convertClientsToCSV(data.clients, options) + '\n\n';
  }
  
  if (data.campaigns && data.campaigns.length > 0) {
    csvContent += '# 案件データ\n';
    csvContent += convertCampaignsToCSV(data.campaigns, options) + '\n\n';
  }
  
  // フィルター情報を追加
  csvContent += `# エクスポート条件\n`;
  csvContent += `# 期間: ${filters.year || '全年'}年 ${filters.month || '全月'}月\n`;
  csvContent += `# クライアント: ${filters.clientId || '全て'}\n`;
  csvContent += `# プラットフォーム: ${filters.platform || '全て'}\n`;
  csvContent += `# 運用タイプ: ${filters.operationType || '全て'}\n`;
  csvContent += `# 事業部: ${filters.department || '全て'}\n`;
  csvContent += `# エクスポート日時: ${new Date().toLocaleString('ja-JP')}\n`;
  
  downloadCSV(csvContent, filename, options);
} 