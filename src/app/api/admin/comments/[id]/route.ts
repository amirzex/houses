import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(
      `${BaseUrl}/api/admin/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "GET comment by id error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error fetching comment" },
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
      `${BaseUrl}/api/admin/comments/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "DELETE comment error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error deleting comment" },
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

    const body = await req.json();

    const response = await axios.put(
      `${BaseUrl}/api/admin/comments/${params.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "UPDATE comment error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: "Error updating comment" },
      { status: error?.response?.status || 500 },
    );
  }
}
