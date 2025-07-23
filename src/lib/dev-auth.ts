/**
 * 開発環境用のフォールバック認証機能
 * NextAuth.jsでエラーが発生した場合の代替認証を提供
 */

interface DevUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const DEV_USERS: DevUser[] = [
  {
    id: "dev-admin",
    name: "開発用管理者",
    email: "dev-admin@kanri.local",
    role: "admin"
  },
  {
    id: "dev-manager",
    name: "開発用マネージャー",
    email: "dev-manager@kanri.local", 
    role: "manager"
  },
  {
    id: "dev-member",
    name: "開発用メンバー",
    email: "dev-member@kanri.local",
    role: "member"
  }
];

export const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

export const getDevSession = (userRole: "admin" | "manager" | "member" = "admin") => {
  if (!isDevelopment()) {
    return null;
  }

  const user = DEV_USERS.find(u => u.role === userRole) || DEV_USERS[0];
  
  return {
    user: {
      ...user,
      image: null,
      emailVerified: null
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24時間後
  };
};

export const createDevAuthWrapper = <T>(
  authFunction: () => Promise<T | null>,
  fallbackRole: "admin" | "manager" | "member" = "admin"
) => {
  return async (): Promise<T | null> => {
    try {
      const result = await authFunction();
      return result;
    } catch (error) {
      console.warn("[DEV-AUTH] 認証エラーが発生しました。開発環境用のフォールバック認証を使用します:", error);
      
      if (isDevelopment()) {
        return getDevSession(fallbackRole) as T;
      }
      
      throw error;
    }
  };
}; 