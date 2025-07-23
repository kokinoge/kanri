"use client";

import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import AppLayout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { hasRequiredRole } from "@/lib/permissions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";

const clientSchema = z.object({
  name: z.string().min(1, "クライアント名は必須です"),
  managerId: z.string().optional(),
  priority: z.number().min(1).max(10),
  department: z.string().optional(),
  salesDepartment: z.string().optional(),
  agency: z.string().optional(),
  salesChannel: z.string().optional(),
});

type ClientValues = z.infer<typeof clientSchema>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, status: sessionStatus } = useSession();
  const { data: client, error, mutate } = useSWR(isNew ? null : `/api/clients/${id}`, fetcher);
  
  // セッション状態とユーザー権限に基づいてSWRのキーを動的に生成
  const assignableUsersKey = (() => {
    if (sessionStatus === "loading") return null;
    if (sessionStatus === "unauthenticated") return null;
    if (!session?.user) return null;
    if (!hasRequiredRole(session as any, "manager")) return null;
    return "/api/users/assignable";
  })();

  const { data: assignableUsers, error: usersError, isLoading: usersLoading } = useSWR(
    assignableUsersKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      retryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      onError: (error) => {
        console.error('[CLIENT_DETAIL] ユーザー取得エラー:', error);
      },
    }
  );

  // 事業部マスターデータを取得
  const { data: departments, error: departmentsError, isLoading: departmentsLoading } = useSWR(
    "/api/masters?category=department",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onError: (error) => {
        console.error('[CLIENT_DETAIL] 事業部データ取得エラー:', error);
      },
    }
  );

  // 営業部マスターデータを取得
  const { data: salesDepartments, error: salesDepartmentsError, isLoading: salesDepartmentsLoading } = useSWR(
    "/api/masters?category=salesDepartment",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onError: (error) => {
        console.error('[CLIENT_DETAIL] 営業部データ取得エラー:', error);
      },
    }
  );

  // 代理店マスターデータを取得
  const { data: agencies, error: agenciesError, isLoading: agenciesLoading } = useSWR(
    "/api/masters?category=agency",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onError: (error) => {
        console.error('[CLIENT_DETAIL] 代理店データ取得エラー:', error);
      },
    }
  );

  // 営業チャネルマスターデータを取得
  const { data: salesChannels, error: salesChannelsError, isLoading: salesChannelsLoading } = useSWR(
    "/api/masters?category=salesChannel",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onError: (error) => {
        console.error('[CLIENT_DETAIL] 営業チャネルデータ取得エラー:', error);
      },
    }
  );
  
  const [isEditing, setIsEditing] = useState(isNew);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      managerId: "unassigned",
      priority: 1,
      department: "",
      salesDepartment: "",
      agency: "",
      salesChannel: "",
    },
    mode: "onChange", // リアルタイムバリデーション
  });

  // SWRデータの安全性確保
  const safeAssignableUsers = useMemo(() => {
    try {
      if (!assignableUsers || !Array.isArray(assignableUsers)) {
        console.warn("[CLIENT_FORM] assignableUsers is not an array:", assignableUsers);
        return [];
      }
      return assignableUsers.filter(user => user && user.id && user.name);
    } catch (error) {
      console.error("[CLIENT_FORM] assignableUsers processing error:", error);
      return [];
    }
  }, [assignableUsers]);

  const safeDepartments = useMemo(() => {
    try {
      if (!departments || !Array.isArray(departments)) {
        console.warn("[CLIENT_FORM] departments is not an array:", departments);
        return [];
      }
      return departments.filter(dept => dept && dept.id && dept.value);
    } catch (error) {
      console.error("[CLIENT_FORM] departments processing error:", error);
      return [];
    }
  }, [departments]);

  const safeSalesDepartments = useMemo(() => {
    try {
      if (!salesDepartments || !Array.isArray(salesDepartments)) {
        console.warn("[CLIENT_FORM] salesDepartments is not an array:", salesDepartments);
        return [];
      }
      return salesDepartments.filter(dept => dept && dept.id && dept.value);
    } catch (error) {
      console.error("[CLIENT_FORM] salesDepartments processing error:", error);
      return [];
    }
  }, [salesDepartments]);

  const safeAgencies = useMemo(() => {
    try {
      if (!agencies || !Array.isArray(agencies)) {
        console.warn("[CLIENT_FORM] agencies is not an array:", agencies);
        return [];
      }
      return agencies.filter(agency => agency && agency.id && agency.value);
    } catch (error) {
      console.error("[CLIENT_FORM] agencies processing error:", error);
      return [];
    }
  }, [agencies]);

  const safeSalesChannels = useMemo(() => {
    try {
      if (!salesChannels || !Array.isArray(salesChannels)) {
        console.warn("[CLIENT_FORM] salesChannels is not an array:", salesChannels);
        return [];
      }
      return salesChannels.filter(channel => channel && channel.id && channel.value);
    } catch (error) {
      console.error("[CLIENT_FORM] salesChannels processing error:", error);
      return [];
    }
  }, [salesChannels]);

  // データ読み込み状態の統合管理
  const isDataReady = useMemo(() => {
    // 新規作成時は各マスターデータが必要
    if (isNew) {
      return !departmentsLoading && departments !== undefined &&
             !salesDepartmentsLoading && salesDepartments !== undefined &&
             !agenciesLoading && agencies !== undefined &&
             !salesChannelsLoading && salesChannels !== undefined;
    }
    // 既存編集時はクライアントデータと各マスターデータが必要
    return !departmentsLoading && departments !== undefined &&
           !salesDepartmentsLoading && salesDepartments !== undefined &&
           !agenciesLoading && agencies !== undefined &&
           !salesChannelsLoading && salesChannels !== undefined &&
           client !== undefined;
  }, [isNew, departmentsLoading, departments, salesDepartmentsLoading, salesDepartments,
      agenciesLoading, agencies, salesChannelsLoading, salesChannels, client]);

  const isUsersDataReady = useMemo(() => {
    // セッション状態に応じた判定
    if (sessionStatus === "loading") return false;
    if (sessionStatus === "unauthenticated") return true; // 認証不要
    if (!session?.user) return false;
    if (!hasRequiredRole(session as any, "manager")) return true; // 権限なしは即座に判定可能
    
    // マネージャー権限ありの場合のみユーザーデータが必要
    return !usersLoading && assignableUsers !== undefined;
  }, [sessionStatus, session, usersLoading, assignableUsers]);

  const isFullyReady = useMemo(() => {
    return isMounted && isDataReady && isUsersDataReady;
  }, [isMounted, isDataReady, isUsersDataReady]);

  // フォーム初期化の強化
  useEffect(() => {
    if (client && !isNew) {
      // 既存クライアント編集時
      const resetData = {
        name: client.name || "",
        managerId: client.managerId || "unassigned",
        priority: client.priority || 1,
        department: client.department || "",
        salesDepartment: client.salesDepartment || "",
        agency: client.agency || "",
        salesChannel: client.salesChannel || "",
      };
      console.log("[CLIENT_FORM] 既存クライアントの初期化:", resetData);
      reset(resetData);
    } else if (isNew) {
      // 新規作成時も明示的にリセット
      const newData = {
        name: "",
        managerId: "unassigned",
        priority: 1,
        department: "",
        salesDepartment: "",
        agency: "",
        salesChannel: "",
      };
      console.log("[CLIENT_FORM] 新規作成の初期化:", newData);
      reset(newData);
    }
  }, [client, reset, isNew, isMounted]);

  // 開発環境でのデバッグログ
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("[CLIENT_FORM] Component State:", {
        isNew,
        isMounted,
        sessionStatus,
        clientExists: !!client,
        usersLoading,
        usersError: !!usersError,
        departmentsLoading,
        departmentsError: !!departmentsError,
        salesDepartmentsLoading,
        salesDepartmentsError: !!salesDepartmentsError,
        agenciesLoading,
        agenciesError: !!agenciesError,
        salesChannelsLoading,
        salesChannelsError: !!salesChannelsError,
        safeAssignableUsersCount: safeAssignableUsers.length,
        safeDepartmentsCount: safeDepartments.length,
        safeSalesDepartmentsCount: safeSalesDepartments.length,
        safeAgenciesCount: safeAgencies.length,
        safeSalesChannelsCount: safeSalesChannels.length,
        isDataReady,
        isUsersDataReady,
        isFullyReady,
      });
    }
  }, [isNew, isMounted, sessionStatus, client, usersLoading, usersError, departmentsLoading, departmentsError,
      salesDepartmentsLoading, salesDepartmentsError, agenciesLoading, agenciesError,
      salesChannelsLoading, salesChannelsError, safeAssignableUsers.length, safeDepartments.length,
      safeSalesDepartments.length, safeAgencies.length, safeSalesChannels.length,
      isDataReady, isUsersDataReady, isFullyReady]);

  // エラーバウンダリー：予期しないエラーをキャッチ
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("[CLIENT_FORM] Global Error:", error);
      if (error.message?.includes("SelectItem")) {
        console.error("[CLIENT_FORM] SelectItem related error detected, reloading...");
        window.location.reload();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("[CLIENT_FORM] Unhandled Promise Rejection:", event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (process.env.NODE_ENV === 'development') {
      console.log("[CLIENT_FORM] マウント完了");
    }
  }, []);

  const onSubmit = async (data: ClientValues) => {
    const url = isNew ? "/api/clients" : `/api/clients/${id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      console.log("[CLIENT_FORM] 送信データ（Raw）:", data);

      // バリデーション強化
      if (!data.name || data.name.trim() === "") {
        console.error("[CLIENT_FORM] クライアント名が空です");
        throw new Error("クライアント名を入力してください");
      }

      if (data.priority && (data.priority < 1 || data.priority > 10)) {
        console.error("[CLIENT_FORM] 優先度が範囲外です:", data.priority);
        throw new Error("優先度は1〜10の間で設定してください");
      }

      // データクリーニング強化
      const submitData = {
        ...data,
        name: data.name.trim(),
        managerId: (data.managerId === "unassigned" || data.managerId === "" || data.managerId === null || data.managerId === undefined) ? null : data.managerId,
        department: (data.department === "" || data.department === null || data.department === undefined) ? null : data.department,
        salesDepartment: (data.salesDepartment === "" || data.salesDepartment === null || data.salesDepartment === undefined) ? null : data.salesDepartment,
        agency: (data.agency === "" || data.agency === null || data.agency === undefined) ? null : data.agency,
        salesChannel: (data.salesChannel === "" || data.salesChannel === null || data.salesChannel === undefined) ? null : data.salesChannel,
        priority: Number(data.priority) || 1,
      };

      console.log("[CLIENT_FORM] 送信データ（Clean）:", submitData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("[CLIENT_FORM] サーバーエラー:", response.status, errorData);
        throw new Error(`保存に失敗しました: ${response.status} - ${errorData}`);
      }
      
      console.log("[CLIENT_FORM] 保存成功");
      mutate();
      if(isNew) {
        const newClient = await response.json();
        console.log("[CLIENT_FORM] 新規作成完了、リダイレクト:", newClient.id);
        router.push(`/clients/${newClient.id}`);
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("[CLIENT_FORM] 送信エラー:", error);
      alert(`エラー: ${error instanceof Error ? error.message : '不明なエラーが発生しました'}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("このクライアントを本当に削除しますか？関連する案件がない場合のみ削除できます。")) {
      try {
        const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        if(!response.ok) {
            const body = await response.json();
            throw new Error(body.message || "削除に失敗しました。");
        }
        router.push("/clients");
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  const formatMonth = (year: number, month: number) => {
    return `${year}/${month.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      'admin': '管理者',
      'manager': 'マネージャー',
      'member': 'メンバー'
    };
    return roleMap[role] || role;
  };

  // 担当者名を表示用に取得する関数
  const getManagerName = (client: any) => {
    if (!client || !client.manager) return '未設定';
    return client.manager.name || client.manager.email;
  };

  if (!isNew && error) return <AppLayout><div>読み込みに失敗しました</div></AppLayout>;
  if (!isNew && !client) return <AppLayout><div>読み込み中...</div></AppLayout>;
  
  // クライアントサイドハイドレーション完了まで待機
  if (!isMounted) {
    return <AppLayout><div>初期化中...</div></AppLayout>;
  }
  
  // セッション読み込み中の処理
  if (sessionStatus === "loading") {
    return <AppLayout><div>認証状態を確認中...</div></AppLayout>;
  }
  
  // 未認証の場合
  if (sessionStatus === "unauthenticated") {
    return <AppLayout><div>ログインが必要です</div></AppLayout>;
  }

  // データ準備完了まで待機（SelectItemエラー防止）
  if (!isFullyReady) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">{isNew ? "新規クライアント作成" : "クライアント編集"}</h1>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">データを読み込み中...</p>
              <div className="mt-2 text-sm text-gray-500">
                {!isDataReady && <div>• 基本データ読み込み中</div>}
                {!isUsersDataReady && <div>• ユーザー情報読み込み中</div>}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // 権限チェック
  const canEdit = hasRequiredRole(session as any, "manager");
  const canDelete = hasRequiredRole(session as any, "admin");

  return (
    <AppLayout>
      {isEditing ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">{isNew ? "新規クライアント作成" : "クライアント編集"}</h1>
          
          {/* エラーバウンダリーとしてのtry-catch表示 */}
          {(usersError || departmentsError || salesDepartmentsError || agenciesError || salesChannelsError) && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800">データ読み込みエラー</h3>
              <ul className="mt-2 text-sm text-yellow-700">
                {usersError && <li>• ユーザー情報: {usersError.message || '取得に失敗しました'}</li>}
                {departmentsError && <li>• 事業部情報: {departmentsError.message || '取得に失敗しました'}</li>}
                {salesDepartmentsError && <li>• 営業部情報: {salesDepartmentsError.message || '取得に失敗しました'}</li>}
                {agenciesError && <li>• 代理店情報: {agenciesError.message || '取得に失敗しました'}</li>}
                {salesChannelsError && <li>• 営業チャネル情報: {salesChannelsError.message || '取得に失敗しました'}</li>}
              </ul>
              <p className="mt-2 text-xs text-yellow-600">
                エラーが発生していますが、フォームは使用できます。一部の選択肢が表示されない場合があります。
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">クライアント名</Label>
              <Input {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="managerId">担当者</Label>
              <Controller
                name="managerId"
                control={control}
                render={({ field }) => {
                  // 値の安全性チェック
                  const safeValue = (() => {
                    if (!field.value || field.value === null || field.value === undefined || field.value === "") {
                      return "unassigned";
                    }
                    return field.value;
                  })();

                  return (
                    <Select 
                      value={safeValue}
                      onValueChange={(value) => {
                        // 無効な値（disabled状態のもの）を除外
                        if (value === "loading" || value === "error" || value === "no_permission" || value === "no_users") {
                          console.warn("[CLIENT_FORM] 無効な担当者値をブロック:", value);
                          return;
                        }
                        console.log("[CLIENT_FORM] 担当者変更:", value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="担当者を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {(() => {
                          // ユーザーデータの表示ロジック
                          if (usersLoading) {
                            return <SelectItem value="loading" disabled>読み込み中...</SelectItem>;
                          }
                          
                          if (usersError) {
                            return <SelectItem value="error" disabled>エラー: ユーザー一覧を取得できません</SelectItem>;
                          }
                          
                          if (!hasRequiredRole(session as any, "manager")) {
                            return <SelectItem value="no_permission" disabled>権限不足: 担当者設定にはマネージャー権限が必要です</SelectItem>;
                          }
                          
                          if (safeAssignableUsers.length === 0) {
                            return <SelectItem value="no_users" disabled>担当者が見つかりません</SelectItem>;
                          }
                          
                          // 正常なユーザーリスト
                          return safeAssignableUsers.map((user: any) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({getRoleDisplayName(user.role)})
                            </SelectItem>
                          ));
                        })()}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="department">事業部</Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => {
                  // 値の安全性チェック
                  const safeValue = (() => {
                    if (!field.value || field.value === null || field.value === undefined || field.value === "") {
                      return "unassigned";
                    }
                    return field.value;
                  })();

                  return (
                    <Select 
                      value={safeValue}
                      onValueChange={(value) => {
                        // 無効な値（disabled状態のもの）を除外
                        if (value === "loading" || value === "error" || value === "no_data") {
                          console.warn("[CLIENT_FORM] 無効な事業部値をブロック:", value);
                          return;
                        }
                        // "unassigned"の場合は空文字列に変換してフォームに設定
                        const finalValue = value === "unassigned" ? "" : value;
                        console.log("[CLIENT_FORM] 事業部変更:", value, "->", finalValue);
                        field.onChange(finalValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="事業部を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {(() => {
                          // 事業部データの表示ロジック
                          if (departmentsLoading) {
                            return <SelectItem value="loading" disabled>読み込み中...</SelectItem>;
                          }
                          
                          if (departmentsError) {
                            return <SelectItem value="error" disabled>エラー: 事業部一覧を取得できません</SelectItem>;
                          }
                          
                          if (safeDepartments.length === 0) {
                            return <SelectItem value="no_data" disabled>事業部が見つかりません</SelectItem>;
                          }
                          
                          // 正常な事業部リスト
                          return safeDepartments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.value}>
                              {dept.value}
                            </SelectItem>
                          ));
                        })()}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="salesDepartment">営業部</Label>
              <Controller
                name="salesDepartment"
                control={control}
                render={({ field }) => {
                  // 値の安全性チェック
                  const safeValue = (() => {
                    if (!field.value || field.value === null || field.value === undefined || field.value === "") {
                      return "unassigned";
                    }
                    return field.value;
                  })();

                  return (
                    <Select 
                      value={safeValue}
                      onValueChange={(value) => {
                        // 無効な値（disabled状態のもの）を除外
                        if (value === "loading" || value === "error" || value === "no_data") {
                          console.warn("[CLIENT_FORM] 無効な営業部値をブロック:", value);
                          return;
                        }
                        // "unassigned"の場合は空文字列に変換してフォームに設定
                        const finalValue = value === "unassigned" ? "" : value;
                        console.log("[CLIENT_FORM] 営業部変更:", value, "->", finalValue);
                        field.onChange(finalValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="営業部を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {(() => {
                          // 営業部データの表示ロジック
                          if (salesDepartmentsLoading) {
                            return <SelectItem value="loading" disabled>読み込み中...</SelectItem>;
                          }
                          
                          if (salesDepartmentsError) {
                            return <SelectItem value="error" disabled>エラー: 営業部一覧を取得できません</SelectItem>;
                          }
                          
                          if (safeSalesDepartments.length === 0) {
                            return <SelectItem value="no_data" disabled>営業部が見つかりません</SelectItem>;
                          }
                          
                          // 正常な営業部リスト
                          return safeSalesDepartments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.value}>
                              {dept.value}
                            </SelectItem>
                          ));
                        })()}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="agency">代理店</Label>
              <Controller
                name="agency"
                control={control}
                render={({ field }) => {
                  // 値の安全性チェック
                  const safeValue = (() => {
                    if (!field.value || field.value === null || field.value === undefined || field.value === "") {
                      return "unassigned";
                    }
                    return field.value;
                  })();

                  return (
                    <Select 
                      value={safeValue}
                      onValueChange={(value) => {
                        // 無効な値（disabled状態のもの）を除外
                        if (value === "loading" || value === "error" || value === "no_data") {
                          console.warn("[CLIENT_FORM] 無効な代理店値をブロック:", value);
                          return;
                        }
                        // "unassigned"の場合は空文字列に変換してフォームに設定
                        const finalValue = value === "unassigned" ? "" : value;
                        console.log("[CLIENT_FORM] 代理店変更:", value, "->", finalValue);
                        field.onChange(finalValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="代理店を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {(() => {
                          // 代理店データの表示ロジック
                          if (agenciesLoading) {
                            return <SelectItem value="loading" disabled>読み込み中...</SelectItem>;
                          }
                          
                          if (agenciesError) {
                            return <SelectItem value="error" disabled>エラー: 代理店一覧を取得できません</SelectItem>;
                          }
                          
                          if (safeAgencies.length === 0) {
                            return <SelectItem value="no_data" disabled>代理店が見つかりません</SelectItem>;
                          }
                          
                          // 正常な代理店リスト
                          return safeAgencies.map((agency: any) => (
                            <SelectItem key={agency.id} value={agency.value}>
                              {agency.value}
                            </SelectItem>
                          ));
                        })()}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="salesChannel">営業チャネル</Label>
              <Controller
                name="salesChannel"
                control={control}
                render={({ field }) => {
                  // 値の安全性チェック
                  const safeValue = (() => {
                    if (!field.value || field.value === null || field.value === undefined || field.value === "") {
                      return "unassigned";
                    }
                    return field.value;
                  })();

                  return (
                    <Select 
                      value={safeValue}
                      onValueChange={(value) => {
                        // 無効な値（disabled状態のもの）を除外
                        if (value === "loading" || value === "error" || value === "no_data") {
                          console.warn("[CLIENT_FORM] 無効な営業チャネル値をブロック:", value);
                          return;
                        }
                        // "unassigned"の場合は空文字列に変換してフォームに設定
                        const finalValue = value === "unassigned" ? "" : value;
                        console.log("[CLIENT_FORM] 営業チャネル変更:", value, "->", finalValue);
                        field.onChange(finalValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="営業チャネルを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {(() => {
                          // 営業チャネルデータの表示ロジック
                          if (salesChannelsLoading) {
                            return <SelectItem value="loading" disabled>読み込み中...</SelectItem>;
                          }
                          
                          if (salesChannelsError) {
                            return <SelectItem value="error" disabled>エラー: 営業チャネル一覧を取得できません</SelectItem>;
                          }
                          
                          if (safeSalesChannels.length === 0) {
                            return <SelectItem value="no_data" disabled>営業チャネルが見つかりません</SelectItem>;
                          }
                          
                          // 正常な営業チャネルリスト
                          return safeSalesChannels.map((channel: any) => (
                            <SelectItem key={channel.id} value={channel.value}>
                              {channel.value}
                            </SelectItem>
                          ));
                        })()}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="priority">優先度 (1-10)</Label>
              <Input type="number" min="1" max="10" {...register("priority", { valueAsNumber: true })} />
              {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
              <Button type="button" variant="outline" onClick={() => isNew ? router.back() : setIsEditing(false)}>
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ヘッダー部分 */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <p className="text-gray-600 mt-1">担当者: {getManagerName(client)}</p>
              <p className="text-gray-600">事業部: {client.businessDivision || '未設定'}</p>
              <div className="mt-2 space-y-1">
                <p className="text-gray-600">営業部: {client.salesDepartment || '未設定'}</p>
                <p className="text-gray-600">代理店: {client.agency || '未設定'}</p>
                <p className="text-gray-600">営業チャネル: {client.salesChannel || '未設定'}</p>
              </div>
              <div className="mt-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    client.priority > 5 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  優先度: {client.priority}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {canEdit && <Button onClick={() => setIsEditing(true)}>編集</Button>}
              {canDelete && <Button variant="destructive" onClick={handleDelete}>削除</Button>}
            </div>
          </div>

          {/* 統計概要 */}
          {client.stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">総予算</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(client.stats.totalBudget)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">総支出</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(client.stats.totalSpend)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">総結果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(client.stats.totalResults)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">効率性</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(client.stats.efficiency * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">結果/支出 比率</p>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">概要</TabsTrigger>
              <TabsTrigger value="campaigns">案件一覧</TabsTrigger>
              <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
              <TabsTrigger value="analytics">分析</TabsTrigger>
            </TabsList>

            {/* 概要タブ */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 月別トレンド */}
                {client.stats?.monthlyPerformance && (
                  <Card>
                    <CardHeader>
                      <CardTitle>月別パフォーマンス（過去12ヶ月）</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={client.stats.monthlyPerformance.map((item: any) => ({
                          ...item,
                          period: formatMonth(item.year, item.month),
                        }))}>
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
                )}

                {/* プラットフォーム別分析 */}
                {client.stats?.platformStats && client.stats.platformStats.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>プラットフォーム別パフォーマンス</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={client.stats.platformStats}>
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
                )}
              </div>
            </TabsContent>

            {/* 案件一覧タブ */}
            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>案件一覧 ({client.campaigns?.length || 0}件)</CardTitle>
                </CardHeader>
                <CardContent>
                  {client.campaigns && client.campaigns.length > 0 ? (
                    <div className="space-y-4">
                      {client.campaigns.map((campaign: any) => {
                        const campaignBudget = campaign.budgets.reduce((sum: number, budget: any) => sum + Number(budget.amount), 0);
                        const campaignSpend = campaign.results.reduce((sum: number, result: any) => sum + Number(result.actualSpend), 0);
                        const campaignResult = campaign.results.reduce((sum: number, result: any) => sum + Number(result.actualResult), 0);
                        
                        return (
                          <Card key={campaign.id} className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                                <p className="text-gray-600">{campaign.purpose}</p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">
                                  予算: {formatCurrency(campaignBudget)}
                                </div>
                                <div className="text-sm text-red-600">
                                  支出: {formatCurrency(campaignSpend)}
                                </div>
                                <div className="text-sm text-green-600">
                                  結果: {formatCurrency(campaignResult)}
                                </div>
                              </div>
                            </div>
                            
                            {/* チーム情報 */}
                            {campaign.campaignTeams && campaign.campaignTeams.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">担当チーム</h4>
                                <div className="flex flex-wrap gap-2">
                                  {campaign.campaignTeams.map((ct: any) => (
                                    <Badge
                                      key={ct.id}
                                      variant={ct.isLead ? "default" : "secondary"}
                                      style={ct.isLead ? { backgroundColor: ct.team.color, color: '#fff' } : {}}
                                    >
                                      {ct.team.name}
                                      {ct.isLead && ' (主担当)'}
                                      {ct.role && ` - ${ct.role}`}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* KPI情報 */}
                            {campaign.campaignKpis && campaign.campaignKpis.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">KPI目標</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {campaign.campaignKpis.slice(0, 6).map((kpi: any) => (
                                    <div key={kpi.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                      <span className="text-sm font-medium">{kpi.kpiType}</span>
                                      <div className="text-right">
                                        <div className="text-sm font-semibold">
                                          {formatNumber(kpi.targetValue)} {kpi.unit}
                                        </div>
                                        {kpi.actualValue && (
                                          <div className="text-xs text-gray-500">
                                            実績: {formatNumber(kpi.actualValue)} {kpi.unit}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* 予算配分 */}
                            {campaign.budgets && campaign.budgets.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">予算配分</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>プラットフォーム</TableHead>
                                      <TableHead>運用タイプ</TableHead>
                                      <TableHead className="text-right">予算</TableHead>
                                      <TableHead>担当チーム</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {campaign.budgets.map((budget: any) => (
                                      <TableRow key={budget.id}>
                                        <TableCell>{budget.platform}</TableCell>
                                        <TableCell>{budget.operationType}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(budget.amount)}</TableCell>
                                        <TableCell>
                                          {budget.budgetTeams && budget.budgetTeams.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                              {budget.budgetTeams.map((bt: any) => (
                                                <Badge key={bt.id} variant="outline" className="text-xs">
                                                  {bt.team.name} ({bt.allocation}%)
                                                </Badge>
                                              ))}
                                            </div>
                                          ) : (
                                            <span className="text-gray-500 text-sm">未設定</span>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div>このクライアントにはまだ案件がありません</div>
                      <Button variant="outline" className="mt-4" onClick={() => router.push('/campaigns/new')}>
                        新規案件を作成
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* パフォーマンスタブ */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* プラットフォーム別予算分布 */}
                {client.stats?.platformStats && client.stats.platformStats.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>プラットフォーム別予算分布</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={client.stats.platformStats}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ platform, budget, percent }: any) => 
                              `${platform} ${((percent || 0) * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="budget"
                          >
                            {client.stats.platformStats.map((_: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}

                {/* プラットフォーム別効率性 */}
                {client.stats?.platformStats && client.stats.platformStats.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>プラットフォーム別効率性</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>プラットフォーム</TableHead>
                            <TableHead className="text-right">予算</TableHead>
                            <TableHead className="text-right">支出</TableHead>
                            <TableHead className="text-right">結果</TableHead>
                            <TableHead className="text-right">効率性</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {client.stats.platformStats.map((platform: any) => (
                            <TableRow key={platform.platform}>
                              <TableCell className="font-medium">{platform.platform}</TableCell>
                              <TableCell className="text-right">{formatCurrency(platform.budget)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(platform.spend)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(platform.result)}</TableCell>
                              <TableCell className="text-right">
                                <span className={`font-semibold ${
                                  platform.efficiency > 1 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {(platform.efficiency * 100).toFixed(1)}%
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* 分析タブ */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>案件パフォーマンスランキング</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {client.campaigns && client.campaigns.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>案件名</TableHead>
                            <TableHead className="text-right">効率性</TableHead>
                            <TableHead className="text-right">ROI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {client.campaigns
                            .map((campaign: any) => {
                              const spend = campaign.results.reduce((sum: number, result: any) => sum + Number(result.actualSpend), 0);
                              const result = campaign.results.reduce((sum: number, result: any) => sum + Number(result.actualResult), 0);
                              const efficiency = spend > 0 ? result / spend : 0;
                              const roi = spend > 0 ? (result / spend - 1) * 100 : 0;
                              return { ...campaign, efficiency, roi, spend, result };
                            })
                            .sort((a: any, b: any) => b.efficiency - a.efficiency)
                            .slice(0, 5)
                            .map((campaign: any) => (
                              <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell className="text-right">
                                  <span className={`font-semibold ${
                                    campaign.efficiency > 1 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {(campaign.efficiency * 100).toFixed(1)}%
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className={`font-semibold ${
                                    campaign.roi > 0 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {campaign.roi.toFixed(1)}%
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        分析するための案件データがありません
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>予算消化率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {client.stats && (
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>総予算</span>
                          <span className="font-semibold">{formatCurrency(client.stats.totalBudget)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>支出済み</span>
                          <span className="font-semibold text-red-600">{formatCurrency(client.stats.totalSpend)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>残予算</span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(client.stats.totalBudget - client.stats.totalSpend)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ 
                              width: `${Math.min((client.stats.totalSpend / client.stats.totalBudget) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          消化率: {client.stats.totalBudget > 0 ? 
                            ((client.stats.totalSpend / client.stats.totalBudget) * 100).toFixed(1) : 0}%
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AppLayout>
  );
} 