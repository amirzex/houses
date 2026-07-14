import { enableMockApi, USE_MOCK } from "@/mocks/enableMock";

// export const BaseUrl = "http://next.genzuni.website";
// export const BaseUrl = "http://188.121.111.8:3000";
export const BaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003";

/** Mock API is ON by default while the real backend is down. */
export { USE_MOCK };

enableMockApi();
