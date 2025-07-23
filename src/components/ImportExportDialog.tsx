'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Download, FileSpreadsheet } from 'lucide-react'
import { toast } from 'sonner'

interface ImportExportDialogProps {
  trigger?: React.ReactNode
}

export function ImportExportDialog({ trigger }: ImportExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [exportYear, setExportYear] = useState<string>('all')
  const [exportMonth, setExportMonth] = useState<string>('all')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('ファイルを選択してください')
      return
    }

    setIsImporting(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/import-export', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        // 詳細情報を含む成功メッセージ
        const details = result.details || {};
        const dataIntegrity = details.dataIntegrity || {};
        
        toast.success(result.message, {
          description: `新しいデータが追加されました（処理時間: ${details.processingTime || 'N/A'}）。テーブルの上部（最新日付順）で確認してください。`,
          duration: 8000,
        })
        
        // データ整合性情報をコンソールに出力
        console.log('[IMPORT_SUCCESS_CLIENT]', {
          importedCount: details.importedCount,
          processingTime: details.processingTime,
          dataIntegrity: dataIntegrity,
          importedData: details.importedData
        });
        
        setSelectedFile(null)
        setIsOpen(false)
        // ハイライト付きでページをリロード
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('highlight', 'new');
        window.location.href = currentUrl.toString();
      } else {
        // 詳細なエラー情報を表示
        const errorDetails = result.details || {};
        console.error('[IMPORT_ERROR_CLIENT]', {
          error: result.error,
          details: errorDetails
        });
        
        toast.error(result.error || 'インポートに失敗しました', {
          description: errorDetails.message || 'システム管理者に連絡してください。',
          duration: 10000,
        })
      }
    } catch (error) {
      console.error('Import error:', error)
      toast.error('インポート中にエラーが発生しました')
    } finally {
      setIsImporting(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const params = new URLSearchParams()
      if (exportYear && exportYear !== 'all') params.append('year', exportYear)
      if (exportMonth && exportMonth !== 'all') params.append('month', exportMonth)

      const response = await fetch(`/api/import-export?${params.toString()}`)

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `budget-data-${new Date().toISOString().split('T')[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('データをエクスポートしました')
      } else {
        const result = await response.json()
        toast.error(result.error || 'エクスポートに失敗しました')
      }
    } catch (error) {
      console.error('Export error:', error)
      toast.error('エクスポート中にエラーが発生しました')
    } finally {
      setIsExporting(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            データ管理
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>データのインポート・エクスポート</DialogTitle>
          <DialogDescription>
            スプレッドシートファイルからデータをインポートしたり、現在のデータをエクスポートできます
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">インポート</TabsTrigger>
            <TabsTrigger value="export">エクスポート</TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Excelファイル (.xlsx)</Label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                disabled={isImporting}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  選択されたファイル: {selectedFile.name}
                </p>
              )}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">対応フォーマット</h4>
              <p className="text-sm text-blue-700">
                案件, 会社名, 対象月, 部門, 媒体, 運用タイプ, 担当者, 金額, 実績, ジャンル, 営業先, 営業担当
              </p>
            </div>
            
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || isImporting}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? 'インポート中...' : 'インポート実行'}
            </Button>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">年</Label>
                <Select value={exportYear} onValueChange={setExportYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="すべて" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="month">月</Label>
                <Select value={exportMonth} onValueChange={setExportMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="すべて" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    {months.map(month => (
                      <SelectItem key={month} value={month.toString()}>
                        {month}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">エクスポート内容</h4>
              <p className="text-sm text-green-700">
                現在登録されている予算・実績データをスプレッドシート形式でダウンロードします
              </p>
            </div>
            
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'エクスポート中...' : 'エクスポート実行'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 