import jwt from "jsonwebtoken";
import { mockUsers } from "./data";

const MOCK_SECRET = "mock-api-secret";

export function resolveMockUser(email?: string) {
  const normalized = String(email || "").toLowerCase();
  const byEmail = mockUsers.find((u) => u.email === normalized);
  if (byEmail) return byEmail;
  if (normalized.includes("admin")) return mockUsers[0];
  if (normalized.includes("seller")) return mockUsers[1];
  return mockUsers[2];
}

export function createMockTokens(user: {
  id: number;
  role: string;
  email: string;
  fullName: string;
}) {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
    fullName: user.fullName,
  };

  const accessToken = jwt.sign(payload, MOCK_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign(
    { ...payload, type: "refresh" },
    MOCK_SECRET,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken, user };
}
