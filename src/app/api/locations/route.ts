import { BaseUrl } from "@/core/api/client";
import { NextResponse } from "next/server";
import { mockBffResponse } from "@/mocks/bff";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mock = mockBffResponse(
    "get",
    `/api/locations?${searchParams.toString()}`,
  );
  if (mock) return mock;

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const sort = searchParams.get("sort") ?? "id";
  const order = searchParams.get("order") ?? "ASC";
  const area_name = searchParams.get("area_name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const backendUrl = new URL(`${BaseUrl}/api/locations`);

  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  backendUrl.searchParams.set("sort", sort);
  backendUrl.searchParams.set("order", order);

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
      cache: "no-store",
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
