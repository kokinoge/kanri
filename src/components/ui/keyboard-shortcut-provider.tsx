"use client";

import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ShortcutAction {
  id: string;
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
  global?: boolean; // グローバルショートカット（どこでも有効）
}

interface KeyboardShortcutContextType {
  registerShortcut: (shortcut: ShortcutAction) => void;
  unregisterShortcut: (id: string) => void;
  showShortcutHelp: () => void;
  isHelpVisible: boolean;
  setHelpVisible: (visible: boolean) => void;
}

const KeyboardShortcutContext = createContext<KeyboardShortcutContextType | null>(null);

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutProvider');
  }
  return context;
}

export function KeyboardShortcutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [shortcuts, setShortcuts] = useState<ShortcutAction[]>([]);
  const [isHelpVisible, setHelpVisible] = useState(false);

  // グローバルショートカットの定義
  useEffect(() => {
    const globalShortcuts: ShortcutAction[] = [
      {
        id: 'help',
        key: '?',
        shift: true,
        description: 'ショートカットヘルプを表示',
        action: () => setHelpVisible(true),
        global: true
      },
      {
        id: 'search',
        key: 'k',
        ctrl: true,
        description: 'グローバル検索',
        action: () => {
          // TODO: 検索モーダルを開く
          toast.info('グローバル検索（実装予定）');
        },
        global: true
      },
      {
        id: 'dashboard',
        key: 'd',
        ctrl: true,
        description: 'ダッシュボードに移動',
        action: () => router.push('/'),
        global: true
      },
      {
        id: 'campaigns',
        key: 'c',
        ctrl: true,
        description: '案件一覧に移動',
        action: () => router.push('/campaigns'),
        global: true
      },
      {
        id: 'budgets',
        key: 'b',
        ctrl: true,
        description: '予算管理に移動',
        action: () => router.push('/budgets'),
        global: true
      },
      {
        id: 'results',
        key: 'r',
        ctrl: true,
        description: '実績管理に移動',
        action: () => router.push('/results'),
        global: true
      },
      {
        id: 'data-tables',
        key: 't',
        ctrl: true,
        description: 'データテーブルに移動',
        action: () => router.push('/data-tables'),
        global: true
      },
      {
        id: 'new-campaign',
        key: 'n',
        ctrl: true,
        shift: true,
        description: '新しい案件を作成',
        action: () => router.push('/campaigns?new=true'),
        global: true
      }
    ];

    setShortcuts(prev => [...prev, ...globalShortcuts]);

    return () => {
      setShortcuts(prev => prev.filter(s => !s.global));
    };
  }, [router]);

  const registerShortcut = useCallback((shortcut: ShortcutAction) => {
    setShortcuts(prev => [...prev.filter(s => s.id !== shortcut.id), shortcut]);
  }, []);

  const unregisterShortcut = useCallback((id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  }, []);

  const showShortcutHelp = useCallback(() => {
    setHelpVisible(true);
  }, []);

  // キーボードイベントのハンドリング
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 入力フィールドにフォーカスがある場合は無視（一部の例外を除く）
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.getAttribute('contenteditable') === 'true'
      );

      if (isInputFocused && !event.ctrlKey && !event.metaKey && event.key !== 'Escape') {
        return;
      }

      // Escapeキーでヘルプを閉じる
      if (event.key === 'Escape' && isHelpVisible) {
        event.preventDefault();
        setHelpVisible(false);
        return;
      }

      // ショートカットを検索して実行
      for (const shortcut of shortcuts) {
        const ctrlPressed = event.ctrlKey || event.metaKey;
        const shiftPressed = event.shiftKey;
        const altPressed = event.altKey;

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!shortcut.ctrl === ctrlPressed &&
          !!shortcut.shift === shiftPressed &&
          !!shortcut.alt === altPressed
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, isHelpVisible]);

  return (
    <KeyboardShortcutContext.Provider
      value={{
        registerShortcut,
        unregisterShortcut,
        showShortcutHelp,
        isHelpVisible,
        setHelpVisible
      }}
    >
      {children}
      
      {/* ショートカットヘルプモーダル */}
      {isHelpVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">キーボードショートカット</h2>
              <button
                onClick={() => setHelpVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* グローバルショートカット */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">グローバル</h3>
                <div className="space-y-2">
                  {shortcuts.filter(s => s.global).map(shortcut => (
                    <div key={shortcut.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{shortcut.description}</span>
                      <div className="flex space-x-1">
                        {shortcut.ctrl && (
                          <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl</kbd>
                        )}
                        {shortcut.shift && (
                          <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Shift</kbd>
                        )}
                        {shortcut.alt && (
                          <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Alt</kbd>
                        )}
                        <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                          {shortcut.key.toUpperCase()}
                        </kbd>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ページ固有のショートカット */}
              {shortcuts.filter(s => !s.global).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">現在のページ</h3>
                  <div className="space-y-2">
                    {shortcuts.filter(s => !s.global).map(shortcut => (
                      <div key={shortcut.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">{shortcut.description}</span>
                        <div className="flex space-x-1">
                          {shortcut.ctrl && (
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl</kbd>
                          )}
                          {shortcut.shift && (
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Shift</kbd>
                          )}
                          {shortcut.alt && (
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Alt</kbd>
                          )}
                          <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                            {shortcut.key.toUpperCase()}
                          </kbd>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 一般的なブラウザショートカット */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-600">一般的なショートカット</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">フォーム送信</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">Enter</kbd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">モーダル・ダイアログを閉じる</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">Esc</kbd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">ページを戻る</span>
                    <div className="flex space-x-1">
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Alt</kbd>
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">←</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setHelpVisible(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </KeyboardShortcutContext.Provider>
  );
} 