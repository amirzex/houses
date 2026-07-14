import { BaseUrl } from "@/core/api/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "احراز هویت انجام نشده است" },
      { status: 401 },
    );
  }

  try {
    const response = await axios.delete(`${BaseUrl}/api/houses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error in DELETE handler:",
      error.response?.data || error.message,
    );

    return NextResponse.json(
      { error: "خطا در حذف ملک از سرور" },
      { status: error.response?.status || 500 },
    );
  }
}
