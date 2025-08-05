"use client"

import { signOut } from "next-auth/react"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "@/components/ui/ThemeToggle"
import AccessibilityOptions from "@/components/ui/AccessibilityOptions"
import NotificationBell from "@/components/notifications/NotificationBell"

interface HeaderProps {
  user: {
    name?: string | null
    email: string
    role?: string
    department?: string | null
  }
  onMenuClick: () => void
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" })
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴとメニューボタン */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              予算管理システム
            </h1>
          </div>

          {/* ユーザーメニューとテーマ切り替え */}
          <div className="flex items-center gap-2">
            <NotificationBell />
            <AccessibilityOptions />
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden sm:block">{user.name || user.email}</span>
              </button>

              {/* ドロップダウンメニュー */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name || "ユーザー"}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {user.role === "admin" && "システム管理者"}
                      {user.role === "manager" && "マネージャー"}
                      {user.role === "member" && "メンバー"}
                      {user.department && ` - ${user.department}`}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    ログアウト
                  </button>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* オーバーレイ */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  )
}