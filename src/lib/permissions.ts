// 一時的に認証を無効化（デプロイ用）
export type Role = "admin" | "manager" | "member";

export function hasRequiredRole(
  session: any,
  requiredRole: Role
): boolean {
  // 一時的に全てのアクセスを許可
  return true;
}

export function canManageUser(
  currentUserSession: any,
  targetUserRole: Role
): boolean {
  // 一時的に全ての管理操作を許可
  return true;
}

export function canAccessAdminFeatures(session: any): boolean {
  // 一時的に全ての管理機能アクセスを許可
  return true;
}

export function canAccessManagerFeatures(session: any): boolean {
  return hasRequiredRole(session, "manager");
} 