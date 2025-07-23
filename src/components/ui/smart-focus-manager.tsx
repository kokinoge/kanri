"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

interface FocusStackItem {
  element: HTMLElement;
  restoreTo?: HTMLElement;
  trapFocus?: boolean;
}

interface SmartFocusContextType {
  pushFocusStack: (element: HTMLElement, options?: { restoreTo?: HTMLElement; trapFocus?: boolean }) => void;
  popFocusStack: () => void;
  clearFocusStack: () => void;
  focusFirstInput: (container?: HTMLElement) => boolean;
  focusLastInput: (container?: HTMLElement) => boolean;
  cycleFocus: (direction: 'forward' | 'backward', container?: HTMLElement) => void;
}

const SmartFocusContext = createContext<SmartFocusContextType | null>(null);

export function useSmartFocus() {
  const context = useContext(SmartFocusContext);
  if (!context) {
    throw new Error('useSmartFocus must be used within a SmartFocusProvider');
  }
  return context;
}

export function SmartFocusProvider({ children }: { children: React.ReactNode }) {
  const focusStack = useRef<FocusStackItem[]>([]);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // フォーカス可能な要素を取得
  const getFocusableElements = useCallback((container: HTMLElement = document.body) => {
    const focusableSelectors = [
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(',');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  // フォーカススタックにプッシュ
  const pushFocusStack = useCallback((element: HTMLElement, options?: { restoreTo?: HTMLElement; trapFocus?: boolean }) => {
    const currentFocused = document.activeElement as HTMLElement;
    
    focusStack.current.push({
      element,
      restoreTo: options?.restoreTo || currentFocused,
      trapFocus: options?.trapFocus || false
    });

    // 要素にフォーカス
    element.focus();
  }, []);

  // フォーカススタックからポップ
  const popFocusStack = useCallback(() => {
    const item = focusStack.current.pop();
    if (item?.restoreTo && document.contains(item.restoreTo)) {
      item.restoreTo.focus();
    }
  }, []);

  // フォーカススタックをクリア
  const clearFocusStack = useCallback(() => {
    focusStack.current = [];
  }, []);

  // 最初の入力要素にフォーカス
  const focusFirstInput = useCallback((container?: HTMLElement) => {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);

  // 最後の入力要素にフォーカス
  const focusLastInput = useCallback((container?: HTMLElement) => {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);

  // フォーカスをサイクル
  const cycleFocus = useCallback((direction: 'forward' | 'backward', container?: HTMLElement) => {
    const focusableElements = getFocusableElements(container);
    const currentIndex = focusableElements.findIndex(el => el === document.activeElement);
    
    if (currentIndex === -1) {
      // 現在フォーカスされている要素がない場合は最初にフォーカス
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      return;
    }

    const nextIndex = direction === 'forward' 
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) % focusableElements.length;

    focusableElements[nextIndex].focus();
  }, [getFocusableElements]);

  // フォーカストラップの実装
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentStackItem = focusStack.current[focusStack.current.length - 1];
      
      if (!currentStackItem?.trapFocus) return;

      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements(currentStackItem.element);
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
          // Shift + Tab (逆方向)
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab (順方向)
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [getFocusableElements]);

  // フォーカス状態の追跡
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      lastFocusedElement.current = event.target as HTMLElement;
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);

  return (
    <SmartFocusContext.Provider
      value={{
        pushFocusStack,
        popFocusStack,
        clearFocusStack,
        focusFirstInput,
        focusLastInput,
        cycleFocus
      }}
    >
      {children}
    </SmartFocusContext.Provider>
  );
}

// フォーカストラップ用のカスタムフック
export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean = true) {
  const { pushFocusStack, popFocusStack } = useSmartFocus();

  useEffect(() => {
    if (isActive && ref.current) {
      pushFocusStack(ref.current, { trapFocus: true });
      return () => popFocusStack();
    }
  }, [isActive, ref, pushFocusStack, popFocusStack]);
} 