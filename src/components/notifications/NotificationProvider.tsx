"use client"

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  timestamp: Date
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showToast, setShowToast] = useState<string | null>(null)

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
    setShowToast(newNotification.id)
    
    // 5秒後にトーストを自動的に非表示
    setTimeout(() => {
      setShowToast(null)
    }, 5000)
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  // WebSocketやイベントリスナーをここで設定（実装例）
  useEffect(() => {
    // 例: 定期的にサーバーから通知を取得
    const checkNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/check')
        if (response.ok) {
          const data = await response.json()
          if (data.hasNewNotifications) {
            data.notifications.forEach((notif: any) => {
              addNotification({
                type: notif.type,
                title: notif.title,
                message: notif.message
              })
            })
          }
        }
      } catch (error) {
        console.error('Failed to check notifications:', error)
      }
    }

    // 30秒ごとにチェック
    const interval = setInterval(checkNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [addNotification])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
      
      {/* トースト通知 */}
      {showToast && notifications.find(n => n.id === showToast) && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-up">
          <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
            <div className="flex items-start gap-3">
              {getIcon(notifications.find(n => n.id === showToast)!.type)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {notifications.find(n => n.id === showToast)!.title}
                </h4>
                {notifications.find(n => n.id === showToast)!.message && (
                  <p className="mt-1 text-sm text-gray-600">
                    {notifications.find(n => n.id === showToast)!.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowToast(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}