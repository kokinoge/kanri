import { NextResponse } from 'next/server';

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

/**
 * 成功レスポンスを返す
 */
export function successResponse<T>(data: T, message?: string): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  });
}

/**
 * エラーレスポンスを返す
 */
export function errorResponse(error: string, status: number = 500, code?: string, details?: any): NextResponse<ApiError> {
  return NextResponse.json({
    success: false,
    error,
    code,
    details
  }, { status });
}

/**
 * バリデーションエラーレスポンス
 */
export function validationError(message: string, details?: any): NextResponse<ApiError> {
  return errorResponse(message, 400, 'VALIDATION_ERROR', details);
}

/**
 * 認証エラーレスポンス
 */
export function unauthorizedError(message: string = '認証が必要です'): NextResponse<ApiError> {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * 権限エラーレスポンス
 */
export function forbiddenError(message: string = '権限がありません'): NextResponse<ApiError> {
  return errorResponse(message, 403, 'FORBIDDEN');
}

/**
 * Not Foundエラーレスポンス
 */
export function notFoundError(message: string = 'リソースが見つかりません'): NextResponse<ApiError> {
  return errorResponse(message, 404, 'NOT_FOUND');
}

/**
 * エラーハンドリング
 */
export function handleApiError(error: unknown): NextResponse<ApiError> {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    // Prismaのエラー処理
    if (error.message.includes('P2002')) {
      return validationError('既に存在するデータです', { code: 'P2002' });
    }
    if (error.message.includes('P2025')) {
      return notFoundError('データが見つかりません');
    }
    
    return errorResponse(error.message);
  }
  
  return errorResponse('予期しないエラーが発生しました');
}

/**
 * 認証チェック付きハンドラー
 */
export async function withAuth<T>(
  handler: (userId: string) => Promise<NextResponse<T>>,
  getSession: () => Promise<{ user?: { id?: string } } | null>
): Promise<NextResponse<T | ApiError>> {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return unauthorizedError();
    }
    return await handler(session.user.id);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * 権限チェック付きハンドラー
 */
export async function withRole<T>(
  handler: (userId: string, role: string) => Promise<NextResponse<T>>,
  getSession: () => Promise<{ user?: { id?: string; role?: string } } | null>,
  allowedRoles: string[]
): Promise<NextResponse<T | ApiError>> {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return unauthorizedError();
    }
    if (!session.user.role || !allowedRoles.includes(session.user.role)) {
      return forbiddenError();
    }
    return await handler(session.user.id, session.user.role);
  } catch (error) {
    return handleApiError(error);
  }
}