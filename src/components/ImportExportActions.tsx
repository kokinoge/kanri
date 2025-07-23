"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImportExportActionsProps {
  /** エクスポート用のAPIエンドポイント */
  exportEndpoint: string;
  /** インポート用のAPIエンドポイント */
  importEndpoint: string;
  /** エクスポートするデータの種類 */
  dataType: string;
  /** エクスポートファイル名のプレフィックス */
  filePrefix: string;
  /** 現在のフィルター条件（エクスポート用） */
  filters?: Record<string, any>;
  /** インポート完了後のコールバック */
  onImportComplete?: () => void;
}

export function ImportExportActions({
  exportEndpoint,
  importEndpoint,
  dataType,
  filePrefix,
  filters = {},
  onImportComplete
}: ImportExportActionsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      queryParams.append('format', 'csv');

      const response = await fetch(`${exportEndpoint}?${queryParams}`);
      if (!response.ok) throw new Error('エクスポートに失敗しました');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      a.download = `${filePrefix}_${timestamp}.csv`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(`${dataType}データをエクスポートしました`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`エクスポートに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('CSVファイルを選択してください');
      return;
    }

    handleImport(file);
  };

  const handleImport = async (file: File) => {
    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(importEndpoint, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'インポートに失敗しました');
      }

      toast.success(`${dataType}データをインポートしました: ${result.imported}件処理`, {
        description: result.message
      });

      setIsImportDialogOpen(false);
      onImportComplete?.();
    } catch (error) {
      console.error('Import error:', error);
      toast.error(`インポートに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex gap-2">
      {/* エクスポートボタン */}
      <Button
        onClick={handleExport}
        disabled={isExporting}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        {isExporting ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        エクスポート
      </Button>

      {/* インポートダイアログ */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            インポート
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              {dataType}データインポート
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                CSVファイルを選択してアップロードしてください
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="gap-2"
              >
                {isImporting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                ファイルを選択
              </Button>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500" />
                <div>
                  <p className="font-medium">注意事項：</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• CSVファイルのみサポートしています</li>
                    <li>• 既存データと重複する場合は更新されます</li>
                    <li>• 大量データの場合は処理に時間がかかる場合があります</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 