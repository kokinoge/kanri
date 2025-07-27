import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { auth } from "@/auth"; // 一時的に無効化
import { hasRequiredRole } from "@/lib/permissions";

// Dynamic server usageを回避
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clientId = searchParams.get("clientId");

    const where = clientId ? { clientId } : {};

    const projects = await prisma.project.findMany({
      where,
      include: {
        client: {
          include: {
            manager: true,
          },
        },
      },
      orderBy: [
        { startYear: "desc" },
        { startMonth: "desc" },
      ],
    });

    // totalBudgetを数値型に変換
    const projectsWithNumberBudget = projects.map(project => ({
      ...project,
      totalBudget: Number(project.totalBudget) || 0
    }));

    return NextResponse.json(projectsWithNumberBudget);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 認証チェック
    // const session = await auth(); // 一時的に無効化
    // if (!hasRequiredRole(session, "manager")) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { 
      clientId, 
      name, 
      productName,
      productCategory,
      productDescription,
      purpose, 
      startYear, 
      startMonth, 
      endYear, 
      endMonth, 
      totalBudget 
    } = body;

    if (!clientId || !name || !startYear || !startMonth || !totalBudget) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 2025年以降の制限
    if (startYear < 2025) {
      return new NextResponse("Start year must be 2025 or later", { status: 400 });
    }

    // 月の範囲チェック
    if (startMonth < 1 || startMonth > 12) {
      return new NextResponse("Start month must be between 1 and 12", { status: 400 });
    }

    if (endYear && endMonth) {
      if (endYear < 2025) {
        return new NextResponse("End year must be 2025 or later", { status: 400 });
      }
      if (endMonth < 1 || endMonth > 12) {
        return new NextResponse("End month must be between 1 and 12", { status: 400 });
      }
    }

    const project = await prisma.project.create({
      data: {
        clientId,
        name,
        productName,
        productCategory,
        productDescription,
        purpose,
        startYear: Number(startYear),
        startMonth: Number(startMonth),
        endYear: endYear ? Number(endYear) : null,
        endMonth: endMonth ? Number(endMonth) : null,
        totalBudget: Number(totalBudget),
      },
      include: {
        client: {
          include: {
            manager: true,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 