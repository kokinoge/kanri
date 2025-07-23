import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

export async function GET(request: Request) {
  try {
    // 一時的に認証チェックをスキップ（開発時のみ）
    /*
    const session = await auth();
    if (!hasRequiredRole(session, "member")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    */

    const clients = await prisma.client.findMany({
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("[CLIENTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, managerId, priority, businessDivision, salesDepartment, agency, salesChannel } = body;

    if (!name) {
      return new NextResponse("Client name is required", { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name,
        managerId: managerId || null,
        priority: priority || undefined,
        businessDivision: businessDivision || null,
        salesDepartment: salesDepartment || null,
        agency: agency || null,
        salesChannel: salesChannel || null,
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("[CLIENTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 