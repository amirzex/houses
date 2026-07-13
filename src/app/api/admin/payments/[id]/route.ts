import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";
import { cookies } from "next/headers";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(
      `${BaseUrl}/api/admin/payments/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      `GET payment ${params?.id} error:`,
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error fetching payment" },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.put(
      `${BaseUrl}/api/admin/payments/${params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      `PUT payment ${params?.id} error:`,
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error updating payment" },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.delete(
      `${BaseUrl}/api/admin/payments/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      `PUT payment ${params?.id} error:`,
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error updating payment" },
      { status: error?.response?.status || 500 },
    );
  }
}
