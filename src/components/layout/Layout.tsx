'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // 認証が不要なページかどうかをチェック
  const isAuthPage = pathname?.startsWith('/auth') || 
                     pathname?.startsWith('/public-debug') ||
                     pathname?.startsWith('/debug') ||
                     pathname?.startsWith('/test');

  // ページ遷移時にサイドバーを閉じる（モバイル）
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // 認証ページの場合はレイアウトを適用しない
  if (isAuthPage || !session) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* サイドバー */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={session.user?.role}
      />

      {/* メインコンテンツエリア */}
      <div className="flex flex-col flex-1 w-0">
        {/* ヘッダー */}
        <Header
          user={session.user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}