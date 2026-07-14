import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/client";
import { mockBffResponse } from "@/mocks/bff";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mock = mockBffResponse(
      "get",
      `/api/payments?${searchParams.toString()}`,
    );
    if (mock) return mock;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const status = searchParams.get("status") ?? "";
    const sort = searchParams.get("sort") ?? "createdAt";
    const order = searchParams.get("order") ?? "DESC";

    const url = `${BaseUrl}/api/payments?page=${page}&limit=${limit}&status=${status}&sort=${sort}&order=${order}`;

    const response = await axios.get(url, {
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
    const body = await request.json();
    const mock = mockBffResponse("post", "/api/payments", body);
    if (mock) return mock;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.post(`${BaseUrl}/api/payments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("TOKEN:", token);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Request failed" },
      { status: error.response?.status || 500 },
    );
  }
}
