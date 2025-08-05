"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"
import Header from "./Header"
import SidebarSimple from "./SidebarSimple"
import TwoColumnLayout from "./two-column/TwoColumnLayout"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession()

  // 認証チェック中
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // 未認証の場合はコンテンツのみ表示（ログインページなど）
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={session.user} onMenuClick={() => {}} />
      
      <div style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
        <TwoColumnLayout
          leftColumn={
            <SidebarSimple userRole={session.user.role || "member"} />
          }
          rightColumn={
            <div className="p-4 lg:p-8">
              {children}
            </div>
          }
          leftColumnWidth="256px"
          resizable={true}
        />
      </div>
    </div>
  )
}