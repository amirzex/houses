import axios, { type InternalAxiosRequestConfig } from "axios";
import { handleMockRequest } from "./router";

/** Default ON so the site works while the real API is down. Set NEXT_PUBLIC_USE_MOCK=false to use real API. */
export const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK !== "false" &&
  process.env.USE_MOCK !== "false";

/** Auth cookie routes must hit Next BFF so httpOnly cookies can be set. */
const PASSTHROUGH_PREFIXES = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/complete-registration",
  "/api/me",
];

function shouldPassthrough(url?: string): boolean {
  if (!url) return false;
  return PASSTHROUGH_PREFIXES.some((p) => url.includes(p));
}

let installed = false;

export function enableMockApi() {
  if (!USE_MOCK || installed) return;
  installed = true;

  const realAdapter = axios.getAdapter(["xhr", "http", "fetch"]);

  axios.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
    if (shouldPassthrough(config.url)) {
      return realAdapter(config);
    }

    const result = handleMockRequest(config);

    return {
      data: result.data,
      status: result.status,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-mock-api": "true",
      },
      config,
      request: {},
    };
  };

  if (typeof console !== "undefined") {
    console.info(
      "[mock-api] Enabled — all axios API calls use local mock data. Set NEXT_PUBLIC_USE_MOCK=false to disable.",
    );
  }
}
