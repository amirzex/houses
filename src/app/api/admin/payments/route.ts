import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await axios.get(`${BaseUrl}/api/admin/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("GET payments error:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Error fetching payments" },
      { status: error?.response?.status || 500 }
    );
  }
}
