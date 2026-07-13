import { BaseUrl } from "@/core/api/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const sort = searchParams.get("sort") ?? "id";
  const order = searchParams.get("order") ?? "ASC";
  const area_name = searchParams.get("area_name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // ✅ ساخت URL بک‌اند
  const backendUrl = new URL(`${BaseUrl}/api/locations`);

  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  backendUrl.searchParams.set("sort", sort);
  backendUrl.searchParams.set("order", order);

  // ✅ فیلترهای اختیاری
  if (area_name && area_name.trim() !== "") {
    backendUrl.searchParams.set("area_name", area_name);
  }

  if (lat && lat.trim() !== "") {
    backendUrl.searchParams.set("lat", lat);
  }

  if (lng && lng.trim() !== "") {
    backendUrl.searchParams.set("lng", lng);
  }

  try {
    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // همیشه دیتای تازه
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch locations from backend" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message,
      },
      { status: 500 },
    );
  }
}
