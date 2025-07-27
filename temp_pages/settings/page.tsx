"use client";

import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, Database, Users, Building2, Building } from "lucide-react";
import { useAuth } from "@/components/providers";
import { hasRequiredRole } from "@/lib/permissions";

export default function SettingsPage() {
  const { user: session } = useAuth();

  return (
    <ProtectedLayout requiredRole="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">設定</h1>
          <p className="text-gray-600 mt-2">システムの設定を管理します</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ユーザー管理 */}
          {hasRequiredRole(session, "admin") && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  ユーザー管理
                </CardTitle>
                <CardDescription>
                  システムユーザーの作成・編集・権限管理を行います
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/settings/users">
                    ユーザー管理を開く
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* クライアント管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                クライアント管理
              </CardTitle>
              <CardDescription>
                クライアントの作成・編集・事業部設定を行います
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/settings/clients">
                  クライアント管理を開く
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 事業部管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                事業部管理
              </CardTitle>
              <CardDescription>
                事業部の作成・編集・予算設定・統計情報を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/settings/departments">
                  事業部管理を開く
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* マスタ管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                マスタ管理
              </CardTitle>
              <CardDescription>
                事業部、媒体、運用タイプ、報酬体系などの基本データを管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/settings/masters">
                  マスタ管理を開く
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 将来的な機能拡張用のプレースホルダー */}
          {hasRequiredRole(session, "admin") && (
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  システム設定
                </CardTitle>
                <CardDescription>
                  システム全体の設定（今後実装予定）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button disabled className="w-full">
                  準備中
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
} 