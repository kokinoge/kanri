"use client";

import AppLayout from "./Layout";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "manager" | "member";
}

export default function ProtectedLayout({ children, requiredRole = "member" }: ProtectedLayoutProps) {
  // 開発環境では認証チェックをスキップ
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return <AppLayout>{children}</AppLayout>;
  }

  // TODO: 本番環境では適切な認証チェックを実装
  return <AppLayout>{children}</AppLayout>;
} 