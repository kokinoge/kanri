import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { hasRequiredRole, canManageUser, Role } from "@/lib/permissions";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await auth();
    const { id } = params;
    const body = await request.json();
    const { name, role, department, isActive, password } = body;
    
    // 基本的な権限チェック
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
       return new NextResponse("User not found", { status: 404 });
    }

    if (!canManageUser(session, targetUser.role as Role)) {
       return new NextResponse("Forbidden", { status: 403 });
    }
    
    // Admin権限の付与はAdminのみ可能
    if (role === 'admin' && session?.user?.role !== 'admin') {
      return new NextResponse("Forbidden: Only admins can assign admin role", { status: 403 });
    }

    // バリデーション
    if (name !== undefined && (!name || name.trim() === "")) {
      return new NextResponse("Name cannot be empty", { status: 400 });
    }

    if (role !== undefined && !["admin", "manager", "member"].includes(role)) {
      return new NextResponse("Invalid role", { status: 400 });
    }

    if (password !== undefined && password !== "" && password.length < 8) {
      return new NextResponse("Password must be at least 8 characters", { status: 400 });
    }

    // 更新データの準備
    const updateData: any = {};
    
    if (name !== undefined) updateData.name = name.trim();
    if (role !== undefined) updateData.role = role;
    if (department !== undefined) updateData.department = department?.trim() || null;
    if (isActive !== undefined) updateData.isActive = isActive;

    // パスワードが提供されている場合のみハッシュ化して更新
    if (password && password !== "") {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // パスワードを除いてレスポンスを返す
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error(`[USER_UPDATE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();

    // 権限チェック
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // hasRequiredRoleの後ではsessionはnullではないが、型推論のためにチェック
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 自分自身は削除できないようにする
    if (session.user.id === params.id) {
      return new NextResponse("Cannot delete your own account", { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({ where: { id: params.id } });
    if (!targetUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!canManageUser(session, targetUser.role as Role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { id } = params;
    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`[USER_DELETE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 