"use client";

import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProtectedLayout from "@/components/ProtectedLayout";
import { useSession } from "next-auth/react";
import { hasRequiredRole } from "@/lib/permissions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ClientsPage() {
  const { data: session } = useSession();
  const { data: clients, error } = useSWR("/api/clients", fetcher);

  // 担当者名を表示用に取得する関数
  const getManagerName = (client: any) => {
    if (!client.manager) return "未設定";
    return client.manager.name || client.manager.email;
  };

  if (error) return <ProtectedLayout><div>読み込みに失敗しました</div></ProtectedLayout>;
  if (!clients) return <ProtectedLayout><div>読み込み中...</div></ProtectedLayout>;

  return (
    <ProtectedLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">クライアント管理</h1>
        {hasRequiredRole(session as any, "manager") && (
          <Button asChild>
            <Link href="/clients/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規クライアント追加
            </Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client: any) => (
          <Link href={`/clients/${client.id}`} key={client.id} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{client.name}</h2>
              <p className="text-gray-600">担当者: {getManagerName(client)}</p>
              <p className="text-gray-600">事業部: {client.businessDivision || '未設定'}</p>
              <div className="mt-2 space-y-1">
                <p className="text-gray-600 text-sm">営業部: {client.salesDepartment || '未設定'}</p>
                <p className="text-gray-600 text-sm">代理店: {client.agency || '未設定'}</p>
                <p className="text-gray-600 text-sm">営業チャネル: {client.salesChannel || '未設定'}</p>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    client.priority > 5 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  優先度: {client.priority}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ProtectedLayout>
  );
} 