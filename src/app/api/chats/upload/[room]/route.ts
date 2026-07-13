import { BaseUrl } from "@/core/api/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ room: string }> },
) {
  try {
    const resolvedParams = await params;
    const room = resolvedParams.room;

    const formData = await request.formData();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.post(
      `${BaseUrl}/api/chats/upload/${room}`,
      formData as any,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (err: any) {
    console.error(
      "Error in Chat Upload Route:",
      err.response?.data || err.message,
    );

    return NextResponse.json(
      {
        message: "خطا در پردازش آپلود فایل",
        error: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 },
    );
  }
}
