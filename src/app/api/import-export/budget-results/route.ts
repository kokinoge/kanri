import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('[IMPORT_BUDGET_RESULTS] Import request received');

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが選択されていません' },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSVファイルが空か、ヘッダーのみです' },
        { status: 400 }
      );
    }

    const headers = lines[0].split(',').map(h => h.trim());
    console.log('[IMPORT_BUDGET_RESULTS] CSV headers:', headers);

    // 必須ヘッダーの確認
    const requiredHeaders = ['campaignId', 'year', 'month', 'platform', 'operationType', 'budgetType'];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    
    if (missingHeaders.length > 0) {
      return NextResponse.json(
        { error: `必須列が不足しています: ${missingHeaders.join(', ')}` },
        { status: 400 }
      );
    }

    let imported = 0;
    let errors = 0;
    const errorMessages: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.trim());
        const row: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // データ変換と検証
        const year = parseInt(row.year);
        const month = parseInt(row.month);
        
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
          throw new Error(`無効な年月: ${row.year}/${row.month}`);
        }

        // 案件の存在確認
        const campaign = await prisma.campaign.findUnique({
          where: { id: row.campaignId }
        });

        if (!campaign) {
          throw new Error(`案件が見つかりません: ${row.campaignId}`);
        }

        // 予算データの作成・更新
        if (row.budgetAmount) {
          const budgetAmount = parseFloat(row.budgetAmount);
          const targetValue = row.targetValue ? parseFloat(row.targetValue) : undefined;

          // 既存の予算データを検索
          const existingBudget = await prisma.budget.findFirst({
            where: {
              campaignId: row.campaignId,
              year,
              month,
              platform: row.platform,
              operationType: row.operationType,
              budgetType: row.budgetType
            }
          });

          if (existingBudget) {
            // 更新
            await prisma.budget.update({
              where: { id: existingBudget.id },
              data: {
                amount: budgetAmount,
                targetKpi: row.targetKpi || undefined,
                targetValue
              }
            });
          } else {
            // 新規作成
            await prisma.budget.create({
              data: {
                campaignId: row.campaignId,
                year,
                month,
                platform: row.platform,
                operationType: row.operationType,
                budgetType: row.budgetType,
                amount: budgetAmount,
                targetKpi: row.targetKpi || undefined,
                targetValue
              }
            });
          }
        }

        // 実績データの作成・更新
        if (row.actualSpend || row.actualResult) {
          const actualSpend = row.actualSpend ? parseFloat(row.actualSpend) : undefined;
          const actualResult = row.actualResult ? parseFloat(row.actualResult) : undefined;

          // 既存の実績データを検索
          const existingResult = await prisma.result.findFirst({
            where: {
              campaignId: row.campaignId,
              year,
              month,
              platform: row.platform,
              operationType: row.operationType
            }
          });

          if (existingResult) {
            // 更新
            await prisma.result.update({
              where: { id: existingResult.id },
              data: {
                actualSpend,
                actualResult
              }
            });
          } else {
            // 新規作成
            await prisma.result.create({
              data: {
                campaignId: row.campaignId,
                year,
                month,
                platform: row.platform,
                operationType: row.operationType,
                budgetType: row.budgetType || 'その他', // デフォルト値を設定
                actualSpend: actualSpend || 0,
                actualResult: actualResult || 0
              }
            });
          }
        }

        imported++;
      } catch (error) {
        errors++;
        const errorMsg = `行${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        errorMessages.push(errorMsg);
        console.error(`[IMPORT_BUDGET_RESULTS] ${errorMsg}`);
      }
    }

    console.log(`[IMPORT_BUDGET_RESULTS] Import completed: ${imported} imported, ${errors} errors`);

    return NextResponse.json({
      success: true,
      imported,
      errors,
      message: errors > 0 
        ? `${imported}件をインポートしました（${errors}件のエラー）`
        : `${imported}件をインポートしました`,
      errorMessages: errorMessages.slice(0, 10) // 最大10件のエラーメッセージを返す
    });

  } catch (error) {
    console.error('[IMPORT_BUDGET_RESULTS] Import error:', error);
    return NextResponse.json(
      { 
        error: 'インポート処理中にエラーが発生しました',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 