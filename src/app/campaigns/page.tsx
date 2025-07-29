"use client";

import dynamic from "next/dynamic";

import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CampaignsPageInner() {
  return (
    <ProtectedLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>キャンペーン管理</CardTitle>
          </CardHeader>
          <CardContent>
            <p>このページは開発中です。</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 
// Dynamic export to prevent SSR issues with AuthProvider
const Page = dynamic(() => Promise.resolve(PageInner), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg">読み込み中...</div>
    </div>
  )
});

export default Page;
