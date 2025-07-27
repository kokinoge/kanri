"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NumberInput } from "@/components/ui/number-input";
import { 
  Download, 
  Search, 
  Filter, 
  ArrowUpDown, 
  RefreshCw, 
  AlertCircle, 
  Info, 
  LayoutGrid, 
  LayoutList,
  Calendar,
  Building,
  TrendingUp,
  DollarSign,
  Edit,
  Save,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, formatNumber, formatDate, formatYearMonth } from "@/lib/utils";

interface Budget {
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
    id: string;
    name: string;
    client: {
      id: string;
      name: string;
      manager?: {
        id: string;
        name: string;
        role: string;
      };
    };
  };
}

interface Result {
  id: string;
  year: number;
  month: number;
  platform: string;
  operationType: string;
  actualSpend: number;
  actualResult: number;
  campaign: {
    id: string;
    name: string;
    client: {
      id: string;
      name: string;
    };
  };
}

interface Client {
  id: string;
  name: string;
  manager?: {
    id: string;
    name: string;
    role: string;
  };
  businessDivision?: string;
  priority: string;
  createdAt: string;
  campaigns: Array<{ id: string; name: string }>;
}

interface Campaign {
  id: string;
  name: string;
  purpose?: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  client: {
    id: string;
    name: string;
  };
}

interface DataTablesResponse {
  budgets: Budget[];
  results: Result[];
  clients: Client[];
  campaigns: Campaign[];
  statistics: {
    totalBudget: number;
    totalSpend: number;
    totalResults: number;
    efficiency: number;
    recordCounts: {
      budgets: number;
      results: number;
      clients: number;
      campaigns: number;
    };
  };
  filterOptions: {
    platforms: string[];
    operationTypes: string[];
    departments: string[];
    clients: Array<{ id: string; name: string }>;
  };
}

interface ApiError {
  error: string;
  message: string;
}

type SortField = 'date' | 'client' | 'campaign' | 'platform' | 'spend' | 'result' | 'amount' | 'startDate' | 'priority';
type SortDirection = 'asc' | 'desc';

// エラーハンドリング付きfetcher
const fetcher = async (url: string): Promise<DataTablesResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: 'Network Error',
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));
    
    if (response.status === 401) {
      throw new Error('AUTHENTICATION_ERROR');
    }
    
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default function DataTablesPage() {
  const { user: session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("results");
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [operationTypeFilter, setOperationTypeFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // 直接編集機能の状態
  const [editingCell, setEditingCell] = useState<{
    type: 'result' | 'budget';
    id: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRowData, setNewRowData] = useState<any>({});

  // クエリパラメータの構築
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (yearFilter && yearFilter !== "all") params.append("year", yearFilter);
    if (monthFilter && monthFilter !== "all") params.append("month", monthFilter);
    if (clientFilter && clientFilter !== "all") params.append("clientId", clientFilter);
    if (platformFilter && platformFilter !== "all") params.append("platform", platformFilter);
    if (operationTypeFilter && operationTypeFilter !== "all") params.append("operationType", operationTypeFilter);
    if (departmentFilter && departmentFilter !== "all") params.append("department", departmentFilter);
    return params;
  }, [yearFilter, monthFilter, clientFilter, platformFilter, operationTypeFilter, departmentFilter]);

  const apiUrl = useMemo(() => {
    const paramString = queryParams.toString();
    return `/api/data-tables${paramString ? `?${paramString}` : ''}`;
  }, [queryParams]);

  // SWR設定
  const { data, isLoading, error, mutate } = useSWR<DataTablesResponse>(
    session ? apiUrl : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: (error) => {
        return !error.message.includes('AUTHENTICATION_ERROR');
      },
      onError: (error) => {
        if (error.message.includes('AUTHENTICATION_ERROR')) {
          router.push("/api/auth/signin");
        }
      },
    }
  );

  // 直接編集機能
  const startEditing = (type: 'result' | 'budget', id: string, field: string, currentValue: any) => {
    setEditingCell({ type, id, field });
    setEditValue(currentValue?.toString() || "");
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (!editingCell) return;

    try {
      const endpoint = editingCell.type === 'result' ? '/api/results' : '/api/budgets';
      const response = await fetch(`${endpoint}/${editingCell.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [editingCell.field]: editingCell.field.includes('actualSpend') || editingCell.field.includes('actualResult') || editingCell.field.includes('amount') || editingCell.field.includes('targetValue')
            ? parseFloat(editValue) || 0
            : editValue
        }),
      });

      if (!response.ok) throw new Error('保存に失敗しました');

      toast.success('正常に保存されました');
      mutate(); // データを再取得
      cancelEditing();
    } catch (error) {
      toast.error('保存に失敗しました');
    }
  };

  const addNewRow = async (type: 'result' | 'budget') => {
    setIsAddingNew(true);
    setNewRowData({
      type,
      campaignId: "",
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      platform: "",
      operationType: "",
      budgetType: "",
      ...(type === 'result' ? { actualSpend: 0, actualResult: 0 } : { amount: 0, targetValue: 0 })
    });
  };

  const cancelNewRow = () => {
    setIsAddingNew(false);
    setNewRowData({});
  };

  const saveNewRow = async () => {
    try {
      const endpoint = newRowData.type === 'result' ? '/api/results' : '/api/budgets';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRowData),
      });

      if (!response.ok) throw new Error('追加に失敗しました');

      toast.success('新しい行を追加しました');
      mutate(); // データを再取得
      cancelNewRow();
    } catch (error) {
      toast.error('追加に失敗しました');
    }
  };

  // 編集可能セルコンポーネント
  const EditableCell = ({ type, id, field, value, displayValue, isNumeric = false }: {
    type: 'result' | 'budget';
    id: string;
    field: string;
    value: any;
    displayValue: string;
    isNumeric?: boolean;
  }) => {
    const isEditing = editingCell?.type === type && editingCell?.id === id && editingCell?.field === field;

    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          {isNumeric ? (
            <NumberInput
              value={editValue}
              onChange={setEditValue}
              className="h-8 text-sm"
              displayFormat={field.includes('amount') || field.includes('actualSpend') || field.includes('actualResult') ? 'currency' : 'number'}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEditing();
              }}
            />
          )}
          <Button variant="ghost" size="sm" onClick={saveEdit} className="h-6 w-6 p-0">
            <Save className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={cancelEditing} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-50 p-1 rounded flex items-center justify-between group"
        onClick={() => startEditing(type, id, field, value)}
      >
        <span>{displayValue}</span>
        <Edit className="h-3 w-3 opacity-0 group-hover:opacity-100" />
      </div>
    );
  };

  // 年・月のオプション
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: 5 }, (_, i) => currentYear - i), [currentYear]);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  // ソート機能
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField, sortDirection]);

  // リトライ機能
  const handleRetry = useCallback(() => {
    mutate();
  }, [mutate]);



  // フィルタリングとソート（実績）
  const filteredResults = useMemo(() => {
    if (!data?.results) return [];
    
    return data.results.filter(result => {
      const matchesSearch = !searchTerm || 
        result.campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.campaign.client.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = (a.year * 100 + a.month) - (b.year * 100 + b.month);
          break;
        case 'client':
          comparison = a.campaign.client.name.localeCompare(b.campaign.client.name);
          break;
        case 'campaign':
          comparison = a.campaign.name.localeCompare(b.campaign.name);
          break;
        case 'platform':
          comparison = a.platform.localeCompare(b.platform);
          break;
        case 'spend':
          comparison = Number(a.actualSpend) - Number(b.actualSpend);
          break;
        case 'result':
          comparison = Number(a.actualResult) - Number(b.actualResult);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data?.results, searchTerm, sortField, sortDirection]);

  // フィルタリングとソート（クライアント）
  const filteredClients = useMemo(() => {
    if (!data?.clients) return [];
    
    return data.clients.filter(client => {
      const matchesSearch = !searchTerm || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.manager?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'client':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'priority':
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          comparison = (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) - 
                     (priorityOrder[b.priority as keyof typeof priorityOrder] || 0);
          break;
        default:
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data?.clients, searchTerm, sortField, sortDirection]);

  // フィルタリングとソート（案件）
  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) return [];
    
    return data.campaigns.filter(campaign => {
      const matchesSearch = !searchTerm || 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (campaign.purpose || '').toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'client':
          comparison = a.client.name.localeCompare(b.client.name);
          break;
        case 'campaign':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'amount':
          comparison = Number(a.totalBudget) - Number(b.totalBudget);
          break;
        default:
          comparison = new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data?.campaigns, searchTerm, sortField, sortDirection]);

  // フィルタリセット
  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setPlatformFilter("all");
    setOperationTypeFilter("all");
    setClientFilter("all");
    setYearFilter("all");
    setMonthFilter("all");
    setDepartmentFilter("all");
  }, []);

  // ナビゲーションハンドラ
  const handleClientClick = useCallback((clientId: string) => {
    router.push(`/clients/${clientId}`);
  }, [router]);

  const handlePageNavigation = useCallback((page: string) => {
    router.push(page);
  }, [router]);

  // CSV出力機能
  const exportToCSV = useCallback((data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map((row: any) => 
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return JSON.stringify(value);
          return String(value).replace(/"/g, '""');
        }).join(',')
      )
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
  }, []);

  // カード表示コンポーネント

  const ResultCard = ({ result }: { result: Result }) => {
    const roas = result.actualResult / result.actualSpend;
    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{result.campaign.name}</CardTitle>
              <p className="text-sm text-gray-600">{result.campaign.client.name}</p>
            </div>
            <Badge variant="secondary">{formatYearMonth(result.year, result.month)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-500">プラットフォーム</p>
              <p className="font-medium">{result.platform}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">運用タイプ</p>
              <p className="font-medium">{result.operationType}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">支出</p>
              <p className="font-bold text-red-600">{formatCurrency(Number(result.actualSpend))}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">結果</p>
              <p className="font-bold text-blue-600">{formatNumber(Number(result.actualResult))}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">ROAS</p>
              <p className={`font-bold ${roas >= 2 ? 'text-green-600' : roas >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                {roas.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ClientCard = ({ client }: { client: Client }) => (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleClientClick(client.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-blue-600 hover:underline">{client.name}</CardTitle>
            <p className="text-sm text-gray-600">{client.manager?.name || '担当者未設定'}</p>
          </div>
          <Badge 
            variant={client.priority === 'high' ? 'destructive' : client.priority === 'medium' ? 'default' : 'secondary'}
          >
            {client.priority === 'high' ? '高' : client.priority === 'medium' ? '中' : '低'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">事業部</p>
            <p className="font-medium">{client.businessDivision || '未設定'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">案件数</p>
                                    <p className="font-medium">{client.campaigns?.length || 0}件</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-500">作成日</p>
          <p className="text-sm">{formatDate(client.createdAt)}</p>
        </div>
      </CardContent>
    </Card>
  );

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{campaign.name}</CardTitle>
            <p className="text-sm text-gray-600">{campaign.client.name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-600">{formatCurrency(Number(campaign.totalBudget))}</p>
            <p className="text-xs text-gray-500">総予算</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {campaign.purpose && (
          <div className="mb-3">
            <p className="text-xs text-gray-500">目的</p>
            <p className="text-sm">{campaign.purpose}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">開始日</p>
            <p className="font-medium">{formatDate(campaign.startDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">終了日</p>
            <p className="font-medium">{formatDate(campaign.endDate)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 認証状態チェック
  if (authLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">認証情報を確認中...</div>
        </div>
      </ProtectedLayout>
    );
  }

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  // エラー処理
  if (error) {
    return (
      <ProtectedLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">データテーブル</h1>
            <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              再試行
            </Button>
          </div>
          
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                データの取得に失敗しました
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-red-700">
                エラー詳細: {error.message}
              </div>
              <div className="pt-2">
                <Button onClick={handleRetry} variant="outline" size="sm">
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

  // ローディング状態
  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <div className="text-lg">データを読み込み中...</div>
            <div className="text-sm text-gray-600">
              大量のデータを処理しています。しばらくお待ちください。
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // データが空の場合の処理
  const hasNoData = !data || (
    data.statistics.recordCounts.budgets === 0 &&
    data.statistics.recordCounts.results === 0 &&
    data.statistics.recordCounts.clients === 0 &&
    data.statistics.recordCounts.campaigns === 0
  );

  if (hasNoData) {
    return (
      <ProtectedLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">データテーブル</h1>
            <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              更新
            </Button>
          </div>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Info className="h-5 w-5" />
                データが見つかりません
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-blue-700">
                現在、表示するデータがありません。以下の手順でデータを追加してください：
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/clients')} className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  クライアント管理
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/campaigns')} className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  案件管理
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/budgets')} className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  予算管理
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/results')} className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  実績管理
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">データテーブル</h1>
            {data?.statistics && (
              <div className="mt-2 grid grid-cols-2 lg:flex lg:gap-6 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  予算: {formatCurrency(data.statistics.totalBudget)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  支出: {formatCurrency(data.statistics.totalSpend)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  結果: {formatCurrency(data.statistics.totalResults)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  効率性: {(data.statistics.efficiency * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRetry}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              更新
            </Button>
            <Button
              onClick={() => {
                const currentData = activeTab === 'results' ? filteredResults :
                                  activeTab === 'clients' ? filteredClients : filteredCampaigns;
                exportToCSV(currentData, activeTab);
              }}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              CSV出力
            </Button>
          </div>
        </div>

        {/* フィルタエリア */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              フィルタ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">検索</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="クライアント名・案件名で検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="department">事業部</Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    {(data?.filterOptions.departments || [])
                      .filter(department => department && department.trim())
                      .map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">年</Label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="month">月</Label>
                <Select value={monthFilter} onValueChange={setMonthFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="全て" />
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

              {(activeTab === 'campaigns' || activeTab === 'budgets' || activeTab === 'results') && (
                <div>
                  <Label htmlFor="client">クライアント</Label>
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="全て" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全て</SelectItem>
                      {(data?.filterOptions.clients || [])
                        .filter(client => client?.id && client?.name?.trim())
                        .map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Button variant="outline" onClick={resetFilters}>
                フィルタをリセット
              </Button>
              
              {/* 表示切替 */}
              <div className="flex items-center gap-2">
                <Label className="text-sm">表示:</Label>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="rounded-r-none"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'card' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('card')}
                    className="rounded-l-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* データテーブル */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  予算・実績 ({data?.statistics.recordCounts.results || 0})
                </TabsTrigger>
                <TabsTrigger value="clients" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  クライアント ({data?.statistics.recordCounts.clients || 0})
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  案件 ({data?.statistics.recordCounts.campaigns || 0})
                </TabsTrigger>
              </TabsList>

              {/* 予算・実績テーブル */}
              <TabsContent value="results" className="p-6">
                {filteredResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div>予算・実績データがありません</div>
                    <Button variant="outline" size="sm" onClick={() => router.push('/results')} className="mt-2">
                      予算・実績を入力する
                    </Button>
                  </div>
                ) : (
                  <>
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredResults.map((result) => (
                          <ResultCard key={result.id} result={result} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('date')}
                              >
                                <div className="flex items-center gap-1">
                                  年月
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('client')}
                              >
                                <div className="flex items-center gap-1">
                                  クライアント
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('campaign')}
                              >
                                <div className="flex items-center gap-1">
                                  案件名
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>プラットフォーム</TableHead>
                              <TableHead>運用タイプ</TableHead>
                              <TableHead 
                                className="text-right cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('spend')}
                              >
                                <div className="flex items-center gap-1 justify-end">
                                  予算
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead 
                                className="text-right cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('result')}
                              >
                                <div className="flex items-center gap-1 justify-end">
                                  実績
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead className="w-20">
                                <div className="flex items-center gap-1">
                                  編集
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addNewRow('result')}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredResults.map((result) => (
                              <TableRow key={result.id}>
                                <TableCell>{formatYearMonth(result.year, result.month)}</TableCell>
                                <TableCell className="font-medium">{result.campaign.client.name}</TableCell>
                                <TableCell>{result.campaign.name}</TableCell>
                                <TableCell>
                                  <EditableCell
                                    type="result"
                                    id={result.id}
                                    field="platform"
                                    value={result.platform}
                                    displayValue={result.platform}
                                  />
                                </TableCell>
                                <TableCell>
                                  <EditableCell
                                    type="result"
                                    id={result.id}
                                    field="operationType"
                                    value={result.operationType}
                                    displayValue={result.operationType}
                                  />
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  <EditableCell
                                    type="result"
                                    id={result.id}
                                    field="actualSpend"
                                    value={result.actualSpend}
                                    displayValue={formatCurrency(Number(result.actualSpend))}
                                    isNumeric={true}
                                  />
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  <EditableCell
                                    type="result"
                                    id={result.id}
                                    field="actualResult"
                                    value={result.actualResult}
                                    displayValue={formatNumber(Number(result.actualResult))}
                                    isNumeric={true}
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => startEditing('result', result.id, 'edit', '')}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <div className="mt-4 text-sm text-gray-600">
                      表示件数: {filteredResults.length}件
                    </div>
                  </>
                )}
              </TabsContent>

              {/* クライアントテーブル */}
              <TabsContent value="clients" className="p-6">
                {filteredClients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div>クライアントデータがありません</div>
                    <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/clients')} className="mt-2">
                      クライアントを作成する
                    </Button>
                  </div>
                ) : (
                  <>
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredClients.map((client) => (
                          <ClientCard key={client.id} client={client} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('client')}
                              >
                                <div className="flex items-center gap-1">
                                  クライアント名
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>担当者</TableHead>
                              <TableHead>事業部</TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('priority')}
                              >
                                <div className="flex items-center gap-1">
                                  優先度
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>案件数</TableHead>
                              <TableHead>作成日</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredClients.map((client) => (
                              <TableRow key={client.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleClientClick(client.id)}>
                                <TableCell className="font-medium text-blue-600 hover:underline">{client.name}</TableCell>
                                <TableCell>{client.manager?.name || '未設定'}</TableCell>
                                <TableCell>{client.businessDivision || '未設定'}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={client.priority === 'high' ? 'destructive' : client.priority === 'medium' ? 'default' : 'secondary'}
                                  >
                                    {client.priority === 'high' ? '高' : client.priority === 'medium' ? '中' : '低'}
                                  </Badge>
                                </TableCell>
                                <TableCell>{client.campaigns?.length || 0}件</TableCell>
                                <TableCell>{formatDate(client.createdAt)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <div className="mt-4 text-sm text-gray-600">
                      表示件数: {filteredClients.length}件
                    </div>
                  </>
                )}
              </TabsContent>

              {/* 案件テーブル */}
              <TabsContent value="campaigns" className="p-6">
                {filteredCampaigns.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div>案件データがありません</div>
                    <Button variant="outline" size="sm" onClick={() => handlePageNavigation('/campaigns')} className="mt-2">
                      案件を作成する
                    </Button>
                  </div>
                ) : (
                  <>
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCampaigns.map((campaign) => (
                          <CampaignCard key={campaign.id} campaign={campaign} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('campaign')}
                              >
                                <div className="flex items-center gap-1">
                                  案件名
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('client')}
                              >
                                <div className="flex items-center gap-1">
                                  クライアント
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>目的</TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('startDate')}
                              >
                                <div className="flex items-center gap-1">
                                  開始日
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>終了日</TableHead>
                              <TableHead 
                                className="cursor-pointer hover:bg-gray-50 text-right"
                                onClick={() => handleSort('amount')}
                              >
                                <div className="flex items-center gap-1 justify-end">
                                  総予算
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredCampaigns.map((campaign) => (
                              <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{campaign.client.name}</TableCell>
                                <TableCell>{campaign.purpose || '-'}</TableCell>
                                <TableCell>{formatDate(campaign.startDate)}</TableCell>
                                <TableCell>{formatDate(campaign.endDate)}</TableCell>
                                <TableCell className="text-right font-medium">
                                  {formatCurrency(Number(campaign.totalBudget))}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <div className="mt-4 text-sm text-gray-600">
                      表示件数: {filteredCampaigns.length}件
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 