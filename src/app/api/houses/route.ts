import { BaseUrl } from "@/core/api/client";
import { NextResponse } from "next/server";

import axios from "axios";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit") ?? "10";
  const transactionType = searchParams.get("transactionType") ?? "rental";
  const sort = searchParams.get("sort") ?? "last_updated";
  const order = searchParams.get("order") ?? "DESC";

  const maxPrice = searchParams.get("maxPrice");
  const minRent = searchParams.get("minRent");
  const maxRent = searchParams.get("maxRent");
  const minMortgage = searchParams.get("minMortgage");
  const maxMortgage = searchParams.get("maxMortgage");
  const search = searchParams.get("search");

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  const minArea = searchParams.get("minArea");
  const maxArea = searchParams.get("maxArea");

  const backendUrl = new URL(`${BaseUrl}/api/houses`);

  backendUrl.searchParams.set("limit", limit);
  backendUrl.searchParams.set("transactionType", transactionType);
  backendUrl.searchParams.set("sort", sort);
  backendUrl.searchParams.set("order", order);

  const setIfPresent = (key: string, value: string | null) => {
    if (value !== null && value.trim() !== "") {
      backendUrl.searchParams.set(key, value);
    }
  };

  setIfPresent("maxPrice", maxPrice);
  setIfPresent("minRent", minRent);
  setIfPresent("maxRent", maxRent);
  setIfPresent("minMortgage", minMortgage);
  setIfPresent("maxMortgage", maxMortgage);
  setIfPresent("search", search);

  setIfPresent("location", location);
  setIfPresent("propertyType", propertyType);
  setIfPresent("minArea", minArea);
  setIfPresent("maxArea", maxArea);

  try {
    const response = await fetch(backendUrl.toString(), {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch houses from backend" },
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

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const body = await request.json();

    const response = await axios.post(`${BaseUrl}/api/houses`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(
      "Error creating house:",
      error.response?.data || error.message,
    );

    return NextResponse.json(
      {
        error: error.response?.data?.message || "خطا در ثبت ملک در سرور",
      },
      { status: error.response?.status || 500 },
    );
  }
}

