"use client"

import { useState, useEffect } from 'react'
import { Settings, Type, Zap, Eye } from 'lucide-react'

export default function AccessibilityOptions() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    // フォントサイズ
    root.classList.remove('text-sm', 'text-base', 'text-lg')
    if (fontSize === 'small') root.classList.add('text-sm')
    else if (fontSize === 'large') root.classList.add('text-lg')
    else root.classList.add('text-base')

    // アニメーション削減
    if (reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.classList.add('reduce-motion')
    } else {
      root.style.removeProperty('--animation-duration')
      root.classList.remove('reduce-motion')
    }

    // ハイコントラスト
    if (highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // 設定を保存
    localStorage.setItem('accessibility', JSON.stringify({
      fontSize,
      reducedMotion,
      highContrast
    }))
  }, [fontSize, reducedMotion, highContrast])

  // 設定を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('accessibility')
    if (saved) {
      const settings = JSON.parse(saved)
      setFontSize(settings.fontSize || 'normal')
      setReducedMotion(settings.reducedMotion || false)
      setHighContrast(settings.highContrast || false)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="アクセシビリティ設定"
      >
        <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
              アクセシビリティ設定
            </h3>

            {/* フォントサイズ */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Type className="h-4 w-4" />
                文字サイズ
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize('small')}
                  className={`px-3 py-1 text-sm rounded ${
                    fontSize === 'small'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  小
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-3 py-1 text-sm rounded ${
                    fontSize === 'normal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  標準
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-3 py-1 text-sm rounded ${
                    fontSize === 'large'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  大
                </button>
              </div>
            </div>

            {/* アニメーション削減 */}
            <div className="mb-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  アニメーションを減らす
                </span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  reducedMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
                    reducedMotion ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
              </label>
            </div>

            {/* ハイコントラスト */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  ハイコントラストモード
                </span>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
                    highContrast ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}