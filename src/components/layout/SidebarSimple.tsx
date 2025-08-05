"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { hasPermission } from "@/lib/auth"
import {
  Home,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  FileText,
  Settings,
} from "lucide-react"

interface SidebarSimpleProps {
  userRole: string
}

interface MenuItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
}

const menuItems: MenuItem[] = [
  {
    name: "ダッシュボード",
    href: "/",
    icon: Home,
  },
  {
    name: "クライアント管理",
    href: "/clients",
    icon: Users,
    permission: "read"
  },
  {
    name: "施策管理",
    href: "/campaigns",
    icon: Briefcase,
    permission: "read"
  },
  {
    name: "予算管理",
    href: "/budgets",
    icon: DollarSign,
    permission: "read"
  },
  {
    name: "実績分析",
    href: "/results",
    icon: TrendingUp,
    permission: "read"
  },
  {
    name: "レポート",
    href: "/reports",
    icon: FileText,
    permission: "read"
  },
  {
    name: "設定",
    href: "/settings",
    icon: Settings,
    permission: "write"
  },
]

export default function SidebarSimple({ userRole }: SidebarSimpleProps) {
  const pathname = usePathname()
  
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.permission) return true
    return hasPermission(userRole, item.permission)
  })

  return (
    <div className="flex flex-col h-full bg-white">
      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}