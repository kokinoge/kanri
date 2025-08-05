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
  X
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
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
    name: "実績管理",
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
    permission: "manage_users"
  },
]

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname()

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.permission) return true
    return hasPermission(userRole, item.permission)
  })

  return (
    <>
      {/* モバイル用オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* サイドバー */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
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
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
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
    </>
  )
}