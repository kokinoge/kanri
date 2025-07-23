import { Session } from "next-auth";
import { isDevelopment, getDevSession } from "./dev-auth";

export type Role = "admin" | "manager" | "member";

const roleHierarchy: Record<Role, number> = {
  admin: 3,
  manager: 2,
  member: 1,
};

export function hasRequiredRole(
  session: Session | null,
  requiredRole: Role
): boolean {
  // 開発環境でsessionがnullの場合、フォールバック認証を使用
  if (!session && isDevelopment()) {
    console.warn("[DEV-AUTH] セッションが null のため、開発環境用フォールバック認証を使用");
    const devSession = getDevSession("admin");
    if (devSession?.user?.role) {
      session = devSession as Session;
    }
  }

  if (!session?.user?.role) {
    return false;
  }

  const userRole = session.user.role as Role;
  const userLevel = roleHierarchy[userRole];
  const requiredLevel = roleHierarchy[requiredRole];

  return userLevel >= requiredLevel;
}

export function canManageUser(
  currentUserSession: Session | null,
  targetUserRole: Role
): boolean {
  if (!hasRequiredRole(currentUserSession, "admin")) {
    return false;
  }

  const currentUserRole = currentUserSession?.user?.role as Role;
  
  // adminは全てのユーザーを管理可能
  if (currentUserRole === "admin") {
    return true;
  }

  // managerは自分以下のレベルのユーザーのみ管理可能
  if (currentUserRole === "manager") {
    return roleHierarchy[targetUserRole] <= roleHierarchy["manager"];
  }

  return false;
}

export function canAccessAdminFeatures(session: Session | null): boolean {
  return hasRequiredRole(session, "admin");
}

export function canAccessManagerFeatures(session: Session | null): boolean {
  return hasRequiredRole(session, "manager");
} 