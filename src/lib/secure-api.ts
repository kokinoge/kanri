import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabase"

export type Role = "admin" | "manager" | "member"

export interface SecureSession {
  user: {
    id: string
    email: string
    role: Role
    department: string | null
    is_active: boolean
  }
}

// 🔒 セキュアな認証チェッククラス
export class SecureAPIAuth {
  static async validateSession(request: NextRequest): Promise<SecureSession | null> {
    try {
      const session = await auth()
      
      if (!session?.user?.id) {
        return null
      }
      
      // 🛡️ Supabase RLS を通した安全なユーザー情報取得
      const { data: userData, error } = await supabaseAdmin
        .from('users')
        .select('id, email, role, department, is_active')
        .eq('id', session.user.id)
        .single()
      
      if (error || !userData || !userData.is_active) {
        console.error('User validation failed:', error)
        return null
      }
      
      return {
        user: userData as SecureSession['user']
      }
    } catch (error) {
      console.error('Session validation error:', error)
      return null
    }
  }

  static hasRequiredRole(session: SecureSession | null, requiredRole: Role): boolean {
    if (!session?.user?.role) {
      return false
    }

    const roleHierarchy: Record<Role, number> = {
      admin: 3,
      manager: 2,
      member: 1,
    }

    const userLevel = roleHierarchy[session.user.role]
    const requiredLevel = roleHierarchy[requiredRole]

    return userLevel >= requiredLevel
  }

  static async requireAuth(
    request: NextRequest,
    requiredRole: Role = "member"
  ): Promise<{ session: SecureSession } | NextResponse> {
    const session = await this.validateSession(request)
    
    if (!session) {
      return new NextResponse("Unauthorized: No valid session", { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer realm="API"',
        }
      })
    }

    if (!this.hasRequiredRole(session, requiredRole)) {
      return new NextResponse(`Forbidden: Requires ${requiredRole} role or higher`, { 
        status: 403 
      })
    }

    return { session }
  }
}

// 🛡️ セキュアなAPIレスポンスヘルパー
export class SecureAPIResponse {
  static success<T>(data: T, message?: string) {
    return NextResponse.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    })
  }

  static error(message: string, status: number = 500, details?: any) {
    const response = {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && details && { details }),
    }
    
    return NextResponse.json(response, { status })
  }

  static unauthorized(message: string = "認証が必要です") {
    return this.error(message, 401)
  }

  static forbidden(message: string = "権限が不足しています") {
    return this.error(message, 403)
  }

  static notFound(message: string = "リソースが見つかりません") {
    return this.error(message, 404)
  }

  static badRequest(message: string = "リクエストが無効です", details?: any) {
    return this.error(message, 400, details)
  }
}

// 🔍 リクエスト監査ロガー
export class SecurityAuditLogger {
  static async logAPIAccess(
    request: NextRequest,
    session: SecureSession | null,
    operation: string,
    result: 'success' | 'error' | 'forbidden',
    details?: any
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user_id: session?.user?.id || null,
      user_role: session?.user?.role || null,
      ip_address: request.ip || 
                  request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
      method: request.method,
      path: request.nextUrl.pathname,
      operation,
      result,
      details: details ? JSON.stringify(details) : null,
    }
    
    try {
      // 本番環境では外部ログシステムに送信
      if (process.env.NODE_ENV === 'production') {
        await supabaseAdmin
          .from('audit_logs')
          .insert({
            user_id: logEntry.user_id,
            table_name: 'api_access',
            operation: logEntry.operation,
            new_data: logEntry,
          })
      } else {
        console.log('🔍 API Access Log:', logEntry)
      }
    } catch (error) {
      console.error('Failed to log API access:', error)
    }
  }
}

// 🚨 レート制限（基本実装）
export class RateLimiter {
  private static requests = new Map<string, number[]>()
  
  static isAllowed(
    identifier: string,
    windowMs: number = 60000, // 1分
    maxRequests: number = 100
  ): boolean {
    const now = Date.now()
    const windowStart = now - windowMs
    
    // 既存のリクエスト履歴を取得
    const requests = this.requests.get(identifier) || []
    
    // 時間窓外のリクエストを除去
    const validRequests = requests.filter(time => time > windowStart)
    
    // 制限チェック
    if (validRequests.length >= maxRequests) {
      return false
    }
    
    // 新しいリクエストを記録
    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    
    return true
  }
  
  static getRemainingRequests(
    identifier: string,
    windowMs: number = 60000,
    maxRequests: number = 100
  ): number {
    const now = Date.now()
    const windowStart = now - windowMs
    const requests = this.requests.get(identifier) || []
    const validRequests = requests.filter(time => time > windowStart)
    
    return Math.max(0, maxRequests - validRequests.length)
  }
}

// 🛡️ セキュアAPIデコレーター（高階関数）
export function withSecureAPI(
  handler: (request: NextRequest, context: { session: SecureSession }) => Promise<NextResponse>,
  options: {
    requiredRole?: Role
    rateLimit?: { windowMs: number; maxRequests: number }
    auditOperation?: string
  } = {}
) {
  return async (request: NextRequest) => {
    const startTime = Date.now()
    let session: SecureSession | null = null
    
    try {
      // 🚨 レート制限チェック
      if (options.rateLimit) {
        const identifier = request.ip || 
                          request.headers.get('x-forwarded-for') || 
                          'unknown'
        
        if (!RateLimiter.isAllowed(
          identifier, 
          options.rateLimit.windowMs, 
          options.rateLimit.maxRequests
        )) {
          await SecurityAuditLogger.logAPIAccess(
            request,
            null,
            options.auditOperation || 'rate_limited',
            'error',
            { reason: 'Rate limit exceeded' }
          )
          
          return SecureAPIResponse.error(
            "Rate limit exceeded. Please try again later.",
            429
          )
        }
      }
      
      // 🔒 認証・認可チェック
      const authResult = await SecureAPIAuth.requireAuth(
        request,
        options.requiredRole || "member"
      )
      
      if (authResult instanceof NextResponse) {
        await SecurityAuditLogger.logAPIAccess(
          request,
          null,
          options.auditOperation || 'unauthorized',
          'forbidden'
        )
        return authResult
      }
      
      session = authResult.session
      
      // 🎯 ハンドラー実行
      const response = await handler(request, { session })
      
      // 📊 成功ログ
      await SecurityAuditLogger.logAPIAccess(
        request,
        session,
        options.auditOperation || 'api_call',
        'success',
        { 
          duration_ms: Date.now() - startTime,
          status: response.status 
        }
      )
      
      return response
      
    } catch (error) {
      console.error('API Error:', error)
      
      await SecurityAuditLogger.logAPIAccess(
        request,
        session,
        options.auditOperation || 'api_error',
        'error',
        { 
          error: error instanceof Error ? error.message : 'Unknown error',
          duration_ms: Date.now() - startTime 
        }
      )
      
      return SecureAPIResponse.error(
        "Internal Server Error",
        500,
        process.env.NODE_ENV === 'development' ? error : undefined
      )
    }
  }
} 