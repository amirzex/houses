import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${BaseUrl}/api/auth/complete-registration`,
      body,
    );

    const data = response.data;

    const res = NextResponse.json({ success: true });

    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    res.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Registration failed" },
      { status: error.response?.status || 500 },
    );
  }
}
