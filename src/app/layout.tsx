import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "../components/providers/SessionProvider";
import Layout from "../components/layout/Layout";
import { ThemeProvider } from "../contexts/ThemeContext";
import { NotificationProvider } from "../components/notifications/NotificationProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "予算管理システム - Kanri",
  description: "マーケ支援代理店向け予算管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider>
            <NotificationProvider>
              <Layout>{children}</Layout>
            </NotificationProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}