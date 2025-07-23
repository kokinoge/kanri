import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcutProvider } from "@/components/ui/keyboard-shortcut-provider";
import { AutoSaveProvider } from "@/components/ui/auto-save-provider";
import { SmartFocusProvider } from "@/components/ui/smart-focus-manager";
import { ContextualHelpProvider } from "@/components/ui/contextual-help";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanri - 予算管理システム",
  description: "効率的な予算管理と案件分析のためのプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <KeyboardShortcutProvider>
            <AutoSaveProvider>
              <SmartFocusProvider>
                <ContextualHelpProvider>
                  {children}
                  <Toaster />
                </ContextualHelpProvider>
              </SmartFocusProvider>
            </AutoSaveProvider>
          </KeyboardShortcutProvider>
        </Providers>
      </body>
    </html>
  );
}
