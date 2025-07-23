"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { HelpCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface HelpItem {
  id: string;
  trigger: string; // CSS selector for the element that triggers this help
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showOnHover?: boolean;
  showOnFocus?: boolean;
  showOnClick?: boolean;
  priority?: number; // Higher priority helps shown first
}

interface ContextualHelpContextType {
  registerHelp: (help: HelpItem) => void;
  unregisterHelp: (id: string) => void;
  showHelp: (id: string) => void;
  hideHelp: (id: string) => void;
  isGuideModeActive: boolean;
  startGuideMode: () => void;
  endGuideMode: () => void;
}

const ContextualHelpContext = createContext<ContextualHelpContextType | null>(null);

export function useContextualHelp() {
  const context = useContext(ContextualHelpContext);
  if (!context) {
    throw new Error('useContextualHelp must be used within a ContextualHelpProvider');
  }
  return context;
}

export function ContextualHelpProvider({ children }: { children: React.ReactNode }) {
  const [helpItems, setHelpItems] = useState<HelpItem[]>([]);
  const [activeHelp, setActiveHelp] = useState<string | null>(null);
  const [isGuideModeActive, setIsGuideModeActive] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const registerHelp = (help: HelpItem) => {
    setHelpItems(prev => [...prev.filter(h => h.id !== help.id), help]);
  };

  const unregisterHelp = (id: string) => {
    setHelpItems(prev => prev.filter(h => h.id !== id));
  };

  const showHelp = (id: string) => {
    const helpItem = helpItems.find(h => h.id === id);
    if (helpItem) {
      const element = document.querySelector(helpItem.trigger);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        });
      }
      setActiveHelp(id);
    }
  };

  const hideHelp = (id: string) => {
    if (activeHelp === id) {
      setActiveHelp(null);
    }
  };

  const startGuideMode = () => {
    setIsGuideModeActive(true);
    setGuideStep(0);
    const sortedHelp = helpItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    if (sortedHelp.length > 0) {
      showHelp(sortedHelp[0].id);
    }
  };

  const endGuideMode = () => {
    setIsGuideModeActive(false);
    setActiveHelp(null);
    setGuideStep(0);
  };

  const nextGuideStep = () => {
    const sortedHelp = helpItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    if (guideStep < sortedHelp.length - 1) {
      const nextStep = guideStep + 1;
      setGuideStep(nextStep);
      showHelp(sortedHelp[nextStep].id);
    } else {
      endGuideMode();
    }
  };

  const prevGuideStep = () => {
    if (guideStep > 0) {
      const prevStep = guideStep - 1;
      setGuideStep(prevStep);
      const sortedHelp = helpItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      showHelp(sortedHelp[prevStep].id);
    }
  };

  // イベントリスナーの設定
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (isGuideModeActive) return;
      
      const target = event.target as Element;
      const helpItem = helpItems.find(help => 
        help.showOnHover && target.matches(help.trigger)
      );
      
      if (helpItem) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => showHelp(helpItem.id), 500);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (isGuideModeActive) return;
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const target = event.target as Element;
      const helpItem = helpItems.find(help => 
        help.showOnHover && target.matches(help.trigger)
      );
      
      if (helpItem) {
        setTimeout(() => hideHelp(helpItem.id), 200);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      if (isGuideModeActive) return;
      
      const target = event.target as Element;
      const helpItem = helpItems.find(help => 
        help.showOnFocus && target.matches(help.trigger)
      );
      
      if (helpItem) {
        showHelp(helpItem.id);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      if (isGuideModeActive) return;
      
      const target = event.target as Element;
      const helpItem = helpItems.find(help => 
        help.showOnFocus && target.matches(help.trigger)
      );
      
      if (helpItem) {
        hideHelp(helpItem.id);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (isGuideModeActive) return;
      
      const target = event.target as Element;
      const helpItem = helpItems.find(help => 
        help.showOnClick && target.matches(help.trigger)
      );
      
      if (helpItem) {
        showHelp(helpItem.id);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
      document.removeEventListener('click', handleClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [helpItems, isGuideModeActive]);

  const activeHelpItem = helpItems.find(h => h.id === activeHelp);

  return (
    <ContextualHelpContext.Provider
      value={{
        registerHelp,
        unregisterHelp,
        showHelp,
        hideHelp,
        isGuideModeActive,
        startGuideMode,
        endGuideMode
      }}
    >
      {children}
      
      {/* ヘルプトリガーボタン */}
      <button
        onClick={startGuideMode}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 transition-all duration-200"
        title="ヘルプモードを開始"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* アクティブなヘルプ表示 */}
      {activeHelpItem && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl max-w-sm p-4"
          style={{
            left: tooltipPosition.x - 150,
            top: tooltipPosition.y - 100
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{activeHelpItem.title}</h3>
            <button
              onClick={() => isGuideModeActive ? endGuideMode() : hideHelp(activeHelpItem.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{activeHelpItem.content}</p>
          
          {isGuideModeActive && (
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={prevGuideStep}
                  disabled={guideStep === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={nextGuideStep}
                >
                  {guideStep === helpItems.length - 1 ? '完了' : '次へ'}
                  {guideStep !== helpItems.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
              </div>
              <span className="text-xs text-gray-500">
                {guideStep + 1} / {helpItems.length}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ガイドモード時のオーバーレイ */}
      {isGuideModeActive && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30" />
      )}
    </ContextualHelpContext.Provider>
  );
}

// 便利なフック：コンポーネントがマウントされたときにヘルプを登録
export function useRegisterHelp(helpItem: HelpItem) {
  const { registerHelp, unregisterHelp } = useContextualHelp();

  useEffect(() => {
    registerHelp(helpItem);
    return () => unregisterHelp(helpItem.id);
  }, [helpItem.id, helpItem.trigger, helpItem.title, helpItem.content, registerHelp, unregisterHelp]);
} 