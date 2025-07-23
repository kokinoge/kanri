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
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  RefreshCw,
  Download,
  Calendar,
  Activity,
  Star
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
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

interface ClientAnalytics {
  clients: Array<{
    id: string;
    name: string;
    priority: number;
    department: string;
    created_at: string;
    manager_name: string;
    campaign_count: number;
    total_budget: number;
    total_actual_spend: number;
    total_actual_result: number;
    roi: number;
    budget_consumption_rate: number;
    monthlyData: Array<{
      year: number;
      month: number;
      budget_amount: number;
      actual_spend: number;
      actual_result: number;
    }>;
    platformData: Array<{
      platform: string;
      budget_amount: number;
      actual_spend: number;
      actual_result: number;
    }>;
    campaignData: Array<{
      id: string;
      name: string;
      start_date: string;
      end_date: string;
      budget_amount: number;
      actual_spend: number;
      actual_result: number;
    }>;
  }>;
  summary: {
    total_clients: number;
    total_campaigns: number;
    total_budget: number;
    total_actual_spend: number;
    total_actual_result: number;
    average_roi: number;
    average_budget_consumption: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

export default function ClientAnalyticsPage() {
  const [selectedClient, setSelectedClient] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("total_budget");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const { data, isLoading, error, mutate } = useSWR<ClientAnalytics>(
    '/api/analytics/clients',
    fetcher
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-100 text-red-800';
    if (priority >= 6) return 'bg-orange-100 text-orange-800';
    if (priority >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 2) return 'text-green-600';
    if (roi >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBudgetConsumptionColor = (rate: number) => {
    if (rate > 100) return 'bg-red-100 text-red-800';
    if (rate > 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  // フィルタリング処理
  const filteredClients = data?.clients?.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || client.department === selectedDepartment;
    const matchesClient = selectedClient === "all" || client.id === selectedClient;
    return matchesSearch && matchesDepartment && matchesClient;
  }) || [];

  // ソート処理
  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * multiplier;
    }
    return String(aValue).localeCompare(String(bValue)) * multiplier;
  });

  // 選択されたクライアントのデータ
  const selectedClientData = selectedClient !== "all" ? 
    data?.clients?.find(client => client.id === selectedClient) : null;

  // 事業部一覧
  const departments = Array.from(new Set(data?.clients?.map(client => client.department) || []));

  // 効率性分析データ
  const efficiencyData = sortedClients.map(client => ({
    name: client.name.length > 8 ? client.name.slice(0, 8) + '...' : client.name,
    efficiency: client.total_actual_spend > 0 ? (client.total_actual_result / client.total_actual_spend) * 100 : 0,
    budget_utilization: client.budget_consumption_rate,
    roi: client.roi,
    priority: client.priority
  })).slice(0, 10);

  // 成長トレンド分析（ROI上位クライアントの月別推移）
  const topPerformers = sortedClients
    .filter(client => client.roi > 1)
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5);

  // CSV出力
  const exportToCSV = (clients: any[], filename: string) => {
    const headers = [
      'クライアント名', '事業部', '担当者', '優先度', '案件数', 
      '総予算', '総支出', '総結果', 'ROI', '予算消化率', '作成日'
    ];
    
    const csvData = clients.map(client => [
      client.name,
      client.department,
      client.manager_name,
      client.priority,
      client.campaign_count,
      client.total_budget,
      client.total_actual_spend,
      client.total_actual_result,
      client.roi.toFixed(2),
      client.budget_consumption_rate.toFixed(1) + '%',
      formatDate(client.created_at)
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
          <div className="text-lg">クライアント分析データを読み込み中...</div>
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
              <Users className="h-8 w-8" />
              クライアント別実績分析
            </h1>
            <p className="text-gray-600 mt-2">クライアントごとの詳細な実績分析とパフォーマンス評価</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => mutate()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button 
              onClick={() => exportToCSV(
                sortedClients, 
                `client_analytics_${new Date().toISOString().split('T')[0]}`
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
                <CardTitle className="text-sm font-medium">総クライアント数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.summary.total_clients}</div>
                <p className="text-xs text-muted-foreground">
                  案件数: {data.summary.total_campaigns}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総予算</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(data.summary.total_budget)}
                </div>
                <p className="text-xs text-muted-foreground">
                  平均消化率: {data.summary.average_budget_consumption.toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総支出</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(data.summary.total_actual_spend)}
                </div>
                <p className="text-xs text-muted-foreground">
                  総結果: {formatCurrency(data.summary.total_actual_result)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getROIColor(data.summary.average_roi)}`}>
                  {data.summary.average_roi.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  結果/支出 比率
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium">クライアント検索</label>
                <Input
                  placeholder="クライアント名で検索..."
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
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">クライアント</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="クライアントを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全クライアント</SelectItem>
                    {data?.clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
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
                    <SelectItem value="total_actual_spend">総支出</SelectItem>
                    <SelectItem value="total_actual_result">総結果</SelectItem>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="budget_consumption_rate">予算消化率</SelectItem>
                    <SelectItem value="priority">優先度</SelectItem>
                    <SelectItem value="name">クライアント名</SelectItem>
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
            <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
            <TabsTrigger value="efficiency">効率性分析</TabsTrigger>
            <TabsTrigger value="details">詳細分析</TabsTrigger>
            {selectedClient !== "all" && <TabsTrigger value="client-detail">クライアント詳細</TabsTrigger>}
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
                  {sortedClients.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sortedClients.slice(0, 10).map(client => ({
                            name: client.name.length > 10 ? client.name.slice(0, 10) + '...' : client.name,
                            value: client.total_budget,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sortedClients.slice(0, 10).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* ROI比較 */}
              <Card>
                <CardHeader>
                  <CardTitle>ROI比較（上位10クライアント）</CardTitle>
                </CardHeader>
                <CardContent>
                  {sortedClients.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={sortedClients
                          .sort((a, b) => b.roi - a.roi)
                          .slice(0, 10)
                          .map(client => ({
                            name: client.name.length > 8 ? client.name.slice(0, 8) + '...' : client.name,
                            roi: client.roi,
                            budget: client.total_budget,
                            spend: client.total_actual_spend,
                          }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            name === 'roi' ? value.toFixed(2) : formatCurrency(value), 
                            name === 'roi' ? 'ROI' : 
                            name === 'budget' ? '予算' : '支出'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="roi" fill="#8884d8" name="ROI" />
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

          {/* パフォーマンスタブ */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>予算 vs 支出 比較</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedClients.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={sortedClients.slice(0, 15).map(client => ({
                        name: client.name.length > 8 ? client.name.slice(0, 8) + '...' : client.name,
                        budget: client.total_budget,
                        spend: client.total_actual_spend,
                        result: client.total_actual_result,
                        roi: client.roi,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'roi' ? value.toFixed(2) : formatCurrency(value), 
                          name === 'budget' ? '予算' : 
                          name === 'spend' ? '支出' : 
                          name === 'result' ? '結果' : 'ROI'
                        ]} 
                      />
                      <Legend />
                      <Bar dataKey="budget" fill="#8884d8" name="予算" />
                      <Bar dataKey="spend" fill="#82ca9d" name="支出" />
                      <Bar dataKey="result" fill="#ffc658" name="結果" />
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
              {/* 効率性スコア */}
              <Card>
                <CardHeader>
                  <CardTitle>効率性スコア（ROI × 予算活用率）</CardTitle>
                </CardHeader>
                <CardContent>
                  {efficiencyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            value.toFixed(2), 
                            name === 'efficiency' ? '効率性' : 
                            name === 'budget_utilization' ? '予算活用率' : 
                            name === 'roi' ? 'ROI' : '優先度'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="efficiency" fill="#8884d8" name="効率性" />
                        <Bar dataKey="budget_utilization" fill="#82ca9d" name="予算活用率" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      データがありません
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 優先度vs ROI散布図 */}
              <Card>
                <CardHeader>
                  <CardTitle>優先度 vs ROI 関係性</CardTitle>
                </CardHeader>
                <CardContent>
                  {efficiencyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            name === 'roi' ? value.toFixed(2) : value, 
                            name === 'roi' ? 'ROI' : '優先度'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="priority" fill="#ff7300" name="優先度" />
                        <Bar dataKey="roi" fill="#387908" name="ROI" />
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

            {/* 高パフォーマンス・クライアント */}
            <Card>
              <CardHeader>
                <CardTitle>高パフォーマンス・クライアント（ROI &gt; 1.0）</CardTitle>
              </CardHeader>
              <CardContent>
                {topPerformers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topPerformers.map((client) => (
                      <div key={client.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{client.name}</h3>
                          <Badge className={getPriorityColor(client.priority)}>
                            {client.priority}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>ROI:</span>
                            <span className={getROIColor(client.roi)}>
                              {client.roi.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>予算:</span>
                            <span>{formatCurrency(client.total_budget)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>支出:</span>
                            <span>{formatCurrency(client.total_actual_spend)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>結果:</span>
                            <span>{formatCurrency(client.total_actual_result)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>事業部:</span>
                            <span>{client.department}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    ROI 1.0以上のクライアントがありません
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 詳細分析タブ */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>クライアント詳細一覧</CardTitle>
                <p className="text-sm text-gray-600">
                  表示中: {sortedClients.length}件 / 全{data?.clients?.length || 0}件
                </p>
              </CardHeader>
              <CardContent>
                {sortedClients.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>クライアント</TableHead>
                          <TableHead>事業部</TableHead>
                          <TableHead>担当者</TableHead>
                          <TableHead>優先度</TableHead>
                          <TableHead>案件数</TableHead>
                          <TableHead>総予算</TableHead>
                          <TableHead>総支出</TableHead>
                          <TableHead>総結果</TableHead>
                          <TableHead>ROI</TableHead>
                          <TableHead>予算消化率</TableHead>
                          <TableHead>作成日</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedClients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-400" />
                                {client.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{client.department}</Badge>
                            </TableCell>
                            <TableCell>{client.manager_name}</TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(client.priority)}>
                                <Star className="h-3 w-3 mr-1" />
                                {client.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                <Activity className="h-3 w-3 mr-1" />
                                {client.campaign_count}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(client.total_budget)}</TableCell>
                            <TableCell className="text-red-600">
                              {formatCurrency(client.total_actual_spend)}
                            </TableCell>
                            <TableCell className="text-green-600">
                              {formatCurrency(client.total_actual_result)}
                            </TableCell>
                            <TableCell className={getROIColor(client.roi)}>
                              {client.roi.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge className={getBudgetConsumptionColor(client.budget_consumption_rate)}>
                                {client.budget_consumption_rate.toFixed(1)}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {formatDate(client.created_at)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    条件に一致するクライアントがありません
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* クライアント詳細タブ */}
          {selectedClient !== "all" && selectedClientData && (
            <TabsContent value="client-detail" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 月別トレンド */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedClientData.name}の月別トレンド</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedClientData.monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedClientData.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={(data: any) => `${data.year}/${data.month}`} />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Line type="monotone" dataKey="budget_amount" stroke="#8884d8" name="予算" />
                          <Line type="monotone" dataKey="actual_spend" stroke="#82ca9d" name="支出" />
                          <Line type="monotone" dataKey="actual_result" stroke="#ffc658" name="結果" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        月別データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* プラットフォーム別分析 */}
                <Card>
                  <CardHeader>
                    <CardTitle>プラットフォーム別実績</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedClientData.platformData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedClientData.platformData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="platform" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="budget_amount" fill="#8884d8" name="予算" />
                          <Bar dataKey="actual_spend" fill="#82ca9d" name="支出" />
                          <Bar dataKey="actual_result" fill="#ffc658" name="結果" />
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

              {/* 案件別詳細 */}
              <Card>
                <CardHeader>
                  <CardTitle>案件別詳細</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedClientData.campaignData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>案件名</TableHead>
                            <TableHead>開始日</TableHead>
                            <TableHead>終了日</TableHead>
                            <TableHead>予算</TableHead>
                            <TableHead>支出</TableHead>
                            <TableHead>結果</TableHead>
                            <TableHead>ROI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedClientData.campaignData.map((campaign) => {
                            const roi = campaign.actual_spend > 0 ? 
                              campaign.actual_result / campaign.actual_spend : 0;
                            return (
                              <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{formatDate(campaign.start_date)}</TableCell>
                                <TableCell>{formatDate(campaign.end_date)}</TableCell>
                                <TableCell>{formatCurrency(campaign.budget_amount)}</TableCell>
                                <TableCell className="text-red-600">
                                  {formatCurrency(campaign.actual_spend)}
                                </TableCell>
                                <TableCell className="text-green-600">
                                  {formatCurrency(campaign.actual_result)}
                                </TableCell>
                                <TableCell className={getROIColor(roi)}>
                                  {roi.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-500">
                      案件データがありません
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