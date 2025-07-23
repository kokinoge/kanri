import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 数字フォーマット関数
export function formatNumber(num: number | string | null | undefined): string {
  const numValue = typeof num === 'string' ? parseFloat(num) : num;
  if (typeof numValue !== 'number' || isNaN(numValue)) {
    return '0';
  }
  return new Intl.NumberFormat('ja-JP').format(numValue);
}

// 通貨フォーマット関数
export function formatCurrency(amount: number | string | null | undefined): string {
  const numValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (typeof numValue !== 'number' || isNaN(numValue)) {
    return '¥0';
  }
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(numValue);
}

// パーセンテージフォーマット関数
export function formatPercentage(value: number | string | null | undefined, decimals: number = 1): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (typeof numValue !== 'number' || isNaN(numValue)) {
    return '0%';
  }
  return `${formatNumber(parseFloat(numValue.toFixed(decimals)))}%`;
}

// 日付フォーマット関数
export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) {
    return '-';
  }
  try {
    const date = new Date(dateString);
    // getTime()がNaNを返す場合、無効な日付と判断
    if (isNaN(date.getTime())) {
      return '-';
    }
    return date.toLocaleDateString('ja-JP');
  } catch (error) {
    console.error("Invalid date value for formatDate:", dateString, error);
    return '-';
  }
}

// 年月フォーマット関数
export function formatYearMonth(year: number, month: number): string {
  return `${formatNumber(year)}年${formatNumber(month)}月`;
}
