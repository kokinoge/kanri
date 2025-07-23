"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";

interface Client {
  id: string;
  name: string;
  businessDivision: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [projectData, setProjectData] = useState({
    clientId: "",
    name: "",
    productName: "",
    productCategory: "",
    productDescription: "",
    purpose: "",
    businessDivision: "",
    startYear: new Date().getFullYear(),
    startMonth: new Date().getMonth() + 1,
    endYear: "none",
    endMonth: "none",
    totalBudget: "",
  });

  const { data: clients } = useSWR<Client[]>("/api/clients", fetcher);
  const { data: businessDivisions } = useSWR<string[]>("/api/masters?category=businessDivision", 
    (url: string) => fetch(url).then(res => res.json()).then(data => data.map((item: any) => item.value))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectData.clientId || !projectData.name || !projectData.totalBudget) {
      toast.error("必須項目を入力してください");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectData,
          totalBudget: parseFloat(projectData.totalBudget) || 0,
          endYear: projectData.endYear !== "none" ? parseInt(projectData.endYear) : null,
          endMonth: projectData.endMonth !== "none" ? parseInt(projectData.endMonth) : null,
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        toast.success("案件を作成しました");
        router.push(`/integrated-management`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "案件の作成に失敗しました");
      }
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error("案件の作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProjectData(prev => {
      const newData = { ...prev, [field]: value };
      
      // 終了年が"none"に変更された場合、終了月も"none"にリセット
      if (field === "endYear" && value === "none") {
        newData.endMonth = "none";
      }
      
      return newData;
    });
  };

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">新規案件作成</h1>
            <p className="text-gray-600">新しい案件を作成します</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>案件情報</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="clientId">クライアント *</Label>
                  <Select
                    value={projectData.clientId}
                    onValueChange={(value) => handleInputChange("clientId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="クライアントを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="name">案件名 *</Label>
                  <Input
                    id="name"
                    value={projectData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="案件名を入力してください"
                    required
                  />
                </div>

                {/* 事業部選択は一時的にコメントアウト - データベース構造変更後に有効化 */}
                {/*
                <div>
                  <Label htmlFor="businessDivision">事業部 *</Label>
                  <Select
                    value={projectData.businessDivision}
                    onValueChange={(value) => handleInputChange("businessDivision", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="事業部を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessDivisions?.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                */}

                <div>
                  <Label htmlFor="productName">商品名</Label>
                  <Input
                    id="productName"
                    value={projectData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    placeholder="商品名を入力してください"
                  />
                </div>

                <div>
                  <Label htmlFor="productCategory">商品カテゴリ</Label>
                  <Input
                    id="productCategory"
                    value={projectData.productCategory}
                    onChange={(e) => handleInputChange("productCategory", e.target.value)}
                    placeholder="商品カテゴリを入力してください"
                  />
                </div>

                <div>
                  <Label htmlFor="productDescription">商品説明</Label>
                  <Textarea
                    id="productDescription"
                    value={projectData.productDescription}
                    onChange={(e) => handleInputChange("productDescription", e.target.value)}
                    placeholder="商品の詳細説明を入力してください"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="purpose">目的・目標</Label>
                  <Textarea
                    id="purpose"
                    value={projectData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    placeholder="案件の目的や目標を入力してください"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startYear">開始年 *</Label>
                    <Select
                      value={projectData.startYear.toString()}
                      onValueChange={(value) => handleInputChange("startYear", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}年
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="startMonth">開始月 *</Label>
                    <Select
                      value={projectData.startMonth.toString()}
                      onValueChange={(value) => handleInputChange("startMonth", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <SelectItem key={month} value={month.toString()}>
                            {month}月
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endYear">終了年</Label>
                    <Select
                      value={projectData.endYear}
                      onValueChange={(value) => handleInputChange("endYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="終了年を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">指定しない</SelectItem>
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}年
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="endMonth">終了月</Label>
                    <Select
                      value={projectData.endMonth}
                      onValueChange={(value) => handleInputChange("endMonth", value)}
                      disabled={!projectData.endYear || projectData.endYear === "none"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="終了月を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">指定しない</SelectItem>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <SelectItem key={month} value={month.toString()}>
                            {month}月
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="totalBudget">総予算 *</Label>
                  <Input
                    id="totalBudget"
                    type="number"
                    value={projectData.totalBudget}
                    onChange={(e) => handleInputChange("totalBudget", e.target.value)}
                    placeholder="総予算を入力してください"
                    min="0"
                    step="1000"
                    required
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">作成後の設定について</p>
                    <p className="text-amber-700 mt-1">
                      案件作成後、統合管理ページで詳細な予算設定やKPI設定を行うことができます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  {isSubmitting ? (
                    <>処理中...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      作成
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 