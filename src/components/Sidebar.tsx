"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign,
  Settings,
  ChevronRight,
  Table,
  Building,
  Calendar,
  Activity,
  Briefcase
} from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    title: "メインダッシュボード",
    items: [
      { name: "ホーム", href: "/", icon: Home },
      { name: "月次概要", href: "/monthly-overview", icon: Calendar },
    ]
  },
  {
    title: "データ管理",
    items: [
      { name: "統合管理", href: "/budget-results", icon: Activity },
    ]
  },
  {
    title: "実績・分析",
    items: [
      { name: "統合管理", href: "/integrated-management", icon: Activity },
      { name: "事業部分析", href: "/department-performance", icon: Building },
      { name: "クライアント分析", href: "/client-analysis", icon: Building2 },
      { name: "レポート", href: "/reports", icon: BarChart3 },
    ]
  },
  {
    title: "システム",
    items: [
      { name: "クライアント管理", href: "/clients", icon: Building2 },
      { name: "事業部管理", href: "/settings/departments", icon: Building },
      { name: "ユーザー管理", href: "/users", icon: Users },
      { name: "マスター管理", href: "/settings/masters", icon: Settings },
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['メインダッシュボード']);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    } flex flex-col h-full shadow-sm`}>
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900">Kanri</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${
              isCollapsed ? "" : "rotate-180"
            }`} />
          </button>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 overflow-y-auto p-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            {!isCollapsed && (
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 hover:text-gray-700 transition-colors"
              >
                <span>{section.title}</span>
                <ChevronRight className={`h-3 w-3 transition-transform ${
                  expandedSections.includes(section.title) ? "rotate-90" : ""
                }`} />
              </button>
            )}
            
            {(isCollapsed || expandedSections.includes(section.title)) && (
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
                      {!isCollapsed && (
                        <span className={`font-medium ${isActive ? "text-blue-700" : "text-gray-700"}`}>
                          {item.name}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
} 