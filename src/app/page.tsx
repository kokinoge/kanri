
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileStatCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Building2, Users, Target, TrendingUp } from "lucide-react";
import { ImportExportDialog } from "@/components/ImportExportDialog";

interface DashboardStats {
  overview: {
    totalClients: number;
    totalCampaigns: number;
    activeCampaigns: number;
    totalBudget: number;
    totalSpend: number;
    totalResults: number;
    efficiency: number;
  };
  platformBreakdown: {
    budget: Array<{ platform: string; amount: number }>;
    results: Array<{ platform: string; spend: number; result: number }>;
  };
  monthlyTrends: Array<{
    year: number;
    month: number;
    budget: number;
    spend: number;
    result: number;
  }>;
  clientPerformance: Array<{
    id: string;
    name: string;
    totalBudget: number;
    totalSpend: number;
    totalResult: number;
    efficiency: number;
  }>;
}

interface DepartmentData {
  summary: {
    department_count: number;
    total_clients: number;
    total_budget: number;
    average_budget: number;
  };
  departments: Array<{
    department: string;
    client_count: number;
    campaign_count: number;
    total_budget: number;
    total_actual_spend: number;
  }>;
}

const fetcher = async (url: string) => {
  console.log('Fetching:', url);
  const res = await fetch(url);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Fetch error:', res.status, res.statusText, errorText);
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
  }
  
  const data = await res.json();
  console.log('Fetched data:', url, data);
  return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Home() {
  const { data: session, status } = useSession();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  
  // 初回ローディング状態のタイムアウト用state（Hooks規則に従い先頭で定義）
  const [showLoadingOverride, setShowLoadingOverride] = useState(false);

  const { data: stats, error, isLoading } = useSWR<DashboardStats>(
    `/api/dashboard/stats?year=${selectedYear}&month=${selectedMonth}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000
    }
  );

  const { data: departmentData, error: departmentError, isLoading: departmentLoading } = useSWR<DepartmentData>(
    '/api/departments/stats',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000
    }
  );

  // 5秒経過したらローディングを強制終了（Hooks規則に従い先頭で定義）
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingOverride(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // 年と月の選択肢を生成
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 開発環境では認証チェックをスキップ
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // 認証状態のチェック（開発環境では5秒でタイムアウト）
  if (!isDevelopment && status === "loading" && !showLoadingOverride) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg">認証情報を確認中...</div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // エラー状態の処理
  if (error || departmentError) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">データの読み込みに失敗しました</div>
            <div className="text-sm text-gray-600 mb-4">
              {error?.message || departmentError?.message || 'ネットワークエラーまたはサーバーエラーが発生しました'}
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              再読み込み
            </Button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // データが少なくとも一つ取得できているか、5秒経過している場合はレンダリング
  const shouldRender = showLoadingOverride || stats || departmentData || (!isLoading && !departmentLoading);

  if (!shouldRender) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg">データを読み込み中...</div>
            <div className="text-sm text-gray-500 mt-2">
              {isLoading && departmentLoading ? '両方のデータを取得中' : 
               isLoading ? 'ダッシュボードデータを取得中' : '部門データを取得中'}
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // データの安全性チェックとフォールバック
  const isDepartmentDataValid = departmentData && 
    departmentData.summary && 
    typeof departmentData.summary.department_count === 'number' &&
    Array.isArray(departmentData.departments);

  // データが未取得またはundefinedの場合のフォールバック
  const safeStats = stats || {
    overview: {
      totalClients: 0,
      totalCampaigns: 0,
      activeCampaigns: 0,
      totalBudget: 0,
      totalSpend: 0,
      totalResults: 0,
      efficiency: 0
    },
    platformBreakdown: { budget: [], results: [] },
    monthlyTrends: [],
    clientPerformance: []
  };

  const safeDepartmentData = departmentData || {
    summary: {
      department_count: 0,
      total_clients: 0,
      total_budget: 0,
      average_budget: 0
    },
    departments: []
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">ダッシュボード</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <ImportExportDialog />
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
            <Select value={selectedMonth} onValueChange={setSelectedMonth} disabled={!selectedYear}>
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
          </div>
        </div>

        {/* 統計カード - モバイル対応 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MobileStatCard
            label="総クライアント数"
            value={formatNumber(safeStats.overview.totalClients)}
            icon={<Building2 className="w-8 h-8 text-blue-500" />}
            className="md:hidden"
          />
          <MobileStatCard
            label="総案件数"
            value={formatNumber(safeStats.overview.totalCampaigns)}
            icon={<Target className="w-8 h-8 text-green-500" />}
            className="md:hidden"
          />
          <MobileStatCard
            label="総予算"
            value={formatCurrency(safeStats.overview.totalBudget)}
            icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
            className="md:hidden"
          />
          <MobileStatCard
            label="効率性"
            value={`${(safeStats.overview.efficiency * 100).toFixed(1)}%`}
            icon={<Users className="w-8 h-8 text-orange-500" />}
            className="md:hidden"
          />

          {/* デスクトップ版の統計カード */}
          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総クライアント数</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                              <div className="text-2xl font-bold">{formatNumber(safeStats.overview.totalClients)}</div>
            </CardContent>
          </Card>

          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総案件数</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(safeStats.overview.totalCampaigns)}</div>
              <p className="text-xs text-muted-foreground">
                うち実行中: {formatNumber(safeStats.overview.activeCampaigns)}
              </p>
            </CardContent>
          </Card>

          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総予算</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                              <div className="text-2xl font-bold">{formatCurrency(safeStats.overview.totalBudget)}</div>
                <p className="text-xs text-muted-foreground">
                  支出: {formatCurrency(safeStats.overview.totalSpend)}
              </p>
            </CardContent>
          </Card>

          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">効率性</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                                  {(safeStats.overview.efficiency * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  結果: {formatCurrency(safeStats.overview.totalResults)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 事業部統計 */}
        {isDepartmentDataValid && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MobileStatCard
              label="事業部数"
              value={formatNumber(safeDepartmentData.summary.department_count)}
              className="md:hidden"
            />
            <MobileStatCard
              label="平均予算"
              value={formatCurrency(safeDepartmentData.summary.average_budget)}
              className="md:hidden"
            />

            <Card className="hidden md:block">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">事業部数</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(safeDepartmentData.summary.department_count)}</div>
              </CardContent>
            </Card>

            <Card className="hidden md:block">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均予算</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(safeDepartmentData.summary.average_budget)}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 月別トレンド */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">月別トレンド（過去12ヶ月）</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
                              <LineChart data={safeStats.monthlyTrends.map(item => ({
                ...item,
                period: `${item.year}/${item.month.toString().padStart(2, '0')}`,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="period" 
                  fontSize={12}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ fontSize: 12 }}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="budget" stroke="#8884d8" name="予算" strokeWidth={2} />
                <Line type="monotone" dataKey="spend" stroke="#82ca9d" name="支出" strokeWidth={2} />
                <Line type="monotone" dataKey="result" stroke="#ffc658" name="結果" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 事業部別パフォーマンス */}
        {isDepartmentDataValid && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">事業部別パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              {safeDepartmentData.departments.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={safeDepartmentData.departments.map(dept => ({
                      name: dept.department && dept.department.length > 8 ? dept.department.slice(0, 8) + '...' : dept.department,
                      budget: Number(dept.total_budget || 0),
                      spend: Number(dept.total_actual_spend || 0),
                      clients: Number(dept.client_count || 0),
                      campaigns: Number(dept.campaign_count || 0),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      fontSize={12}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'clients' || name === 'campaigns' ? value : formatCurrency(value), 
                        name === 'budget' ? '予算' : 
                        name === 'spend' ? '支出' : 
                        name === 'clients' ? 'クライアント数' : '案件数'
                      ]}
                      labelStyle={{ fontSize: 12 }}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="budget" fill="#8884d8" name="予算" />
                    <Bar dataKey="spend" fill="#82ca9d" name="支出" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[250px] text-gray-500">
                  データがありません
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* プラットフォーム別分析 - モバイル対応 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* プラットフォーム別予算分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">プラットフォーム別予算分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={safeStats.platformBreakdown.budget.map(item => ({
                      ...item,
                      amount: Number(item.amount),
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ platform, percent }: any) => `${platform} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {safeStats.platformBreakdown.budget.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* クライアント別パフォーマンス */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">クライアント別パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={safeStats.clientPerformance.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelStyle={{ fontSize: 12 }}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="totalBudget" fill="#8884d8" name="予算" />
                  <Bar dataKey="totalSpend" fill="#82ca9d" name="支出" />
                  <Bar dataKey="totalResult" fill="#ffc658" name="結果" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
