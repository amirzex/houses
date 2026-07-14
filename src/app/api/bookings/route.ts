import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/client";

export async function GET() {
  const cookieStore = await cookies();
  console.log("ALL COOKIES:", cookieStore.getAll());

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.get(`${BaseUrl}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Request failed" },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    
    const body = await request.json();

    const response = await axios.post(`${BaseUrl}/api/bookings`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Booking POST Error:", error.response?.data);
    return NextResponse.json(
      { message: error.response?.data?.message || "ثبت رزرو با خطا مواجه شد" },
      { status: error.response?.status || 500 },
    );
  }
}
