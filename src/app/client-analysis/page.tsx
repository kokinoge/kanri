"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Building2, TrendingUp, Target, DollarSign } from "lucide-react";

interface ClientAnalysisData {
  clients: Array<{
    id: string;
    name: string;
    businessDivision: string;
    totalBudget: number;
    totalSpend: number;
    totalResult: number;
    efficiency: number;
    campaignCount: number;
    campaigns: Array<{
      id: string;
      name: string;
      totalBudget: number;
      totalSpend: number;
      totalResult: number;
      efficiency: number;
      platformBreakdown: Array<{
        platform: string;
        budget: number;
        spend: number;
        result: number;
      }>;
      monthlyTrends: Array<{
        year: number;
        month: number;
        budget: number;
        spend: number;
        result: number;
      }>;
    }>;
  }>;
  summary: {
    totalClients: number;
    totalCampaigns: number;
    totalBudget: number;
    totalSpend: number;
    totalResult: number;
    averageEfficiency: number;
  };
}

const fetcher = async (url: string) => {
  const startTime = performance.now();
  console.log('[CLIENT_ANALYSIS] Fetching:', url);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒タイムアウト
    
    const res = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const errorText = await res.text();
      const error = new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
      console.error('[CLIENT_ANALYSIS] Fetch error:', {
        url,
        status: res.status,
        statusText: res.statusText,
        error: errorText,
        duration: performance.now() - startTime
      });
      throw error;
    }
    
    const data = await res.json();
    const duration = performance.now() - startTime;
    
    console.log('[CLIENT_ANALYSIS] Fetch success:', {
      url,
      dataSize: JSON.stringify(data).length,
      clientCount: data.clients?.length || 0,
      duration: `${duration.toFixed(2)}ms`
    });
    
    // データ整合性チェック
    if (!data.clients || !Array.isArray(data.clients)) {
      throw new Error('Invalid data structure: clients array is missing');
    }
    
    if (!data.summary || typeof data.summary !== 'object') {
      throw new Error('Invalid data structure: summary object is missing');
    }
    
    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error('[CLIENT_ANALYSIS] Fetch failed:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration.toFixed(2)}ms`
    });
    
    // ネットワークエラーの場合はより詳細なメッセージ
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('リクエストがタイムアウトしました。ネットワーク接続を確認してください。');
    }
    
    throw error;
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function ClientAnalysisPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  
  // タイムアウト用state（Hooks規則に従い先頭で定義）
  const [showLoadingOverride, setShowLoadingOverride] = useState(false);

  const queryParams = new URLSearchParams();
  if (selectedYear !== "all") queryParams.append("year", selectedYear);
  if (selectedMonth !== "all") queryParams.append("month", selectedMonth);
  if (selectedClient !== "all") queryParams.append("clientId", selectedClient);
  if (selectedCampaign !== "all") queryParams.append("campaignId", selectedCampaign);

  const { data: analysisData, error, isLoading } = useSWR<ClientAnalysisData>(
    `/api/analytics/clients?${queryParams.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      revalidateIfStale: false,
      revalidateOnMount: true,
      dedupingInterval: 60000 // 1分間の重複排除
    }
  );

  // タイムアウト管理とメモリリーク対策
  React.useEffect(() => {
    let isMounted = true;
    
    const timer = setTimeout(() => {
      if (isMounted) {
        setShowLoadingOverride(true);
      }
    }, 1000);
    
    // クリーンアップ関数
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // ページ離脱時のクリーンアップ
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      // 保存されていない変更があれば警告
      // 現在は特に処理なし
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // ページが非表示になった時の処理
        console.log('Client Analysis page is now hidden');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // データのフォールバック処理（Hooks規則に従い条件分岐前に定義）
  const safeAnalysisData = analysisData || {
    clients: [],
    summary: {
      totalClients: 0,
      totalCampaigns: 0,
      totalBudget: 0,
      totalSpend: 0,
      totalResult: 0,
      averageEfficiency: 0
    }
  };

  // フィルター条件に応じたクライアント・案件の絞り込み（Hooks規則に従い条件分岐前に定義）
  const filteredClients = useMemo(() => {
    if (!safeAnalysisData?.clients || !Array.isArray(safeAnalysisData.clients)) return [];
    
    // 大規模データ対応: 配列が空の場合は早期リターン
    if (safeAnalysisData.clients.length === 0) return [];
    
    // パフォーマンス最適化: 選択されたクライアントが存在するかチェック
    if (selectedClient !== "all") {
      const client = safeAnalysisData.clients.find(c => c.id === selectedClient);
      return client ? [client] : [];
    }
    
    return safeAnalysisData.clients;
  }, [safeAnalysisData?.clients, selectedClient]);

  const availableCampaigns = useMemo(() => {
    if (!safeAnalysisData?.clients || !Array.isArray(safeAnalysisData.clients)) return [];
    
    // 早期リターン: 空データ対応
    if (safeAnalysisData.clients.length === 0) return [];
    
    // パフォーマンス最適化: 特定クライアント選択時
    if (selectedClient !== "all") {
      const client = safeAnalysisData.clients.find(c => c.id === selectedClient);
      if (!client || !client.campaigns) return [];
      
      return client.campaigns.map(campaign => ({ 
        ...campaign, 
        clientName: client.name,
        clientId: client.id 
      }));
    }
    
    // 全クライアント表示時のパフォーマンス最適化
    const result = [];
    for (const client of safeAnalysisData.clients) {
      if (client.campaigns && Array.isArray(client.campaigns)) {
        for (const campaign of client.campaigns) {
          result.push({ 
            ...campaign, 
            clientName: client.name,
            clientId: client.id 
          });
        }
      }
    }
    
    return result;
  }, [safeAnalysisData?.clients, selectedClient]);

  // チャートデータの最適化
  const chartData = useMemo(() => {
    const pieChartData = filteredClients.map(client => ({
      name: client.name.length > 15 ? client.name.substring(0, 15) + '...' : client.name,
      value: client.totalBudget,
      fullName: client.name
    }));

    const barChartData = filteredClients.map(client => ({
      ...client,
      name: client.name.length > 10 ? client.name.substring(0, 10) + '...' : client.name,
      fullName: client.name
    }));

    return { pieChartData, barChartData };
  }, [filteredClients]);

  const formatMonth = (year: number, month: number) => {
    return `${year}/${month.toString().padStart(2, '0')}`;
  };

  // エラー状態の処理
  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">データの読み込みに失敗しました</div>
            <div className="text-sm text-gray-600 mb-4">
              {error?.message || 'ネットワークエラーまたはサーバーエラーが発生しました'}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              再読み込み
            </button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // 開発環境では常に表示、本番環境ではデータ取得後表示
  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldRender = isDevelopment || showLoadingOverride || (analysisData && !error) || !isLoading;

  if (!shouldRender && !isDevelopment) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg">データを読み込み中...</div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }



  return (
    <ProtectedLayout>
      <ErrorBoundary>
        <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">クライアント分析</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="年を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全期間</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}年
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth} disabled={selectedYear === "all"}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="月を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month}月
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedClient} onValueChange={(value) => {
              setSelectedClient(value);
              setSelectedCampaign("all"); // クライアント変更時に案件選択をリセット
            }}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="クライアントを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全クライアント</SelectItem>
                {safeAnalysisData.clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name || 'Unknown Client'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign} disabled={selectedClient === "all"}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="案件を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全案件</SelectItem>
                {availableCampaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* サマリーカード */}
        {analysisData?.summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総クライアント数</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(safeAnalysisData.summary.totalClients)}</div>
                <p className="text-xs text-muted-foreground">
                  案件数: {formatNumber(safeAnalysisData.summary.totalCampaigns)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総予算</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(safeAnalysisData.summary.totalBudget)}</div>
                <p className="text-xs text-muted-foreground">
                  支出: {formatCurrency(safeAnalysisData.summary.totalSpend)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総結果</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(safeAnalysisData.summary.totalResult)}</div>
                <p className="text-xs text-muted-foreground">
                  ROI: {safeAnalysisData.summary.totalSpend > 0 ?
                    ((safeAnalysisData.summary.totalResult / safeAnalysisData.summary.totalSpend - 1) * 100).toFixed(1) : 0}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均効率性</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeAnalysisData.summary.averageEfficiency * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  結果/支出 比率
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="clients">クライアント別</TabsTrigger>
            <TabsTrigger value="campaigns">案件別</TabsTrigger>
            <TabsTrigger value="performance">パフォーマンス比較</TabsTrigger>
          </TabsList>

          {/* 概要タブ */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* クライアント別予算分布 */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント別予算分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={chartData.pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.pieChartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)} 
                        labelFormatter={(label, payload) => {
                          const item = payload?.[0]?.payload;
                          return item?.fullName || label;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* クライアント別パフォーマンス */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント別パフォーマンス</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData.barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)} 
                        labelFormatter={(label, payload) => {
                          const item = payload?.[0]?.payload;
                          return item?.fullName || label;
                        }}
                      />
                      <Legend />
                      <Bar dataKey="totalBudget" fill="#8884d8" name="予算" />
                      <Bar dataKey="totalSpend" fill="#82ca9d" name="支出" />
                      <Bar dataKey="totalResult" fill="#ffc658" name="結果" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* クライアント別タブ */}
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>クライアント別詳細分析</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>クライアント名</TableHead>
                      <TableHead>事業部</TableHead>
                      <TableHead>案件数</TableHead>
                      <TableHead className="text-right">予算</TableHead>
                      <TableHead className="text-right">支出</TableHead>
                      <TableHead className="text-right">結果</TableHead>
                      <TableHead className="text-right">効率性</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...filteredClients]
                      .sort((a, b) => b.efficiency - a.efficiency)
                      .map((client) => {
                        const roi = client.totalSpend > 0 ? (client.totalResult / client.totalSpend - 1) * 100 : 0;
                        return (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{client.businessDivision}</Badge>
                            </TableCell>
                            <TableCell>{client.campaignCount}</TableCell>
                            <TableCell className="text-right">{formatCurrency(client.totalBudget)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(client.totalSpend)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(client.totalResult)}</TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${
                                client.efficiency > 1 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {(client.efficiency * 100).toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${
                                roi > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {roi.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 案件別タブ */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>案件別詳細分析</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>案件名</TableHead>
                      <TableHead>クライアント</TableHead>
                      <TableHead className="text-right">予算</TableHead>
                      <TableHead className="text-right">支出</TableHead>
                      <TableHead className="text-right">結果</TableHead>
                      <TableHead className="text-right">効率性</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...availableCampaigns]
                      .filter(campaign => selectedCampaign === "all" || campaign.id === selectedCampaign)
                      .sort((a, b) => b.efficiency - a.efficiency)
                      .map((campaign) => {
                        const roi = campaign.totalSpend > 0 ? (campaign.totalResult / campaign.totalSpend - 1) * 100 : 0;
                        return (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.clientName}</TableCell>
                            <TableCell className="text-right">{formatCurrency(campaign.totalBudget)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(campaign.totalSpend)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(campaign.totalResult)}</TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${
                                campaign.efficiency > 1 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {(campaign.efficiency * 100).toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${
                                roi > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {roi.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 選択された案件の詳細チャート */}
            {selectedCampaign !== "all" && (() => {
              const campaign = availableCampaigns.find(c => c.id === selectedCampaign);
              return campaign && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* プラットフォーム別分析 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{campaign.name} - プラットフォーム別</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={campaign.platformBreakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="platform" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="budget" fill="#8884d8" name="予算" />
                          <Bar dataKey="spend" fill="#82ca9d" name="支出" />
                          <Bar dataKey="result" fill="#ffc658" name="結果" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* 月別トレンド */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{campaign.name} - 月別トレンド</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={campaign.monthlyTrends.map(item => ({
                          ...item,
                          period: formatMonth(item.year, item.month)
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Line type="monotone" dataKey="budget" stroke="#8884d8" name="予算" />
                          <Line type="monotone" dataKey="spend" stroke="#82ca9d" name="支出" />
                          <Line type="monotone" dataKey="result" stroke="#ffc658" name="結果" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </TabsContent>

          {/* パフォーマンス比較タブ */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 効率性ランキング */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント効率性ランキング</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...filteredClients]
                      .sort((a, b) => b.efficiency - a.efficiency)
                      .slice(0, 10)
                      .map((client, index) => (
                        <div key={client.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-400 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-amber-600 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-gray-500">{client.businessDivision}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              client.efficiency > 1 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {(client.efficiency * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(client.totalResult)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* ROIランキング */}
              <Card>
                <CardHeader>
                  <CardTitle>案件ROIランキング</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...availableCampaigns]
                      .map(campaign => ({
                        ...campaign,
                        roi: campaign.totalSpend > 0 ? (campaign.totalResult / campaign.totalSpend - 1) * 100 : 0
                      }))
                      .sort((a, b) => b.roi - a.roi)
                      .slice(0, 10)
                      .map((campaign, index) => (
                        <div key={campaign.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-400 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-amber-600 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-gray-500">{campaign.clientName}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              campaign.roi > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {campaign.roi.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(campaign.totalResult)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </ErrorBoundary>
    </ProtectedLayout>
  );
} 