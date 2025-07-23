import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRequiredRole } from "@/lib/permissions";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const campaign = await prisma.campaign.findUnique({
            where: { id: params.id },
            include: {
                client: true,
                budgets: true,
                results: true,
            }
        });

        if (!campaign) {
            return new NextResponse("Campaign not found", { status: 404 });
        }
        return NextResponse.json(campaign);

    } catch (error) {
        console.error(`[CAMPAIGN_GET_${params.id}]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "manager")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, purpose, startYear, startMonth, endYear, endMonth, totalBudget } = body;

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        name,
        purpose,
        startYear: startYear ? Number(startYear) : undefined,
        startMonth: startMonth ? Number(startMonth) : undefined,
        endYear: endYear ? Number(endYear) : undefined,
        endMonth: endMonth ? Number(endMonth) : undefined,
        totalBudget: Number(totalBudget),
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error(`[CAMPAIGN_UPDATE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!hasRequiredRole(session, "admin")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // TODO: Add check for related budgets/results before deleting
    
    await prisma.campaign.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`[CAMPAIGN_DELETE_${params.id}]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 