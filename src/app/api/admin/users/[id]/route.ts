// app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/client";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const response = await axios.put(`${BaseUrl}/api/admin/users/${id}/role`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "خطا در بروزرسانی" },
      { status: error.response?.status || 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const response = await axios.delete(`${BaseUrl}/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "خطا در حذف" },
      { status: error.response?.status || 500 },
    );
  }
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } },
// ) {
//   const { id } = await params;
//   const body = await request.json();
//   const token = (await cookies()).get("accessToken")?.value;

//   try {
//     const response = await axios.put(`${BaseUrl}/api/admin/users${id}`, body, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return NextResponse.json(response.data);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error.response?.data?.message || "خطا در تغییر نقش" },
//       { status: error.response?.status || 500 },
//     );
//   }
// }
