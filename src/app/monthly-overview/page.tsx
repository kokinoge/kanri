"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  ArrowRight
} from "lucide-react";

export default function MonthlyOverviewPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  // サンプルデータ
  const monthlyData = {
    summary: {
      totalBudget: 15000000,
      totalSpend: 12500000,
      totalResult: 16200000,
      efficiency: 1.296,
      burnRate: 0.833
    },
    trends: {
      budgetChange: 2.5,
      spendChange: -1.2,
      resultChange: 8.7,
      efficiencyChange: 0.3
    },
    topClients: [
      { name: "クライアントA", spend: 4200000, result: 5800000, efficiency: 1.38 },
      { name: "クライアントB", spend: 3800000, result: 4900000, efficiency: 1.29 },
      { name: "クライアントC", spend: 2900000, result: 3200000, efficiency: 1.10 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      notation: 'compact',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (authLoading) {
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
            <h1 className="text-3xl font-bold text-gray-900">月次概要</h1>
            <p className="text-gray-600 mt-1">月次パフォーマンスサマリー</p>
          </div>
          
          {/* 期間選択 */}
          <div className="flex gap-2 items-center">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2023, 2024, 2025].map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                  <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">月次予算</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(monthlyData.summary.totalBudget)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(monthlyData.trends.budgetChange)}
                <span className={`ml-1 ${getTrendColor(monthlyData.trends.budgetChange)}`}>
                  {monthlyData.trends.budgetChange > 0 ? '+' : ''}{monthlyData.trends.budgetChange}%
                </span>
                <span className="ml-1">前月比</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">月次支出</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(monthlyData.summary.totalSpend)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(monthlyData.trends.spendChange)}
                <span className={`ml-1 ${getTrendColor(monthlyData.trends.spendChange)}`}>
                  {monthlyData.trends.spendChange > 0 ? '+' : ''}{monthlyData.trends.spendChange}%
                </span>
                <span className="ml-1">前月比</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">月次結果</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyData.summary.totalResult)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(monthlyData.trends.resultChange)}
                <span className={`ml-1 ${getTrendColor(monthlyData.trends.resultChange)}`}>
                  {monthlyData.trends.resultChange > 0 ? '+' : ''}{monthlyData.trends.resultChange}%
                </span>
                <span className="ml-1">前月比</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">効率性</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(monthlyData.summary.efficiency * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(monthlyData.trends.efficiencyChange)}
                <span className={`ml-1 ${getTrendColor(monthlyData.trends.efficiencyChange)}`}>
                  {monthlyData.trends.efficiencyChange > 0 ? '+' : ''}{monthlyData.trends.efficiencyChange}%
                </span>
                <span className="ml-1">前月比</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 詳細分析セクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 予算消化率 */}
          <Card>
            <CardHeader>
              <CardTitle>予算消化状況</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">消化率</span>
                <span className="text-2xl font-bold">
                  {(monthlyData.summary.burnRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${monthlyData.summary.burnRate * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">予算:</span>
                  <span className="ml-2 font-medium">{formatCurrency(monthlyData.summary.totalBudget)}</span>
                </div>
                <div>
                  <span className="text-gray-500">支出:</span>
                  <span className="ml-2 font-medium">{formatCurrency(monthlyData.summary.totalSpend)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* トップクライアント */}
          <Card>
            <CardHeader>
              <CardTitle>トップパフォーマンスクライアント</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyData.topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">
                          効率性: {(client.efficiency * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(client.result)}
                      </div>
                      <div className="text-xs text-gray-500">
                        支出: {formatCurrency(client.spend)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/integrated-management')}>
            <Activity className="h-4 w-4 mr-2" />
            統合管理へ
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => router.push('/clients')}>
            クライアント管理
          </Button>
          <Button variant="outline" onClick={() => router.push('/analytics')}>
            詳細分析
          </Button>
        </div>
      </div>
    </AppLayout>
  );
} 