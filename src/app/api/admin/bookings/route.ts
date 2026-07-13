import { BaseUrl } from "@/core/api/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    const response = await fetch(`${BaseUrl}/api/admin/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET /api/admin/bookings error:", error);

    return NextResponse.json(
      {
        message: "خطا در دریافت لیست رزروها",
        success: false,
      },
      { status: 500 },
    );
  }
}
