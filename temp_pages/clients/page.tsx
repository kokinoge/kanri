"use client";

import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/providers";
import AppLayout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { hasRequiredRole } from "@/lib/permissions";

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

export default function ClientsPage() {
  const { user, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clients, error, mutate } = useSWR("/api/clients", fetcher);

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
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-8">
          <div>ログインが必要です</div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-red-600">データの読み込みに失敗しました: {error.message}</div>
      </AppLayout>
    );
  }

  if (!clients) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-8">
          <div>読み込み中...</div>
        </div>
      </AppLayout>
    );
  }

  // 検索フィルタリング
  const filteredClients = clients.filter((client: any) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.manager?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEdit = hasRequiredRole({ user } as any, "manager");
  const canDelete = hasRequiredRole({ user } as any, "admin");

  const handleDelete = async (clientId: string, clientName: string) => {
    if (window.confirm(`クライアント「${clientName}」を本当に削除しますか？`)) {
      try {
        const response = await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || '削除に失敗しました');
        }
        mutate(); // データを再取得
      } catch (error: any) {
        alert(`削除エラー: ${error.message}`);
      }
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Building2 className="mr-3" />
              クライアント管理
            </h1>
            <p className="text-gray-600 mt-1">
              登録済みクライアント: {clients.length}件
            </p>
          </div>
          {canEdit && (
            <Link href="/clients/new">
              <Button className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                新規クライアント
              </Button>
            </Link>
          )}
        </div>

        {/* 検索 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="クライアント名、担当者、部署で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* クライアント一覧 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 w-5 h-5" />
              クライアント一覧 ({filteredClients.length}件)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredClients.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>クライアント名</TableHead>
                    <TableHead>担当者</TableHead>
                    <TableHead>部署</TableHead>
                    <TableHead>優先度</TableHead>
                    <TableHead>営業チャネル</TableHead>
                    <TableHead>代理店</TableHead>
                    <TableHead className="text-right">アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client: any) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <Link 
                          href={`/clients/${client.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {client.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {client.manager?.name || '未設定'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {client.department || '未設定'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={client.priority > 5 ? "destructive" : "default"}
                        >
                          優先度 {client.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {client.salesChannel || '未設定'}
                      </TableCell>
                      <TableCell>
                        {client.agency || '未設定'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/clients/${client.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              編集
                            </Button>
                          </Link>
                          {canDelete && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(client.id, client.name)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              削除
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? '検索結果が見つかりませんでした' : 'クライアントが登録されていません'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 