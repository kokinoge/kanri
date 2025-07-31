"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Table, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock media data
const mockMediaData = [
  { id: 'm1', name: 'Google Ads', platform: 'Google', impressions: 125000, clicks: 3200, ctr: 2.56, cost: 48000, conversions: 150, cpa: 320, roas: 250, status: 'Active', notes: '検索広告、ディスプレイ広告' },
  { id: 'm2', name: 'Facebook Ads', platform: 'Facebook', impressions: 98000, clicks: 2800, ctr: 2.86, cost: 35000, conversions: 120, cpa: 291.67, roas: 300, status: 'Active', notes: 'SNS広告、動画広告' },
  { id: 'm3', name: 'Instagram Ads', platform: 'Instagram', impressions: 86000, clicks: 2400, ctr: 2.79, cost: 28000, conversions: 90, cpa: 311.11, roas: 280, status: 'Active', notes: 'SNS広告、ストーリーズ広告' },
  { id: 'm4', name: 'YouTube Ads', platform: 'YouTube', impressions: 156000, clicks: 1800, ctr: 1.15, cost: 42000, conversions: 80, cpa: 525, roas: 200, status: 'Active', notes: '動画広告、TrueView' },
  { id: 'm5', name: 'TikTok Ads', platform: 'TikTok', impressions: 210000, clicks: 4200, ctr: 2.00, cost: 32000, conversions: 110, cpa: 290.91, roas: 350, status: 'Active', notes: 'ショート動画広告' },
];

export default function MediaAnalysisDirectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  // Direct Google Sheets integration (client-side)
  const handleDirectSync = async () => {
    const spreadsheetId = prompt('Google スプレッドシートのIDまたはURLを入力してください:\n\n例: https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit\nまたは: 1ABC...XYZ');
    
    if (!spreadsheetId) {
      return;
    }

    // URLからIDを抽出
    let sheetId = spreadsheetId;
    if (spreadsheetId.includes('spreadsheets/d/')) {
      const match = spreadsheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        sheetId = match[1];
      }
    }

    setIsLoading(true);
    setLastResult(null);
    
    try {
      toast.loading('Google Sheetsに直接同期中...', { id: 'direct-sync' });

      // CSVダウンロード機能として実装
      const csvContent = convertToCSV(mockMediaData);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `media_analysis_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLastResult({
        type: 'direct-sync',
        success: true,
        result: {
          message: 'CSVファイルがダウンロードされました。Google Sheetsにインポートしてください。',
          spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`,
          recordCount: mockMediaData.length
        }
      });

      toast.success(`✅ CSV同期完了！\n${mockMediaData.length}件のデータをダウンロードしました`, { 
        id: 'direct-sync',
        duration: 5000 
      });

    } catch (error) {
      console.error('Direct sync error:', error);
      const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
      setLastResult({
        type: 'direct-sync',
        success: false,
        error: errorMessage
      });
      
      toast.error(`❌ CSV同期エラー: ${errorMessage}`, { 
        id: 'direct-sync',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Convert data to CSV format
  const convertToCSV = (data: any[]) => {
    const headers = ['ID', '媒体名', 'プラットフォーム', 'インプレッション', 'クリック数', 'CTR', '費用', 'コンバージョン', 'CPA', 'ROAS', 'ステータス', '備考'];
    const csvRows = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        `"${item.name}"`,
        item.platform,
        item.impressions,
        item.clicks,
        item.ctr,
        item.cost,
        item.conversions,
        item.cpa,
        item.roas,
        item.status,
        `"${item.notes}"`
      ].join(','))
    ];
    return csvRows.join('\n');
  };

  // Calculate totals
  const totalImpressions = mockMediaData.reduce((sum, item) => sum + item.impressions, 0);
  const totalClicks = mockMediaData.reduce((sum, item) => sum + item.clicks, 0);
  const totalCost = mockMediaData.reduce((sum, item) => sum + item.cost, 0);
  const totalConversions = mockMediaData.reduce((sum, item) => sum + item.conversions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center text-gray-900">
                <BarChart3 className="mr-3" />
                媒体分析 (直接連携版)
              </h1>
              <p className="text-gray-600 mt-1">
                各媒体のパフォーマンス詳細分析 - CSV直接ダウンロード対応
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {/* 直接同期ボタン */}
              <Button 
                variant="outline" 
                className="flex items-center bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
                onClick={handleDirectSync}
                disabled={isLoading}
              >
                <Table className="w-4 h-4 mr-2" />
                {isLoading ? '処理中...' : 'CSV ダウンロード'}
              </Button>
            </div>
          </div>
        </div>

        {/* 実行結果表示 */}
        {lastResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {lastResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                実行結果
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${lastResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-medium ${lastResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {lastResult.success ? '✅ ' : '❌ '}
                  {lastResult.result?.message || lastResult.error}
                </p>
                {lastResult.success && lastResult.result && (
                  <div className="mt-3 space-y-2">
                    {lastResult.result.recordCount && (
                      <p className="text-sm text-green-700">
                        処理件数: {lastResult.result.recordCount}件
                      </p>
                    )}
                    {lastResult.result.spreadsheetUrl && (
                      <a 
                        href={lastResult.result.spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-blue-600 hover:underline"
                      >
                        → Google Spreadsheetsで開く
                      </a>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-800">総インプレッション</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-900">{totalImpressions.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-800">総クリック数</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-900">{totalClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-800">平均CTR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-900">{avgCTR.toFixed(2)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-800">総費用</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-900">¥{totalCost.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-yellow-800">総コンバージョン</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-900">{totalConversions.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* データテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>媒体別パフォーマンス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">媒体名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">プラットフォーム</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">インプレッション</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">クリック数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">費用</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コンバージョン</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockMediaData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.platform}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.impressions.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.clicks.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.ctr.toFixed(2)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">¥{item.cost.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.conversions.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">¥{item.cpa.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.roas.toFixed(0)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 使用方法ガイド */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>CSV連携 使い方ガイド</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">📋 ステップ1: CSVダウンロード</h3>
              <p className="text-sm text-blue-800">
                「CSV ダウンロード」ボタンを押して、媒体データをCSV形式でダウンロードします。
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">📊 ステップ2: Google Sheetsにインポート</h3>
              <ol className="text-sm text-green-800 space-y-1 ml-4 list-decimal">
                <li>Google Spreadsheetsで新しいシートを開く</li>
                <li>ファイル → インポート → アップロード</li>
                <li>ダウンロードしたCSVファイルを選択</li>
                <li>区切り文字：カンマ、文字コード：UTF-8を設定</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-2">🔗 テスト用スプレッドシート</h3>
              <p className="text-sm text-yellow-800 font-mono bg-white p-2 rounded border">
                1tIbMcDOxL6dkxR8tqu6QHMmVoagvGm7eXjQuoA-3Q-k
              </p>
              <a 
                href="https://docs.google.com/spreadsheets/d/1tIbMcDOxL6dkxR8tqu6QHMmVoagvGm7eXjQuoA-3Q-k/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                → Google Spreadsheetsで開く
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}