import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(`${BaseUrl}/api/auth/forgot-password/reset`, body);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Register failed" },
      { status: error.response?.status || 500 },
    );
  }
}
