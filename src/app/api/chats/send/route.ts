import { BaseUrl } from "@/core/api/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.post(`${BaseUrl}/api/chats/send`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (err: any) {
    console.error(
      "Error in Chat Send Route:",
      err?.response?.data || err.message,
    );


    return NextResponse.json(
      {
        message: "خطا در ارسال پیام به سرور",
        error: err?.response?.data || err.message,
      },
      { status: err?.response?.status || 500 },
    );
  }
}
