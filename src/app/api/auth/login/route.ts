import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl, USE_MOCK } from "@/core/api/client";
import { createMockTokens, resolveMockUser } from "@/mocks/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (USE_MOCK) {
      const user = resolveMockUser(body?.email);
      const { accessToken, refreshToken } = createMockTokens(user);

      const nextResponse = NextResponse.json({
        message: "Login successful",
        user,
      });

      nextResponse.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      nextResponse.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return nextResponse;
    }

    const response = await axios.post(`${BaseUrl}/api/auth/login`, body);
    const data = response.data;

    const nextResponse = NextResponse.json({
      message: "Login successful",
      user: data.user,
    });

    nextResponse.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    nextResponse.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Login failed" },
      { status: error.response?.status || 500 },
    );
  }
}
