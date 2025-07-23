"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Plus, Edit, Trash2, Building2, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { hasRequiredRole } from "@/lib/permissions";
import { toast } from "sonner";
import { NumberInput } from "@/components/ui/number-input";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const clientSchema = z.object({
  name: z.string().min(1, "クライアント名は必須です"),
  managerId: z.string().optional(),
  priority: z.enum(["S", "A", "B", "C", "D"], {
    required_error: "優先度を選択してください",
  }),
  businessDivision: z.enum(["SNSメディア事業部", "インフルエンサー事業部", "広告事業部"], {
    required_error: "事業部を選択してください",
  }),
  salesDepartment: z.enum(["国内営業", "海外営業", "代理店営業"], {
    required_error: "営業部を選択してください",
  }),
  agency: z.string().optional(),
  salesChannel: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function SettingsClientsPage() {
  const { data: session } = useSession();
  const { data: clients, error, mutate } = useSWR("/api/clients", fetcher);
  const { data: assignableUsers } = useSWR("/api/users/assignable", fetcher);
  const { data: departments } = useSWR("/api/masters?category=department", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      managerId: "unassigned",
      priority: "C",
      businessDivision: "SNSメディア事業部",
      salesDepartment: "国内営業",
      agency: "",
      salesChannel: "",
    },
  });

  const resetForm = () => {
    reset({
      name: "",
      managerId: "unassigned",
      priority: "C",
      businessDivision: "SNSメディア事業部",
      salesDepartment: "国内営業",
      agency: "",
      salesChannel: "",
    });
    setEditingClient(null);
  };

  const openDialog = (client?: any) => {
    if (client) {
      setEditingClient(client);
      setValue("name", client.name || "");
      setValue("managerId", client.managerId || "unassigned");
      setValue("priority", client.priority || "C");
      setValue("businessDivision", client.businessDivision || "SNSメディア事業部");
      setValue("salesDepartment", client.salesDepartment || "国内営業");
      setValue("agency", client.agency || "");
      setValue("salesChannel", client.salesChannel || "");
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ClientFormValues) => {
    try {
      const submitData = {
        ...data,
        managerId: data.managerId === "unassigned" ? null : data.managerId,
        agency: data.agency || null,
        salesChannel: data.salesChannel || null,
      };

      const url = editingClient ? `/api/clients/${editingClient.id}` : "/api/clients";
      const method = editingClient ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("保存に失敗しました");
      }

      mutate();
      setIsDialogOpen(false);
      resetForm();
      toast.success(editingClient ? "クライアントを更新しました" : "クライアントを作成しました");
    } catch (error) {
      console.error("Client save error:", error);
      toast.error("保存に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("このクライアントを削除しますか？関連するデータも削除されます。")) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("削除に失敗しました");
        }

        mutate();
        toast.success("クライアントを削除しました");
      } catch (error) {
        console.error("Client delete error:", error);
        toast.error("削除に失敗しました");
      }
    }
  };

  const getManagerName = (client: any) => {
    if (!client.manager) return "未設定";
    return client.manager.name || client.manager.email;
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "admin": return "管理者";
      case "manager": return "マネージャー";
      case "member": return "メンバー";
      default: return role;
    }
  };

  if (error) return <div>読み込みに失敗しました</div>;
  if (!clients) return <div>読み込み中...</div>;

  return (
    <ProtectedLayout requiredRole="manager">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">クライアント管理</h1>
            <p className="text-gray-600 mt-2">クライアントの作成・編集・事業部設定</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                新規クライアント作成
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingClient ? "クライアント編集" : "新規クライアント作成"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">クライアント名</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="priority">優先度</Label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="優先度を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="S">S（最重要）</SelectItem>
                          <SelectItem value="A">A（重要）</SelectItem>
                          <SelectItem value="B">B（通常）</SelectItem>
                          <SelectItem value="C">C（低）</SelectItem>
                          <SelectItem value="D">D（最低）</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
                </div>

                <div>
                  <Label htmlFor="businessDivision">事業部</Label>
                  <Controller
                    name="businessDivision"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="事業部を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SNSメディア事業部">SNSメディア事業部</SelectItem>
                          <SelectItem value="インフルエンサー事業部">インフルエンサー事業部</SelectItem>
                          <SelectItem value="広告事業部">広告事業部</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.businessDivision && <p className="text-red-500 text-xs mt-1">{errors.businessDivision.message}</p>}
                </div>

                <div>
                  <Label htmlFor="salesDepartment">営業部</Label>
                  <Controller
                    name="salesDepartment"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="営業部を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="国内営業">国内営業</SelectItem>
                          <SelectItem value="海外営業">海外営業</SelectItem>
                          <SelectItem value="代理店営業">代理店営業</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.salesDepartment && <p className="text-red-500 text-xs mt-1">{errors.salesDepartment.message}</p>}
                </div>

                <div>
                  <Label htmlFor="agency">代理店</Label>
                  <Input id="agency" {...register("agency")} placeholder="代理店名（任意）" />
                  {errors.agency && <p className="text-red-500 text-xs mt-1">{errors.agency.message}</p>}
                </div>

                <div>
                  <Label htmlFor="salesChannel">営業チャネル</Label>
                  <Input id="salesChannel" {...register("salesChannel")} placeholder="営業チャネル（任意）" />
                  {errors.salesChannel && <p className="text-red-500 text-xs mt-1">{errors.salesChannel.message}</p>}
                </div>

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
                          {assignableUsers?.map((user: any) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({getRoleDisplay(user.role)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.managerId && <p className="text-red-500 text-xs mt-1">{errors.managerId.message}</p>}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "保存中..." : editingClient ? "更新" : "作成"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>クライアント一覧</CardTitle>
            <CardDescription>
              登録済みのクライアント一覧と管理操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      クライアント情報
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      担当者
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      事業部
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      優先度
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client: any) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {client.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              作成日: {new Date(client.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {getManagerName(client)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {client.businessDivision}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          client.priority === 'S' ? 'bg-red-100 text-red-800' :
                          client.priority === 'A' ? 'bg-yellow-100 text-yellow-800' :
                          client.priority === 'B' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {client.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDialog(client)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {hasRequiredRole(session, "admin") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(client.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 