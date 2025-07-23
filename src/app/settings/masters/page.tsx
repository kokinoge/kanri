"use client";

import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hasRequiredRole } from "@/lib/permissions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const masterCategories = [
  { id: "businessDivision", name: "事業部" },
  { id: "platform", name: "媒体" },
  { id: "genre", name: "ジャンル" },
  { id: "operationType", name: "運用タイプ" },
  { id: "salesDepartment", name: "営業部" },
  { id: "agency", name: "代理店" },
  { id: "salesChannel", name: "営業チャネル" },
];

function MasterDataTable({ category }: { category: string }) {
  const { data: session } = useSession();
  const { data: masters, error, mutate } = useSWR(`/api/masters?category=${category}`, fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaster, setEditingMaster] = useState<any>(null);

  const isAdmin = hasRequiredRole(session, "admin");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      category,
      value: formData.get("value") as string,
      order: Number(formData.get("order")),
    };

    const url = editingMaster ? `/api/masters/${editingMaster.id}` : "/api/masters";
    const method = editingMaster ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    mutate();
    setIsModalOpen(false);
    setEditingMaster(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("本当に削除しますか？")) {
      await fetch(`/api/masters/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  if (error) return <div>読み込みに失敗しました</div>;
  if (!masters) return <div>読み込み中...</div>;

  return (
    <div>
      {isAdmin && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMaster(null)}>新規追加</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMaster ? "編集" : "新規追加"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">値</Label>
                  <Input id="value" name="value" defaultValue={editingMaster?.value} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="order" className="text-right">表示順</Label>
                  <Input id="order" name="order" type="number" defaultValue={editingMaster?.order} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table content */}
           <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">値</th>
              <th className="px-6 py-3 text-left text-xs font-medium">表示順</th>
              {isAdmin && <th className="px-6 py-3 text-right text-xs font-medium">アクション</th>}
            </tr>
          </thead>
           <tbody className="bg-white divide-y divide-gray-200">
            {masters.map((master: any) => (
              <tr key={master.id}>
                <td className="px-6 py-4">{master.value}</td>
                <td className="px-6 py-4">{master.order}</td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => { setEditingMaster(master); setIsModalOpen(true); }}>編集</Button>
                    <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(master.id)}>削除</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default function MastersPage() {
    const { data: session } = useSession();

    if (!hasRequiredRole(session, "manager")) {
        return (
          <ProtectedLayout>
            <h1 className="text-2xl font-bold">アクセス権がありません</h1>
            <p>このページは管理者またはマネージャーのみが閲覧できます。</p>
          </ProtectedLayout>
        );
    }

  return (
    <ProtectedLayout requiredRole="manager">
      <h1 className="text-2xl font-bold mb-6">マスタデータ管理</h1>
      <Tabs defaultValue="department">
        <TabsList>
          {masterCategories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
          ))}
        </TabsList>
        {masterCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <MasterDataTable category={cat.id} />
          </TabsContent>
        ))}
      </Tabs>
    </ProtectedLayout>
  );
} 