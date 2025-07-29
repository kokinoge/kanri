"use client";

import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Save, Edit, Trash2, DollarSign } from "lucide-react";

function ResultsPageInner() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  // クライアントデータ取得
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setClients(data);
          if (data.length > 0) {
            setSelectedClient(data[0].id);
          }
        }
      } catch (error) {
        console.error('クライアント取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClients();
    }
  }, [user]);

  // サンプル実績データ
  const sampleResults = [
    {
      id: '1',
      date: '2024-07-01',
      campaign: 'Spring Campaign 2024',
      platform: 'Facebook',
      actualSpend: 150000,
      actualResult: 180000,
      kpi: 'クリック数',
      kpiValue: 2500,
      note: '好調な推移'
    },
    {
      id: '2',
      date: '2024-07-02',
      campaign: 'Spring Campaign 2024',
      platform: 'Instagram',
      actualSpend: 120000,
      actualResult: 140000,
      kpi: 'インプレッション',
      kpiValue: 85000,
      note: ''
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  if (authLoading || loading) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">データを読み込み中...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">実績入力</h1>
            <p className="text-gray-600 mt-1">キャンペーン実績データの入力・管理</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新規実績追加
          </Button>
        </div>

        {/* フィルター */}
        <Card>
          <CardHeader>
            <CardTitle>フィルター</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>クライアント</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="クライアントを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>期間（開始）</Label>
                <Input type="date" defaultValue="2024-07-01" />
              </div>
              <div>
                <Label>期間（終了）</Label>
                <Input type="date" defaultValue="2024-07-31" />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  検索
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 実績一覧 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              実績データ一覧
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>プラットフォーム</TableHead>
                  <TableHead className="text-right">実際支出</TableHead>
                  <TableHead className="text-right">実際結果</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead className="text-right">KPI値</TableHead>
                  <TableHead>備考</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.date}</TableCell>
                    <TableCell className="font-medium">{result.campaign}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.platform}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCurrency(result.actualSpend)}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {formatCurrency(result.actualResult)}
                    </TableCell>
                    <TableCell>{result.kpi}</TableCell>
                    <TableCell className="text-right">
                      {result.kpiValue.toLocaleString()}
                    </TableCell>
                    <TableCell>{result.note}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">今月の総支出</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(270000)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">今月の総結果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(320000)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                118.5%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* アクション */}
        <div className="flex gap-4 justify-center">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            一括保存
          </Button>
          <Button variant="outline" onClick={() => router.push('/integrated-management')}>
            統合管理へ
          </Button>
        </div>
      </div>
    </AppLayout>
  );
} 
// Dynamic export to prevent SSR issues with AuthProvider
const Page = dynamic(() => Promise.resolve(PageInner), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg">読み込み中...</div>
    </div>
  )
});

export default Page;
