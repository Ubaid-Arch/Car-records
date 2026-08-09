import { NextResponse } from "next/server";
import { db } from "@/db";
import { sampleReportRequests } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    await db.insert(sampleReportRequests).values({
      name,
      email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sample report error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
