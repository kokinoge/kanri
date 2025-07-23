"use client";

import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface AutoSaveContextType {
  enableAutoSave: (key: string, data: any, saveFunction: (data: any) => Promise<void>) => void;
  disableAutoSave: (key: string) => void;
  saveNow: (key: string) => Promise<void>;
  clearAutoSave: (key: string) => void;
}

const AutoSaveContext = createContext<AutoSaveContextType | null>(null);

export function useAutoSave() {
  const context = useContext(AutoSaveContext);
  if (!context) {
    throw new Error('useAutoSave must be used within an AutoSaveProvider');
  }
  return context;
}

interface AutoSaveItem {
  key: string;
  data: any;
  saveFunction: (data: any) => Promise<void>;
  lastSaved: number;
  isDirty: boolean;
  saveTimeout?: NodeJS.Timeout;
}

export function AutoSaveProvider({ children }: { children: React.ReactNode }) {
  const autoSaveItems = useRef<Map<string, AutoSaveItem>>(new Map());
  const isOnline = useRef(true);

  // オンライン状態の監視
  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      // オンラインになったら未保存のアイテムを保存
      autoSaveItems.current.forEach(async (item) => {
        if (item.isDirty) {
          try {
            await item.saveFunction(item.data);
            item.isDirty = false;
            item.lastSaved = Date.now();
          } catch (error) {
            console.error('Auto-save failed:', error);
          }
        }
      });
    };

    const handleOffline = () => {
      isOnline.current = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ページを離れる前の警告
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasUnsavedChanges = Array.from(autoSaveItems.current.values()).some(item => item.isDirty);
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '保存されていない変更があります。ページを離れますか？';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const enableAutoSave = useCallback((key: string, data: any, saveFunction: (data: any) => Promise<void>) => {
    const existingItem = autoSaveItems.current.get(key);
    
    // 既存のタイムアウトをクリア
    if (existingItem?.saveTimeout) {
      clearTimeout(existingItem.saveTimeout);
    }

    // 新しいアイテムを作成または更新
    const item: AutoSaveItem = {
      key,
      data,
      saveFunction,
      lastSaved: existingItem?.lastSaved || 0,
      isDirty: true,
      saveTimeout: undefined
    };

    // 3秒後に自動保存
    item.saveTimeout = setTimeout(async () => {
      if (isOnline.current) {
        try {
          await saveFunction(data);
          item.isDirty = false;
          item.lastSaved = Date.now();
          toast.success('自動保存しました', { duration: 2000 });
        } catch (error) {
          console.error('Auto-save failed:', error);
          toast.error('自動保存に失敗しました');
        }
      } else {
        toast.warning('オフラインのため保存できません');
      }
    }, 3000);

    autoSaveItems.current.set(key, item);
  }, []);

  const disableAutoSave = useCallback((key: string) => {
    const item = autoSaveItems.current.get(key);
    if (item?.saveTimeout) {
      clearTimeout(item.saveTimeout);
    }
    autoSaveItems.current.delete(key);
  }, []);

  const saveNow = useCallback(async (key: string) => {
    const item = autoSaveItems.current.get(key);
    if (!item) return;

    if (item.saveTimeout) {
      clearTimeout(item.saveTimeout);
    }

    try {
      await item.saveFunction(item.data);
      item.isDirty = false;
      item.lastSaved = Date.now();
      toast.success('保存しました');
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('保存に失敗しました');
      throw error;
    }
  }, []);

  const clearAutoSave = useCallback((key: string) => {
    const item = autoSaveItems.current.get(key);
    if (item?.saveTimeout) {
      clearTimeout(item.saveTimeout);
    }
    autoSaveItems.current.delete(key);
  }, []);

  return (
    <AutoSaveContext.Provider
      value={{
        enableAutoSave,
        disableAutoSave,
        saveNow,
        clearAutoSave
      }}
    >
      {children}
    </AutoSaveContext.Provider>
  );
} 