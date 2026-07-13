import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/client";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${BaseUrl}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET /api/admin/users error:", error);

    return NextResponse.json(
      { message: "خطا در دریافت لیست رزروها" },
      { status: 500 },
    );
  }
}
