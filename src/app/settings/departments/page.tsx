"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  Target, 
  BarChart3, 
  ArrowUpDown,
  ExternalLink,
  Database
} from "lucide-react";
import { hasRequiredRole } from "@/lib/permissions";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Department {
  id: string;
  value: string;
  description?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    clients: number;
    campaigns: number;
  };
  budget?: {
    totalBudget: number;
    usedBudget: number;
    remainingBudget: number;
  };
}

interface DepartmentStats {
  totalDepartments: number;
  totalClients: number;
  totalBudget: number;
  averageBudget: number;
}

export default function DepartmentManagementPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    value: "",
    description: "",
    displayOrder: 0
  });
  const [sortField, setSortField] = useState<keyof Department>("displayOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data: departments, error, mutate } = useSWR<Department[]>(
    "/api/masters?category=department&includeStats=true",
    fetcher
  );

  const { data: stats } = useSWR<DepartmentStats>(
    "/api/analytics/departments/stats",
    fetcher
  );

  const isAdmin = hasRequiredRole(session, "admin");

  useEffect(() => {
    if (editingDepartment) {
      setFormData({
        value: editingDepartment.value,
        description: editingDepartment.description || "",
        displayOrder: editingDepartment.displayOrder
      });
    } else {
      setFormData({
        value: "",
        description: "",
        displayOrder: (departments?.length || 0) + 1
      });
    }
  }, [editingDepartment, departments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.value.trim()) {
      toast.error("事業部名を入力してください");
      return;
    }

    try {
      const method = editingDepartment ? "PUT" : "POST";
      const url = editingDepartment 
        ? `/api/masters/${editingDepartment.id}`
        : "/api/masters";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "department",
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("保存に失敗しました");
      }

      toast.success(editingDepartment ? "事業部を更新しました" : "事業部を作成しました");
      setIsDialogOpen(false);
      setEditingDepartment(null);
      mutate();
    } catch (error) {
      console.error("Error saving department:", error);
      toast.error("保存に失敗しました");
    }
  };

  const handleDelete = async (department: Department) => {
    if (!confirm(`「${department.value}」を削除してもよろしいですか？`)) {
      return;
    }

    try {
      const response = await fetch(`/api/masters/${department.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("削除に失敗しました");
      }

      toast.success("事業部を削除しました");
      mutate();
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("削除に失敗しました");
    }
  };

  const handleSort = (field: keyof Department) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedDepartments = departments?.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "displayOrder") {
      aValue = a.displayOrder;
      bValue = b.displayOrder;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const openEditDialog = (department: Department) => {
    setEditingDepartment(department);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingDepartment(null);
    setIsDialogOpen(true);
  };

  if (error) {
    return (
      <ProtectedLayout requiredRole="manager">
        <div className="text-center py-8">
          <p className="text-red-600">データの読み込みに失敗しました</p>
          <Button onClick={() => mutate()} className="mt-4">
            再試行
          </Button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout requiredRole="manager">
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Building className="mr-3 h-8 w-8" />
              事業部管理
            </h1>
            <p className="text-gray-600 mt-2">
              事業部の作成・編集・統計情報を管理します
            </p>
          </div>
          {isAdmin && (
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              新規作成
            </Button>
          )}
        </div>

        {/* 統計情報 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  総事業部数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDepartments}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  総クライアント数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClients}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  総予算額
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ¥{stats.totalBudget.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  平均予算額
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ¥{stats.averageBudget.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* クイックリンク */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 h-5 w-5" />
              クイックリンク
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => window.open('/reports/departments', '_blank')}
                className="justify-start"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                事業部別分析
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/reports/departments/budget', '_blank')}
                className="justify-start"
              >
                <Target className="mr-2 h-4 w-4" />
                事業部予算分析
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/settings/masters', '_blank')}
                className="justify-start"
              >
                <Database className="mr-2 h-4 w-4" />
                マスタ管理
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 事業部一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>事業部一覧</CardTitle>
            <CardDescription>
              登録されている事業部の一覧です
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!departments ? (
              <div className="text-center py-8">
                <p className="text-gray-500">読み込み中...</p>
              </div>
            ) : sortedDepartments && sortedDepartments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("displayOrder")}
                      >
                        <div className="flex items-center">
                          表示順
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("value")}
                      >
                        <div className="flex items-center">
                          事業部名
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>説明</TableHead>
                      <TableHead>クライアント数</TableHead>
                      <TableHead>案件数</TableHead>
                      <TableHead>予算情報</TableHead>
                      <TableHead>作成日</TableHead>
                      {isAdmin && <TableHead>操作</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedDepartments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell>
                          <Badge variant="outline">
                            {department.displayOrder}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {department.value}
                        </TableCell>
                        <TableCell>
                          {department.description || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-gray-500" />
                            {department._count?.clients || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Target className="mr-1 h-4 w-4 text-gray-500" />
                            {department._count?.campaigns || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          {department.budget ? (
                            <div className="text-sm">
                              <div>予算: ¥{department.budget.totalBudget.toLocaleString()}</div>
                              <div className="text-gray-500">
                                残り: ¥{department.budget.remainingBudget.toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(department.createdAt).toLocaleDateString()}
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(department)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(department)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">事業部が登録されていません</p>
                {isAdmin && (
                  <Button onClick={openCreateDialog} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    最初の事業部を作成
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 作成・編集ダイアログ */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? "事業部を編集" : "新しい事業部を作成"}
              </DialogTitle>
              <DialogDescription>
                {editingDepartment 
                  ? "事業部の情報を編集します"
                  : "新しい事業部を作成します"
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="value">事業部名 *</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="例: 第一事業部"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">説明</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="事業部の説明を入力してください"
                />
              </div>
              <div>
                <Label htmlFor="displayOrder">表示順</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    displayOrder: parseInt(e.target.value) || 0 
                  }))}
                  min="1"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button type="submit">
                  {editingDepartment ? "更新" : "作成"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedLayout>
  );
} 