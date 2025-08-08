"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  TrendingUp,
  UserCog,
  Settings,
  PieChart,
  BarChart,
  Calendar,
  Database,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "ダッシュボード",
      href: "/",
      icon: Home,
      roles: ["admin", "manager", "member"],
    },
    {
      label: "クライアント管理",
      href: "/clients",
      icon: Briefcase,
      roles: ["admin", "manager", "member"],
    },
    {
      label: "施策管理",
      href: "/campaigns",
      icon: TrendingUp,
      roles: ["admin", "manager", "member"],
    },
    {
      label: "予算管理",
      href: "/budgets",
      icon: DollarSign,
      roles: ["admin", "manager"],
    },
    {
      label: "実績管理",
      href: "/results",
      icon: FileText,
      roles: ["admin", "manager", "member"],
    },
    {
      label: "分析・レポート",
      roles: ["admin", "manager", "member"],
      icon: PieChart,
      children: [
        {
          label: "月次レポート",
          href: "/reports",
          icon: Calendar,
        },
        {
          label: "媒体別分析",
          href: "/media-analysis",
          icon: BarChart,
        },
        {
          label: "クライアント別分析",
          href: "/client-analysis",
          icon: Users,
        },
      ],
    },
    {
      label: "ユーザー管理",
      href: "/users",
      icon: UserCog,
      roles: ["admin"],
    },
    {
      label: "設定",
      roles: ["admin", "manager"],
      icon: Settings,
      children: [
        {
          label: "マスタ管理",
          href: "/settings/masters",
          icon: Database,
        },
        {
          label: "部門管理",
          href: "/settings/departments",
          icon: Users,
        },
      ],
    },
  ];

  const hasAccess = (roles: string[]) => {
    return !userRole || roles.includes(userRole);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* サイドバー */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* ロゴエリア */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-xl font-semibold text-gray-900">メニュー</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* ナビゲーション */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              if (!hasAccess(item.roles)) return null;

              if (item.children) {
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(child.href)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <child.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive(child.href)
                              ? "text-blue-500"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                        />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href!)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href!)
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* フッター情報 */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-700">
                    Kanri v1.0.0
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    © 2024 Marketing Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}