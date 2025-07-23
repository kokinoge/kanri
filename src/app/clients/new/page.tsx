"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
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
import { hasRequiredRole } from "@/lib/permissions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

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

// 認証対応fetcher関数
const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    console.error('Fetch error:', response.status, response.statusText);
    throw error;
  }
  
  return response.json();
};

export default function NewClientPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (!authLoading && user && !hasRequiredRole({ user } as any, "manager")) {
      router.push('/unauthorized');
      return;
    }
  }, [authLoading, user, router]);

  // マスターデータ取得
  const { data: departments, error: departmentsError, isLoading: departmentsLoading } = useSWR(
    "/api/masters?category=department",
    fetcher
  );

  const { data: salesDepartments, error: salesDepartmentsError, isLoading: salesDepartmentsLoading } = useSWR(
    "/api/masters?category=salesDepartment",
    fetcher
  );

  const { data: agencies, error: agenciesError, isLoading: agenciesLoading } = useSWR(
    "/api/masters?category=agency",
    fetcher
  );

  const { data: salesChannels, error: salesChannelsError, isLoading: salesChannelsLoading } = useSWR(
    "/api/masters?category=salesChannel",
    fetcher
  );

  const { data: assignableUsers, error: usersError, isLoading: usersLoading } = useSWR(
    "/api/users/assignable",
    fetcher
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      managerId: "unassigned",
      priority: 5,
      department: "",
      salesDepartment: "",
      agency: "",
      salesChannel: "",
    },
  });

  const onSubmit = async (data: ClientValues) => {
    try {
      console.log("[NEW_CLIENT] 送信データ:", data);

      const submitData = {
        ...data,
        name: data.name.trim(),
        managerId: (data.managerId === "unassigned" || !data.managerId) ? null : data.managerId,
        department: !data.department ? null : data.department,
        salesDepartment: !data.salesDepartment ? null : data.salesDepartment,
        agency: !data.agency ? null : data.agency,
        salesChannel: !data.salesChannel ? null : data.salesChannel,
        priority: Number(data.priority) || 5,
      };

      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "クライアントの作成に失敗しました");
      }

      const newClient = await response.json();
      console.log("[NEW_CLIENT] 作成成功:", newClient);
      router.push(`/clients/${newClient.id}`);
    } catch (error) {
      console.error("[NEW_CLIENT] 作成エラー:", error);
      alert(`エラー: ${error instanceof Error ? error.message : '不明なエラーが発生しました'}`);
    }
  };

  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-8">
          <div>認証状態を確認中...</div>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return null; // リダイレクト中
  }

  if (!hasRequiredRole({ user } as any, "manager")) {
    return (
      <AppLayout>
        <div className="text-center py-8">
          <div className="text-red-600">この機能にアクセスする権限がありません。</div>
          <Link href="/clients" className="text-blue-600 hover:underline mt-4 inline-block">
            クライアント一覧に戻る
          </Link>
        </div>
      </AppLayout>
    );
  }

  const isDataLoading = departmentsLoading || salesDepartmentsLoading || agenciesLoading || 
                       salesChannelsLoading || usersLoading;

  if (isDataLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-8">
          <div>データを読み込み中...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center mb-6">
          <Link href="/clients">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">新規クライアント作成</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>クライアント情報</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* クライアント名 */}
              <div>
                <Label htmlFor="name">クライアント名 *</Label>
                <Input {...register("name")} placeholder="クライアント名を入力" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* 担当者 */}
              <div>
                <Label htmlFor="managerId">担当者</Label>
                <Controller
                  name="managerId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || "unassigned"} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="担当者を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">未設定</SelectItem>
                        {assignableUsers && Array.isArray(assignableUsers) ? (
                          assignableUsers.map((user: any) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.role === 'admin' ? '管理者' : user.role === 'manager' ? 'マネージャー' : 'メンバー'})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_users" disabled>
                            {usersError ? 'ユーザーの取得に失敗しました' : 'ユーザーが見つかりません'}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* 優先度 */}
              <div>
                <Label htmlFor="priority">優先度 (1-10) *</Label>
                <Input 
                  type="number" 
                  min="1" 
                  max="10" 
                  {...register("priority", { valueAsNumber: true })} 
                  placeholder="5"
                />
                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  1: 低優先度 ← → 10: 高優先度
                </p>
              </div>

              {/* 事業部 */}
              <div>
                <Label htmlFor="department">事業部</Label>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="事業部を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {departments && Array.isArray(departments) ? (
                          departments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_data" disabled>
                            {departmentsError ? '事業部データの取得に失敗しました' : '事業部が見つかりません'}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* 営業部 */}
              <div>
                <Label htmlFor="salesDepartment">営業部</Label>
                <Controller
                  name="salesDepartment"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="営業部を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {salesDepartments && Array.isArray(salesDepartments) ? (
                          salesDepartments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_data" disabled>
                            {salesDepartmentsError ? '営業部データの取得に失敗しました' : '営業部が見つかりません'}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* 代理店 */}
              <div>
                <Label htmlFor="agency">代理店</Label>
                <Controller
                  name="agency"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="代理店を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {agencies && Array.isArray(agencies) ? (
                          agencies.map((agency: any) => (
                            <SelectItem key={agency.id} value={agency.value}>
                              {agency.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_data" disabled>
                            {agenciesError ? '代理店データの取得に失敗しました' : '代理店が見つかりません'}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* 営業チャネル */}
              <div>
                <Label htmlFor="salesChannel">営業チャネル</Label>
                <Controller
                  name="salesChannel"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="営業チャネルを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">未設定</SelectItem>
                        {salesChannels && Array.isArray(salesChannels) ? (
                          salesChannels.map((channel: any) => (
                            <SelectItem key={channel.id} value={channel.value}>
                              {channel.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_data" disabled>
                            {salesChannelsError ? '営業チャネルデータの取得に失敗しました' : '営業チャネルが見つかりません'}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* エラー表示 */}
              {(departmentsError || salesDepartmentsError || agenciesError || salesChannelsError || usersError) && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="text-sm font-medium text-yellow-800">データ読み込みエラー</h3>
                  <ul className="mt-2 text-sm text-yellow-700">
                    {departmentsError && <li>• 事業部: {departmentsError.message}</li>}
                    {salesDepartmentsError && <li>• 営業部: {salesDepartmentsError.message}</li>}
                    {agenciesError && <li>• 代理店: {agenciesError.message}</li>}
                    {salesChannelsError && <li>• 営業チャネル: {salesChannelsError.message}</li>}
                    {usersError && <li>• ユーザー: {usersError.message}</li>}
                  </ul>
                  <p className="mt-2 text-xs text-yellow-600">
                    一部のマスターデータが読み込めませんが、フォームは使用できます。
                  </p>
                </div>
              )}

              {/* ボタン */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isSubmitting} className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "作成中..." : "クライアントを作成"}
                </Button>
                <Link href="/clients">
                  <Button type="button" variant="outline">
                    キャンセル
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 