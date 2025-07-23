"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Building2, BarChart3, ArrowRight, Target } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";

interface ReportData {
  budgets: Array<{
    id: string;
    year: number;
    month: number;
    platform: string;
    operationType: string;
    revenueType: string;
    amount: number;
    targetKpi?: string;
    targetValue?: number;
    campaign: {
      name: string;
      client: {
        name: string;
      };
    };
  }>;
  results: Array<{
    id: string;
    year: number;
    month: number;
    platform: string;
    operationType: string;
    actualSpend: number;
    actualResult: number;
    campaign: {
      name: string;
      client: {
        name: string;
      };
    };
  }>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReportsPage() {
  const [startYear, setStartYear] = useState<string>("");
  const [startMonth, setStartMonth] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const { data: budgets } = useSWR("/api/budgets", fetcher);
  const { data: results } = useSWR("/api/results", fetcher);
  const { data: clients } = useSWR("/api/clients", fetcher);
  const { data: platforms } = useSWR("/api/masters?category=platform", fetcher);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // formatCurrency関数を削除（utils.tsから使用）
  
  const formatMonth = (year: number, month: number) => {
    return `${year}/${month.toString().padStart(2, '0')}`;
  };

  // フィルタリング処理
  const filteredData = {
    budgets: budgets?.filter((budget: any) => {
      let include = true;
      
      if (startYear && startMonth) {
        const startDate = new Date(parseInt(startYear), parseInt(startMonth) - 1);
        const budgetDate = new Date(budget.year, budget.month - 1);
        if (budgetDate < startDate) include = false;
      }
      
      if (endYear && endMonth) {
        const endDate = new Date(parseInt(endYear), parseInt(endMonth) - 1);
        const budgetDate = new Date(budget.year, budget.month - 1);
        if (budgetDate > endDate) include = false;
      }
      
      if (selectedClient && selectedClient !== 'all' && budget.campaign.client.id !== selectedClient) include = false;
      if (selectedPlatform && selectedPlatform !== 'all' && budget.platform !== selectedPlatform) include = false;
      
      return include;
    }) || [],
    
    results: results?.filter((result: any) => {
      let include = true;
      
      if (startYear && startMonth) {
        const startDate = new Date(parseInt(startYear), parseInt(startMonth) - 1);
        const resultDate = new Date(result.year, result.month - 1);
        if (resultDate < startDate) include = false;
      }
      
      if (endYear && endMonth) {
        const endDate = new Date(parseInt(endYear), parseInt(endMonth) - 1);
        const resultDate = new Date(result.year, result.month - 1);
        if (resultDate > endDate) include = false;
      }
      
      if (selectedClient && selectedClient !== 'all' && result.campaign.client.id !== selectedClient) include = false;
      if (selectedPlatform && selectedPlatform !== 'all' && result.platform !== selectedPlatform) include = false;
      
      return include;
    }) || [],
  };

  // 集計データの計算
  const totalBudget = filteredData.budgets.reduce((sum: number, budget: any) => sum + Number(budget.amount), 0);
  const totalSpend = filteredData.results.reduce((sum: number, result: any) => sum + Number(result.actualSpend), 0);
  const totalResult = filteredData.results.reduce((sum: number, result: any) => sum + Number(result.actualResult), 0);
  const roi = totalSpend > 0 ? ((totalResult - totalSpend) / totalSpend) * 100 : 0;

  // 月別データの集計
  const monthlyData = Array.from(
    new Set([
      ...filteredData.budgets.map((b: any) => `${b.year}-${b.month}`),
      ...filteredData.results.map((r: any) => `${r.year}-${r.month}`)
    ])
  ).sort().map(period => {
    const [year, month] = period.split('-').map(Number);
    
    const monthBudgets = filteredData.budgets.filter((b: any) => b.year === year && b.month === month);
    const monthResults = filteredData.results.filter((r: any) => r.year === year && r.month === month);
    
    return {
      period: `${year}/${month.toString().padStart(2, '0')}`,
      budget: monthBudgets.reduce((sum: number, b: any) => sum + Number(b.amount), 0),
      spend: monthResults.reduce((sum: number, r: any) => sum + Number(r.actualSpend), 0),
      result: monthResults.reduce((sum: number, r: any) => sum + Number(r.actualResult), 0),
    };
  });

  // プラットフォーム別データの集計
  const platformData = Array.from(
    new Set([
      ...filteredData.budgets.map((b: any) => b.platform),
      ...filteredData.results.map((r: any) => r.platform)
    ])
  ).map(platform => {
    const platformBudgets = filteredData.budgets.filter((b: any) => b.platform === platform);
    const platformResults = filteredData.results.filter((r: any) => r.platform === platform);
    
    return {
      platform,
      budget: platformBudgets.reduce((sum: number, b: any) => sum + Number(b.amount), 0),
      spend: platformResults.reduce((sum: number, r: any) => sum + Number(r.actualSpend), 0),
      result: platformResults.reduce((sum: number, r: any) => sum + Number(r.actualResult), 0),
    };
  }).filter((p: any) => p.budget > 0 || p.spend > 0);

  const exportToCSV = () => {
    const headers = ['年月', 'クライアント', '案件', 'プラットフォーム', '運用タイプ', '予算', '支出', '結果'];
    const data: any[] = [];
    
    // 予算データ
    filteredData.budgets.forEach((budget: any) => {
      data.push([
        `${budget.year}/${budget.month}`,
        budget.campaign.client.name,
        budget.campaign.name,
        budget.platform,
        budget.operationType,
        budget.amount,
        '',
        ''
      ]);
    });
    
    // 実績データ
    filteredData.results.forEach((result: any) => {
      data.push([
        `${result.year}/${result.month}`,
        result.campaign.client.name,
        result.campaign.name,
        result.platform,
        result.operationType,
        '',
        result.actualSpend,
        result.actualResult
      ]);
    });
    
    const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">レポート</h1>
          <Button onClick={exportToCSV}>CSV出力</Button>
        </div>

        {/* 分析レポートナビゲーション */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/reports/clients">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">クライアント別分析</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  クライアントごとの詳細な実績分析とパフォーマンス評価
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  詳細を見る
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reports/departments">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">事業部別分析</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  事業部ごとの詳細な実績分析とパフォーマンス評価
                </p>
                <div className="flex items-center text-sm text-green-600">
                  詳細を見る
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reports/departments/budget">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">事業部予算分析</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  事業部ごとの詳細な予算分析と配分状況
                </p>
                <div className="flex items-center text-sm text-orange-600">
                  詳細を見る
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">統合レポート</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                全体的な実績分析とトレンド把握（このページ）
              </p>
              <div className="flex items-center text-sm text-purple-600">
                現在のページ
              </div>
            </CardContent>
          </Card>
        </div>

        {/* フィルター */}
        <Card>
          <CardHeader>
            <CardTitle>フィルター条件</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>開始年月</Label>
                <div className="flex space-x-2">
                  <Select value={startYear} onValueChange={setStartYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="年" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={startMonth} onValueChange={setStartMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="月" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>終了年月</Label>
                <div className="flex space-x-2">
                  <Select value={endYear} onValueChange={setEndYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="年" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={endMonth} onValueChange={setEndMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="月" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>クライアント</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    {clients?.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>プラットフォーム</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    {platforms?.map((platform: any) => (
                      <SelectItem key={platform.id} value={platform.value}>{platform.value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={() => {
                setStartYear("");
                setStartMonth("");
                setEndYear("");
                setEndMonth("");
                setSelectedClient("all");
                setSelectedPlatform("all");
              }}
            >
              フィルターリセット
            </Button>
          </CardContent>
        </Card>

        {/* サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>総予算</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>総支出</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSpend)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>総結果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalResult)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {roi.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* チャート */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>月別トレンド</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
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

          <Card>
            <CardHeader>
              <CardTitle>プラットフォーム別パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformData}>
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
        </div>

        {/* 詳細テーブル */}
        <Card>
          <CardHeader>
            <CardTitle>詳細データ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>年月</TableHead>
                    <TableHead>クライアント</TableHead>
                    <TableHead>案件</TableHead>
                    <TableHead>プラットフォーム</TableHead>
                    <TableHead>運用タイプ</TableHead>
                    <TableHead className="text-right">予算</TableHead>
                    <TableHead className="text-right">支出</TableHead>
                    <TableHead className="text-right">結果</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* 予算データ */}
                  {filteredData.budgets.map((budget: any) => (
                    <TableRow key={`budget-${budget.id}`}>
                      <TableCell>{budget.year}/{budget.month}</TableCell>
                      <TableCell>{budget.campaign.client.name}</TableCell>
                      <TableCell>{budget.campaign.name}</TableCell>
                      <TableCell>{budget.platform}</TableCell>
                      <TableCell>{budget.operationType}</TableCell>
                      <TableCell className="text-right">{formatCurrency(Number(budget.amount))}</TableCell>
                      <TableCell className="text-right">-</TableCell>
                      <TableCell className="text-right">-</TableCell>
                    </TableRow>
                  ))}
                  {/* 実績データ */}
                  {filteredData.results.map((result: any) => (
                    <TableRow key={`result-${result.id}`}>
                      <TableCell>{result.year}/{result.month}</TableCell>
                      <TableCell>{result.campaign.client.name}</TableCell>
                      <TableCell>{result.campaign.name}</TableCell>
                      <TableCell>{result.platform}</TableCell>
                      <TableCell>{result.operationType}</TableCell>
                      <TableCell className="text-right">-</TableCell>
                      <TableCell className="text-right">{formatCurrency(Number(result.actualSpend))}</TableCell>
                      <TableCell className="text-right">{formatNumber(Number(result.actualResult))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 