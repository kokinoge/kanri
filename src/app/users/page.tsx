"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import ProtectedLayout from "@/components/ProtectedLayout";
import { useState, useMemo, useEffect } from "react";
import { canManageUser, hasRequiredRole, Role } from "@/lib/permissions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 20;

  // 開発環境でのセッション状態確認
  useEffect(() => {
    console.log('[USERS_PAGE] Session status:', status);
    console.log('[USERS_PAGE] Session data:', session);
    
    if (status === 'loading') {
      setIsLoading(true);
    } else if (status === 'unauthenticated') {
      console.log('[USERS_PAGE] User not authenticated, redirecting...');
      setIsLoading(false);
    } else if (status === 'authenticated') {
      console.log('[USERS_PAGE] User authenticated:', session?.user);
      setIsLoading(false);
    }
  }, [session, status]);

  // APIクエリパラメータを構築
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    if (search) params.set('search', search);
    if (roleFilter) params.set('role', roleFilter);
    if (statusFilter) params.set('isActive', statusFilter);
    return params.toString();
  }, [page, search, roleFilter, statusFilter]);

  // セッション状態に関係なくデータを取得（開発環境用）
  const shouldFetch = useMemo(() => {
    // 開発環境では認証状態に関係なくデータを取得
    if (process.env.NODE_ENV === 'development') {
      console.log('[USERS_PAGE] Development mode: fetching data regardless of session');
      return true;
    }
    // 本番環境ではセッションが必要
    return session?.user != null;
  }, [session]);

  const { data: response, error: swrError, mutate, isLoading: swrLoading } = useSWR(
    shouldFetch ? `/api/users?${queryParams}` : null, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1分間のキャッシュ
      errorRetryCount: 3,
      onError: (error) => {
        console.error('[USERS_PAGE] SWR Error:', error);
        setError('ユーザーデータの取得に失敗しました');
      },
      onSuccess: (data) => {
        console.log('[USERS_PAGE] Data fetched successfully:', data);
        setError(null);
      }
    }
  );

  const [editingUser, setEditingUser] = useState<any>(null);

  const users = response?.users || [];
  const pagination = response?.pagination;

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      
      if (!response.ok) {
        throw new Error('権限の変更に失敗しました');
      }
      
      await mutate();
    } catch (error) {
      console.error('[USERS_PAGE] Role change error:', error);
      alert('権限の変更に失敗しました');
    }
  };

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });
      
      if (!response.ok) {
        throw new Error('ステータスの変更に失敗しました');
      }
      
      await mutate();
    } catch (error) {
      console.error('[USERS_PAGE] Status change error:', error);
      alert('ステータスの変更に失敗しました');
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("本当にこのユーザーを削除しますか？")) {
      try {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        
        if (!response.ok) {
          throw new Error('ユーザーの削除に失敗しました');
        }
        
        await mutate();
      } catch (error) {
        console.error('[USERS_PAGE] Delete error:', error);
        alert('ユーザーの削除に失敗しました');
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // 検索時は最初のページに戻る
  };

  // ローディング状態の管理
  const showLoading = isLoading || swrLoading || status === 'loading';
  const showError = error || swrError;

  // エラー表示
  if (showError) {
    return (
      <ProtectedLayout requiredRole="admin">
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="text-red-600 text-lg font-semibold mb-4">
            ⚠️ データの読み込みに失敗しました
          </div>
          <div className="text-gray-600 mb-4">
            {error || '原因不明のエラーが発生しました'}
          </div>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            再試行
          </button>
        </div>
      </ProtectedLayout>
    );
  }

  // ローディング表示
  if (showLoading) {
    return (
      <ProtectedLayout requiredRole="admin">
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-gray-600">
            ユーザーデータを読み込み中...
          </div>
          <div className="text-sm text-gray-500 mt-2">
            セッション状態: {status}
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  // データが空の場合
  if (!response || !users || users.length === 0) {
    return (
      <ProtectedLayout requiredRole="admin">
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="text-gray-600 text-lg mb-4">
            📋 ユーザーが見つかりません
          </div>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            再読み込み
          </button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout requiredRole="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ユーザー管理</h1>
        <div className="text-sm text-gray-600">
          {pagination && `${pagination.totalCount}件中 ${(page - 1) * limit + 1}-${Math.min(page * limit, pagination.totalCount)}件表示`}
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4 items-end">
          <div className="flex-1">
            <input
              type="text"
              placeholder="名前またはメールアドレスで検索"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">全ての権限</option>
              <option value="admin">管理者</option>
              <option value="manager">マネージャー</option>
              <option value="member">メンバー</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">全てのステータス</option>
              <option value="true">アクティブ</option>
              <option value="false">非アクティブ</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              検索
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border rounded-md px-2 py-1"
                    disabled={!canManageUser(session as any, user.role as Role) || (user.role === 'admin' && (session?.user as any)?.role !== 'admin')}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="member">Member</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <button
                    onClick={() => handleStatusChange(user.id, !user.isActive)}
                    disabled={!canManageUser(session as any, user.role as Role)}
                    className={`px-3 py-1 rounded-full text-white text-sm ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                  >
                    {user.isActive ? '有効' : '無効'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={!canManageUser(session as any, user.role as Role)}
                    className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ページネーション */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.hasPrev}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            前へ
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    page === pageNum ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.hasNext}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      )}
    </ProtectedLayout>
  );
} 