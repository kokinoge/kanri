import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "予算管理システム - Kanri",
  description: "効率的な予算管理とプロジェクト追跡システム",
};

// シンプルな認証コンテキストプロバイダー（エラー回避版）
function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  return <div data-auth-provider="true">{children}</div>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <SimpleAuthProvider>
          {children}
        </SimpleAuthProvider>
      </body>
    </html>
  );
}
