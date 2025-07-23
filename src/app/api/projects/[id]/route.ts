import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: params.id },
            include: {
                client: {
                    include: {
                        manager: true,
                    },
                },
                budgets: true,
                results: true,
                projectKpis: true,
            }
        });

        if (!project) {
            return new NextResponse("Project not found", { status: 404 });
        }

        // Decimal型を数値に変換
        const projectWithNumbers = {
            ...project,
            totalBudget: Number(project.totalBudget),
            budgets: project.budgets.map(budget => ({
                ...budget,
                amount: Number(budget.amount),
                targetValue: budget.targetValue ? Number(budget.targetValue) : null,
            })),
            results: project.results.map(result => ({
                ...result,
                actualSpend: Number(result.actualSpend),
                actualResult: Number(result.actualResult),
            })),
            projectKpis: project.projectKpis.map(kpi => ({
                ...kpi,
                targetValue: Number(kpi.targetValue),
                actualValue: kpi.actualValue ? Number(kpi.actualValue) : null,
            })),
        };

        return NextResponse.json(projectWithNumbers);

    } catch (error) {
        console.error(`[PROJECT_GET_${params.id}]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const body = await request.json();
        const { 
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

        const project = await prisma.project.update({
            where: { id: params.id },
            data: {
                name,
                productName,
                productCategory,
                productDescription,
                purpose,
                startYear: startYear ? Number(startYear) : undefined,
                startMonth: startMonth ? Number(startMonth) : undefined,
                endYear: endYear ? Number(endYear) : null,
                endMonth: endMonth ? Number(endMonth) : null,
                totalBudget: totalBudget ? Number(totalBudget) : undefined,
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
        console.error(`[PROJECT_PUT_${params.id}]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        await prisma.project.delete({
            where: { id: params.id },
        });

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error(`[PROJECT_DELETE_${params.id}]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
} 