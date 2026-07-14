import { NextResponse } from "next/server";
import { mockBffResponse, USE_MOCK } from "@/mocks/bff";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (USE_MOCK) {
      const mocked = mockBffResponse("post", "/api/payments/verify", body);
      if (mocked) return mocked;
    }

    const status = body.status === "success" ? "success" : "failed";
    return NextResponse.json({
      payment: {
        id: Number(body.paymentId),
        status,
      },
      status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Request failed" },
      { status: 500 },
    );
  }
}
