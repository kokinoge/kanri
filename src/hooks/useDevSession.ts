"use client";

import { useSession as useNextAuthSession } from "next-auth/react";

// 開発環境でuseSessionを安全に使用するためのHook
export function useDevSession() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // 開発環境ではモックセッションを返す
  if (isDevelopment) {
    return {
      data: {
        user: {
          name: "開発ユーザー",
          email: "dev@example.com",
          role: "admin"
        }
      },
      status: "authenticated" as const
    };
  }
  
  // 本番環境では実際のuseSessionを使用
  return useNextAuthSession();
} 