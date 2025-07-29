"use client";

import { useState } from "react";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  RefreshCw,
  Download,
  Calendar,
  Activity,
  Star,
  PieChart
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from "recharts";

interface DepartmentBudgetAnalytics {
  departments: Array<{
    department: string;
    client_count: number;
    campaign_count: number;
    budget_count: number;
    total_budget: number;
    avg_budget_per_campaign: number;
    min_budget: number;
    max_budget: number;
    active_months: number;
    avg_client_priority: number;
    monthlyBudgets: Array<{
      year: number;
      month: number;
      budget_count: number;
      total_amount: number;
      avg_amount: number;
      campaign_count: number;
      client_count: number;
    }>;
    platformBudgets: Array<{
      platform: string;
      budget_count: number;
      total_amount: number;
      avg_amount: number;
      campaign_count: number;
    }>;
    operationTypeBudgets: Array<{
      operation_type: string;
      budget_count: number;
      total_amount: number;
      avg_amount: number;
      campaign_count: number;
    }>;
    revenueTypeBudgets: Array<{
      revenue_type: string;
      budget_count: number;
      total_amount: number;
      avg_amount: number;
      campaign_count: number;
    }>;
    clientBudgets: Array<{
      id: string;
      name: string;
      priority: number;
      budget_count: number;
      total_amount: number;
      avg_amount: number;
      campaign_count: number;
    }>;
  }>;
  summary: {
    total_departments: number;
    total_clients: number;
    total_campaigns: number;
    total_budget_records: number;
    total_budget_amount: number;
    average_budget_per_department: number;
    average_budget_per_campaign: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

export default function DepartmentBudgetAnalyticsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("total_budget");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const { data, isLoading, error, mutate } = useSWR<DepartmentBudgetAnalytics>(
    '/api/analytics/departments/budget',
    fetcher
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonth = (year: number, month: number) => {
    return `${year}/${month.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-100 text-red-800';
    if (priority >= 6) return 'bg-orange-100 text-orange-800';
    if (priority >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  // フィルタリング処理
  const filteredDepartments = data?.departments?.filter(dept => {
    const matchesSearch = dept.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || dept.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  }) || [];

  // ソート処理
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * multiplier;
    }
    return String(aValue).localeCompare(String(bValue)) * multiplier;
  });

  // 選択された事業部のデータ
  const selectedDepartmentData = selectedDepartment !== "all" ? 
    data?.departments?.find(dept => dept.department === selectedDepartment) : null;

  // 予算効率性分析データ
  const efficiencyData = sortedDepartments.map(dept => ({
    name: dept.department.length > 8 ? dept.department.slice(0, 8) + '...' : dept.department,
    avg_budget: dept.avg_budget_per_campaign,
    total_budget: dept.total_budget,
    campaign_efficiency: dept.campaign_count > 0 ? dept.total_budget / dept.campaign_count : 0,
    client_efficiency: dept.client_count > 0 ? dept.total_budget / dept.client_count : 0,
    priority: dept.avg_client_priority
  }));

  // CSV出力
  const exportToCSV = (departments: any[], filename: string) => {
    const headers = [
      '事業部', 'クライアント数', '案件数', '予算件数', '総予算', 
      '平均予算/案件', '最小予算', '最大予算', 'アクティブ月数', '平均優先度'
    ];
    
    const csvData = departments.map(dept => [
      dept.department,
      dept.client_count,
      dept.campaign_count,
      dept.budget_count,
      dept.total_budget,
      dept.avg_budget_per_campaign,
      dept.min_budget,
      dept.max_budget,
      dept.active_months,
      dept.avg_client_priority.toFixed(1)
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">事業部予算分析データを読み込み中...</div>
        </div>
      </ProtectedLayout>
    );
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">データの読み込みに失敗しました</div>
            <Button onClick={() => mutate()} variant="outline">
              再試行
            </Button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="h-8 w-8" />
              事業部別予算分析
            </h1>
            <p className="text-gray-600 mt-2">事業部ごとの詳細な予算分析と配分状況</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => mutate()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button 
              onClick={() => exportToCSV(
                sortedDepartments, 
                `department_budget_analytics_${new Date().toISOString().split('T')[0]}`
              )}
            >
              <Download className="h-4 w-4 mr-2" />
              CSV出力
            </Button>
          </div>
        </div>

        {/* サマリー統計 */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総事業部数</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.summary.total_departments}</div>
                <p className="text-xs text-muted-foreground">
                  クライアント数: {data.summary.total_clients}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総予算額</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(data.summary.total_budget_amount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  予算件数: {data.summary.total_budget_records}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均予算/事業部</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(data.summary.average_budget_per_department)}
                </div>
                <p className="text-xs text-muted-foreground">
                  案件数: {data.summary.total_campaigns}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均予算/案件</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(data.summary.average_budget_per_campaign)}
                </div>
                <p className="text-xs text-muted-foreground">
                  効率性指標
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* フィルター・検索 */}
        <Card>
          <CardHeader>
            <CardTitle>フィルター・検索</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">事業部検索</label>
                <Input
                  placeholder="事業部名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">事業部</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="事業部を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全事業部</SelectItem>
                    {data?.departments?.map((dept) => (
                      <SelectItem key={dept.department} value={dept.department}>
                        {dept.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">ソート項目</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total_budget">総予算</SelectItem>
                    <SelectItem value="avg_budget_per_campaign">平均予算/案件</SelectItem>
                    <SelectItem value="budget_count">予算件数</SelectItem>
                    <SelectItem value="campaign_count">案件数</SelectItem>
                    <SelectItem value="client_count">クライアント数</SelectItem>
                    <SelectItem value="avg_client_priority">平均優先度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">ソート順</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">降順</SelectItem>
                    <SelectItem value="asc">昇順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* タブコンテンツ */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="distribution">予算配分</TabsTrigger>
            <TabsTrigger value="efficiency">効率性分析</TabsTrigger>
            <TabsTrigger value="details">詳細分析</TabsTrigger>
            {selectedDepartment !== "all" && <TabsTrigger value="department-detail">事業部詳細</TabsTrigger>}
          </TabsList>

          {/* 概要タブ */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 事業部別予算分布 */}
              <Card>
                <CardHeader>
                  <CardTitle>事業部別予算分布</CardTitle>
                </CardHeader>
                <CardContent>
                  {sortedDepartments.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={sortedDepartments.map(dept => ({
                            name: dept.department.length > 10 ? dept.department.slice(0, 10) + '...' : dept.department,
                            value: dept.total_budget,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sortedDepartments.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 平均予算比較 */}
              <Card>
                <CardHeader>
                  <CardTitle>事業部別平均予算/案件</CardTitle>
                </CardHeader>
                <CardContent>
                  {sortedDepartments.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sortedDepartments}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="department" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)} 
                        />
                        <Legend />
                        <Bar dataKey="avg_budget_per_campaign" fill="#8884d8" name="平均予算/案件" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 予算配分タブ */}
          <TabsContent value="distribution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>事業部別予算配分詳細</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedDepartments.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={sortedDepartments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="department" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'campaign_count' || name === 'client_count' || name === 'budget_count' ? 
                            value : formatCurrency(value), 
                          name === 'total_budget' ? '総予算' : 
                          name === 'campaign_count' ? '案件数' : 
                          name === 'client_count' ? 'クライアント数' : '予算件数'
                        ]} 
                      />
                      <Legend />
                      <Bar dataKey="total_budget" fill="#8884d8" name="総予算" />
                      <Bar dataKey="campaign_count" fill="#82ca9d" name="案件数" />
                      <Bar dataKey="client_count" fill="#ffc658" name="クライアント数" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-gray-500">
                    データがありません
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 効率性分析タブ */}
          <TabsContent value="efficiency" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 案件効率性 */}
              <Card>
                <CardHeader>
                  <CardTitle>案件効率性（予算/案件数）</CardTitle>
                </CardHeader>
                <CardContent>
                  {efficiencyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)} 
                        />
                        <Legend />
                        <Bar dataKey="campaign_efficiency" fill="#8884d8" name="案件効率性" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* クライアント効率性 */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント効率性（予算/クライアント数）</CardTitle>
                </CardHeader>
                <CardContent>
                  {efficiencyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)} 
                        />
                        <Legend />
                        <Bar dataKey="client_efficiency" fill="#82ca9d" name="クライアント効率性" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 効率性ランキング */}
            <Card>
              <CardHeader>
                <CardTitle>効率性ランキング</CardTitle>
              </CardHeader>
              <CardContent>
                {efficiencyData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {efficiencyData
                      .sort((a, b) => b.campaign_efficiency - a.campaign_efficiency)
                      .slice(0, 6)
                      .map((dept, index) => (
                        <div key={dept.name} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{dept.name}</h3>
                            <Badge variant={index < 2 ? "default" : "secondary"}>
                              #{index + 1}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>案件効率性:</span>
                              <span>{formatCurrency(dept.campaign_efficiency)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>クライアント効率性:</span>
                              <span>{formatCurrency(dept.client_efficiency)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>総予算:</span>
                              <span>{formatCurrency(dept.total_budget)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>平均優先度:</span>
                              <span>{dept.priority.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    効率性データがありません
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 詳細分析タブ */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>事業部別予算詳細一覧</CardTitle>
                <p className="text-sm text-gray-600">
                  表示中: {sortedDepartments.length}件 / 全{data?.departments?.length || 0}件
                </p>
              </CardHeader>
              <CardContent>
                {sortedDepartments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>事業部</TableHead>
                          <TableHead>クライアント数</TableHead>
                          <TableHead>案件数</TableHead>
                          <TableHead>予算件数</TableHead>
                          <TableHead>総予算</TableHead>
                          <TableHead>平均予算/案件</TableHead>
                          <TableHead>最小予算</TableHead>
                          <TableHead>最大予算</TableHead>
                          <TableHead>アクティブ月数</TableHead>
                          <TableHead>平均優先度</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedDepartments.map((dept) => (
                          <TableRow key={dept.department}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-400" />
                                {dept.department}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {dept.client_count}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                <Activity className="h-3 w-3 mr-1" />
                                {dept.campaign_count}
                              </Badge>
                            </TableCell>
                            <TableCell>{dept.budget_count}</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(dept.total_budget)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(dept.avg_budget_per_campaign)}
                            </TableCell>
                            <TableCell className="text-green-600">
                              {formatCurrency(dept.min_budget)}
                            </TableCell>
                            <TableCell className="text-red-600">
                              {formatCurrency(dept.max_budget)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                <Calendar className="h-3 w-3 mr-1" />
                                {dept.active_months}ヶ月
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(dept.avg_client_priority)}>
                                <Star className="h-3 w-3 mr-1" />
                                {dept.avg_client_priority.toFixed(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    条件に一致する事業部がありません
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 事業部詳細タブ */}
          {selectedDepartment !== "all" && selectedDepartmentData && (
            <TabsContent value="department-detail" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 月別予算推移 */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedDepartmentData.department}の月別予算推移</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDepartmentData.monthlyBudgets.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedDepartmentData.monthlyBudgets}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={(data: any) => formatMonth(data.year, data.month)} />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Line type="monotone" dataKey="total_amount" stroke="#8884d8" name="総予算" />
                          <Line type="monotone" dataKey="avg_amount" stroke="#82ca9d" name="平均予算" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        月別データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* プラットフォーム別予算 */}
                <Card>
                  <CardHeader>
                    <CardTitle>プラットフォーム別予算</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDepartmentData.platformBudgets.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedDepartmentData.platformBudgets}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="platform" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="total_amount" fill="#8884d8" name="総予算" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        プラットフォーム別データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 運用タイプ・売上タイプ別予算 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>運用タイプ別予算</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDepartmentData.operationTypeBudgets.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={selectedDepartmentData.operationTypeBudgets}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ operation_type, percent }: any) => 
                              `${operation_type} ${((percent || 0) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="total_amount"
                          >
                            {selectedDepartmentData.operationTypeBudgets.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        運用タイプ別データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>売上タイプ別予算</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDepartmentData.revenueTypeBudgets.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={selectedDepartmentData.revenueTypeBudgets}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ revenue_type, percent }: any) => 
                              `${revenue_type} ${((percent || 0) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="total_amount"
                          >
                            {selectedDepartmentData.revenueTypeBudgets.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        売上タイプ別データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* クライアント別予算内訳 */}
              <Card>
                <CardHeader>
                  <CardTitle>クライアント別予算内訳</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDepartmentData.clientBudgets.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>クライアント名</TableHead>
                            <TableHead>優先度</TableHead>
                            <TableHead>案件数</TableHead>
                            <TableHead>予算件数</TableHead>
                            <TableHead>総予算</TableHead>
                            <TableHead>平均予算</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedDepartmentData.clientBudgets.map((client) => (
                            <TableRow key={client.id}>
                              <TableCell className="font-medium">{client.name}</TableCell>
                              <TableCell>
                                <Badge className={getPriorityColor(client.priority)}>
                                  <Star className="h-3 w-3 mr-1" />
                                  {client.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {client.campaign_count}
                                </Badge>
                              </TableCell>
                              <TableCell>{client.budget_count}</TableCell>
                              <TableCell className="font-semibold">
                                {formatCurrency(client.total_amount)}
                              </TableCell>
                              <TableCell>
                                {formatCurrency(client.avg_amount)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-500">
                      クライアント別データがありません
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </ProtectedLayout>
  );
} 