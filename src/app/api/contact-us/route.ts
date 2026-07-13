import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export async function POST() {
  try {
    const response = await axios.post(`${BaseUrl}/api/contact-us`);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Verification failed" },
      { status: error.response?.status || 500 },
    );
  }
}
