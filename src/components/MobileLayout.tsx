"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import MobileHeader from "./MobileHeader";
import MobileNavigation from "./MobileNavigation";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session } = useSession();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* モバイルヘッダー */}
      <MobileHeader onToggleNav={toggleNav} />
      
      {/* ナビゲーションドロワー */}
      <MobileNavigation 
        isOpen={isNavOpen} 
        onClose={closeNav} 
        user={session?.user}
      />
      
      {/* オーバーレイ */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeNav}
        />
      )}
      
      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto p-4 pb-safe">
        {children}
      </main>
    </div>
  );
} 