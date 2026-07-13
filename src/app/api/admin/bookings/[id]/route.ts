import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/client";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${BaseUrl}/api/admin/bookings/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET admin booking by id error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت رزرو" },
      { status: 500 },
    );
  }
}

// const BaseUrl = "http://next.genzuni.website";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  console.log("TOKEN:", token);
  console.log("DELETE ID:", params.id);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${BaseUrl}/api/admin/bookings/${params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const body = await req.json();

    const response = await fetch(`${BaseUrl}/api/admin/bookings/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("PUT admin booking error:", error);
    return NextResponse.json(
      { message: "خطا در بروزرسانی رزرو" },
      { status: 500 },
    );
  }
}
