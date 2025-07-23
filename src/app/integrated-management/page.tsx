"use client";

import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { formatCurrency, formatNumber, formatDate, formatPercentage } from "@/lib/utils";
import { 
  ArrowLeft, Plus, Copy, Save, X, Upload, Download, Calculator, 
  DollarSign, TrendingUp, Target, Calendar, Globe, Users, Star,
  Search, Filter, RefreshCw, Edit, Trash2, Eye, Zap, BarChart3,
  PieChart, LineChart, Activity, AlertTriangle, CheckCircle,
  Clock, ArrowRight, Settings, PlayCircle, PauseCircle, Building
} from "lucide-react";
import Link from "next/link";
import { ImportExportActions } from '@/components/ImportExportActions';
import { useRouter } from "next/navigation";

interface IntegratedProject {
  id: string;
  name: string;
  productName?: string;
  productCategory?: string;
  productDescription?: string;
  purpose?: string;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  totalBudget: number;
  client: {
    id: string;
    name: string;
    salesDepartment: string;
    businessDivision: string;
    manager?: {
      id: string;
      name: string;
      role: string;
    };
  };
  budgets: Array<{
    id: string;
    year: number;
    month: number;
    platform: string;
    operationType: string;
    budgetType: string;
    amount: number;
    targetKpi?: string;
    targetValue?: number;
  }>;
  results: Array<{
    id: string;
    year: number;
    month: number;
    platform: string;
    operationType: string;
    budgetType: string;
    actualSpend: number;
    actualResult: number;
  }>;
  projectKpis: Array<{
    id: string;
    kpiType: string;
    targetValue: number;
    actualValue?: number;
    unit: string;
    description?: string;
    priority: number;
  }>;
  kpis: Array<{
    id: string;
    kpiType: string;
    targetValue: number;
    actualValue?: number;
    unit: string;
    description?: string;
    priority: number;
  }>;
  stats: {
    totalBudget: number;
    totalSpend: number;
    totalResults: number;
    budgetUtilization: number;
    roi: number;
    platformStats: Record<string, {
      budget: number;
      spend: number;
      results: number;
    }>;
    budgetCount: number;
    resultCount: number;
    kpiCount: number;
    averageCpc: number;
    averageCvr: number;
  };
}

interface OverallStats {
  totalCampaigns: number;
  totalBudgetAmount: number;
  totalSpendAmount: number;
  totalResultAmount: number;
  averageBudgetUtilization: number;
  averageROI: number;
}

interface IntegratedData {
  projects: IntegratedProject[];
  overallStats: OverallStats;
}

// APIレスポンス用の型定義
interface IntegratedManagementApiResponse {
  success: boolean;
  data: IntegratedProject[];
  summary: {
    totalCampaigns: number;
    totalBudget: number;
    totalSpend: number;
    totalResult: number;
    budgetUtilization: number;
    roi: number;
  };
}

// 統合データかAPIレスポンスかを判定する型
type IntegratedDataOrApiResponse = IntegratedData | IntegratedManagementApiResponse;

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function IntegratedManagement() {
  const router = useRouter();
  
  // フィルター状態
  const [filters, setFilters] = useState({
    clientId: "all",
    businessDivision: "all",
    campaignId: "all",
    salesDepartment: "all",
    year: new Date().getFullYear().toString(),
    month: "all",
    searchTerm: "",
  });
  
  // 表示状態
  const [selectedCampaign, setSelectedCampaign] = useState<IntegratedProject | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"list" | "cards" | "workflow">("workflow");
  
  // モーダル状態
  const [showBudgetCopyDialog, setShowBudgetCopyDialog] = useState(false);
  const [showBulkResultDialog, setShowBulkResultDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [showResultEditDialog, setShowResultEditDialog] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  
  // データ取得
  const queryString = new URLSearchParams(
    Object.entries(filters).filter(([_, value]) => value && value !== "all")
  ).toString();
  
  const { data: integratedData, error, mutate } = useSWR<IntegratedDataOrApiResponse>(
    `/api/integrated-management?${queryString}`,
    fetcher
  );

  const { data: clients } = useSWR("/api/clients", fetcher);
  const { data: businessDivisions } = useSWR("/api/masters?category=businessDivision", fetcher);

  const isLoading = !integratedData && !error;

  // データの安全な取得とデフォルト値設定
  const safeIntegratedData = useMemo(() => {
    if (!integratedData) {
      return {
        projects: [],
        overallStats: {
          totalProjects: 0,
          totalBudget: 0,
          totalSpend: 0,
          totalResults: 0,
          budgetUtilization: 0,
          roi: 0,
          averageBudgetUtilization: 0,
          averageROI: 0
        }
      };
    }

    // 型ガード: APIレスポンス形式かチェック
    const isApiResponse = (data: any): data is IntegratedManagementApiResponse => {
      return data && typeof data === 'object' && 'success' in data && 'data' in data;
    };

    // 型ガード: IntegratedData形式かチェック
    const isIntegratedData = (data: any): data is IntegratedData => {
      return data && typeof data === 'object' && 'projects' in data;
    };

    // APIレスポンス構造の正規化
    if (isApiResponse(integratedData)) {
      // APIが {success: true, data: [...], summary: {...}} 形式で返す場合
      return {
        projects: Array.isArray(integratedData.data) ? integratedData.data : [],
        overallStats: {
          totalProjects: integratedData.summary?.totalCampaigns || 0,
          totalBudget: integratedData.summary?.totalBudget || 0,
          totalSpend: integratedData.summary?.totalSpend || 0,
          totalResults: integratedData.summary?.totalResult || 0,
          budgetUtilization: integratedData.summary?.budgetUtilization || 0,
          roi: integratedData.summary?.roi || 0,
          averageBudgetUtilization: integratedData.summary?.budgetUtilization || 0,
          averageROI: integratedData.summary?.roi || 0
        }
      };
    }

    // 直接 projects プロパティがある場合
    if (isIntegratedData(integratedData)) {
      return {
        projects: Array.isArray(integratedData.projects) ? integratedData.projects : [],
        overallStats: integratedData.overallStats || {
          totalProjects: 0,
          totalBudget: 0,
          totalSpend: 0,
          totalResults: 0,
          budgetUtilization: 0,
          roi: 0,
          averageBudgetUtilization: 0,
          averageROI: 0
        }
      };
    }

    // 配列が直接返される場合
    if (Array.isArray(integratedData)) {
      const dataArray = integratedData as any[];
      return {
        projects: dataArray,
        overallStats: {
          totalProjects: dataArray.length,
          totalBudget: 0,
          totalSpend: 0,
          totalResults: 0,
          budgetUtilization: 0,
          roi: 0,
          averageBudgetUtilization: 0,
          averageROI: 0
        }
      };
    }

    // フォールバック
    console.warn('[INTEGRATED_MANAGEMENT] Unexpected data structure:', integratedData);
    return {
      projects: [],
      overallStats: {
        totalProjects: 0,
        totalBudget: 0,
        totalSpend: 0,
        totalResults: 0,
        budgetUtilization: 0,
        roi: 0,
        averageBudgetUtilization: 0,
        averageROI: 0
      }
    };
  }, [integratedData]);

  // 安全なフィルタリング
  const filteredCampaigns = useMemo(() => {
    if (!safeIntegratedData?.projects || !Array.isArray(safeIntegratedData.projects)) {
      return [];
    }

    return safeIntegratedData.projects.filter(project => {
      // 必須プロパティの存在チェック
      if (!project || !project.client) {
        console.warn('[INTEGRATED_MANAGEMENT] Invalid project data:', project);
        return false;
      }

      try {
        // 事業部フィルター
        if (filters.businessDivision !== "all" && 
            project.client.businessDivision !== filters.businessDivision) {
          return false;
        }

        // クライアントフィルター
        if (filters.clientId !== "all" && project.client.id !== filters.clientId) {
          return false;
        }

        // 案件フィルター
        if (filters.campaignId !== "all" && project.id !== filters.campaignId) {
          return false;
        }

        // 営業部門フィルター
        if (filters.salesDepartment !== "all" && 
            project.client.salesDepartment !== filters.salesDepartment) {
          return false;
        }

        // 年フィルター
        if (filters.year !== "all" && project.startYear.toString() !== filters.year) {
          return false;
        }

        // 検索フィルター
        if (filters.searchTerm && filters.searchTerm.trim() !== "") {
          const searchLower = filters.searchTerm.toLowerCase();
          const searchableText = [
            project.name,
            project.client.name,
            project.purpose,
            project.productName,
            project.productCategory
          ].filter(Boolean).join(" ").toLowerCase();
          
          if (!searchableText.includes(searchLower)) {
            return false;
          }
        }

        return true;
      } catch (filterError) {
        console.error('[INTEGRATED_MANAGEMENT] Filter error for project:', project, filterError);
        return false;
      }
    });
  }, [safeIntegratedData.projects, filters]);

  // フィルター結果に基づく統計計算
  const filteredStats = React.useMemo(() => {
    const totalCampaigns = filteredCampaigns.length;
    const totalBudgetAmount = filteredCampaigns.reduce((sum, project) => sum + project.stats.totalBudget, 0);
    const totalSpendAmount = filteredCampaigns.reduce((sum, project) => sum + project.stats.totalSpend, 0);
    const totalResultAmount = filteredCampaigns.reduce((sum, project) => sum + project.stats.totalResults, 0);
    const averageBudgetUtilization = totalCampaigns > 0 ? 
      filteredCampaigns.reduce((sum, project) => sum + project.stats.budgetUtilization, 0) / totalCampaigns : 0;
    const averageROI = totalCampaigns > 0 ? 
      filteredCampaigns.reduce((sum, project) => sum + project.stats.roi, 0) / totalCampaigns : 0;

    // 事業部別集計
    const businessDivisionStats = filteredCampaigns.reduce((acc, project) => {
      const division = project.client.businessDivision;
      if (!acc[division]) {
        acc[division] = { campaigns: 0, budget: 0, spend: 0, results: 0 };
      }
      acc[division].campaigns += 1;
      acc[division].budget += project.stats.totalBudget;
      acc[division].spend += project.stats.totalSpend;
      acc[division].results += project.stats.totalResults;
      return acc;
    }, {} as Record<string, { campaigns: number; budget: number; spend: number; results: number; }>);

    // クライアント別集計
    const clientStats = filteredCampaigns.reduce((acc, project) => {
      const clientId = project.client.id;
      const clientName = project.client.name;
      if (!acc[clientId]) {
        acc[clientId] = { name: clientName, campaigns: 0, budget: 0, spend: 0, results: 0 };
      }
      acc[clientId].campaigns += 1;
      acc[clientId].budget += project.stats.totalBudget;
      acc[clientId].spend += project.stats.totalSpend;
      acc[clientId].results += project.stats.totalResults;
      return acc;
    }, {} as Record<string, { name: string; campaigns: number; budget: number; spend: number; results: number; }>);

    return {
      totalCampaigns,
      totalBudgetAmount,
      totalSpendAmount,
      totalResultAmount,
      averageBudgetUtilization,
      averageROI,
      businessDivisionStats,
      clientStats
    };
  }, [filteredCampaigns]);

  // 予算コピー機能
  const handleBudgetCopy = async (copyData: any) => {
    try {
      const response = await fetch("/api/integrated-management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "copy_budget",
          projectId: selectedCampaign?.id,
          data: copyData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        mutate();
        setShowBudgetCopyDialog(false);
      } else {
        toast.error("予算コピーに失敗しました");
      }
    } catch (error) {
      console.error("Budget copy error:", error);
      toast.error("予算コピー中にエラーが発生しました");
    }
  };

  // 実績一括入力
  const handleBulkResultInput = async (data: any) => {
    if (!selectedCampaign) return;
    
    try {
      const response = await fetch("/api/results", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          results: data
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`${result.count}件の実績を一括で入力しました`);
        mutate();
        setShowBulkResultDialog(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "実績の一括入力に失敗しました");
      }
    } catch (error) {
      console.error("Bulk result input error:", error);
      toast.error("実績の一括入力に失敗しました");
    }
  };

  // 個別実績入力
  const handleResultSubmit = async (data: any) => {
    if (!selectedCampaign) return;
    
    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: selectedCampaign.id,
          ...data,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("実績を入力しました");
        mutate();
        setShowResultDialog(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "実績の入力に失敗しました");
      }
    } catch (error) {
      console.error("Result submit error:", error);
      toast.error("実績の入力に失敗しました");
    }
  };

  // 実績編集
  const handleResultEdit = async (data: any) => {
    if (!selectedResult) return;
    
    try {
      const response = await fetch(`/api/results/${selectedResult.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("実績を更新しました");
        mutate();
        setShowResultEditDialog(false);
        setSelectedResult(null);
      } else {
        throw new Error("実績の更新に失敗しました");
      }
    } catch (error) {
      console.error("Result edit error:", error);
      toast.error("実績の更新に失敗しました");
    }
  };

  // ステータス判定
  const getCampaignStatus = (project: IntegratedProject) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    const startDate = new Date(project.startYear, project.startMonth - 1);
    const endDate = project.endYear && project.endMonth ? 
      new Date(project.endYear, project.endMonth - 1) : null;
    
    if (startDate > now) return "upcoming";
    if (endDate && endDate < now) return "completed";
    return "active";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">開始前</Badge>;
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">実行中</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">完了</Badge>;
      default:
        return <Badge variant="outline">不明</Badge>;
    }
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">データの読み込みに失敗しました</h3>
              <p className="text-gray-600 mb-6">しばらく待ってからもう一度お試しください</p>
              <Button onClick={() => mutate()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                再読み込み
              </Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-4 space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              統合管理センター
            </h1>
            <p className="text-gray-600 mt-1">案件・予算・実績の一元管理</p>
          </div>
          <div className="flex items-center space-x-2">
            <ImportExportActions
              exportEndpoint="/api/integrated-management"
              importEndpoint="/api/import-export/integrated-management"
              dataType="統合管理"
              filePrefix="integrated-management"
              filters={{
                year: filters.year,
                month: filters.month,
                clientId: filters.clientId,
                businessDivision: filters.businessDivision
              }}
              onImportComplete={() => {
                mutate();
              }}
            />
            <Button
              variant="outline"
              onClick={() => mutate()}
              className="hidden sm:flex"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              更新
            </Button>
            <Button 
              onClick={() => router.push("/projects/new")}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              新規案件
            </Button>
          </div>
        </div>

        {/* 全体統計 */}
        {safeIntegratedData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">総案件数</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {filteredStats.totalCampaigns}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">総予算額</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(filteredStats.totalBudgetAmount)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">執行額</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(filteredStats.totalSpendAmount)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">平均執行率</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(filteredStats.averageBudgetUtilization, 1)}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* フィルター */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">検索</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="案件名、クライアント名で検索"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="client">クライアント</Label>
                <Select
                  value={filters.clientId}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, clientId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="クライアントを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全てのクライアント</SelectItem>
                    {clients?.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessDivision">事業部</Label>
                <Select
                  value={filters.businessDivision}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, businessDivision: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="事業部を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全ての事業部</SelectItem>
                    {businessDivisions?.map((division: any) => (
                      <SelectItem key={division.id} value={division.value}>
                        {division.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="campaign">案件</Label>
                <Select
                  value={filters.campaignId}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, campaignId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="案件を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全ての案件</SelectItem>
                    {filteredCampaigns?.map((campaign: any) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name} ({campaign.client.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="salesDepartment">営業部</Label>
                <Select
                  value={filters.salesDepartment}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, salesDepartment: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="営業部を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全ての営業部</SelectItem>
                    <SelectItem value="国内営業">国内営業</SelectItem>
                    <SelectItem value="海外営業">海外営業</SelectItem>
                    <SelectItem value="代理店営業">代理店営業</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">年</Label>
                <Select
                  value={filters.year}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="month">月</Label>
                <Select
                  value={filters.month}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, month: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="月を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全ての月</SelectItem>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <SelectItem key={month} value={month.toString()}>
                        {month}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 詳細統計表示 */}
            {(filters.businessDivision !== "all" || filters.clientId !== "all" || filters.campaignId !== "all") && (
              <div className="mt-6 space-y-4">
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">詳細統計</h3>
                  
                  {/* 事業部別詳細 */}
                  {Object.keys(filteredStats.businessDivisionStats).length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-3 text-blue-600">事業部別集計</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(filteredStats.businessDivisionStats).map(([division, stats]) => (
                          <Card key={division}>
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">{division}</h5>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-600">案件数</p>
                                    <p className="font-bold">{(stats as any).campaigns || 0}件</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">総予算</p>
                                    <p className="font-bold text-green-600">{formatCurrency((stats as any).budget || 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">執行額</p>
                                    <p className="font-bold text-orange-600">{formatCurrency((stats as any).spend || 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">執行率</p>
                                    <p className="font-bold text-purple-600">
                                      {((stats as any).budget || 0) > 0 ? formatPercentage(((stats as any).spend || 0) / ((stats as any).budget || 1) * 100, 1) : "0%"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* クライアント別詳細 */}
                  {Object.keys(filteredStats.clientStats).length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-3 text-green-600">クライアント別集計</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(filteredStats.clientStats).map(([clientId, stats]) => (
                          <Card key={clientId}>
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">{(stats as any).name || 'Unknown'}</h5>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-600">案件数</p>
                                    <p className="font-bold">{(stats as any).campaigns || 0}件</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">総予算</p>
                                    <p className="font-bold text-green-600">{formatCurrency((stats as any).budget || 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">執行額</p>
                                    <p className="font-bold text-orange-600">{formatCurrency((stats as any).spend || 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">執行率</p>
                                    <p className="font-bold text-purple-600">
                                      {((stats as any).budget || 0) > 0 ? formatPercentage(((stats as any).spend || 0) / ((stats as any).budget || 1) * 100, 1) : "0%"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">表示形式:</Label>
                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === 'workflow' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('workflow')}
                    className="rounded-l-lg rounded-r-none"
                  >
                    <Activity className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    className="rounded-none"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-lg rounded-l-none"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredCampaigns.length}件の案件を表示中
              </div>
            </div>
          </CardContent>
        </Card>

        {/* メインコンテンツ */}
        {filteredCampaigns.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filters.searchTerm ? "検索結果が見つかりません" : "案件がありません"}
              </h3>
              <p className="text-gray-600 mb-6">
                {filters.searchTerm ? 
                  "検索条件を変更してお試しください" : 
                  "新しい案件を作成して管理を始めましょう"
                }
              </p>
              {!filters.searchTerm && (
                <Button onClick={() => router.push("/projects/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  最初の案件を作成
                </Button>
              )}
            </CardContent>
          </Card>
        ) : viewMode === 'workflow' ? (
          /* ワークフロー表示 */
          <div className="space-y-6">
            {filteredCampaigns.map((project) => (
              <WorkflowCard 
                key={project.id} 
                project={project} 
                onSelect={setSelectedCampaign}
                onBudgetCopy={() => {
                  setSelectedCampaign(project);
                  setShowBudgetCopyDialog(true);
                }}
                onBulkResult={() => {
                  setSelectedCampaign(project);
                  setShowBulkResultDialog(true);
                }}
                onResultAdd={() => {
                  setSelectedCampaign(project);
                  setShowResultDialog(true);
                }}
              />
            ))}
          </div>
        ) : viewMode === 'cards' ? (
          /* カード表示 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((project) => (
              <CampaignStatsCard 
                key={project.id} 
                project={project} 
                onSelect={setSelectedCampaign}
              />
            ))}
          </div>
        ) : (
          /* リスト表示 */
          <Card>
            <CardContent className="p-0">
              <CampaignListTable 
                projects={filteredCampaigns} 
                onSelect={setSelectedCampaign}
              />
            </CardContent>
          </Card>
        )}

        {/* 詳細モーダル */}
        {selectedCampaign && (
          <CampaignDetailModal
            project={selectedCampaign}
            isOpen={!!selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            onResultAdd={() => setShowResultDialog(true)}
            onBulkResult={() => setShowBulkResultDialog(true)}
            onResultEdit={(result) => {
              setSelectedResult(result);
              setShowResultEditDialog(true);
            }}
          />
        )}

        {/* 予算コピーダイアログ */}
        <BudgetCopyDialog
          isOpen={showBudgetCopyDialog}
          onClose={() => setShowBudgetCopyDialog(false)}
          onConfirm={handleBudgetCopy}
          project={selectedCampaign}
        />

        {/* 実績一括入力ダイアログ */}
        <BulkResultDialog
          isOpen={showBulkResultDialog}
          onClose={() => setShowBulkResultDialog(false)}
          onConfirm={handleBulkResultInput}
          project={selectedCampaign}
        />

        {/* 個別実績入力ダイアログ */}
        <ResultDialog
          isOpen={showResultDialog}
          onClose={() => setShowResultDialog(false)}
          onConfirm={handleResultSubmit}
          project={selectedCampaign}
        />

        {/* 実績編集ダイアログ */}
        <ResultEditDialog
          isOpen={showResultEditDialog}
          onClose={() => setShowResultEditDialog(false)}
          onConfirm={handleResultEdit}
          result={selectedResult}
        />
      </div>
    </ProtectedLayout>
  );
}

/* ワークフローカードコンポーネント */
function WorkflowCard({ 
  project, 
  onSelect, 
  onBudgetCopy, 
  onBulkResult,
  onResultAdd
}: { 
  project: IntegratedProject;
  onSelect: (project: IntegratedProject) => void;
  onBudgetCopy: () => void;
  onBulkResult: () => void;
  onResultAdd: (project: IntegratedProject) => void;
}) {
  const status = getCampaignStatus(project);
  const progress = project.stats.budgetUtilization;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              {getStatusBadge(status)}
            </div>
            <CardDescription className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {project.client.name}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {project.client.salesDepartment}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.startYear}年{project.startMonth}月〜
                {project.endYear && project.endMonth ? 
                  `${project.endYear}年${project.endMonth}月` : "継続中"}
              </span>
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(project)}
          >
            詳細
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* 商材情報 */}
          {project.productName && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-medium text-sm text-blue-900 mb-1">商材情報</div>
              <div className="text-sm">
                <div><strong>商材名:</strong> {project.productName}</div>
                {project.productCategory && (
                  <div><strong>カテゴリ:</strong> {project.productCategory}</div>
                )}
                {project.productDescription && (
                  <div className="text-xs text-gray-600 mt-1">{project.productDescription}</div>
                )}
              </div>
            </div>
          )}

          {/* ワークフロー進行状況 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              {/* 案件設定 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-center">
                  <div className="font-medium">案件設定</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(project.totalBudget)}
                  </div>
                  <div className="text-xs text-gray-500">
                    KPI: {project.kpis?.length || 0}項目
                  </div>
                </div>
              </div>

              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4"></div>

              {/* 予算計画 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
                  {(project.budgets?.length || 0) > 0 ? (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  <div className="font-medium">予算計画</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(project.stats.totalBudget)}
                  </div>
                  <div className="text-xs text-gray-500">
                    予算項目: {project.budgets?.length || 0}件
                  </div>
                  {(project.budgets?.length || 0) > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onBudgetCopy}
                      className="text-xs p-1 h-auto mt-1"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      コピー
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4"></div>

              {/* 実績入力 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center">
                  {(project.results?.length || 0) > 0 ? (
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  <div className="font-medium">実績入力</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(project.stats.totalSpend)}
                  </div>
                  <div className="text-xs text-gray-500">
                    実績項目: {project.results?.length || 0}件
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 進捗バーと統計 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>予算執行率</span>
              <span className={`font-medium ${progress > 100 ? 'text-red-600' : 'text-gray-900'}`}>
                {progress.toFixed(1)}%
              </span>
            </div>
            <Progress value={Math.min(progress, 100)} className="h-2" />
            {progress > 100 && (
              <p className="text-xs text-red-600">⚠️ 予算超過しています</p>
            )}
          </div>

          {/* アクションボタン */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-600">平均CPC</div>
              <div className="font-medium">{formatCurrency(project.stats?.averageCpc || 0)}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-600">平均CVR</div>
              <div className="font-medium">{(project.stats?.averageCvr || 0).toFixed(2)}%</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-600">ROI</div>
              <div className="font-medium">{(project.stats?.roi || 0).toFixed(1)}%</div>
            </div>
          </div>

          {/* 実績入力エリア */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">実績入力</span>
              {(project.results?.length || 0) > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400" />
              )}
            </div>
            {(project.results?.length || 0) > 0 ? (
              <div className="flex items-center justify-center gap-1 mt-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onResultAdd(project)}
                    className="text-xs p-1 h-auto"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    個別
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBulkResult}
                    className="text-xs p-1 h-auto"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    一括
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 mt-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onResultAdd(project)}
                    className="text-xs p-1 h-auto"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    個別
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBulkResult}
                    className="text-xs p-1 h-auto"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    一括
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getCampaignStatus(project: IntegratedProject) {
  const now = new Date();
  const startDate = new Date(project.startYear, project.startMonth - 1);
  const endDate = project.endYear && project.endMonth ? 
    new Date(project.endYear, project.endMonth - 1) : null;
  
  if (startDate > now) return "upcoming";
  if (endDate && endDate < now) return "completed";
  return "active";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "upcoming":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">開始前</Badge>;
    case "active":
      return <Badge variant="default" className="bg-green-100 text-green-800">実行中</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">完了</Badge>;
    default:
      return <Badge variant="outline">不明</Badge>;
  }
}

/* その他のコンポーネント（CampaignStatsCard、CampaignListTable、CampaignDetailModal等）は、
   紙面の都合上省略していますが、同様の構造で実装します */

function CampaignStatsCard({ project, onSelect }: { project: IntegratedProject; onSelect: (project: IntegratedProject) => void }) {
  // カード表示用の簡略化されたコンポーネント
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(project)}>
      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <CardDescription>{project.client.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>総予算:</span>
            <span className="font-medium">{formatCurrency(project.totalBudget)}</span>
          </div>
          <div className="flex justify-between">
            <span>執行額:</span>
            <span className="font-medium">{formatCurrency(project.stats.totalSpend)}</span>
          </div>
          <div className="flex justify-between">
            <span>執行率:</span>
            <span className="font-medium">{formatPercentage(project.stats.budgetUtilization, 1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignListTable({ projects, onSelect }: { projects: IntegratedProject[]; onSelect: (project: IntegratedProject) => void }) {
  // テーブル表示用のコンポーネント
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>案件名</TableHead>
          <TableHead>クライアント</TableHead>
          <TableHead>期間</TableHead>
          <TableHead>総予算</TableHead>
          <TableHead>執行額</TableHead>
          <TableHead>執行率</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} className="hover:bg-gray-50">
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client.name}</TableCell>
            <TableCell>
              {project.startYear}年{project.startMonth}月〜
              {project.endYear && project.endMonth ? 
                `${project.endYear}年${project.endMonth}月` : "継続中"}
            </TableCell>
            <TableCell>{formatCurrency(project.totalBudget)}</TableCell>
            <TableCell>{formatCurrency(project.stats.totalSpend)}</TableCell>
            <TableCell>
              <span className={
                project.stats.budgetUtilization > 100 ? "text-red-600 font-medium" :
                project.stats.budgetUtilization > 80 ? "text-yellow-600 font-medium" :
                "text-green-600 font-medium"
              }>
                {formatPercentage(project.stats.budgetUtilization, 1)}
              </span>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelect(project)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CampaignDetailModal({ 
  project, 
  isOpen, 
  onClose, 
  onResultAdd, 
  onBulkResult, 
  onResultEdit 
}: { 
  project: IntegratedProject; 
  isOpen: boolean; 
  onClose: () => void;
  onResultAdd?: () => void;
  onBulkResult?: () => void;
  onResultEdit?: (result: any) => void;
}) {
  // 詳細モーダル用のコンポーネント（簡略化）
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.client.name}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="budgets">予算</TabsTrigger>
            <TabsTrigger value="results">実績</TabsTrigger>
            <TabsTrigger value="kpis">KPI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>案件名</Label>
                <p className="font-medium">{project.name}</p>
              </div>
              <div>
                <Label>クライアント</Label>
                <p className="font-medium">{project.client.name}</p>
              </div>
              <div>
                <Label>期間</Label>
                <p className="font-medium">
                  {project.startYear}年{project.startMonth}月〜
                  {project.endYear && project.endMonth ? 
                    `${project.endYear}年${project.endMonth}月` : "継続中"}
                </p>
              </div>
              <div>
                <Label>総予算</Label>
                <p className="font-medium">{formatCurrency(project.totalBudget)}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budgets">
            <p>予算詳細（実装予定）</p>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">実績データ</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onResultAdd && onResultAdd()}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    実績追加
                  </Button>
                  <Button
                    onClick={() => onBulkResult && onBulkResult()}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    一括入力
                  </Button>
                </div>
              </div>
              
              {project?.results && project.results.length > 0 ? (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>年月</TableHead>
                        <TableHead>プラットフォーム</TableHead>
                        <TableHead>運用タイプ</TableHead>
                        <TableHead>執行額</TableHead>
                        <TableHead>成果</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.results.map((result: any) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            {result.year}年{result.month}月
                          </TableCell>
                          <TableCell>{result.platform}</TableCell>
                          <TableCell>{result.operationType}</TableCell>
                          <TableCell>{formatCurrency(result.actualSpend)}</TableCell>
                          <TableCell>{formatCurrency(result.actualResult)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onResultEdit && onResultEdit(result)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>まだ実績データがありません</p>
                  <p className="text-sm">「実績追加」ボタンから実績を入力してください</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="kpis">
            <p>KPI詳細（実装予定）</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function BudgetCopyDialog({ isOpen, onClose, onConfirm, project }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  project: IntegratedProject | null;
}) {
  const [copyData, setCopyData] = useState({
    sourceYear: new Date().getFullYear(),
    sourceMonth: new Date().getMonth() + 1,
    targetYear: new Date().getFullYear(),
    targetMonth: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>予算コピー</DialogTitle>
          <DialogDescription>
            {project?.name}の予算を他の月にコピーします
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>コピー元年</Label>
              <Select
                value={copyData.sourceYear.toString()}
                onValueChange={(value) => setCopyData(prev => ({ ...prev, sourceYear: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>コピー元月</Label>
              <Select
                value={copyData.sourceMonth.toString()}
                onValueChange={(value) => setCopyData(prev => ({ ...prev, sourceMonth: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}月
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>コピー先年</Label>
              <Select
                value={copyData.targetYear.toString()}
                onValueChange={(value) => setCopyData(prev => ({ ...prev, targetYear: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>コピー先月</Label>
              <Select
                value={copyData.targetMonth.toString()}
                onValueChange={(value) => setCopyData(prev => ({ ...prev, targetMonth: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}月
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={() => onConfirm(copyData)}>
            <Copy className="w-4 h-4 mr-2" />
            コピー実行
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BulkResultDialog({ isOpen, onClose, onConfirm, project }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  project: IntegratedProject | null;
}) {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (project && isOpen) {
      // 予算ベースで実績テンプレートを生成
      const resultTemplates = project.budgets.map(budget => ({
        campaignId: project.id,
        year: budget.year,
        month: budget.month,
        platform: budget.platform,
        operationType: budget.operationType,
        budgetType: budget.budgetType,
        actualSpend: 0,
        actualResult: 0,
      }));
      setResults(resultTemplates);
    }
  }, [project, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>実績一括入力</DialogTitle>
          <DialogDescription>
            {project?.name}の実績を一括で入力します
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>年月</TableHead>
                <TableHead>プラットフォーム</TableHead>
                <TableHead>運用タイプ</TableHead>
                <TableHead>執行額</TableHead>
                <TableHead>成果</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {result.year}年{result.month}月
                  </TableCell>
                  <TableCell>{result.platform}</TableCell>
                  <TableCell>{result.operationType}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={result.actualSpend}
                      onChange={(e) => {
                        const newResults = [...results];
                        newResults[index].actualSpend = parseFloat(e.target.value) || 0;
                        setResults(newResults);
                      }}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={result.actualResult}
                      onChange={(e) => {
                        const newResults = [...results];
                        newResults[index].actualResult = parseFloat(e.target.value) || 0;
                        setResults(newResults);
                      }}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={() => onConfirm(results)}>
            <Save className="w-4 h-4 mr-2" />
            一括保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 

// 個別実績入力ダイアログ
function ResultDialog({ isOpen, onClose, onConfirm, project }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  project: IntegratedProject | null;
}) {
  const [resultData, setResultData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    platform: "",
    operationType: "",
    budgetType: "",
    actualSpend: 0,
    actualResult: 0,
  });

  const { data: masters } = useSWR("/api/masters?category=platform", fetcher);
  const { data: operationTypes } = useSWR("/api/masters?category=operationType", fetcher);
  const { data: budgetTypes } = useSWR("/api/masters?category=budgetType", fetcher);

  const platforms = masters || [];
  const operations = operationTypes || [];
  const budgets = budgetTypes || [];

  const handleSubmit = () => {
    if (!resultData.platform || !resultData.operationType || !resultData.budgetType) {
      toast.error("必須項目を入力してください");
      return;
    }
    onConfirm(resultData);
  };

  useEffect(() => {
    if (isOpen) {
      setResultData({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        platform: "",
        operationType: "",
        budgetType: "",
        actualSpend: 0,
        actualResult: 0,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>実績入力</DialogTitle>
          <DialogDescription>
            {project?.name}の実績を入力します
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>年</Label>
              <Select
                value={resultData.year.toString()}
                onValueChange={(value) => setResultData(prev => ({ ...prev, year: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - 1 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>月</Label>
              <Select
                value={resultData.month.toString()}
                onValueChange={(value) => setResultData(prev => ({ ...prev, month: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}月
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>プラットフォーム</Label>
            <Select
              value={resultData.platform}
              onValueChange={(value) => setResultData(prev => ({ ...prev, platform: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="プラットフォームを選択" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform: any) => (
                  <SelectItem key={platform.id} value={platform.value}>
                    {platform.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>運用タイプ</Label>
            <Select
              value={resultData.operationType}
              onValueChange={(value) => setResultData(prev => ({ ...prev, operationType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="運用タイプを選択" />
              </SelectTrigger>
              <SelectContent>
                {operations.map((operation: any) => (
                  <SelectItem key={operation.id} value={operation.value}>
                    {operation.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>予算タイプ</Label>
            <Select
              value={resultData.budgetType}
              onValueChange={(value) => setResultData(prev => ({ ...prev, budgetType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="予算タイプを選択" />
              </SelectTrigger>
              <SelectContent>
                {budgets.map((budget: any) => (
                  <SelectItem key={budget.id} value={budget.value}>
                    {budget.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>執行額</Label>
              <Input
                type="number"
                value={resultData.actualSpend}
                onChange={(e) => setResultData(prev => ({ ...prev, actualSpend: parseFloat(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>成果</Label>
              <Input
                type="number"
                value={resultData.actualResult}
                onChange={(e) => setResultData(prev => ({ ...prev, actualResult: parseFloat(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 実績編集ダイアログ
function ResultEditDialog({ isOpen, onClose, onConfirm, result }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  result: any;
}) {
  const [editData, setEditData] = useState({
    actualSpend: 0,
    actualResult: 0,
  });

  useEffect(() => {
    if (result && isOpen) {
      setEditData({
        actualSpend: Number(result.actualSpend) || 0,
        actualResult: Number(result.actualResult) || 0,
      });
    }
  }, [result, isOpen]);

  const handleSubmit = () => {
    onConfirm(editData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>実績編集</DialogTitle>
          <DialogDescription>
            {result?.year}年{result?.month}月 - {result?.platform} ({result?.operationType})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>執行額</Label>
            <Input
              type="number"
              value={editData.actualSpend}
              onChange={(e) => setEditData(prev => ({ ...prev, actualSpend: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
            />
          </div>
          
          <div>
            <Label>成果</Label>
            <Input
              type="number"
              value={editData.actualResult}
              onChange={(e) => setEditData(prev => ({ ...prev, actualResult: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 