import { BaseUrl } from "@/core/api/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.get(`${BaseUrl}/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: any) {
    console.error(
      "Error in Get Chats Route:",
      err?.response?.data || err.message,
    );

    return NextResponse.json(
      {
        message: "خطا در دریافت چت‌ها",
        error: err?.response?.data || err.message,
      },
      { status: err?.response?.status || 500 },
    );
  }
}
