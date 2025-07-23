"use client";

import { useAuth } from "./providers";
import Link from "next/link";
import { Bell, User, LogOut, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-3">
        {/* 左側: ページタイトルエリア */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            予算管理システム
          </h1>
        </div>

        {/* 右側: ユーザー情報とアクション */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* クイックアクション */}
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/budgets">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Plus className="w-4 h-4 mr-1" />
                    予算作成
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    レポート
                  </Button>
                </Link>
              </div>

              {/* 通知アイコン */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* ユーザー情報 */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name ?? user.email}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.role === 'admin' ? '管理者' : 
                     user.role === 'manager' ? 'マネージャー' : 'メンバー'}
                  </div>
                </div>
                
                {/* ユーザーアイコン */}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>

                {/* ログアウトボタン */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">ログアウト</span>
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                ログイン
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 