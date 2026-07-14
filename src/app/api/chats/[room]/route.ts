
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/client";


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ room: string }> },
) {
  const { room } = await context.params;


  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authentication token is missing" },
      { status: 401 },
    );
  }

  try {
    const response = await axios.get(`${BaseUrl}/api/chats/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error fetching chat history:",
      error.response?.data || error.message,
    );
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 },
    );
  }
}


