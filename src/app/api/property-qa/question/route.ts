import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("API called with:", body);

    return NextResponse.json({
      answer: `سوال شما: "${body.question}" برای خانه شماره ${body.houseId} دریافت شد.`,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "خطا در پردازش درخواست" },
      { status: 500 }
    );
  }
}
