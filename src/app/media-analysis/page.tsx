"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Table, CheckCircle, AlertCircle, BarChart3, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function MediaAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  // Google Sheets フォーマット設定
  const handleFormatSetup = async () => {
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
      toast.loading('媒体分析用スプレッドシートを設定中...', { id: 'sheets-setup' });
      
      const response = await fetch('/api/sheets/setup-format', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          spreadsheetId: sheetId
        })
      });

      const result = await response.json();
      setLastResult({ type: 'format', success: response.ok && result.success, result, response: { status: response.status, ok: response.ok } });

      if (response.ok && result.success) {
        toast.success(`✅ 媒体分析用スプレッドシート設定完了！\n各シートが作成されました`, { 
          id: 'sheets-setup',
          duration: 6000 
        });
        console.log('Media sheets setup result:', result);
        
        // フォーマット完了後、データ同期を提案
        setTimeout(() => {
          if (confirm('フォーマット設定が完了しました。\n媒体データを同期しますか？')) {
            handleDataSync(sheetId);
          }
        }, 2000);
      } else {
        throw new Error(result.message || '媒体分析用スプレッドシートの設定に失敗しました');
      }
    } catch (error) {
      console.error('Media sheets setup error:', error);
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      setLastResult({ type: 'format', success: false, error: errorMessage });
      toast.error(`❌ 設定エラー: ${errorMessage}`, { 
        id: 'sheets-setup',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 媒体データ同期
  const handleDataSync = async (providedSheetId?: string) => {
    let sheetId = providedSheetId;
    
    if (!sheetId) {
      const spreadsheetId = prompt('Google スプレッドシートのIDまたはURLを入力してください:');
      
      if (!spreadsheetId) {
        return;
      }

      // URLからIDを抽出
      sheetId = spreadsheetId;
      if (spreadsheetId.includes('spreadsheets/d/')) {
        const match = spreadsheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (match) {
          sheetId = match[1];
        }
      }
    }

    setIsLoading(true);
    setLastResult(null);
    
    try {
      toast.loading('Google Sheetsに媒体データを同期中...', { id: 'sheets-sync' });
      
      const response = await fetch('/api/sheets/media/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          spreadsheetId: sheetId,
          syncMode: 'replace' // データを置換
        })
      });

      const result = await response.json();
      setLastResult({ type: 'sync', success: response.ok && result.success, result, response: { status: response.status, ok: response.ok } });

      if (response.ok && result.success) {
        toast.success(`✅ Google Sheetsに媒体データ同期完了！\n${result.message}`, { 
          id: 'sheets-sync',
          duration: 5000 
        });
        console.log('Media sheets sync result:', result);
      } else {
        throw new Error(result.message || 'Google Sheets媒体データ同期に失敗しました');
      }
    } catch (error) {
      console.error('Media sheets sync error:', error);
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      setLastResult({ type: 'sync', success: false, error: errorMessage });
      toast.error(`❌ 同期エラー: ${errorMessage}`, { 
        id: 'sheets-sync',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // モック媒体データ
  const mockMediaData = [
    { 
      id: 'media-1', 
      name: 'Google Ads', 
      platform: 'Google', 
      impressions: 125000, 
      clicks: 3200, 
      ctr: '2.56%', 
      cost: 48000, 
      conversions: 85, 
      cpa: 565, 
      roas: 2.8 
    },
    { 
      id: 'media-2', 
      name: 'Facebook Ads', 
      platform: 'Meta', 
      impressions: 98000, 
      clicks: 2800, 
      ctr: '2.86%', 
      cost: 35000, 
      conversions: 72, 
      cpa: 486, 
      roas: 3.2 
    },
    { 
      id: 'media-3', 
      name: 'Instagram Ads', 
      platform: 'Meta', 
      impressions: 86000, 
      clicks: 2400, 
      ctr: '2.79%', 
      cost: 28000, 
      conversions: 58, 
      cpa: 483, 
      roas: 2.9 
    },
    { 
      id: 'media-4', 
      name: 'YouTube Ads', 
      platform: 'Google', 
      impressions: 156000, 
      clicks: 1800, 
      ctr: '1.15%', 
      cost: 42000, 
      conversions: 45, 
      cpa: 933, 
      roas: 2.1 
    },
    { 
      id: 'media-5', 
      name: 'TikTok Ads', 
      platform: 'TikTok', 
      impressions: 210000, 
      clicks: 4200, 
      ctr: '2.00%', 
      cost: 32000, 
      conversions: 96, 
      cpa: 333, 
      roas: 3.8 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center text-gray-900">
                <BarChart3 className="mr-3" />
                媒体分析
              </h1>
              <p className="text-gray-600 mt-1">
                各媒体のパフォーマンス詳細分析
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {/* Google Sheets フォーマット設定ボタン */}
              <Button 
                variant="secondary" 
                className="flex items-center"
                onClick={handleFormatSetup}
                disabled={isLoading}
              >
                <Table className="w-4 h-4 mr-2" />
                フォーマット設定
              </Button>
              
              {/* Google Sheets データ同期ボタン */}
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => handleDataSync()}
                disabled={isLoading}
              >
                <Table className="w-4 h-4 mr-2" />
                データ同期
              </Button>
            </div>
          </div>
        </div>

        {/* 最後の実行結果 */}
        {lastResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {lastResult.success ? (
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                )}
                最後の実行結果 ({lastResult.type === 'format' ? 'フォーマット設定' : 'データ同期'})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">ステータス:</span>
                  <span className={lastResult.success ? 'text-green-600' : 'text-red-600'}>
                    {lastResult.success ? '成功' : '失敗'}
                  </span>
                </div>
                {lastResult.response && (
                  <div className="flex justify-between">
                    <span className="font-medium">HTTPレスポンス:</span>
                    <span>{lastResult.response.status} ({lastResult.response.ok ? 'OK' : 'Error'})</span>
                  </div>
                )}
                {lastResult.result && (
                  <div>
                    <span className="font-medium">メッセージ:</span>
                    <p className="mt-1 text-sm bg-gray-100 p-2 rounded">
                      {lastResult.result.message || 'メッセージなし'}
                    </p>
                  </div>
                )}
                {lastResult.error && (
                  <div>
                    <span className="font-medium text-red-600">エラー:</span>
                    <p className="mt-1 text-sm bg-red-50 p-2 rounded text-red-700">
                      {lastResult.error}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">総インプレッション</p>
                  <p className="text-2xl font-bold">675,000</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">総クリック数</p>
                  <p className="text-2xl font-bold">14,400</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">総費用</p>
                  <p className="text-2xl font-bold">¥185,000</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">総コンバージョン</p>
                  <p className="text-2xl font-bold">356</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 媒体パフォーマンステーブル */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>媒体別パフォーマンス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">媒体名</th>
                    <th className="text-left p-2 font-medium">プラットフォーム</th>
                    <th className="text-right p-2 font-medium">インプレッション</th>
                    <th className="text-right p-2 font-medium">クリック</th>
                    <th className="text-right p-2 font-medium">CTR</th>
                    <th className="text-right p-2 font-medium">費用</th>
                    <th className="text-right p-2 font-medium">CV</th>
                    <th className="text-right p-2 font-medium">CPA</th>
                    <th className="text-right p-2 font-medium">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMediaData.map((media) => (
                    <tr key={media.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{media.name}</td>
                      <td className="p-2">{media.platform}</td>
                      <td className="p-2 text-right">{media.impressions.toLocaleString()}</td>
                      <td className="p-2 text-right">{media.clicks.toLocaleString()}</td>
                      <td className="p-2 text-right">{media.ctr}</td>
                      <td className="p-2 text-right">¥{media.cost.toLocaleString()}</td>
                      <td className="p-2 text-right">{media.conversions}</td>
                      <td className="p-2 text-right">¥{media.cpa}</td>
                      <td className="p-2 text-right">{media.roas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Google Sheets連携ガイド */}
        <Card>
          <CardHeader>
            <CardTitle>Google Sheets連携 使い方ガイド</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">📋 ステップ1: スプレッドシート準備</h3>
              <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
                <li>Google Spreadsheetsで新しいスプレッドシートを作成</li>
                <li>スプレッドシートのURLをコピー（例: https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit）</li>
                <li>サービスアカウント（kanri-sheets-service@sys-96273841197210080039237596.iam.gserviceaccount.com）に編集権限を共有</li>
              </ol>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">⚙️ ステップ2: フォーマット設定</h3>
              <p className="text-sm text-green-800">
                「フォーマット設定」ボタンを押して、スプレッドシートに必要なシート（Media、Campaigns、Results、Summary）とヘッダーを自動作成
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">📊 ステップ3: データ同期</h3>
              <p className="text-sm text-purple-800">
                「データ同期」ボタンを押して、システムの媒体データをスプレッドシートに同期
              </p>
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