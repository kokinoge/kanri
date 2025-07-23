"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Megaphone, 
  DollarSign,
  Settings,
  Building,
  Calendar,
  Table,
  X,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navSections = [
  {
    title: "メインダッシュボード",
    items: [
      { name: "ホーム", href: "/", icon: Home },
      { name: "月次概要", href: "/monthly-overview", icon: Calendar },
    ]
  },
  {
    title: "計画・管理",
    items: [
      { name: "案件", href: "/campaigns", icon: Megaphone },
      { name: "予算計画", href: "/budgets", icon: Target },
    ]
  },
  {
    title: "実績・分析",
    items: [
      { name: "実績入力", href: "/results", icon: DollarSign },
      { name: "事業部別分析", href: "/department-performance", icon: Building },
      { name: "レポート", href: "/reports", icon: BarChart3 },
      { name: "データテーブル", href: "/data-tables", icon: Table },
    ]
  },
  {
    title: "システム",
    items: [
      { name: "クライアント管理", href: "/clients", icon: Building2 },
      { name: "事業部管理", href: "/settings/departments", icon: Building },
      { name: "ユーザー管理", href: "/users", icon: Users },
      { name: "設定", href: "/settings", icon: Settings },
    ]
  }
];

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export default function MobileNavigation({ isOpen, onClose, user }: MobileNavigationProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ナビゲーションドロワー */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">予算管理システム</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* ユーザー情報 */}
        {user && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{user.name || user.email}</p>
                <p className="text-xs text-gray-400">
                  {user.role === 'admin' ? '管理者' : 
                   user.role === 'manager' ? 'マネージャー' : 'メンバー'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ナビゲーションメニュー */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-blue-200" : "text-gray-400"
                      )} />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
} 