'use client';

import { useState } from 'react';
import * as Papa from 'papaparse';

interface CSVManagerProps {
  entityName: string;
  onImport: (data: any[]) => Promise<void>;
  onExport: () => Promise<any[]>;
  sampleData?: any;
}

export default function CSVManager({ 
  entityName, 
  onImport, 
  onExport, 
  sampleData 
}: CSVManagerProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importResults, setImportResults] = useState<string>('');

  // CSV インポート処理
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResults('');

    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            await onImport(results.data);
            setImportResults(`✅ ${results.data.length}件のデータをインポートしました`);
          } catch (error) {
            console.error('インポートエラー:', error);
            setImportResults(`❌ インポートに失敗しました: ${error}`);
          } finally {
            setIsImporting(false);
          }
        },
        error: (error) => {
          console.error('CSV解析エラー:', error);
          setImportResults(`❌ CSVファイルの解析に失敗しました: ${error.message}`);
          setIsImporting(false);
        }
      });
    } catch (error) {
      console.error('ファイル読み込みエラー:', error);
      setImportResults(`❌ ファイルの読み込みに失敗しました`);
      setIsImporting(false);
    }

    // ファイル入力をリセット
    event.target.value = '';
  };

  // CSV エクスポート処理
  const handleExport = async () => {
    setIsExporting(true);

    try {
      const data = await onExport();
      
      if (data.length === 0) {
        alert('エクスポートするデータがありません');
        return;
      }

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${entityName}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('エクスポートエラー:', error);
      alert('エクスポートに失敗しました');
    } finally {
      setIsExporting(false);
    }
  };

  // サンプルCSVダウンロード
  const downloadSample = () => {
    if (!sampleData) return;

    const csv = Papa.unparse([sampleData]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${entityName}_sample.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f8ff', 
      padding: '1.5rem', 
      borderRadius: '8px',
      marginBottom: '2rem',
      border: '1px solid #e0e0e0'
    }}>
      <h3>📁 CSV インポート・エクスポート</h3>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        
        {/* CSVインポート */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            📥 CSVインポート
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isImporting}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: isImporting ? '#f5f5f5' : 'white'
            }}
          />
          {isImporting && (
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              インポート中...
            </p>
          )}
        </div>

        {/* CSVエクスポート */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            📤 CSVエクスポート
          </label>
          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {isExporting ? 'エクスポート中...' : `${entityName}をエクスポート`}
          </button>
        </div>

        {/* サンプルダウンロード */}
        {sampleData && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              📋 サンプルCSV
            </label>
            <button
              onClick={downloadSample}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              サンプルをダウンロード
            </button>
          </div>
        )}
      </div>

      {/* インポート結果表示 */}
      {importResults && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          borderRadius: '4px',
          backgroundColor: importResults.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${importResults.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          color: importResults.includes('✅') ? '#155724' : '#721c24'
        }}>
          {importResults}
        </div>
      )}
    </div>
  );
} 