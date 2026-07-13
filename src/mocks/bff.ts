/**
 * Helper for Next BFF routes that use fetch() instead of axios.
 * Keeps existing proxy code; short-circuits to mock when USE_MOCK is on.
 */
import { NextResponse } from "next/server";
import { USE_MOCK } from "@/mocks/enableMock";
import { handleMockRequest } from "@/mocks/router";
import type { InternalAxiosRequestConfig } from "axios";

export { USE_MOCK };

export function mockBffResponse(
  method: string,
  pathWithQuery: string,
  body?: unknown,
) {
  if (!USE_MOCK) return null;

  const config = {
    method,
    url: pathWithQuery,
    data: body,
    headers: {},
  } as InternalAxiosRequestConfig;

  const result = handleMockRequest(config);
  return NextResponse.json(result.data, { status: result.status });
}
