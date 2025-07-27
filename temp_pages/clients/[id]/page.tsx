"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AppLayout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [isEditing, setIsEditing] = useState(isNew);
  
  // 状態管理
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      managerId: "",
      priority: 1,
      department: "",
      salesDepartment: "",
      agency: "",
      salesChannel: "",
    },
  });

  // データ取得
  useEffect(() => {
    if (isNew) return;
    
    const fetchClient = async () => {
      try {
        console.log('[CLIENT_PAGE] Fetching client:', id);
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/clients/${id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('[CLIENT_PAGE] Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('[CLIENT_PAGE] Client data:', data);
        setClient(data);
        
        // フォーム初期化
        reset({
          name: data.name || "",
          managerId: data.managerId || "",
          priority: data.priority || 1,
          department: data.department || "",
          salesDepartment: data.salesDepartment || "",
          agency: data.agency || "",
          salesChannel: data.salesChannel || "",
        });
        
      } catch (err: any) {
        console.error('[CLIENT_PAGE] Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClient();
  }, [id, isNew, reset]);

  const onSubmit = async (data: ClientValues) => {
    try {
      const url = isNew ? "/api/clients" : `/api/clients/${id}`;
      const method = isNew ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("保存に失敗しました");
      }
      
      if (isNew) {
        const newClient = await response.json();
        router.push(`/clients/${newClient.id}`);
      } else {
        // データを再取得
        const updatedClient = await response.json();
        setClient(updatedClient);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("保存エラー:", error);
      alert(`エラー: ${error instanceof Error ? error.message : '不明なエラーが発生しました'}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("このクライアントを本当に削除しますか？")) {
      try {
        const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error("削除に失敗しました");
        }
        router.push("/clients");
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  // ローディング状態
  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">クライアント情報を読み込み中...</p>
              <p className="text-xs text-gray-500 mt-2">ID: {id}</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // エラー状態
  if (error) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <p className="text-red-600">読み込みに失敗しました</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
              <div className="flex gap-2 justify-center mt-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                  再試行
                </Button>
                <Button onClick={() => router.push('/clients')}>
                  クライアント一覧に戻る
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isNew ? "新規クライアント作成" : client?.name || "クライアント詳細"}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/clients')}>
              一覧に戻る
            </Button>
            {!isNew && !isEditing && (
              <>
                <Button onClick={() => setIsEditing(true)}>編集</Button>
                <Button variant="destructive" onClick={handleDelete}>削除</Button>
              </>
            )}
          </div>
        </div>

        {/* メインコンテンツ */}
        {isEditing ? (
          /* 編集フォーム */
          <Card>
            <CardHeader>
              <CardTitle>{isNew ? "新規クライアント作成" : "クライアント情報編集"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">クライアント名 *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="クライアント名を入力"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="priority">優先度 (1-10)</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    max="10"
                    {...register("priority", { valueAsNumber: true })}
                  />
                  {errors.priority && (
                    <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="department">事業部</Label>
                  <Input
                    id="department"
                    {...register("department")}
                    placeholder="事業部名を入力"
                  />
                </div>

                <div>
                  <Label htmlFor="salesDepartment">営業部</Label>
                  <Input
                    id="salesDepartment"
                    {...register("salesDepartment")}
                    placeholder="営業部名を入力"
                  />
                </div>

                <div>
                  <Label htmlFor="agency">代理店</Label>
                  <Input
                    id="agency"
                    {...register("agency")}
                    placeholder="代理店名を入力"
                  />
                </div>

                <div>
                  <Label htmlFor="salesChannel">営業チャネル</Label>
                  <Input
                    id="salesChannel"
                    {...register("salesChannel")}
                    placeholder="営業チャネルを入力"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "保存中..." : "保存"}
                  </Button>
                  {!isNew && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      キャンセル
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* 詳細表示 */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 基本情報 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">クライアント名</Label>
                  <p className="text-lg">{client.name}</p>
                </div>
                
                <div>
                  <Label className="font-semibold">優先度</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{client.priority}</span>
                    <Badge variant={client.priority >= 8 ? "destructive" : client.priority >= 5 ? "default" : "secondary"}>
                      {client.priority >= 8 ? "高" : client.priority >= 5 ? "中" : "低"}
                    </Badge>
                  </div>
                </div>

                {client.manager && (
                  <div>
                    <Label className="font-semibold">担当者</Label>
                    <p>{client.manager.name} ({client.manager.email})</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">事業部</Label>
                    <p>{client.department || "未設定"}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">営業部</Label>
                    <p>{client.salesDepartment || "未設定"}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">代理店</Label>
                    <p>{client.agency || "未設定"}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">営業チャネル</Label>
                    <p>{client.salesChannel || "未設定"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 統計情報 */}
            <Card>
              <CardHeader>
                <CardTitle>統計情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">作成日</Label>
                  <p>{new Date(client.createdAt).toLocaleDateString('ja-JP')}</p>
                </div>
                <div>
                  <Label className="font-semibold">更新日</Label>
                  <p>{new Date(client.updatedAt).toLocaleDateString('ja-JP')}</p>
                </div>
                <div>
                  <Label className="font-semibold">案件数</Label>
                  <p className="text-2xl font-bold">{client.campaigns?.length || 0}件</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 案件一覧 */}
        {!isNew && !isEditing && client?.campaigns && client.campaigns.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>関連案件</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {client.campaigns.map((campaign: any) => (
                  <div key={campaign.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">
                      {campaign.startYear}/{campaign.startMonth} - {campaign.endYear}/{campaign.endMonth}
                    </p>
                    <p className="text-sm">
                      予算: {campaign.totalBudget?.toLocaleString()}円
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
} 