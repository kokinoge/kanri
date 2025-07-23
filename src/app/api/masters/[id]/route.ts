import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "admin")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { value, order } = body;

    const master = await prisma.master.update({
      where: { id },
      data: {
        value,
        order,
      },
    });

    return NextResponse.json(master);
  } catch (error) {
    console.error(`[MASTER_UPDATE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "admin")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    await prisma.master.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`[MASTER_DELETE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 