'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { NumberInput } from '@/components/ui/number-input';
import { Plus, Edit, Eye, Users, Briefcase, Calendar, Target } from 'lucide-react';
import { toast } from 'sonner';
import { ImportExportActions } from '@/components/ImportExportActions';

// 型定義
interface BudgetResultItem {
  id: string;
  campaignId: string;
  year: number;
  month: number;
  platform: string;
  operationType: string;
  budgetType: string;
  
  // 予算情報
  budgetAmount?: number;
  targetKpi?: string;
  targetValue?: number;
  
  // 実績情報
  actualSpend?: number;
  actualResult?: number;
  
  // 関連情報
  campaign: {
    id: string;
    name: string;
    client: {
      id: string;
      name: string;
      businessDivision: string;
    };
  };
  
  // チーム配分情報
  teamAllocations?: Array<{
    id: string;
    teamId: string;
    teamName: string;
    allocation: number;
  }>;
  
  // 計算値
  budgetUtilization?: number;
  roi?: number;
  variance?: number;
}

interface Campaign {
  id: string;
  name: string;
  purpose?: string;
  totalBudget: number;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  client: {
    id: string;
    name: string;
  };
}

interface Team {
  id: string;
  name: string;
  color?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

function BudgetResultsContent() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('combined');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetResultItem | null>(null);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [selectedItemForTeam, setSelectedItemForTeam] = useState<BudgetResultItem | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // データ取得
  const { data: budgetResultsData, mutate } = useSWR(
    `/api/budget-results?year=${selectedYear}&month=${selectedMonth}&client=${selectedClient}&platform=${selectedPlatform}`,
    fetcher
  );

  const { data: campaignsData, mutate: mutateCampaigns } = useSWR('/api/campaigns', fetcher);
  const { data: clientsData } = useSWR('/api/clients', fetcher);
  const { data: teamsData } = useSWR('/api/teams', fetcher);
  const { data: mastersData } = useSWR('/api/masters?category=platform', fetcher);

  const budgetResults = budgetResultsData?.data || [];
  const campaigns = campaignsData || [];
  const clients = clientsData || [];
  const teams = teamsData || [];
  const platforms = mastersData || [];

  // 統計計算
  const statistics = useMemo(() => {
    const totalBudget = budgetResults.reduce((sum: number, item: BudgetResultItem) => 
      sum + (item.budgetAmount || 0), 0);
    const totalSpend = budgetResults.reduce((sum: number, item: BudgetResultItem) => 
      sum + (item.actualSpend || 0), 0);
    const totalResult = budgetResults.reduce((sum: number, item: BudgetResultItem) => 
      sum + (item.actualResult || 0), 0);

    return {
      totalBudget,
      totalSpend,
      totalResult,
      budgetUtilization: totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0,
      roi: totalSpend > 0 ? ((totalResult - totalSpend) / totalSpend) * 100 : 0,
      variance: totalBudget - totalSpend,
    };
  }, [budgetResults]);

  // フォーマット関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // 年月リスト生成
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">予算・実績・案件統合管理</h1>
          <p className="text-gray-600 mt-1">
            案件・予算・実績・チーム配分を一元管理
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規作成
          </Button>
          <ImportExportActions
            exportEndpoint="/api/budget-results"
            importEndpoint="/api/import-export/budget-results"
            dataType="予算・実績"
            filePrefix="budget-results"
            filters={{
              year: selectedYear,
              month: selectedMonth,
              client: selectedClient,
              platform: selectedPlatform
            }}
            onImportComplete={() => {
              mutate();
              mutateCampaigns();
            }}
          />
        </div>
      </div>

      {/* フィルタ */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="year">年</Label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="month">月</Label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(month => (
                    <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="client">クライアント</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="platform">プラットフォーム</Label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {platforms.map((platform: any) => (
                    <SelectItem key={platform.value} value={platform.value}>{platform.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 統計サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">総予算</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(statistics.totalBudget)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">総支出</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(statistics.totalSpend)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">総成果</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(statistics.totalResult)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">予算達成率</div>
            <div className={`text-2xl font-bold ${statistics.budgetUtilization > 100 ? 'text-red-600' : 'text-green-600'}`}>
              {formatPercentage(statistics.budgetUtilization)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">ROI</div>
            <div className={`text-2xl font-bold ${statistics.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(statistics.roi)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* メインコンテンツ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="combined">統合ビュー</TabsTrigger>
          <TabsTrigger value="campaigns">案件管理</TabsTrigger>
          <TabsTrigger value="budget-focus">予算中心</TabsTrigger>
          <TabsTrigger value="results-focus">実績中心</TabsTrigger>
        </TabsList>

        <TabsContent value="combined" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>予算・実績統合一覧</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">クライアント・案件</th>
                      <th className="text-left p-2">期間・プラットフォーム</th>
                      <th className="text-right p-2">予算</th>
                      <th className="text-right p-2">支出</th>
                      <th className="text-right p-2">成果</th>
                      <th className="text-right p-2">達成率</th>
                      <th className="text-right p-2">ROI</th>
                      <th className="text-center p-2">チーム</th>
                      <th className="text-center p-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetResults.map((item: BudgetResultItem) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{item.campaign.client.name}</div>
                          <div className="text-gray-600 text-xs">{item.campaign.name}</div>
                        </td>
                        <td className="p-2">
                          <div className="font-medium">{item.year}/{item.month}</div>
                          <div className="text-gray-600 text-xs">
                            {item.platform} • {item.operationType}
                          </div>
                        </td>
                        <td className="text-right p-2">
                          {item.budgetAmount ? formatCurrency(item.budgetAmount) : '-'}
                        </td>
                        <td className="text-right p-2">
                          {item.actualSpend ? formatCurrency(item.actualSpend) : '-'}
                        </td>
                        <td className="text-right p-2">
                          {item.actualResult ? formatCurrency(item.actualResult) : '-'}
                        </td>
                        <td className="text-right p-2">
                          {item.budgetUtilization ? (
                            <Badge variant={item.budgetUtilization > 100 ? "destructive" : "default"}>
                              {formatPercentage(item.budgetUtilization)}
                            </Badge>
                          ) : '-'}
                        </td>
                        <td className="text-right p-2">
                          {item.roi !== undefined ? (
                            <Badge variant={item.roi > 0 ? "default" : "destructive"}>
                              {formatPercentage(item.roi)}
                            </Badge>
                          ) : '-'}
                        </td>
                        <td className="text-center p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItemForTeam(item);
                              setShowTeamDialog(true);
                            }}
                          >
                            <Users className="w-4 h-4" />
                            {item.teamAllocations?.length || 0}
                          </Button>
                        </td>
                        <td className="text-center p-2">
                          <div className="flex gap-1 justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingItem(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                案件管理
              </CardTitle>
              <Button 
                onClick={() => setShowCampaignForm(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規案件
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">案件名</th>
                      <th className="text-left p-2">クライアント</th>
                      <th className="text-left p-2">期間</th>
                      <th className="text-right p-2">総予算</th>
                      <th className="text-left p-2">目的</th>
                      <th className="text-center p-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign: Campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{campaign.name}</div>
                        </td>
                        <td className="p-2">
                          <div className="font-medium">{campaign.client.name}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            {campaign.startYear}/{campaign.startMonth} - {campaign.endYear ? `${campaign.endYear}/${campaign.endMonth}` : '継続中'}
                          </div>
                        </td>
                        <td className="text-right p-2">
                          {formatCurrency(campaign.totalBudget)}
                        </td>
                        <td className="p-2">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {campaign.purpose || '-'}
                          </div>
                        </td>
                        <td className="text-center p-2">
                          <div className="flex gap-1 justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingCampaign(campaign);
                                setShowCampaignForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget-focus">
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  予算管理
                </CardTitle>
                <Button 
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新規予算
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">案件・クライアント</th>
                        <th className="text-left p-2">期間・媒体</th>
                        <th className="text-right p-2">予算金額</th>
                        <th className="text-left p-2">目標KPI</th>
                        <th className="text-right p-2">目標値</th>
                        <th className="text-center p-2">チーム配分</th>
                        <th className="text-center p-2">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetResults
                        .filter(item => item.budgetAmount)
                        .map((item: BudgetResultItem) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <div className="font-medium">{item.campaign.name}</div>
                            <div className="text-gray-600 text-xs">{item.campaign.client.name}</div>
                          </td>
                          <td className="p-2">
                            <div className="font-medium">{item.year}/{item.month}</div>
                            <div className="text-gray-600 text-xs">
                              {item.platform} • {item.operationType}
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div className="font-medium text-blue-600">
                              {formatCurrency(item.budgetAmount || 0)}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-sm">
                              {item.targetKpi || '-'}
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div className="text-sm">
                              {item.targetValue ? `${item.targetValue}${item.targetKpi === 'CVR' ? '%' : ''}` : '-'}
                            </div>
                          </td>
                          <td className="text-center p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedItemForTeam(item);
                                setShowTeamDialog(true);
                              }}
                            >
                              <Users className="w-4 h-4" />
                              {item.teamAllocations?.length || 0}
                            </Button>
                          </td>
                          <td className="text-center p-2">
                            <div className="flex gap-1 justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 予算統計サマリー */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">今月の予算総額</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(budgetResults.reduce((sum, item) => sum + (item.budgetAmount || 0), 0))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {budgetResults.filter(item => item.budgetAmount).length} 件の予算項目
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">平均予算</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      budgetResults.filter(item => item.budgetAmount).length > 0
                        ? budgetResults.reduce((sum, item) => sum + (item.budgetAmount || 0), 0) / 
                          budgetResults.filter(item => item.budgetAmount).length
                        : 0
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    項目あたりの平均金額
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">チーム配分状況</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {budgetResults.filter(item => item.teamAllocations && item.teamAllocations.length > 0).length}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    / {budgetResults.filter(item => item.budgetAmount).length} 件にチーム配分済み
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results-focus">
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  実績管理
                </CardTitle>
                <Button 
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  実績入力
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">案件・クライアント</th>
                        <th className="text-left p-2">期間・媒体</th>
                        <th className="text-right p-2">実際支出</th>
                        <th className="text-right p-2">実績結果</th>
                        <th className="text-right p-2">予算比較</th>
                        <th className="text-right p-2">ROI</th>
                        <th className="text-center p-2">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetResults
                        .filter(item => item.actualSpend || item.actualResult)
                        .map((item: BudgetResultItem) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <div className="font-medium">{item.campaign.name}</div>
                            <div className="text-gray-600 text-xs">{item.campaign.client.name}</div>
                          </td>
                          <td className="p-2">
                            <div className="font-medium">{item.year}/{item.month}</div>
                            <div className="text-gray-600 text-xs">
                              {item.platform} • {item.operationType}
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div className="font-medium text-red-600">
                              {formatCurrency(item.actualSpend || 0)}
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div className="font-medium text-green-600">
                              {formatCurrency(item.actualResult || 0)}
                            </div>
                          </td>
                          <td className="text-right p-2">
                            {item.budgetAmount && item.actualSpend ? (
                              <div className="flex flex-col">
                                <div className="text-sm">
                                  {formatCurrency(item.budgetAmount)} (予算)
                                </div>
                                <div className={`text-xs ${
                                  item.actualSpend > item.budgetAmount ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {item.actualSpend > item.budgetAmount ? '+' : ''}
                                  {formatCurrency(item.actualSpend - item.budgetAmount)}
                                </div>
                              </div>
                            ) : '-'}
                          </td>
                          <td className="text-right p-2">
                            {item.roi !== undefined ? (
                              <Badge variant={item.roi > 0 ? "default" : "destructive"}>
                                {formatPercentage(item.roi)}
                              </Badge>
                            ) : '-'}
                          </td>
                          <td className="text-center p-2">
                            <div className="flex gap-1 justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 実績統計サマリー */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">総支出額</div>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(budgetResults.reduce((sum, item) => sum + (item.actualSpend || 0), 0))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {budgetResults.filter(item => item.actualSpend).length} 件の実績
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">総成果額</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(budgetResults.reduce((sum, item) => sum + (item.actualResult || 0), 0))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    売上・成果の合計
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">平均ROI</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {(() => {
                      const validROI = budgetResults.filter(item => item.roi !== undefined);
                      const avgROI = validROI.length > 0 
                        ? validROI.reduce((sum, item) => sum + (item.roi || 0), 0) / validROI.length
                        : 0;
                      return formatPercentage(avgROI);
                    })()}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    平均投資効率
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-600">予算達成率</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {(() => {
                      const validItems = budgetResults.filter(item => item.budgetUtilization !== undefined);
                      const avgUtilization = validItems.length > 0
                        ? validItems.reduce((sum, item) => sum + (item.budgetUtilization || 0), 0) / validItems.length
                        : 0;
                      return formatPercentage(avgUtilization);
                    })()}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    平均予算消化率
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 成果分析チャート（将来拡張用） */}
            <Card>
              <CardHeader>
                <CardTitle>成果分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center text-gray-500">
                    <div className="text-lg font-medium">成果分析チャート</div>
                    <div className="text-sm">実装予定: ROI推移・プラットフォーム別成果比較</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* チーム配分ダイアログ */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>チーム予算配分管理</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItemForTeam && (
              <>
                <div className="p-4 bg-gray-50 rounded">
                  <div className="font-medium">{selectedItemForTeam.campaign.client.name}</div>
                  <div className="text-sm text-gray-600">{selectedItemForTeam.campaign.name}</div>
                  <div className="text-sm text-gray-600">
                    {selectedItemForTeam.year}/{selectedItemForTeam.month} • {selectedItemForTeam.platform}
                  </div>
                  <div className="text-sm font-medium text-blue-600 mt-1">
                    予算: {selectedItemForTeam.budgetAmount ? formatCurrency(selectedItemForTeam.budgetAmount) : '未設定'}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>チーム配分</Label>
                    <Button
                      size="sm"
                      onClick={() => {
                        // チーム追加ロジック（将来実装）
                        toast.info('チーム追加機能は今後実装予定です');
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      チーム追加
                    </Button>
                  </div>
                  
                  {selectedItemForTeam.teamAllocations && selectedItemForTeam.teamAllocations.length > 0 ? (
                    <>
                      {selectedItemForTeam.teamAllocations.map((allocation, index) => (
                        <div key={allocation.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <div>
                              <div className="font-medium">{allocation.teamName}</div>
                              <div className="text-sm text-gray-500">
                                {selectedItemForTeam.budgetAmount 
                                  ? formatCurrency((selectedItemForTeam.budgetAmount * allocation.allocation) / 100)
                                  : '計算不可'
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-lg">{allocation.allocation}%</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // 編集ロジック（将来実装）
                                toast.info('配分編集機能は今後実装予定です');
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">配分合計:</span>
                          <span className={`font-bold ${
                            selectedItemForTeam.teamAllocations.reduce((sum, t) => sum + t.allocation, 0) === 100 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {selectedItemForTeam.teamAllocations.reduce((sum, t) => sum + t.allocation, 0)}%
                          </span>
                        </div>
                        {selectedItemForTeam.teamAllocations.reduce((sum, t) => sum + t.allocation, 0) !== 100 && (
                          <div className="text-xs text-red-600 mt-1">
                            ⚠️ 配分合計が100%ではありません
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-lg">チーム配分なし</div>
                      <div className="text-sm">「チーム追加」ボタンから配分を設定してください</div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTeamDialog(false)}
                  >
                    閉じる
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      // 保存ロジック（将来実装）
                      toast.success('チーム配分を保存しました');
                      setShowTeamDialog(false);
                    }}
                  >
                    保存
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 案件作成・編集ダイアログ */}
      <Dialog open={showCampaignForm} onOpenChange={setShowCampaignForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCampaign ? '案件編集' : '新規案件作成'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            
            const campaignData = {
              name: formData.get('name'),
              clientId: formData.get('clientId'),
              purpose: formData.get('purpose'),
              totalBudget: parseFloat(formData.get('totalBudget') as string) || 0,
              startYear: parseInt(formData.get('startYear') as string),
              startMonth: parseInt(formData.get('startMonth') as string),
              endYear: formData.get('endYear') ? parseInt(formData.get('endYear') as string) : null,
              endMonth: formData.get('endMonth') ? parseInt(formData.get('endMonth') as string) : null,
            };

            try {
              const url = editingCampaign ? `/api/campaigns/${editingCampaign.id}` : '/api/campaigns';
              const method = editingCampaign ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData),
              });

              if (response.ok) {
                toast.success(editingCampaign ? '案件が更新されました' : '案件が作成されました');
                setShowCampaignForm(false);
                setEditingCampaign(null);
                mutateCampaigns();
              } else {
                toast.error('案件の保存に失敗しました');
              }
            } catch (error) {
              toast.error('エラーが発生しました');
            }
          }}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">案件名 *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingCampaign?.name || ''}
                    required
                    placeholder="案件名を入力"
                  />
                </div>
                <div>
                  <Label htmlFor="clientId">クライアント *</Label>
                  <Select name="clientId" defaultValue={editingCampaign?.client.id || ''} required>
                    <SelectTrigger>
                      <SelectValue placeholder="クライアントを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client: any) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="purpose">目的・概要</Label>
                <Input
                  id="purpose"
                  name="purpose"
                  defaultValue={editingCampaign?.purpose || ''}
                  placeholder="案件の目的や概要を入力"
                />
              </div>

              <div>
                <Label htmlFor="totalBudget">総予算 *</Label>
                <NumberInput
                  id="totalBudget"
                  name="totalBudget"
                  defaultValue={editingCampaign?.totalBudget || 0}
                  required
                  min={0}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>開始時期 *</Label>
                  <div className="flex gap-2">
                    <Select name="startYear" defaultValue={editingCampaign?.startYear?.toString() || new Date().getFullYear().toString()} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select name="startMonth" defaultValue={editingCampaign?.startMonth?.toString() || '1'} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>終了時期（任意）</Label>
                  <div className="flex gap-2">
                    <Select name="endYear" defaultValue={editingCampaign?.endYear?.toString() || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="年" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {yearOptions.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select name="endMonth" defaultValue={editingCampaign?.endMonth?.toString() || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="月" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {monthOptions.map(month => (
                          <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowCampaignForm(false);
                    setEditingCampaign(null);
                  }}
                >
                  キャンセル
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingCampaign ? '更新' : '作成'}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 新規作成ダイアログ */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>予算・実績データ作成</DialogTitle>
          </DialogHeader>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            
            // バリデーション
            const campaignId = formData.get('campaignId') as string;
            const year = parseInt(formData.get('year') as string);
            const month = parseInt(formData.get('month') as string);
            const platform = formData.get('platform') as string;
            const operationType = formData.get('operationType') as string;
            
            if (!campaignId || !year || !month || !platform || !operationType) {
              toast.error('必須項目をすべて入力してください');
              return;
            }
            
            const budgetAmount = formData.get('budgetAmount') ? parseFloat(formData.get('budgetAmount') as string) : null;
            const actualSpend = formData.get('actualSpend') ? parseFloat(formData.get('actualSpend') as string) : null;
            const actualResult = formData.get('actualResult') ? parseFloat(formData.get('actualResult') as string) : null;
            
            // 少なくとも予算か実績のどちらかは入力必須
            if (!budgetAmount && !actualSpend && !actualResult) {
              toast.error('予算または実績の少なくとも一つは入力してください');
              return;
            }
            
            // 負の値チェック
            if ((budgetAmount && budgetAmount < 0) || (actualSpend && actualSpend < 0) || (actualResult && actualResult < 0)) {
              toast.error('金額は正の値で入力してください');
              return;
            }
            
            const data = {
              campaignId,
              year,
              month,
              platform,
              operationType,
              budgetType: formData.get('budgetType') || '投稿予算',
              
              // 予算情報
              budgetAmount,
              targetKpi: formData.get('targetKpi') || null,
              targetValue: formData.get('targetValue') ? parseFloat(formData.get('targetValue') as string) : null,
              
              // 実績情報
              actualSpend,
              actualResult,
              
              // チーム配分
              teamAllocations: [], // 後で実装
            };

            try {
              const response = await fetch('/api/budget-results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });

              const result = await response.json();

              if (response.ok) {
                toast.success('データが作成されました');
                setShowCreateDialog(false);
                mutate();
                // フォームリセット
                (e.target as HTMLFormElement).reset();
              } else {
                toast.error(result.message || 'データの作成に失敗しました');
              }
            } catch (error) {
              console.error('Create error:', error);
              toast.error('エラーが発生しました。しばらく後でお試しください。');
            }
          }}>
            <div className="space-y-6">
              {/* 基本情報 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaignId">案件 *</Label>
                  <Select name="campaignId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="案件を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign: Campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.name} ({campaign.client.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>対象期間 *</Label>
                  <div className="flex gap-2">
                    <Select name="year" defaultValue={selectedYear.toString()} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select name="month" defaultValue={selectedMonth.toString()} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="platform">プラットフォーム *</Label>
                  <Select name="platform" required>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform: any) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="operationType">運用タイプ *</Label>
                  <Select name="operationType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="マイクロインフルエンサー">マイクロインフルエンサー</SelectItem>
                      <SelectItem value="メガインフルエンサー">メガインフルエンサー</SelectItem>
                      <SelectItem value="広告運用">広告運用</SelectItem>
                      <SelectItem value="コンテンツ制作">コンテンツ制作</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budgetType">予算タイプ</Label>
                  <Select name="budgetType" defaultValue="投稿予算">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="投稿予算">投稿予算</SelectItem>
                      <SelectItem value="広告予算">広告予算</SelectItem>
                      <SelectItem value="制作予算">制作予算</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 予算情報 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">予算情報</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="budgetAmount">予算金額</Label>
                    <NumberInput
                      id="budgetAmount"
                      name="budgetAmount"
                      min={0}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetKpi">目標KPI</Label>
                    <Select name="targetKpi">
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CVR">CVR</SelectItem>
                        <SelectItem value="ROAS">ROAS</SelectItem>
                        <SelectItem value="CPC">CPC</SelectItem>
                        <SelectItem value="CPM">CPM</SelectItem>
                        <SelectItem value="インプレッション">インプレッション</SelectItem>
                        <SelectItem value="リーチ">リーチ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetValue">目標値</Label>
                    <NumberInput
                      id="targetValue"
                      name="targetValue"
                      min={0}
                      step="0.1"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* 実績情報 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">実績情報</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="actualSpend">実際支出</Label>
                    <NumberInput
                      id="actualSpend"
                      name="actualSpend"
                      min={0}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="actualResult">実績結果</Label>
                    <NumberInput
                      id="actualResult"
                      name="actualResult"
                      min={0}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                >
                  キャンセル
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  作成
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BudgetResultsPage() {
  return (
    <ProtectedLayout>
      <BudgetResultsContent />
    </ProtectedLayout>
  );
} 