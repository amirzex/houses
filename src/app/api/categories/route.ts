import { BaseUrl } from "@/core/api/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const sort = searchParams.get("sort") ?? "name";
  const order = searchParams.get("order") ?? "DESC";
  const name = searchParams.get("name");

  const backendUrl = new URL(`${BaseUrl}/api/categories`);
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  backendUrl.searchParams.set("sort", sort);
  backendUrl.searchParams.set("order", order);

  if (name && name.trim() !== "") {
    backendUrl.searchParams.set("name", name);
  }

  try {
    const response = await fetch(backendUrl.toString(), {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch categories from backend" },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json());
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message },
      { status: 500 },
    );
  }
}
