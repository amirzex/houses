import axios from "axios";

export const GetDashboardTrend = async () => {
  const Response = await axios.get("/api/dashboard/market-trends");

  return Response.data;
};
export const GetDashboardSummary = async () => {
  const Response = await axios.get("/api/dashboard/summary");

  return Response.data;
};
