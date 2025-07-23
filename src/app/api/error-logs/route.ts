import { NextResponse } from "next/server";
import { errorMonitor } from "@/lib/error-monitor";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as any;
    const level = searchParams.get('level') as any;
    const limit = parseInt(searchParams.get('limit') || '100');

    const logs = errorMonitor.getLogs(category, level, limit);
    const stats = errorMonitor.getErrorStats();

    return NextResponse.json({
      logs,
      stats,
      total: logs.length
    });
  } catch (error) {
    console.error("[ERROR_LOGS_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE() {
  try {
    errorMonitor.clearLogs();
    return NextResponse.json({ message: "ログがクリアされました" });
  } catch (error) {
    console.error("[ERROR_LOGS_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 