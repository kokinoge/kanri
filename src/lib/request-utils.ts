import { NextRequest } from 'next/server'

/**
 * NextRequestから安全にURLSearchParamsを取得する
 * Dynamic server usageエラーを回避するため、request.urlの代わりにnextUrlを使用
 */
export function getSearchParams(request: NextRequest): URLSearchParams {
  return request.nextUrl.searchParams
}

/**
 * NextRequestから安全にURLを取得する
 * request.urlを直接使用せず、nextUrlから構築
 */
export function getRequestUrl(request: NextRequest): string {
  return request.nextUrl.toString()
}

/**
 * NextRequestから安全にpathnameを取得する
 */
export function getPathname(request: NextRequest): string {
  return request.nextUrl.pathname
}

/**
 * 安全なURL構築（ビルド時にbaseURLが不明な場合に対応）
 */
export function safeUrlConstruction(url: string, base?: string): URL | null {
  try {
    return new URL(url, base)
  } catch (error) {
    console.warn('URL construction failed:', error.message)
    return null
  }
} 