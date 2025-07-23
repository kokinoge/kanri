"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { hasRequiredRole, canManageUser } from "@/lib/permissions";
import { toast } from "sonner";

const createUserSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
  role: z.enum(["admin", "manager", "member"], {
    required_error: "権限を選択してください",
  }),
  department: z.string().optional(),
});

const editUserSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().optional(),
  role: z.enum(["admin", "manager", "member"], {
    required_error: "権限を選択してください",
  }),
  department: z.string().optional(),
});

type UserFormValues = z.infer<typeof createUserSchema>;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTPエラー: ${res.status}`);
  }
  const data = await res.json();
  
  // APIレスポンスの構造を検証
  if (!data || typeof data !== 'object') {
    throw new Error('無効なレスポンス形式');
  }
  
  return data;
};

export default function SettingsUsersPage() {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // APIレスポンス構造に合わせてデータを取得
  const users = data?.users || [];
  const pagination = data?.pagination || null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(editingUser ? editUserSchema : createUserSchema),
  });

  const resetForm = () => {
    reset();
    setEditingUser(null);
  };

  const openDialog = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setValue("name", user.name || "");
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("department", user.department || "");
      // パスワードは編集時は空のまま（変更しない場合）
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: UserFormValues) => {
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
      
      // 編集時でパスワードが空の場合は除外
      const submitData: Partial<UserFormValues> = { ...data };
      if (editingUser && !data.password) {
        const { password, ...dataWithoutPassword } = submitData;
        Object.assign(submitData, dataWithoutPassword);
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "処理に失敗しました");
      }

      toast.success(editingUser ? "ユーザーを更新しました" : "ユーザーを作成しました");
      mutate();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("本当にこのユーザーを削除しますか？")) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "削除に失敗しました");
      }

      toast.success("ユーザーを削除しました");
      mutate();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "状態変更に失敗しました");
      }

      toast.success(`ユーザーを${!currentStatus ? "有効" : "無効"}にしました`);
      mutate();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin": return "管理者";
      case "manager": return "マネージャー";
      case "member": return "メンバー";
      default: return role;
    }
  };

  if (error) return <ProtectedLayout requiredRole="admin"><div>読み込みに失敗しました</div></ProtectedLayout>;
  if (!data) return <ProtectedLayout requiredRole="admin"><div>読み込み中...</div></ProtectedLayout>;
  
  // データの安全性チェック
  if (!Array.isArray(users)) {
    console.error('Invalid users data structure:', data);
    return <ProtectedLayout requiredRole="admin"><div>データ構造エラーが発生しました</div></ProtectedLayout>;
  }

  return (
    <ProtectedLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">ユーザー管理</h1>
            <p className="text-gray-600 mt-2">システムユーザーの作成・編集・権限管理</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                新規ユーザー作成
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "ユーザー編集" : "新規ユーザー作成"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">名前</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    {...register("email")} 
                    disabled={!!editingUser}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="password">
                    パスワード{editingUser && " (変更する場合のみ入力)"}
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    {...register("password")} 
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <Label htmlFor="role">権限</Label>
                  <Select onValueChange={(value) => setValue("role", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="権限を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">メンバー</SelectItem>
                      <SelectItem value="manager">マネージャー</SelectItem>
                      <SelectItem value="admin">管理者</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                </div>

                <div>
                  <Label htmlFor="department">部署 (任意)</Label>
                  <Input id="department" {...register("department")} />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "処理中..." : editingUser ? "更新" : "作成"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* ユーザー一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>ユーザー一覧</CardTitle>
            <CardDescription>
              登録済みのユーザー一覧と管理操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ユーザー情報
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      権限
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        ユーザーが見つかりません
                      </td>
                    </tr>
                  ) : (
                    users.map((user: any) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "名前未設定"}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.department && (
                            <div className="text-xs text-gray-400">{user.department}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getRoleDisplay(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusToggle(user.id, user.isActive)}
                          disabled={!canManageUser(session as any, user.role)}
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            user.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {user.isActive ? '有効' : '無効'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDialog(user)}
                          disabled={!canManageUser(session as any, user.role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={!canManageUser(session as any, user.role) || user.id === session?.user?.id}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 