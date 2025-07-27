"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/providers";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  BarChart3, 
  Activity,
  Percent,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  ComposedChart,
  Area,
  AreaChart
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ClientBudgetData {
  clientBudgets: Array<{
    id: string;
    name: string;
    priority: string;
    department: string;
    sales_department: string;
    campaign_count: number;
    budget_count: number;
    total_budget: number;
    total_actual_spend: number;
    avg_budget_per_item: number;
    budget_utilization: number;
    platform_breakdown: Array<{
      platform: string;
      budget: number;
      spend: number;
    }>;
    operation_breakdown: Array<{
      operation_type: string;
      budget: number;
      spend: number;
    }>;
  }>;
  operationTypeBudgets: Array<{
    operation_type: string;
    budget_count: number;
    campaign_count: number;
    client_count: number;
    total_budget: number;
    total_actual_spend: number;
    avg_budget_per_item: number;
    budget_utilization: number;
    platform_breakdown: Array<{
      platform: string;
      budget: number;
      spend: number;
      campaign_count: number;
    }>;
  }>;
  platformBudgets: Array<{
    platform: string;
    budget_count: number;
    campaign_count: number;
    client_count: number;
    total_budget: number;
    total_actual_spend: number;
    avg_budget_per_item: number;
    budget_utilization: number;
  }>;
  summary: {
    total_clients: number;
    total_budget: number;
    total_actual_spend: number;
    total_campaigns: number;
    average_utilization: number;
  };
  department: string;
}

// 事業部色の定義
const DEPARTMENT_COLORS = {
  'マーケティング': '#3B82F6',
  'セールス': '#10B981', 
  'プロダクト': '#F59E0B',
  'カスタマーサクセス': '#8B5CF6',
  '未設定': '#6B7280',
  'default': '#6B7280'
};

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

interface DepartmentAnalytics {
  departments: Array<{
    department: string;
    client_count: number;
    campaign_count: number;
    total_budget: number;
    total_actual_spend: number;
    avg_priority: number;
    clients: Array<{
      id: string;
      name: string;
      priority: number;
      manager?: { name: string };
    }>;
    monthlyData: Array<{
      year: number;
      month: number;
      budget_amount: number;
      actual_spend: number;
    }>;
  }>;
  summary: {
    total_clients: number;
    total_campaigns: number;
    total_budget: number;
    total_actual_spend: number;
    department_count: number;
  };
}

export default function DepartmentPerformancePage() {
  const { user: session } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("12");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedDepartmentDetail, setSelectedDepartmentDetail] = useState<any>(null);
  const [isDrillDownOpen, setIsDrillDownOpen] = useState<boolean>(false);

  const { data: departmentData, mutate: mutateDepartmentData, isLoading, error } = useSWR<DepartmentAnalytics>(
    "/api/analytics/departments",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      onError: (error) => {
        console.error('[DEPARTMENT_PERFORMANCE] API Error:', error);
      }
    }
  );

  // クライアント・運用タイプ予算データを取得
  const { 
    data: clientBudgetData, 
    error: clientBudgetError, 
    isLoading: clientBudgetLoading,
    mutate: mutateClientBudgetData 
  } = useSWR<ClientBudgetData>(
    `/api/analytics/departments/client-budgets?department=${selectedDepartment}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      onError: (error) => {
        console.error('[CLIENT_BUDGET_DATA] Error:', error);
      }
    }
  );

  // エラー時やデータ未取得時のフォールバック
  const safeData = {
    departments: departmentData?.departments || [],
    summary: departmentData?.summary || {
      total_clients: 0,
      total_campaigns: 0,
      total_budget: 0,
      total_actual_spend: 0,
      department_count: 0
    }
  };

  // セーフなデータアクセス用のヘルパー関数
  const getSafeClientBudgetData = () => {
    if (!clientBudgetData) {
      return {
        summary: {
          total_clients: 0,
          total_budget: 0,
          total_actual_spend: 0,
          total_campaigns: 0,
          average_utilization: 0
        },
        clientBudgets: [],
        operationTypeBudgets: []
      };
    }

    return {
      summary: {
        total_clients: clientBudgetData.summary?.total_clients ?? 0,
        total_budget: clientBudgetData.summary?.total_budget ?? 0,
        total_actual_spend: clientBudgetData.summary?.total_actual_spend ?? 0,
        total_campaigns: clientBudgetData.summary?.total_campaigns ?? 0,
        average_utilization: clientBudgetData.summary?.average_utilization ?? 0
      },
      clientBudgets: clientBudgetData.clientBudgets ?? [],
      operationTypeBudgets: clientBudgetData.operationTypeBudgets ?? []
    };
  };

  // 安全な数値変換と表示のヘルパー関数
  const safeToFixed = (value: any, decimals: number = 1): string => {
    if (value === null || value === undefined) return '0.0';
    const num = Number(value);
    if (isNaN(num)) return '0.0';
    return num.toFixed(decimals);
  };

  const safeNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // エラー状態の表示
  if (error) {
    return (
      <ProtectedLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="text-red-500 text-lg font-semibold">
                  データの取得に失敗しました
                </div>
                <div className="text-gray-600">
                  {error.message || "APIサーバーとの通信に問題があります"}
                </div>
                <Button onClick={() => mutateDepartmentData()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  再試行
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedLayout>
    );
  }

  // 選択された事業部のデータをフィルタリング
  const filteredDepartments = useMemo(() => {
    if (!safeData.departments) return [];
    
    if (selectedDepartment === "all") {
      return safeData.departments;
    }
    
    return safeData.departments.filter(dept => dept.department === selectedDepartment);
  }, [safeData, selectedDepartment]);

  // 効率性指標の計算
  const getEfficiencyMetrics = (department: any) => {
    const budgetUtilization = department.total_budget > 0 ? 
      (department.total_actual_spend / department.total_budget) * 100 : 0;
    
    const avgBudgetPerClient = department.client_count > 0 ? 
      department.total_budget / department.client_count : 0;
    
    const avgSpendPerClient = department.client_count > 0 ? 
      department.total_actual_spend / department.client_count : 0;
    
    const avgBudgetPerCampaign = department.campaign_count > 0 ? 
      department.total_budget / department.campaign_count : 0;
    
    return {
      budgetUtilization,
      avgBudgetPerClient,
      avgSpendPerClient,
      avgBudgetPerCampaign
    };
  };

  // 予算消化率のバッジ色を取得
  const getUtilizationBadge = (utilization: number) => {
    if (utilization < 70) return "destructive";
    if (utilization > 110) return "destructive";
    if (utilization > 90) return "default";
    return "secondary";
  };

  // 予算消化率のステータスアイコン
  const getUtilizationIcon = (utilization: number) => {
    if (utilization < 70) return <TrendingDown className="h-4 w-4 text-red-500" />;
    if (utilization > 110) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (utilization > 90) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Activity className="h-4 w-4 text-blue-500" />;
  };

  // 月別推移データの準備
  const prepareMonthlyTrendData = () => {
    if (!filteredDepartments.length) return [];
    
    const monthlyMap = new Map();
    
    filteredDepartments.forEach(dept => {
      dept.monthlyData.forEach(monthly => {
        const key = `${monthly.year}-${monthly.month.toString().padStart(2, '0')}`;
        if (!monthlyMap.has(key)) {
          monthlyMap.set(key, {
            period: key,
            budget: 0,
            actual: 0
          });
        }
        const existing = monthlyMap.get(key);
        existing.budget += Number(monthly.budget_amount);
        existing.actual += Number(monthly.actual_spend);
      });
    });
    
    return Array.from(monthlyMap.values())
      .sort((a, b) => a.period.localeCompare(b.period))
      .slice(-parseInt(selectedTimeRange));
  };

  // 事業部別比較データの準備
  const prepareDepartmentComparisonData = () => {
    if (!safeData.departments) return [];
    
    return safeData.departments.map((dept, index) => {
      const metrics = getEfficiencyMetrics(dept);
      return {
        department: dept.department,
        budget: Number(dept.total_budget),
        actual: Number(dept.total_actual_spend),
        utilization: metrics.budgetUtilization,
        clients: dept.client_count,
        campaigns: dept.campaign_count,
        color: CHART_COLORS[index % CHART_COLORS.length]
      };
    }).sort((a, b) => b.budget - a.budget);
  };

  const monthlyTrendData = prepareMonthlyTrendData();
  const departmentComparisonData = prepareDepartmentComparisonData();

  // 事業部詳細を開く関数
  const openDepartmentDetail = (department: any) => {
    setSelectedDepartmentDetail(department);
    setIsDrillDownOpen(true);
  };

  // 事業部詳細ダイアログのコンテンツ
  const renderDepartmentDetailDialog = () => {
    if (!selectedDepartmentDetail) return null;

    const metrics = getEfficiencyMetrics(selectedDepartmentDetail);
    
    return (
      <Dialog open={isDrillDownOpen} onOpenChange={setIsDrillDownOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ 
                  backgroundColor: DEPARTMENT_COLORS[selectedDepartmentDetail.department as keyof typeof DEPARTMENT_COLORS] || DEPARTMENT_COLORS.default 
                }}
              />
              <span>{selectedDepartmentDetail.department} - 詳細分析</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* サマリー指標 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedDepartmentDetail.client_count)}</div>
                <div className="text-sm text-gray-600">クライアント数</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatNumber(selectedDepartmentDetail.campaign_count)}</div>
                <div className="text-sm text-gray-600">案件数</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(selectedDepartmentDetail.total_budget)}</div>
                <div className="text-sm text-gray-600">総予算</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{metrics.budgetUtilization.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">消化率</div>
              </div>
            </div>

            {/* 月別推移チャート */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">月別予算・実績推移</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={selectedDepartmentDetail.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={(item: any) => `${item.year}-${item.month.toString().padStart(2, '0')}`} />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => `期間: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="budget_amount" fill="#3B82F6" name="予算" />
                  <Line type="monotone" dataKey="actual_spend" stroke="#10B981" strokeWidth={2} name="実績" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* クライアント別詳細 */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">クライアント別詳細</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>クライアント名</TableHead>
                      <TableHead className="text-right">優先度</TableHead>
                      <TableHead>担当者</TableHead>
                      <TableHead className="text-right">予算配分</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDepartmentDetail.clients.map((client: any) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={client.priority <= 3 ? "default" : "secondary"}>
                            {client.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{client.manager?.name || "未設定"}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(selectedDepartmentDetail.total_budget / selectedDepartmentDetail.client_count)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // エクスポート機能
  const exportToCSV = () => {
    if (!safeData.departments) return;

    const csvData = [
      ['事業部', 'クライアント数', '案件数', '予算', '実績', '消化率(%)', 'クライアント平均予算', '案件平均予算', '平均優先度'],
      ...safeData.departments.map(dept => {
        const metrics = getEfficiencyMetrics(dept);
        return [
          dept.department,
          dept.client_count,
          dept.campaign_count,
          dept.total_budget,
          dept.total_actual_spend,
          metrics.budgetUtilization.toFixed(1),
          metrics.avgBudgetPerClient.toFixed(0),
          metrics.avgBudgetPerCampaign.toFixed(0),
          dept.avg_priority.toFixed(1)
        ];
      })
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `事業部別分析_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // クライアント・運用タイプ予算セクションのコンポーネント
  const renderClientAndOperationBudgets = () => {
    // エラー状態の処理
    if (clientBudgetError) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">⚠️ データ取得エラー</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">クライアント予算データの取得に失敗しました。</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • ネットワーク接続を確認してください
              </p>
              <p className="text-sm text-muted-foreground">
                • しばらく時間をおいて再試行してください
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => mutateClientBudgetData()}
              className="mt-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              再試行
            </Button>
          </CardContent>
        </Card>
      );
    }

    // ローディング状態の処理
    if (clientBudgetLoading) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>📊 詳細予算分析</CardTitle>
            <p className="text-muted-foreground">データを読み込んでいます...</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // セーフなデータを取得
    const safeClientData = getSafeClientBudgetData();

    return (
      <div className="space-y-6">
        {/* セクションタイトル */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">詳細予算分析</h2>
            <p className="text-muted-foreground">
              {selectedDepartment === "all" ? "全事業部" : selectedDepartment}のクライアント別・運用タイプ別予算詳細
            </p>
          </div>
          <Button variant="outline" onClick={() => mutateClientBudgetData()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            更新
          </Button>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">対象クライアント数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{safeClientData.summary.total_clients}</div>
              <p className="text-xs text-muted-foreground">
                {safeClientData.summary.total_campaigns}件の案件
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総予算</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(safeClientData.summary.total_budget)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(safeClientData.summary.total_actual_spend)}の実際支出
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">実際の支出</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(safeClientData.summary.total_actual_spend)}
              </div>
              <p className="text-xs text-muted-foreground">
                {safeClientData.summary.total_budget > 0 ? 
                  `${((safeClientData.summary.total_actual_spend / safeClientData.summary.total_budget) * 100).toFixed(1)}%の消化率` : 
                  '0%の消化率'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均消化率</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {safeClientData.summary.average_utilization.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                全クライアント平均
              </p>
            </CardContent>
          </Card>
        </div>

        {/* クライアント別・運用タイプ別チャート */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* クライアント別予算チャート */}
          <Card>
            <CardHeader>
              <CardTitle>クライアント別予算</CardTitle>
              <p className="text-sm text-muted-foreground">
                上位10クライアントの予算と実績
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={safeClientData.clientBudgets.slice(0, 10).map(client => ({
                    name: client.name.length > 10 ? client.name.slice(0, 10) + '...' : client.name,
                    fullName: client.name,
                    budget: safeNumber(client.total_budget),
                    spend: safeNumber(client.total_actual_spend),
                    utilization: safeNumber(client.budget_utilization),
                  }))}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'budget' ? formatCurrency(value) : formatCurrency(value),
                      name === 'budget' ? '予算' : '実際支出'
                    ]}
                    labelFormatter={(label) => `クライアント: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="budget" fill="#3B82F6" name="予算" />
                  <Bar dataKey="spend" fill="#EF4444" name="実際支出" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 運用タイプ別予算チャート */}
          <Card>
            <CardHeader>
              <CardTitle>運用タイプ別予算</CardTitle>
              <p className="text-sm text-muted-foreground">
                運用タイプごとの予算配分と実績
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={safeClientData.operationTypeBudgets.map(operation => ({
                    name: operation.operation_type,
                    budget: safeNumber(operation.total_budget),
                    spend: safeNumber(operation.total_actual_spend),
                    utilization: safeNumber(operation.budget_utilization),
                    clients: safeNumber(operation.client_count),
                    campaigns: safeNumber(operation.campaign_count),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'budget' ? formatCurrency(value) : formatCurrency(value),
                      name === 'budget' ? '予算' : '実際支出'
                    ]}
                    labelFormatter={(label) => `運用タイプ: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="budget" fill="#10B981" name="予算" />
                  <Bar dataKey="spend" fill="#F59E0B" name="実際支出" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 詳細テーブル */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* クライアント別予算詳細テーブル */}
          <Card>
            <CardHeader>
              <CardTitle>クライアント別予算詳細</CardTitle>
              <p className="text-sm text-muted-foreground">
                各クライアントの詳細な予算分析と実績情報
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">クライアント名</th>
                      <th className="text-left p-2">優先度</th>
                      <th className="text-right p-2">案件数</th>
                      <th className="text-right p-2">予算</th>
                      <th className="text-right p-2">支出</th>
                      <th className="text-right p-2">消化率</th>
                      <th className="text-right p-2">平均予算</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeClientData.clientBudgets.map((client, index) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{client.name}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            client.priority === 'S' ? 'bg-red-100 text-red-800' :
                            client.priority === 'A' ? 'bg-orange-100 text-orange-800' :
                            client.priority === 'B' ? 'bg-yellow-100 text-yellow-800' :
                            client.priority === 'C' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {client.priority}
                          </span>
                        </td>
                        <td className="p-2 text-right">{client.campaign_count}</td>
                        <td className="p-2 text-right">{formatCurrency(client.total_budget)}</td>
                        <td className="p-2 text-right">{formatCurrency(client.total_actual_spend)}</td>
                        <td className="p-2 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            safeNumber(client.budget_utilization) > 100 ? 'bg-red-100 text-red-800' :
                            safeNumber(client.budget_utilization) > 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {safeToFixed(client.budget_utilization, 1)}%
                          </span>
                        </td>
                        <td className="p-2 text-right">{formatCurrency(safeNumber(client.avg_budget_per_item))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 運用タイプ別予算詳細テーブル */}
          <Card>
            <CardHeader>
              <CardTitle>運用タイプ別予算詳細</CardTitle>
              <p className="text-sm text-muted-foreground">
                各運用タイプの詳細な予算分析と実績情報
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">運用タイプ</th>
                      <th className="text-right p-2">クライアント数</th>
                      <th className="text-right p-2">案件数</th>
                      <th className="text-right p-2">予算件数</th>
                      <th className="text-right p-2">総予算</th>
                      <th className="text-right p-2">総支出</th>
                      <th className="text-right p-2">消化率</th>
                      <th className="text-right p-2">平均予算</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeClientData.operationTypeBudgets.map((operation, index) => (
                      <tr key={operation.operation_type} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{operation.operation_type}</td>
                        <td className="p-2 text-right">{operation.client_count}</td>
                        <td className="p-2 text-right">{operation.campaign_count}</td>
                        <td className="p-2 text-right">{operation.budget_count}</td>
                        <td className="p-2 text-right">{formatCurrency(operation.total_budget)}</td>
                        <td className="p-2 text-right">{formatCurrency(operation.total_actual_spend)}</td>
                        <td className="p-2 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            safeNumber(operation.budget_utilization) > 100 ? 'bg-red-100 text-red-800' :
                            safeNumber(operation.budget_utilization) > 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {safeToFixed(operation.budget_utilization, 1)}%
                          </span>
                        </td>
                        <td className="p-2 text-right">{formatCurrency(safeNumber(operation.avg_budget_per_item))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">事業部別予算・実績分析</h1>
            <p className="text-muted-foreground">
              各事業部の予算配分と実績を分析し、効率性を評価します
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => mutateDepartmentData()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              エクスポート
            </Button>
          </div>
        </div>

        {/* フィルター */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="事業部を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全事業部</SelectItem>
                {safeData.departments?.map((dept) => (
                  <SelectItem key={dept.department} value={dept.department}>
                    {dept.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="期間を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">直近6ヶ月</SelectItem>
                <SelectItem value="12">直近12ヶ月</SelectItem>
                <SelectItem value="24">直近24ヶ月</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showDetails ? "詳細を隠す" : "詳細を表示"}
          </Button>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">事業部数</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{safeData.summary.department_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                {selectedDepartment === "all" ? "全事業部" : "選択中: 1事業部"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総予算</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  filteredDepartments.reduce((sum, dept) => sum + dept.total_budget, 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                全体の{((filteredDepartments.reduce((sum, dept) => sum + dept.total_budget, 0) / (safeData.summary.total_budget || 1)) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">実際の支出</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  filteredDepartments.reduce((sum, dept) => sum + dept.total_actual_spend, 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                予算の{(
                  (filteredDepartments.reduce((sum, dept) => sum + dept.total_actual_spend, 0) / 
                   (filteredDepartments.reduce((sum, dept) => sum + dept.total_budget, 0) || 1)) * 100
                ).toFixed(1)}%消化
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均消化率</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDepartments.length > 0 ? (
                  (filteredDepartments.reduce((sum, dept) => {
                    const utilization = dept.total_budget > 0 ? 
                      (dept.total_actual_spend / dept.total_budget) * 100 : 0;
                    return sum + utilization;
                  }, 0) / filteredDepartments.length).toFixed(1)
                ) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredDepartments.length}事業部の平均
              </p>
            </CardContent>
          </Card>
        </div>

        {/* チャート */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 月別推移チャート */}
          <Card>
            <CardHeader>
              <CardTitle>月別予算・実績推移</CardTitle>
              <p className="text-sm text-muted-foreground">
                選択された事業部の月別予算と実績の推移
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => `期間: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="budget" fill="#3B82F6" name="予算" />
                  <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} name="実績" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 事業部別比較チャート */}
          <Card>
            <CardHeader>
              <CardTitle>事業部別予算・実績比較</CardTitle>
              <p className="text-sm text-muted-foreground">
                各事業部の予算と実績の比較
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Legend />
                  <Bar dataKey="budget" fill="#3B82F6" name="予算" />
                  <Bar dataKey="actual" fill="#10B981" name="実績" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* クライアントごとの予算・運用タイプごとの予算 */}
        {renderClientAndOperationBudgets()}

        {/* 事業部別詳細テーブル */}
        <Card>
          <CardHeader>
            <CardTitle>事業部別詳細</CardTitle>
            <p className="text-sm text-muted-foreground">
              各事業部の詳細な予算・実績情報と効率性指標
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>事業部</TableHead>
                    <TableHead className="text-right">クライアント数</TableHead>
                    <TableHead className="text-right">案件数</TableHead>
                    <TableHead className="text-right">予算</TableHead>
                    <TableHead className="text-right">実績</TableHead>
                    <TableHead className="text-center">消化率</TableHead>
                    <TableHead className="text-right">クライアント平均予算</TableHead>
                    <TableHead className="text-right">案件平均予算</TableHead>
                    {showDetails && <TableHead className="text-center">詳細</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => {
                    const metrics = getEfficiencyMetrics(department);
                    return (
                      <TableRow key={department.department}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ 
                                backgroundColor: DEPARTMENT_COLORS[department.department as keyof typeof DEPARTMENT_COLORS] || DEPARTMENT_COLORS.default 
                              }}
                            />
                            <span>{department.department}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatNumber(department.client_count)}</TableCell>
                        <TableCell className="text-right">{formatNumber(department.campaign_count)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(department.total_budget)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(department.total_actual_spend)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getUtilizationIcon(metrics.budgetUtilization)}
                            <Badge variant={getUtilizationBadge(metrics.budgetUtilization)}>
                              {metrics.budgetUtilization.toFixed(1)}%
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(metrics.avgBudgetPerClient)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(metrics.avgBudgetPerCampaign)}</TableCell>
                        {showDetails && (
                          <TableCell className="text-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => openDepartmentDetail(department)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 詳細パネル */}
        {showDetails && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 効率性指標 */}
              <Card>
                <CardHeader>
                  <CardTitle>効率性指標</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    各事業部の効率性を評価する指標
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDepartments.map((department) => {
                      const metrics = getEfficiencyMetrics(department);
                      return (
                        <div key={department.department} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{department.department}</span>
                            <Badge variant={getUtilizationBadge(metrics.budgetUtilization)}>
                              {metrics.budgetUtilization.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>予算消化率</span>
                              <span>{metrics.budgetUtilization.toFixed(1)}%</span>
                            </div>
                            <Progress value={Math.min(metrics.budgetUtilization, 100)} className="h-2" />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">クライアント平均予算</span>
                                <div className="font-medium">{formatCurrency(metrics.avgBudgetPerClient)}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">案件平均予算</span>
                                <div className="font-medium">{formatCurrency(metrics.avgBudgetPerCampaign)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 予算配分円グラフ */}
              <Card>
                <CardHeader>
                  <CardTitle>事業部別予算配分</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    全体予算に対する各事業部の配分比率
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentComparisonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ department, percent }) => `${department}: ${(percent ? percent * 100 : 0).toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="budget"
                      >
                        {departmentComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '予算']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* 事業部間比較チャート */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 効率性比較レーダーチャート */}
              <Card>
                <CardHeader>
                  <CardTitle>事業部別効率性比較</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    予算消化率、クライアント数、案件数の比較
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentComparisonData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="department" type="category" width={100} />
                      <Tooltip
                        formatter={(value: number, name: string) => {
                          if (name === 'utilization') return [`${value.toFixed(1)}%`, '消化率'];
                          return [formatNumber(value), name === 'clients' ? 'クライアント数' : '案件数'];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="utilization" fill="#3B82F6" name="消化率(%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* ROI比較チャート */}
              <Card>
                <CardHeader>
                  <CardTitle>事業部別ROI比較</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    予算に対する実績の比率（ROI指標）
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), '']}
                      />
                      <Legend />
                      <Bar dataKey="budget" fill="#3B82F6" name="予算" />
                      <Bar dataKey="actual" fill="#10B981" name="実績" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* 詳細比較テーブル */}
            <Card>
              <CardHeader>
                <CardTitle>事業部間詳細比較</CardTitle>
                <p className="text-sm text-muted-foreground">
                  各事業部の詳細な比較指標
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>事業部</TableHead>
                        <TableHead className="text-right">予算シェア</TableHead>
                        <TableHead className="text-right">実績シェア</TableHead>
                        <TableHead className="text-right">効率性スコア</TableHead>
                        <TableHead className="text-right">クライアント単価</TableHead>
                        <TableHead className="text-right">案件単価</TableHead>
                        <TableHead className="text-center">パフォーマンス</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentComparisonData.map((department) => {
                        const totalBudget = safeData.summary.total_budget || 1;
                        const totalActual = safeData.summary.total_actual_spend || 1;
                        const budgetShare = (department.budget / totalBudget) * 100;
                        const actualShare = (department.actual / totalActual) * 100;
                        const efficiencyScore = department.utilization > 0 ? 
                          Math.min(100, (department.actual / department.budget) * 100) : 0;
                        const clientCost = department.clients > 0 ? department.budget / department.clients : 0;
                        const campaignCost = department.campaigns > 0 ? department.budget / department.campaigns : 0;
                        
                        return (
                          <TableRow key={department.department}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: department.color }}
                                />
                                <span>{department.department}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <span>{budgetShare.toFixed(1)}%</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${budgetShare}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <span>{actualShare.toFixed(1)}%</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${actualShare}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant={getUtilizationBadge(efficiencyScore)}>
                                {efficiencyScore.toFixed(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(clientCost)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(campaignCost)}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center">
                                {getUtilizationIcon(department.utilization)}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* ドリルダウンダイアログ */}
      {renderDepartmentDetailDialog()}
    </ProtectedLayout>
  );
} 