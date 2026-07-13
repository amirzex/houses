import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authentication token is missing" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    const response = await axios.put(`${BaseUrl}/api/chats/edit/${id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error updating chat:",
      error.response?.data || error.message,
    );

    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Failed to update chat" },
      { status: 500 },
    );
  }
}
