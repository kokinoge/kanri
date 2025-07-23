import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: "予算管理システム - Kanri",
  description: "効率的な予算管理とプロジェクト追跡システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
