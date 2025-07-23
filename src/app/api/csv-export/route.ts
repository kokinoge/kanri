import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import {
  convertResultsToCSV,
  convertClientsToCSV,
  convertCampaignsToCSV,
  convertBudgetsToCSV,
  convertAllDataToCSV,
  createCSVBlob,
  CSVExportOptions,
  DEFAULT_CSV_OPTIONS
} from '@/lib/csv-utils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('[CSV_EXPORT_API] CSVエクスポート処理開始');
    
    const { searchParams } = new URL(request.url);
    
    // フィルターパラメータ
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const clientId = searchParams.get('clientId');
    const platform = searchParams.get('platform');
    const operationType = searchParams.get('operationType');
    const department = searchParams.get('department');
    
    // CSVオプションパラメータ
    const dataType = searchParams.get('type') || 'all'; // 'results', 'clients', 'campaigns', 'budgets', 'all'
    const dateFormat = (searchParams.get('dateFormat') as CSVExportOptions['dateFormat']) || 'YYYY年MM月';
    const numberFormat = (searchParams.get('numberFormat') as CSVExportOptions['numberFormat']) || 'formatted';
    const encoding = (searchParams.get('encoding') as CSVExportOptions['encoding']) || 'utf-8';
    const delimiter = (searchParams.get('delimiter') as CSVExportOptions['delimiter']) || ',';

    const csvOptions: CSVExportOptions = {
      ...DEFAULT_CSV_OPTIONS,
      dateFormat,
      numberFormat,
      encoding,
      delimiter
    };

    console.log('[CSV_EXPORT_API] オプション:', {
      dataType, year, month, clientId, platform, operationType, department, csvOptions
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

    // データ取得条件を設定
    const whereConditions: any = {};
    
    if (year && year !== 'all') {
      whereConditions.year = parseInt(year);
    }
    if (month && month !== 'all') {
      whereConditions.month = parseInt(month);
    }
    if (platform && platform !== 'all') {
      whereConditions.platform = platform;
    }
    if (operationType && operationType !== 'all') {
      whereConditions.operationType = operationType;
    }

    // クライアント・案件フィルター用の条件
    const campaignWhereConditions: any = {};
    if (clientId && clientId !== 'all') {
      campaignWhereConditions.clientId = clientId;
    }
    if (department && department !== 'all') {
      campaignWhereConditions.client = {
        businessDivision: department
      };
    }

    let csvContent = '';
    let filename = 'export';

    switch (dataType) {
      case 'results':
        const results = await prisma.result.findMany({
          where: {
            ...whereConditions,
            ...(Object.keys(campaignWhereConditions).length > 0 ? {
              campaign: campaignWhereConditions
            } : {})
          },
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

        // Decimal型の数値変換
        const processedResults = results.map(result => ({
          ...result,
          actualSpend: parseNumber(result.actualSpend),
          actualResult: parseNumber(result.actualResult)
        }));

        csvContent = convertResultsToCSV(processedResults, csvOptions);
        filename = 'results';
        break;

      case 'clients':
        const clientConditions: any = {};
        if (department && department !== 'all') {
          clientConditions.businessDivision = department;
        }

        const clients = await prisma.client.findMany({
          where: clientConditions,
          include: {
            campaigns: {
              select: { id: true, name: true }
            },
            manager: {
              select: { id: true, name: true, role: true }
            }
          },
          orderBy: { name: 'asc' }
        });

        csvContent = convertClientsToCSV(clients, csvOptions);
        filename = 'clients';
        break;

      case 'campaigns':
        const campaigns = await prisma.campaign.findMany({
          where: campaignWhereConditions,
          include: {
            client: true
          },
          orderBy: { createdAt: 'desc' }
        });

        // Decimal型の数値変換
        const processedCampaigns = campaigns.map(campaign => ({
          ...campaign,
          totalBudget: parseNumber(campaign.totalBudget)
        }));

        csvContent = convertCampaignsToCSV(processedCampaigns, csvOptions);
        filename = 'campaigns';
        break;

      case 'budgets':
        const budgets = await prisma.budget.findMany({
          where: {
            ...whereConditions,
            ...(Object.keys(campaignWhereConditions).length > 0 ? {
              campaign: campaignWhereConditions
            } : {})
          },
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

        // Decimal型の数値変換
        const processedBudgets = budgets.map(budget => ({
          ...budget,
          amount: parseNumber(budget.amount),
          targetValue: budget.targetValue ? parseNumber(budget.targetValue) : null
        }));

        csvContent = convertBudgetsToCSV(processedBudgets, csvOptions);
        filename = 'budgets';
        break;

      case 'all':
      default:
        // 全データを取得してマージ
        const [allResults, allBudgets, allClients, allCampaigns] = await Promise.all([
          prisma.result.findMany({
            where: {
              ...whereConditions,
              ...(Object.keys(campaignWhereConditions).length > 0 ? {
                campaign: campaignWhereConditions
              } : {})
            },
            include: {
              campaign: {
                include: {
                  client: true
                }
              }
            }
          }),
          prisma.budget.findMany({
            where: {
              ...whereConditions,
              ...(Object.keys(campaignWhereConditions).length > 0 ? {
                campaign: campaignWhereConditions
              } : {})
            },
            include: {
              campaign: {
                include: {
                  client: true
                }
              }
            }
          }),
          prisma.client.findMany({
            where: department && department !== 'all' ? { businessDivision: department } : {},
            include: {
              campaigns: {
                select: { id: true, name: true }
              }
            }
          }),
          prisma.campaign.findMany({
            where: campaignWhereConditions,
            include: {
              client: true
            }
          })
        ]);

        // 数値変換
        const allProcessedData = {
          results: allResults.map(r => ({
            ...r,
            actualSpend: parseNumber(r.actualSpend),
            actualResult: parseNumber(r.actualResult)
          })),
          budgets: allBudgets.map(b => ({
            ...b,
            amount: parseNumber(b.amount),
            targetValue: b.targetValue ? parseNumber(b.targetValue) : null
          })),
          clients: allClients,
          campaigns: allCampaigns.map(c => ({
            ...c,
            totalBudget: parseNumber(c.totalBudget)
          }))
        };

        csvContent = convertAllDataToCSV(allProcessedData, csvOptions);
        filename = 'all-data';
        break;
    }

    console.log('[CSV_EXPORT_API] CSV生成完了:', { 
      dataType, 
      contentLength: csvContent.length,
      csvOptions 
    });

    // フィルター適用された場合のファイル名を生成
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
    filename += `-${new Date().toISOString().split('T')[0]}.csv`;

    // CSVレスポンスを作成
    const blob = createCSVBlob(csvContent, csvOptions.encoding);
    const response = new NextResponse(blob);
    
    response.headers.set('Content-Type', `text/csv;charset=${csvOptions.encoding}`);
    response.headers.set('Content-Disposition', `attachment; filename=${filename}`);
    
    // CORS対応
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    console.log('[CSV_EXPORT_API] CSVエクスポート完了:', filename);
    return response;

  } catch (error) {
    console.error('[CSV_EXPORT_API] CSVエクスポートエラー:', error);
    return NextResponse.json(
      { 
        error: 'CSVエクスポート中にエラーが発生しました', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// OPTIONSメソッド対応（CORS）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 