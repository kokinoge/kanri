import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

// テンプレートデータ定義（新しいフィールド構造に対応）
const TEMPLATES = {
  results: {
    headers: ['campaign_id', 'year', 'month', 'platform', 'operation_type', 'budget_type', 'actual_spend', 'actual_result'],
    sampleData: [
      ['1', '2024', '1', 'Google', '運用代行', '月次予算', '100000', '300000'],
      ['1', '2024', '2', 'Google', '運用代行', '月次予算', '120000', '350000'],
      ['2', '2024', '1', 'Meta', 'コンサルティング', '月次予算', '80000', '240000']
    ],
    description: '実績データ: 案件の月次実績（支出額・実績値）を管理'
  },
  budgets: {
    headers: ['campaign_id', 'year', 'month', 'platform', 'operation_type', 'budget_type', 'amount', 'targetKpi', 'targetValue'],
    sampleData: [
      ['1', '2024', '1', 'Google', '運用代行', '月次予算', '100000', 'ROAS', '3.0'],
      ['1', '2024', '2', 'Google', '運用代行', '月次予算', '120000', 'ROAS', '3.0'],
      ['2', '2024', '1', 'Meta', 'コンサルティング', '月次予算', '80000', 'CPA', '5000']
    ],
    description: '予算データ: 案件の月次予算と目標値を管理'
  },
  clients: {
    headers: ['name', 'business_division', 'sales_department', 'sales_channel', 'agency', 'priority'],
    sampleData: [
      ['サンプル株式会社', 'SNSメディア事業部', 'マーケティング部', '直接営業', '', 'A'],
      ['テスト商事', 'コマース事業部', 'セールス部', '代理店経由', 'エージェンシーA', 'B'],
      ['デモ企業', 'SNSメディア事業部', 'マーケティング部', '直接営業', '', 'A']
    ],
    description: 'クライアントデータ: 顧客情報と営業情報を管理'
  },
  campaigns: {
    headers: ['client_id', 'name', 'purpose', 'start_year', 'start_month', 'end_year', 'end_month', 'totalBudget'],
    sampleData: [
      ['1', 'ブランド認知キャンペーン', 'ブランド認知向上', '2024', '1', '2024', '12', '1200000'],
      ['1', 'EC売上向上', 'EC売上拡大', '2024', '3', '2024', '12', '800000'],
      ['2', 'リードジェネレーション', 'リード獲得', '2024', '2', '2024', '11', '600000']
    ],
    description: '案件データ: クライアントの案件情報を管理'
  }
};

// フィールド説明
const FIELD_DESCRIPTIONS = {
  campaign_id: '案件ID（数値）',
  client_id: 'クライアントID（数値）',
  year: '年（YYYY形式）',
  month: '月（1-12）',
  platform: 'プラットフォーム（Google, Meta, Yahoo, LINE, TikTok等）',
  operation_type: '運用タイプ（運用代行, コンサルティング, 内製支援）',
  budget_type: '予算タイプ（月次予算, 四半期予算等）',
  actual_spend: '実際の支出額（数値）',
  actual_result: '実績値（数値）',
  amount: '予算金額（数値）',
  targetKpi: '目標KPI（ROAS, CPA, CTR等）',
  targetValue: '目標値（数値）',
  name: '名前（クライアント名または案件名）',
  business_division: '事業部（SNSメディア事業部, コマース事業部等）',
  sales_department: '営業部門（マーケティング部, セールス部等）',
  sales_channel: '営業チャネル（直接営業, 代理店経由等）',
  agency: '代理店名（任意）',
  priority: '優先度（A, B, C）',
  purpose: '案件の目的・概要',
  start_year: '開始年（YYYY形式）',
  start_month: '開始月（1-12）',
  end_year: '終了年（YYYY形式、任意）',
  end_month: '終了月（1-12、任意）',
  totalBudget: '総予算（数値）'
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get('type') as keyof typeof TEMPLATES;
    const format = searchParams.get('format') || 'csv'; // csv or json
    const includeDescription = searchParams.get('description') === 'true';

    if (!dataType || !TEMPLATES[dataType]) {
      return NextResponse.json({
        error: "有効なデータ型を指定してください",
        supportedTypes: Object.keys(TEMPLATES),
        usage: "?type=results&format=csv&description=true"
      }, { status: 400 });
    }

    console.log('[CSV_TEMPLATE] Generating template:', { dataType, format, includeDescription });

    const template = TEMPLATES[dataType];
    
    if (format === 'json') {
      // JSON形式での情報提供
      const jsonResponse = {
        dataType,
        description: template.description,
        fields: template.headers.map(header => ({
          name: header,
          description: FIELD_DESCRIPTIONS[header as keyof typeof FIELD_DESCRIPTIONS] || '説明なし',
          required: isRequiredField(dataType, header)
        })),
        sampleData: template.sampleData,
        csvTemplate: generateCSVContent(template, includeDescription)
      };
      
      return NextResponse.json(jsonResponse);
    }
    
    // CSV形式でのテンプレート生成
    const csvContent = generateCSVContent(template, includeDescription);
    const filename = `${dataType}_template_${new Date().toISOString().split('T')[0]}.csv`;
    
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('[CSV_TEMPLATE] Template generation error:', error);
    return NextResponse.json({
      error: "テンプレート生成でエラーが発生しました",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// CSV内容生成（シンプル版）
function generateCSVContent(template: any, includeDescription: boolean): string {
  // 常にシンプルなCSV形式で生成（説明行なし）
  const csvData = [template.headers, ...template.sampleData];
  const csvContent = Papa.unparse(csvData, {
    delimiter: ',',
    header: false
  });
  
  // 説明が必要な場合はJSONレスポンスで別途提供
  return csvContent;
}

// 必須フィールド判定
function isRequiredField(dataType: string, fieldName: string): boolean {
  const requiredFields: Record<string, string[]> = {
    results: ['campaign_id', 'year', 'month', 'platform', 'operation_type'],
    budgets: ['campaign_id', 'year', 'month', 'platform', 'operation_type'],
    clients: ['name'],
    campaigns: ['client_id', 'name', 'start_year', 'start_month']
  };
  
  return requiredFields[dataType]?.includes(fieldName) || false;
} 