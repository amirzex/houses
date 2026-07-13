import { NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";
import { cookies } from "next/headers";


type CreateMaintenanceBody = {
  houseId: number;
  description: string;
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateMaintenanceBody;

    if (
      typeof body?.houseId !== "number" ||
      !Number.isFinite(body.houseId) ||
      typeof body?.description !== "string" ||
      !body.description.trim()
    ) {
      return NextResponse.json(
        { message: "Invalid body. Expected { houseId: number, description: string }" },
        { status: 400 },
      );
    }

    const response = await axios.post(
      `${BaseUrl}/api/maintenance-requests`,
      {
        houseId: body.houseId,
        description: body.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error(
      "POST maintenance-requests error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message: "Error creating maintenance request",
        details: error?.response?.data?.message || "Internal Server Error",
      },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(`${BaseUrl}/api/maintenance-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "GET maintenance-requests error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message: "Error fetching maintenance requests",
        details: error?.response?.data?.message || "Internal Server Error",
      },
      { status: error?.response?.status || 500 },
    );
  }
}
