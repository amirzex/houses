import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    
    const { id } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "توکن معتبر یافت نشد" },
        { status: 401 },
      );
    }

    const targetUrl = `${BaseUrl}/api/maintenance-requests/${id}`;

    const response = await axios.delete(targetUrl, {
      headers: {
        accept: "application/json", 
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
   
    console.error("Internal Server Error Details:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    return NextResponse.json(
      {
        message: "Error communicating with backend",
        details: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
