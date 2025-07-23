/**
 * エラー監視とログ機能
 * 認証エラーやその他のシステムエラーを適切に記録・監視
 */

export interface ErrorLog {
  timestamp: string;
  level: "error" | "warn" | "info";
  category: "auth" | "api" | "database" | "client" | "system";
  message: string;
  error?: any;
  context?: Record<string, any>;
}

class ErrorMonitor {
  private logs: ErrorLog[] = [];
  private maxLogs: number = 1000;

  log(level: ErrorLog["level"], category: ErrorLog["category"], message: string, error?: any, context?: Record<string, any>) {
    const logEntry: ErrorLog = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      error: error ? this.sanitizeError(error) : undefined,
      context: context || {}
    };

    this.logs.unshift(logEntry);
    
    // ログの上限を維持
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // コンソールにも出力（開発環境のみ）
    if (process.env.NODE_ENV === "development") {
      const logMethod = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
      logMethod(`[${category.toUpperCase()}] ${message}`, error || "");
    }
  }

  private sanitizeError(error: any): any {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }
    return error;
  }

  // 認証関連のエラーログ
  authError(message: string, error?: any, context?: Record<string, any>) {
    this.log("error", "auth", message, error, context);
  }

  authWarning(message: string, context?: Record<string, any>) {
    this.log("warn", "auth", message, undefined, context);
  }

  // API関連のエラーログ
  apiError(message: string, error?: any, context?: Record<string, any>) {
    this.log("error", "api", message, error, context);
  }

  // データベース関連のエラーログ
  dbError(message: string, error?: any, context?: Record<string, any>) {
    this.log("error", "database", message, error, context);
  }

  // システム関連のエラーログ
  systemError(message: string, error?: any, context?: Record<string, any>) {
    this.log("error", "system", message, error, context);
  }

  // ログの取得
  getLogs(category?: ErrorLog["category"], level?: ErrorLog["level"], limit: number = 100): ErrorLog[] {
    let filteredLogs = this.logs;

    if (category) {
      filteredLogs = filteredLogs.filter(log => log.category === category);
    }

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level);
    }

    return filteredLogs.slice(0, limit);
  }

  // エラー統計
  getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    this.logs.forEach(log => {
      const key = `${log.category}_${log.level}`;
      stats[key] = (stats[key] || 0) + 1;
    });

    return stats;
  }

  // ログのクリア
  clearLogs() {
    this.logs = [];
  }
}

// シングルトンインスタンス
export const errorMonitor = new ErrorMonitor();

// 便利な関数エクスポート
export const logAuthError = (message: string, error?: any, context?: Record<string, any>) => {
  errorMonitor.authError(message, error, context);
};

export const logApiError = (message: string, error?: any, context?: Record<string, any>) => {
  errorMonitor.apiError(message, error, context);
};

export const logDbError = (message: string, error?: any, context?: Record<string, any>) => {
  errorMonitor.dbError(message, error, context);
};

export const logSystemError = (message: string, error?: any, context?: Record<string, any>) => {
  errorMonitor.systemError(message, error, context);
}; 