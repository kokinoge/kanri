"use client";

import { useState } from "react";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Building2, Users, Target, TrendingUp, Download, RefreshCw, BarChart3, Activity } from "lucide-react";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function DepartmentReportsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const { data, error, isLoading, mutate } = useSWR<DepartmentAnalytics>(
    '/api/analytics/departments', 
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

  const exportToCSV = (data: any[], filename: string) => {
    const csvContent = [
      // ヘッダー
      Object.keys(data[0] || {}).join(','),
      // データ行
      ...data.map(row => Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedDepartmentData = selectedDepartment === "all" ? 
    data?.departments : 
    data?.departments.filter(d => d.department === selectedDepartment);

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">データの読み込みに失敗しました</div>
            <Button onClick={() => mutate()}>再試行</Button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">事業部データを読み込み中...</div>
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
              <Building2 className="h-8 w-8" />
              事業部別レポート
            </h1>
            <p className="text-gray-600 mt-2">事業部ごとの詳細な実績分析とパフォーマンス評価</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="事業部を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全事業部</SelectItem>
                {data?.departments.map((dept) => (
                  <SelectItem key={dept.department} value={dept.department}>
                    {dept.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => mutate()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button 
              onClick={() => exportToCSV(
                selectedDepartmentData || [], 
                `department_report_${selectedDepartment}`
              )}
            >
              <Download className="h-4 w-4 mr-2" />
              CSV出力
            </Button>
          </div>
        </div>

        {/* サマリー統計 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {selectedDepartment === "all" ? "総事業部数" : "選択した事業部"}
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedDepartment === "all" ? 
                  data?.summary.department_count : 
                  selectedDepartmentData?.[0]?.department
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">クライアント数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedDepartment === "all" ? 
                  Number(data?.summary.total_clients || 0) :
                  selectedDepartmentData?.reduce((sum, d) => sum + Number(d.client_count), 0) || 0
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総予算</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  selectedDepartment === "all" ? 
                    Number(data?.summary.total_budget || 0) :
                    selectedDepartmentData?.reduce((sum, d) => sum + Number(d.total_budget), 0) || 0
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総支出</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(
                  selectedDepartment === "all" ? 
                    Number(data?.summary.total_actual_spend || 0) :
                    selectedDepartmentData?.reduce((sum, d) => sum + Number(d.total_actual_spend), 0) || 0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
            <TabsTrigger value="budget">予算分析</TabsTrigger>
            <TabsTrigger value="trends">トレンド分析</TabsTrigger>
            <TabsTrigger value="clients">クライアント詳細</TabsTrigger>
          </TabsList>

          {/* 概要タブ */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 予算分布 */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDepartment === "all" ? "事業部別予算分布" : `${selectedDepartment}の予算概要`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={selectedDepartmentData?.map(dept => ({
                          name: dept.department,
                          value: Number(dept.total_budget),
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) => 
                          selectedDepartment === "all" ? 
                            `${name} ${((percent || 0) * 100).toFixed(0)}%` :
                            `${((percent || 0) * 100).toFixed(1)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {selectedDepartmentData?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* パフォーマンス比較 */}
              <Card>
                <CardHeader>
                  <CardTitle>予算 vs 支出 比較</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedDepartmentData?.map(dept => ({
                      name: dept.department.length > 10 ? 
                        dept.department.slice(0, 10) + '...' : 
                        dept.department,
                      予算: Number(dept.total_budget),
                      支出: Number(dept.total_actual_spend),
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="予算" fill="#8884d8" />
                      <Bar dataKey="支出" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* パフォーマンスタブ */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>事業部別パフォーマンス詳細</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>事業部</TableHead>
                      <TableHead className="text-right">クライアント数</TableHead>
                      <TableHead className="text-right">案件数</TableHead>
                      <TableHead className="text-right">予算</TableHead>
                      <TableHead className="text-right">支出</TableHead>
                      <TableHead className="text-right">消化率</TableHead>
                      <TableHead className="text-right">平均優先度</TableHead>
                      <TableHead className="text-right">効率性</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDepartmentData?.map((dept) => {
                      const budget = Number(dept.total_budget);
                      const spend = Number(dept.total_actual_spend);
                      const consumptionRate = budget > 0 ? (spend / budget) * 100 : 0;
                      const efficiency = spend > 0 ? (budget / spend) : 0;
                      
                      return (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                              {dept.department}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{Number(dept.client_count)}</TableCell>
                          <TableCell className="text-right">{Number(dept.campaign_count)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(budget)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(spend)}</TableCell>
                          <TableCell className="text-right">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              consumptionRate > 100 ? 'bg-red-100 text-red-800' :
                              consumptionRate > 80 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {consumptionRate.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{Number(dept.avg_priority).toFixed(1)}</TableCell>
                          <TableCell className="text-right">
                            <span className={`font-semibold ${
                              efficiency > 1.2 ? 'text-green-600' :
                              efficiency > 1.0 ? 'text-blue-600' :
                              'text-red-600'
                            }`}>
                              {efficiency.toFixed(2)}
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

          {/* 予算分析タブ */}
          <TabsContent value="budget" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">詳細な予算分析</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.open('/reports/departments/budget', '_blank')}
                  variant="outline"
                >
                  <Target className="h-4 w-4 mr-2" />
                  詳細予算分析ページ
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>事業部別予算サマリー</CardTitle>
                <p className="text-sm text-muted-foreground">
                  より詳細な予算分析は専用ページでご確認いただけます
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">総予算額</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        selectedDepartmentData?.reduce((sum, dept) => sum + Number(dept.total_budget), 0) || 0
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">平均予算/事業部</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        selectedDepartmentData && selectedDepartmentData.length > 0 ?
                          selectedDepartmentData.reduce((sum, dept) => sum + Number(dept.total_budget), 0) / selectedDepartmentData.length :
                          0
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">総案件数</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedDepartmentData?.reduce((sum, dept) => sum + Number(dept.campaign_count), 0) || 0}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">総クライアント数</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedDepartmentData?.reduce((sum, dept) => sum + Number(dept.client_count), 0) || 0}
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h4 className="text-lg font-semibold mb-2">より詳細な予算分析</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    プラットフォーム別・運用タイプ別・売上タイプ別の詳細な予算分析、<br />
                    月別推移、効率性分析などは専用ページでご確認いただけます。
                  </p>
                  <Button 
                    onClick={() => window.open('/reports/departments/budget', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    事業部別予算分析ページを開く
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* トレンド分析タブ */}
          <TabsContent value="trends" className="space-y-4">
            {selectedDepartmentData && selectedDepartmentData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDepartment === "all" ? "全事業部" : selectedDepartment}の月別トレンド
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={
                      // 全事業部の場合は合計、特定事業部の場合はその事業部のデータ
                      selectedDepartment === "all" ? 
                        data?.departments[0]?.monthlyData.map((_, index) => {
                          const monthData = data.departments.reduce((acc, dept) => {
                            const monthlyItem = dept.monthlyData[index];
                            if (monthlyItem) {
                              acc.budget_amount += Number(monthlyItem.budget_amount);
                              acc.actual_spend += Number(monthlyItem.actual_spend);
                              acc.year = monthlyItem.year;
                              acc.month = monthlyItem.month;
                            }
                            return acc;
                          }, { budget_amount: 0, actual_spend: 0, year: 0, month: 0 });
                          
                          return {
                            period: formatMonth(monthData.year, monthData.month),
                            予算: monthData.budget_amount,
                            支出: monthData.actual_spend,
                          };
                        }) :
                        selectedDepartmentData[0]?.monthlyData.map(item => ({
                          period: formatMonth(item.year, item.month),
                          予算: Number(item.budget_amount),
                          支出: Number(item.actual_spend),
                        }))
                    }>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="予算" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="支出" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* クライアント詳細タブ */}
          <TabsContent value="clients" className="space-y-4">
            {selectedDepartmentData?.map((dept) => (
              <Card key={dept.department}>
                <CardHeader>
                  <CardTitle>{dept.department} - クライアント一覧</CardTitle>
                </CardHeader>
                <CardContent>
                  {dept.clients.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>クライアント名</TableHead>
                          <TableHead>担当者</TableHead>
                          <TableHead className="text-right">優先度</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dept.clients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.manager?.name || "未設定"}</TableCell>
                            <TableCell className="text-right">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                client.priority > 5 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {client.priority}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      この事業部にはクライアントが登録されていません
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
} 