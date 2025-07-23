import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('[IMPORT_INTEGRATED_MANAGEMENT] Import request received');

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
    console.log('[IMPORT_INTEGRATED_MANAGEMENT] CSV headers:', headers);

    // 必須ヘッダーの確認
    const requiredHeaders = ['campaignId', 'campaignName', 'clientName'];
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

        // 案件の存在確認・作成
        let campaign = await prisma.campaign.findUnique({
          where: { id: row.campaignId }
        });

        if (!campaign) {
          // クライアントの確認・作成
          let client = await prisma.client.findFirst({
            where: { name: row.clientName }
          });

          if (!client) {
            client = await prisma.client.create({
              data: {
                name: row.clientName,
                businessDivision: row.businessDivision || 'その他',
                salesDepartment: row.salesDepartment || 'その他',
                priority: row.priority || 'C'
              }
            });
          }

          // 案件を作成
          campaign = await prisma.campaign.create({
            data: {
              id: row.campaignId,
              clientId: client.id,
              name: row.campaignName,
              purpose: row.campaignPurpose || '',
              totalBudget: row.totalBudget ? parseFloat(row.totalBudget) : 0,
              startYear: row.startYear ? parseInt(row.startYear) : new Date().getFullYear(),
              startMonth: row.startMonth ? parseInt(row.startMonth) : 1,
              endYear: row.endYear ? parseInt(row.endYear) : undefined,
              endMonth: row.endMonth ? parseInt(row.endMonth) : undefined
            }
          });
        }

        // 予算データの処理
        if (row.budgetAmount && parseFloat(row.budgetAmount) > 0) {
          const budgetYear = parseInt(row.budgetYear) || new Date().getFullYear();
          const budgetMonth = parseInt(row.budgetMonth) || new Date().getMonth() + 1;

          const existingBudget = await prisma.budget.findFirst({
            where: {
              campaignId: campaign.id,
              year: budgetYear,
              month: budgetMonth,
              platform: row.platform || 'その他',
              operationType: row.operationType || 'その他',
              budgetType: row.budgetType || 'その他'
            }
          });

          if (existingBudget) {
            await prisma.budget.update({
              where: { id: existingBudget.id },
              data: {
                amount: parseFloat(row.budgetAmount),
                targetKpi: row.targetKpi || undefined,
                targetValue: row.targetValue ? parseFloat(row.targetValue) : undefined
              }
            });
          } else {
            await prisma.budget.create({
              data: {
                campaignId: campaign.id,
                year: budgetYear,
                month: budgetMonth,
                platform: row.platform || 'その他',
                operationType: row.operationType || 'その他',
                budgetType: row.budgetType || 'その他',
                amount: parseFloat(row.budgetAmount),
                targetKpi: row.targetKpi || undefined,
                targetValue: row.targetValue ? parseFloat(row.targetValue) : undefined
              }
            });
          }
        }

        // 実績データの処理
        if ((row.actualSpend && parseFloat(row.actualSpend) > 0) || 
            (row.actualResult && parseFloat(row.actualResult) > 0)) {
          const resultYear = parseInt(row.budgetYear) || new Date().getFullYear();
          const resultMonth = parseInt(row.budgetMonth) || new Date().getMonth() + 1;

          const existingResult = await prisma.result.findFirst({
            where: {
              campaignId: campaign.id,
              year: resultYear,
              month: resultMonth,
              platform: row.platform || 'その他',
              operationType: row.operationType || 'その他'
            }
          });

          if (existingResult) {
            await prisma.result.update({
              where: { id: existingResult.id },
              data: {
                actualSpend: row.actualSpend ? parseFloat(row.actualSpend) : 0,
                actualResult: row.actualResult ? parseFloat(row.actualResult) : 0
              }
            });
          } else {
            await prisma.result.create({
              data: {
                campaignId: campaign.id,
                year: resultYear,
                month: resultMonth,
                platform: row.platform || 'その他',
                operationType: row.operationType || 'その他',
                budgetType: row.budgetType || 'その他',
                actualSpend: row.actualSpend ? parseFloat(row.actualSpend) : 0,
                actualResult: row.actualResult ? parseFloat(row.actualResult) : 0
              }
            });
          }
        }

        imported++;
      } catch (error) {
        errors++;
        const errorMsg = `行${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        errorMessages.push(errorMsg);
        console.error(`[IMPORT_INTEGRATED_MANAGEMENT] ${errorMsg}`);
      }
    }

    console.log(`[IMPORT_INTEGRATED_MANAGEMENT] Import completed: ${imported} imported, ${errors} errors`);

    return NextResponse.json({
      success: true,
      imported,
      errors,
      message: errors > 0 
        ? `${imported}件をインポートしました（${errors}件のエラー）`
        : `${imported}件をインポートしました`,
      errorMessages: errorMessages.slice(0, 10)
    });

  } catch (error) {
    console.error('[IMPORT_INTEGRATED_MANAGEMENT] Import error:', error);
    return NextResponse.json(
      { 
        error: 'インポート処理中にエラーが発生しました',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 