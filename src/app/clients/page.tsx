"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Table } from "lucide-react";
import { toast } from "sonner";

export default function ClientsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // スプレッドシートのフォーマット設定
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
    try {
      toast.loading('スプレッドシートフォーマットを設定中...', { id: 'sheets-setup' });
      
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

      if (response.ok && result.success) {
        toast.success(`✅ スプレッドシートのフォーマット設定完了！\n各シートが作成されました`, { 
          id: 'sheets-setup',
          duration: 6000 
        });
        console.log('Sheets setup result:', result);
        
        // フォーマット完了後、データ同期を提案
        setTimeout(() => {
          if (confirm('フォーマット設定が完了しました。\nクライアントデータを同期しますか？')) {
            handleDataSync(sheetId);
          }
        }, 2000);
      } else {
        throw new Error(result.message || 'スプレッドシートのフォーマット設定に失敗しました');
      }
    } catch (error) {
      console.error('Sheets setup error:', error);
      toast.error(`❌ 設定エラー: ${error instanceof Error ? error.message : '不明なエラー'}`, { 
        id: 'sheets-setup',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // クライアントデータ同期
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
    try {
      toast.loading('Google Sheetsにクライアントデータを同期中...', { id: 'sheets-sync' });
      
      const response = await fetch('/api/sheets/clients/sync', {
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

      if (response.ok && result.success) {
        toast.success(`✅ Google Sheetsに同期完了！\n${result.message}`, { 
          id: 'sheets-sync',
          duration: 5000 
        });
        console.log('Sheets sync result:', result);
      } else {
        throw new Error(result.message || 'Google Sheets同期に失敗しました');
      }
    } catch (error) {
      console.error('Google Sheets sync error:', error);
      toast.error(`❌ 同期エラー: ${error instanceof Error ? error.message : '不明なエラー'}`, { 
        id: 'sheets-sync',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center text-gray-900">
                <Building2 className="mr-3" />
                クライアント管理
              </h1>
              <p className="text-gray-600 mt-1">
                Google Sheets連携テスト
              </p>
            </div>
            <div className="flex space-x-3">
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

        {/* 使い方ガイド */}
        <Card className="mb-8">
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
                「フォーマット設定」ボタンを押して、スプレッドシートに必要なシート（Clients、Campaigns、Budgets、Results、Summary）とヘッダーを自動作成
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">📊 ステップ3: データ同期</h3>
              <p className="text-sm text-purple-800">
                「データ同期」ボタンを押して、システムのクライアントデータをスプレッドシートに同期
              </p>
            </div>
          </CardContent>
        </Card>

        {/* サービス情報 */}
        <Card>
          <CardHeader>
            <CardTitle>Google Cloud設定情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium">サービスアカウントEmail</h4>
                <p className="text-xs text-gray-600 mt-1 break-all">
                  kanri-sheets-service@sys-96273841197210080039237596.iam.gserviceaccount.com
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium">プロジェクトID</h4>
                <p className="text-xs text-gray-600 mt-1">
                  sys-96273841197210080039237596
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}