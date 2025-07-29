"use client";

import { AuthProvider } from "./providers";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
} 