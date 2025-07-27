"use client";

import { useAuth } from "@/components/providers";
import Link from "next/link";
import { Shield, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UnauthorizedPage() {
  const { user: session } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            アクセス権限がありません
          </CardTitle>
          <CardDescription className="text-gray-600">
            このページにアクセスするための権限がありません。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500 text-center">
            <p>現在のロール: <span className="font-medium">{session?.user?.role || "未確認"}</span></p>
            <p className="mt-1">必要な権限について管理者にお問い合わせください。</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                ダッシュボードに戻る
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-4 h-4 mr-2" />
                前のページに戻る
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 