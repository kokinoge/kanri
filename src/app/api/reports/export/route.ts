import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import ExcelJS from 'exceljs'
import { Parser } from 'json2csv'
import PDFDocument from 'pdfkit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reportId, format, type, month } = body

    // レポートタイプに応じてデータを取得
    let data: any[] = []
    let reportTitle = ''

    switch (type) {
      case 'monthly':
        // 月次レポートのデータ取得
        const [year, monthNumber] = month.split('-').map(Number)
        
        const monthlyData = await prisma.result.findMany({
          where: {
            year,
            month: monthNumber
          },
          include: {
            campaign: {
              include: {
                client: true,
                budgets: {
                  where: {
                    year,
                    month: monthNumber
                  }
                }
              }
            }
          }
        })

        data = monthlyData.map(result => ({
          クライアント名: result.campaign.client.name,
          キャンペーン名: result.campaign.name,
          プラットフォーム: result.platform,
          運用タイプ: result.operationType,
          予算: result.campaign.budgets.find(b => 
            b.platform === result.platform && 
            b.operationType === result.operationType
          )?.budgetAmount || 0,
          実績: result.actualSpend,
          成果: result.actualResult,
          執行率: result.campaign.budgets.find(b => 
            b.platform === result.platform && 
            b.operationType === result.operationType
          )?.budgetAmount ? 
            (Number(result.actualSpend) / Number(result.campaign.budgets.find(b => 
              b.platform === result.platform && 
              b.operationType === result.operationType
            )?.budgetAmount || 1) * 100).toFixed(1) + '%' : '-'
        }))
        
        reportTitle = `月次レポート ${year}年${monthNumber}月`
        break

      case 'campaign':
        // キャンペーンレポートのデータ取得
        const campaignData = await prisma.campaign.findMany({
          include: {
            client: true,
            budgets: true,
            results: true
          }
        })

        data = campaignData.map(campaign => ({
          クライアント名: campaign.client.name,
          キャンペーン名: campaign.name,
          開始日: campaign.startDate,
          終了日: campaign.endDate,
          ステータス: campaign.status,
          総予算: campaign.budgets.reduce((sum, b) => sum + Number(b.budgetAmount), 0),
          総実績: campaign.results.reduce((sum, r) => sum + Number(r.actualSpend), 0),
          執行率: campaign.budgets.length > 0 ?
            (campaign.results.reduce((sum, r) => sum + Number(r.actualSpend), 0) /
             campaign.budgets.reduce((sum, b) => sum + Number(b.budgetAmount), 0) * 100).toFixed(1) + '%' : '-'
        }))
        
        reportTitle = 'キャンペーンレポート'
        break

      case 'client':
        // クライアントレポートのデータ取得
        const clientData = await prisma.client.findMany({
          include: {
            campaigns: {
              include: {
                budgets: true,
                results: true
              }
            }
          }
        })

        data = clientData.map(client => ({
          クライアント名: client.name,
          業界: client.industry || '-',
          キャンペーン数: client.campaigns.length,
          総予算: client.campaigns.reduce((sum, c) => 
            sum + c.budgets.reduce((budgetSum, b) => budgetSum + Number(b.budgetAmount), 0), 0),
          総実績: client.campaigns.reduce((sum, c) => 
            sum + c.results.reduce((resultSum, r) => resultSum + Number(r.actualSpend), 0), 0),
          平均執行率: client.campaigns.length > 0 ?
            (client.campaigns.reduce((sum, c) => 
              sum + c.results.reduce((resultSum, r) => resultSum + Number(r.actualSpend), 0), 0) /
             client.campaigns.reduce((sum, c) => 
              sum + c.budgets.reduce((budgetSum, b) => budgetSum + Number(b.budgetAmount), 0), 0) * 100).toFixed(1) + '%' : '-'
        }))
        
        reportTitle = 'クライアントレポート'
        break

      case 'budget':
        // 予算レポートのデータ取得
        const budgetData = await prisma.budget.findMany({
          include: {
            campaign: {
              include: {
                client: true
              }
            }
          }
        })

        data = budgetData.map(budget => ({
          クライアント名: budget.campaign.client.name,
          キャンペーン名: budget.campaign.name,
          年: budget.year,
          月: budget.month,
          プラットフォーム: budget.platform,
          運用タイプ: budget.operationType,
          予算額: Number(budget.budgetAmount),
          目標値: Number(budget.targetValue),
          ステータス: budget.status
        }))
        
        reportTitle = '予算レポート'
        break
    }

    // フォーマットに応じてレスポンスを生成
    let buffer: Buffer
    let contentType: string
    let filename: string

    switch (format) {
      case 'xlsx':
        buffer = await generateExcel(data, reportTitle)
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        filename = `${reportTitle}.xlsx`
        break

      case 'csv':
        buffer = generateCSV(data)
        contentType = 'text/csv'
        filename = `${reportTitle}.csv`
        break

      case 'pdf':
        buffer = await generatePDF(data, reportTitle)
        contentType = 'application/pdf'
        filename = `${reportTitle}.pdf`
        break

      default:
        return NextResponse.json(
          { error: 'Invalid format' },
          { status: 400 }
        )
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export report' },
      { status: 500 }
    )
  }
}

async function generateExcel(data: any[], title: string): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(title)

  // ヘッダー行を追加
  if (data.length > 0) {
    const headers = Object.keys(data[0])
    worksheet.addRow(headers)

    // ヘッダースタイルを設定
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      }
    })

    // データ行を追加
    data.forEach(row => {
      worksheet.addRow(Object.values(row))
    })

    // カラム幅を自動調整
    worksheet.columns.forEach((column) => {
      if (column && column.eachCell) {
        let maxLength = 0
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10
          if (columnLength > maxLength) {
            maxLength = columnLength
          }
        })
        column.width = maxLength < 10 ? 10 : maxLength + 2
      }
    })
  }

  return Buffer.from(await workbook.xlsx.writeBuffer())
}

function generateCSV(data: any[]): Buffer {
  if (data.length === 0) {
    return Buffer.from('')
  }

  const parser = new Parser({ fields: Object.keys(data[0]) })
  const csv = parser.parse(data)
  return Buffer.from(csv, 'utf-8')
}

async function generatePDF(data: any[], title: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // タイトル
    doc.fontSize(20).text(title, { align: 'center' })
    doc.moveDown()

    // 日本語フォントの問題を回避するため、英語のみで表示
    doc.fontSize(10).text(`Generated: ${new Date().toISOString()}`, { align: 'right' })
    doc.moveDown()

    // データをテーブル形式で表示（簡易版）
    if (data.length > 0) {
      const headers = Object.keys(data[0])
      doc.fontSize(12).text(headers.join(' | '))
      doc.moveDown(0.5)

      data.forEach(row => {
        doc.fontSize(10).text(Object.values(row).join(' | '))
      })
    }

    doc.end()
  })
}