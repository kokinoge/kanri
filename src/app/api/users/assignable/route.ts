import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET() {
  try {
    const session = await auth();
    
    // デバッグログ追加
    console.log('[ASSIGNABLE_USERS] Session:', {
      hasSession: !!session,
      userId: session?.user?.id,
      userRole: session?.user?.role,
      userEmail: session?.user?.email
    });

    // より詳細な認証チェック
    if (!session || !session.user) {
      console.log('[ASSIGNABLE_USERS] No session or user');
      return new NextResponse("Unauthorized: No session", { status: 401 });
    }

    if (!session.user.role) {
      console.log('[ASSIGNABLE_USERS] No user role');
      return new NextResponse("Unauthorized: No role", { status: 401 });
    }

    if (!hasRequiredRole(session, "manager")) {
      console.log('[ASSIGNABLE_USERS] Insufficient role:', session.user.role);
      return new NextResponse("Unauthorized: Insufficient permissions", { status: 401 });
    }

    console.log('[ASSIGNABLE_USERS] Authorization successful');

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log('[ASSIGNABLE_USERS] Retrieved users:', users.length);

    return NextResponse.json(users);
  } catch (error) {
    console.error("[ASSIGNABLE_USERS_GET] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 