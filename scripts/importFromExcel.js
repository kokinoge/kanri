import { PrismaClient, Prisma } from '../src/generated/prisma/index.js';
const XLSX = require('xlsx');

const prisma = new PrismaClient();

// エクセルファイルから実際のデータを読み込んでインポートする
async function importFromExcel() {
  console.log('実際のエクセルファイル（data.xlsx）からデータをインポートします...');
  
  try {
    // データベースをクリア
    console.log('データベースをクリアしています...');
    await prisma.result.deleteMany({});
    await prisma.budget.deleteMany({});
    await prisma.campaign.deleteMany({});
    await prisma.client.deleteMany({});
    console.log('データベースのクリアが完了しました。');

    // エクセルファイルを読み込み
    const workbook = XLSX.readFile('data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // JSONに変換（ヘッダー行を考慮）
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (rawData.length === 0) {
      throw new Error('エクセルファイルにデータがありません');
    }
    
    // ヘッダー行を確認
    const headers = rawData[0] as string[];
    console.log('ヘッダー:', headers);
    
    // データ行を取得（ヘッダー除く、空行も除く）
    const dataRows = rawData.slice(1).filter(row => row && Array.isArray(row) && row.length > 0 && row[0]);
    
    console.log(`エクセルファイルから ${dataRows.length} 件のデータを読み込みました`);
    
    if (dataRows.length === 0) {
      throw new Error('有効なデータ行がありません');
    }
    
    let importedCount = 0;
    const createdClients = new Map();
    const createdCampaigns = new Map();
    
    // 各行を処理
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i] as any[];
      
      try {
        // データの抽出（エクセルのカラム順に従って）
        const [
          案件,
          会社名, 
          対象月,
          部門,
          媒体,
          運用タイプ,
          担当者,
          金額,
          実績,
          ジャンル,
          営業先,
          営業担当
        ] = row;
        
        // 必須フィールドをチェック
        if (!案件 || !会社名 || !対象月 || !媒体 || !運用タイプ) {
          console.log(`行 ${i+2} をスキップ: 必須フィールド不足`, { 案件, 会社名, 対象月, 媒体, 運用タイプ });
          continue;
        }
        
        // 部門のマッピング
        const businessDivisionMap = {
          'SNSメディア部門': 'SNSメディア事業部',
          'インフルエンサー部門': 'インフルエンサー事業部',
          '広告部門': '広告事業部'
        };
        const businessDivision = businessDivisionMap[部門 as keyof typeof businessDivisionMap] || 'SNSメディア事業部';
        
        // 日付の解析
        const dateMatch = String(対象月).match(/(\d{2})\/(\d{1,2})/);
        if (!dateMatch) {
          console.log(`行 ${i+2} をスキップ: 無効な日付形式`, { 対象月 });
          continue;
        }
        
        const year = 2000 + parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]);
        
        // 金額の解析
        const parseAmount = (value: any): number => {
          if (typeof value === 'number') return value;
          const numStr = String(value).replace(/[¥,]/g, '');
          return parseFloat(numStr) || 0;
        };
        
        const budgetAmount = parseAmount(金額);
        const resultAmount = parseAmount(実績);
        
        console.log(`処理中: ${案件} - ${会社名} - ${year}/${month} - ${媒体} - ${運用タイプ}`);
        
        // クライアントの作成/取得
        const clientKey = 会社名;
        let client;
        if (createdClients.has(clientKey)) {
          client = createdClients.get(clientKey);
        } else {
          client = await prisma.client.create({
            data: {
              name: 会社名,
              salesDepartment: 営業先 || '国内営業部',
              businessDivision: businessDivision,
              priority: 'B'
            }
          });
          createdClients.set(clientKey, client);
          console.log(`クライアント作成: ${会社名}`);
        }
        
        // キャンペーンの作成/取得
        const campaignKey = `${案件}-${client.id}`;
        let campaign;
        if (createdCampaigns.has(campaignKey)) {
          campaign = createdCampaigns.get(campaignKey);
        } else {
          campaign = await prisma.campaign.create({
            data: {
              clientId: client.id,
              name: 案件,
              purpose: ジャンル || '投稿予算',
              totalBudget: new Prisma.Decimal(budgetAmount),
              startYear: year,
              startMonth: month
            }
          });
          createdCampaigns.set(campaignKey, campaign);
          console.log(`キャンペーン作成: ${案件}`);
        }
        
        // 予算データの作成/更新
        const budgetWhere = {
          campaignId: campaign.id,
          year: year,
          month: month,
          platform: 媒体,
          operationType: 運用タイプ,
        };
        
        const existingBudget = await prisma.budget.findFirst({ where: budgetWhere });
        if (!existingBudget) {
          await prisma.budget.create({
            data: {
              ...budgetWhere,
              amount: new Prisma.Decimal(budgetAmount),
              budgetType: ジャンル || '投稿予算',
            }
          });
          console.log(`予算作成: ${案件} - ${媒体} - ${運用タイプ} - ${year}/${month} (担当者: ${担当者})`);
        }
        
        // 実績データの作成/更新
        const existingResult = await prisma.result.findFirst({ where: budgetWhere });
        if (!existingResult) {
          await prisma.result.create({
            data: {
              ...budgetWhere,
              actualSpend: new Prisma.Decimal(resultAmount),
              actualResult: new Prisma.Decimal(resultAmount),
              budgetType: ジャンル || '投稿予算',
            }
          });
          console.log(`実績作成: ${案件} - ${媒体} - ${運用タイプ} - ${year}/${month} (担当者: ${担当者})`);
        }
        
        importedCount++;
        
      } catch (error) {
        console.error(`行 ${i+2} の処理でエラー:`, error);
        console.error('データ:', row);
      }
    }
    
    console.log(`\n✅ エクセルファイルからのデータインポートが完了しました！`);
    console.log(`📊 インポートされたデータ: ${importedCount} 件`);
    console.log(`👥 作成されたクライアント: ${createdClients.size} 件`);
    console.log(`📋 作成されたキャンペーン: ${createdCampaigns.size} 件`);
    
    // 最終確認
    const [budgetCount, resultCount] = await Promise.all([
      prisma.budget.count(),
      prisma.result.count()
    ]);
    
    console.log(`\n📈 最終データ件数:`);
    console.log(`   予算: ${budgetCount} 件`);
    console.log(`   実績: ${resultCount} 件`);
    
  } catch (error) {
    console.error('❌ インポートエラー:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプト実行
importFromExcel()
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  }); 