import type { ChartOptions } from 'chart.js'

/**
 * 共通のChart.js設定
 */
export const defaultChartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 16,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 13,
        weight: 'normal'
      },
      bodyFont: {
        size: 12
      }
    }
  }
}

/**
 * 通貨フォーマットの共通設定
 */
export const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY'
})

/**
 * 通貨フォーマット（短縮表記）の共通設定
 */
export const currencyCompactFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  notation: 'compact'
})

/**
 * バーチャート用のオプションを生成
 */
export function createBarChartOptions(overrides: Partial<ChartOptions<'bar'>> = {}): ChartOptions<'bar'> {
  return {
    ...defaultChartOptions,
    ...overrides,
    plugins: {
      ...defaultChartOptions.plugins,
      ...overrides.plugins,
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        ...overrides.plugins?.tooltip,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || ''
            const value = currencyFormatter.format(context.parsed.y)
            return `${label}: ${value}`
          },
          ...overrides.plugins?.tooltip?.callbacks
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return currencyCompactFormatter.format(value)
          }
        }
      },
      ...overrides.scales
    }
  } as ChartOptions<'bar'>
}

/**
 * ラインチャート用のオプションを生成
 */
export function createLineChartOptions(overrides: Partial<ChartOptions<'line'>> = {}): ChartOptions<'line'> {
  return createBarChartOptions(overrides as Partial<ChartOptions<'bar'>>) as ChartOptions<'line'>
}

/**
 * チャートカラーパレット
 */
export const chartColors = [
  { border: 'rgb(59, 130, 246)', background: 'rgba(59, 130, 246, 0.5)' }, // Blue
  { border: 'rgb(34, 197, 94)', background: 'rgba(34, 197, 94, 0.5)' },  // Green
  { border: 'rgb(168, 85, 247)', background: 'rgba(168, 85, 247, 0.5)' }, // Purple
  { border: 'rgb(251, 146, 60)', background: 'rgba(251, 146, 60, 0.5)' }, // Orange
  { border: 'rgb(14, 165, 233)', background: 'rgba(14, 165, 233, 0.5)' }, // Sky
  { border: 'rgb(236, 72, 153)', background: 'rgba(236, 72, 153, 0.5)' }, // Pink
  { border: 'rgb(251, 191, 36)', background: 'rgba(251, 191, 36, 0.5)' }, // Amber
  { border: 'rgb(163, 163, 163)', background: 'rgba(163, 163, 163, 0.5)' } // Gray
]

/**
 * 指定されたインデックスのカラーを取得
 */
export function getChartColor(index: number) {
  return chartColors[index % chartColors.length]
}

/**
 * ローディングスピナーコンポーネント
 */
export function ChartLoadingSpinner() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
    </div>
  )
}

/**
 * データなしコンポーネント
 */
export function ChartNoData() {
  return (
    <div className="h-64 flex items-center justify-center text-gray-500">
      データがありません
    </div>
  )
}