import type { InternalAxiosRequestConfig } from "axios";
import {
  mockAdminDashboard,
  mockAppointments,
  mockBlogs,
  mockCategories,
  mockChatRooms,
  mockDashboardSummary,
  mockLocations,
  mockMarketTrends,
  mockStore,
  mockTours,
  mockUserActivity,
  mockUsers,
} from "./data";

export type MockResult = {
  data: unknown;
  status: number;
};

function normalizeUrl(raw?: string): string {
  if (!raw) return "";
  try {
    if (raw.startsWith("http")) {
      const u = new URL(raw);
      return u.pathname + u.search;
    }
  } catch {
    /* ignore */
  }
  const q = raw.indexOf("?");
  if (raw.startsWith("/")) return raw;
  // relative path without leading slash
  return raw.startsWith("api/") ? `/${raw}` : raw;
}

function getPath(url: string): string {
  return url.split("?")[0] || "";
}

function getParams(url: string, config: InternalAxiosRequestConfig) {
  const params = new URLSearchParams();
  const qIndex = url.indexOf("?");
  if (qIndex >= 0) {
    new URLSearchParams(url.slice(qIndex + 1)).forEach((v, k) =>
      params.set(k, v),
    );
  }
  const cfgParams = config.params;
  if (cfgParams && typeof cfgParams === "object") {
    Object.entries(cfgParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        params.set(k, String(v));
      }
    });
  }
  return params;
}

function filterHouses(params: URLSearchParams) {
  let houses = [...mockStore.houses];
  const transactionType = params.get("transactionType");
  const search = params.get("search")?.toLowerCase();
  const location = params.get("location")?.toLowerCase();
  const propertyType = params.get("propertyType")?.toLowerCase();
  const limit = Number(params.get("limit") || 50);

  if (transactionType) {
    houses = houses.filter(
      (h) =>
        String(h.transaction_type).toLowerCase() ===
        transactionType.toLowerCase(),
    );
  }
  if (search) {
    houses = houses.filter(
      (h) =>
        String(h.title).toLowerCase().includes(search) ||
        String(h.address).toLowerCase().includes(search) ||
        String(h.city).toLowerCase().includes(search),
    );
  }
  if (location) {
    houses = houses.filter(
      (h) =>
        String(h.location).toLowerCase().includes(location) ||
        String(h.city).toLowerCase().includes(location) ||
        String(h.address).toLowerCase().includes(location),
    );
  }
  if (propertyType) {
    houses = houses.filter((h) =>
      String(h.categories?.name || "")
        .toLowerCase()
        .includes(propertyType),
    );
  }

  return { houses: houses.slice(0, limit), total: houses.length };
}

function parseBody(config: InternalAxiosRequestConfig): any {
  const d = config.data;
  if (!d) return {};
  if (typeof d === "string") {
    try {
      return JSON.parse(d);
    } catch {
      return {};
    }
  }
  if (typeof FormData !== "undefined" && d instanceof FormData) {
    const obj: Record<string, unknown> = {};
    d.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }
  return d;
}

function ok(data: unknown, status = 200): MockResult {
  return { data, status };
}

/**
 * Resolves mock responses for any axios call (relative /api or BaseUrl).
 * Existing api.ts / queries.ts files stay unchanged.
 */
export function handleMockRequest(
  config: InternalAxiosRequestConfig,
): MockResult {
  const method = (config.method || "get").toLowerCase();
  const full = normalizeUrl(config.url || "");
  const path = getPath(full);
  const params = getParams(full, config);
  const body = parseBody(config);

  // --- Houses ---
  if (path.match(/\/api\/houses\/\d+\/comments$/)) {
    const houseId = path.split("/")[3];
    const comments = mockStore.comments.filter(
      (c) => String(c.house_id) === String(houseId),
    );
    return ok({ comments });
  }

  if (path.match(/\/api\/houses\/[^/]+$/) && method === "get") {
    const id = path.split("/").pop();
    const house =
      mockStore.houses.find((h) => String(h.id) === String(id)) ||
      mockStore.houses[0];
    return ok(house);
  }

  if (path.match(/\/api\/houses\/[^/]+$/) && method === "delete") {
    const id = path.split("/").pop();
    mockStore.houses = mockStore.houses.filter(
      (h) => String(h.id) !== String(id),
    );
    return ok({ message: "House deleted", id });
  }

  if (path.endsWith("/api/houses") || path.endsWith("/api/houses/")) {
    if (method === "get") return ok(filterHouses(params));
    if (method === "post") {
      const id = String(++mockStore.nextId);
      const house = {
        ...mockStore.houses[0],
        ...body,
        id,
        photos: body.photos || mockStore.houses[0].photos,
        last_updated: new Date().toISOString(),
      };
      mockStore.houses.unshift(house);
      return ok(house, 201);
    }
  }

  if (path.match(/\/api\/admin\/houses\/[^/]+$/) && method === "put") {
    const id = path.split("/").pop();
    mockStore.houses = mockStore.houses.map((h) =>
      String(h.id) === String(id) ? { ...h, ...body } : h,
    );
    return ok({ message: "updated" });
  }

  if (path.match(/\/api\/admin\/houses\/[^/]+$/) && method === "delete") {
    const id = path.split("/").pop();
    mockStore.houses = mockStore.houses.filter(
      (h) => String(h.id) !== String(id),
    );
    return ok({ message: "deleted" });
  }

  if (path.includes("/api/admin/houses") && method === "get") {
    return ok({ data: mockStore.houses, houses: mockStore.houses });
  }

  if (path.includes("/api/admin/houses") && method === "post") {
    const id = String(++mockStore.nextId);
    const house = { ...mockStore.houses[0], ...body, id };
    mockStore.houses.unshift(house);
    return ok(house, 201);
  }

  // --- Categories & locations ---
  if (path.includes("/api/categories")) {
    return ok({ data: mockCategories, total: mockCategories.length });
  }

  if (path.includes("/api/locations")) {
    return ok({ data: mockLocations, total: mockLocations.length });
  }

  // --- Comments ---
  if (path.match(/\/api\/comments\/\d+$/) && method === "put") {
    const id = Number(path.split("/").pop());
    mockStore.comments = mockStore.comments.map((c) =>
      c.id === id ? { ...c, ...body } : c,
    );
    return ok({ message: "updated" });
  }

  if (path.includes("/api/comments") && method === "get") {
    return ok({
      data: mockStore.comments,
      comments: mockStore.comments,
      total: mockStore.comments.length,
    });
  }

  if (path.includes("/api/comments") && method === "post") {
    const comment = {
      id: ++mockStore.nextId,
      house_id: Number(body.house_id || body.houseId || 1),
      user_id: 3,
      title: body.title || "نظر جدید",
      caption: body.caption || body.message || "",
      rating: Number(body.rating || 5),
      created_at: new Date().toISOString(),
      parent_comment_id: null,
      isApproved: true,
    };
    mockStore.comments.unshift(comment);
    return ok(comment, 201);
  }

  if (path.match(/\/api\/admin\/comments\/\d+$/) && method === "delete") {
    const id = Number(path.split("/").pop());
    mockStore.comments = mockStore.comments.filter((c) => c.id !== id);
    return ok({ message: "deleted" });
  }

  if (path.match(/\/api\/admin\/comments\/\d+$/) && method === "put") {
    const id = Number(path.split("/").pop());
    mockStore.comments = mockStore.comments.map((c) =>
      c.id === id ? { ...c, ...body } : c,
    );
    return ok({ message: "updated" });
  }

  if (path.match(/\/api\/admin\/comments\/\d+$/) && method === "get") {
    const id = Number(path.split("/").pop());
    return ok(
      mockStore.comments.find((c) => c.id === id) || mockStore.comments[0],
    );
  }

  if (path.includes("/api/admin/comments")) {
    return ok({ data: mockStore.comments });
  }

  // --- Blogs ---
  if (path.match(/\/api\/blogs\/\d+$/)) {
    const id = Number(path.split("/").pop());
    const blog = mockBlogs.find((b) => b.id === id) || mockBlogs[0];
    return ok(blog);
  }

  if (path.includes("/api/blogs")) {
    let blogs = [...mockBlogs];
    const categoryId = params.get("category_id");
    const title = params.get("title")?.toLowerCase();
    if (categoryId) {
      blogs = blogs.filter((b) => String(b.category_id) === String(categoryId));
    }
    if (title) {
      blogs = blogs.filter((b) => b.title.toLowerCase().includes(title));
    }
    return ok({ data: blogs, total: blogs.length });
  }

  // --- Favorites ---
  if (path.includes("/api/favorites/user") || path.includes("/api/favorites/user/")) {
    return ok({ data: mockStore.favorites });
  }

  if (path.includes("/api/favorites") && method === "post") {
    const houseId = body.house_id || body.houseId;
    const house =
      mockStore.houses.find((h) => String(h.id) === String(houseId)) ||
      mockStore.houses[0];
    const fav = {
      id: ++mockStore.nextId,
      user_id: 3,
      house_id: Number(houseId),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      house,
    };
    mockStore.favorites.unshift(fav);
    return ok(fav, 201);
  }

  // --- Bookings ---
  if (path.match(/\/api\/admin\/bookings\/\d+$/) && method === "delete") {
    const id = Number(path.split("/").pop());
    mockStore.bookings = mockStore.bookings.filter((b) => b.id !== id);
    return ok({ message: "deleted" });
  }

  if (path.match(/\/api\/admin\/bookings\/\d+$/) && method === "put") {
    const id = Number(path.split("/").pop());
    mockStore.bookings = mockStore.bookings.map((b) =>
      b.id === id ? { ...b, ...body } : b,
    );
    return ok({ message: "updated" });
  }

  if (path.match(/\/api\/admin\/bookings\/\d+$/) && method === "get") {
    const id = Number(path.split("/").pop());
    return ok(
      mockStore.bookings.find((b) => b.id === id) || mockStore.bookings[0],
    );
  }

  if (path.includes("/api/admin/bookings")) {
    return ok({ data: mockStore.bookings });
  }

  if (path.includes("/api/bookings") && method === "get") {
    return ok({ data: mockStore.bookings });
  }

  if (path.includes("/api/bookings") && method === "post") {
    const booking = {
      id: ++mockStore.nextId,
      houseId: Number(body.houseId || body.house_id || 1),
      userId: 3,
      status: "pending",
      created_at: new Date().toISOString(),
      reservedDates: body.reservedDates || [],
      traveler_details: body.traveler_details || body.travelers || [],
      house:
        mockStore.houses.find(
          (h) => String(h.id) === String(body.houseId || body.house_id || 1),
        ) || mockStore.houses[0],
    };
    mockStore.bookings.unshift(booking);
    return ok(booking, 201);
  }

  // --- Payments ---
  if (path.match(/\/api\/admin\/payments\/\d+$/) && method === "delete") {
    const id = Number(path.split("/").pop());
    mockStore.payments = mockStore.payments.filter((p) => p.id !== id);
    return ok({ message: "deleted" });
  }

  if (path.match(/\/api\/admin\/payments\/\d+$/) && method === "put") {
    const id = Number(path.split("/").pop());
    mockStore.payments = mockStore.payments.map((p) =>
      p.id === id ? { ...p, ...body } : p,
    );
    return ok({ message: "updated" });
  }

  if (path.match(/\/api\/admin\/payments\/\d+$/) && method === "get") {
    const id = Number(path.split("/").pop());
    return ok(
      mockStore.payments.find((p) => p.id === id) || mockStore.payments[0],
    );
  }

  if (path.includes("/api/admin/payments")) {
    return ok({ data: mockStore.payments });
  }

  if (path.includes("/api/payments/verify") && method === "post") {
    const paymentId = Number(body.paymentId);
    const status = body.status === "success" ? "success" : "failed";
    const existing = mockStore.payments.find((p) => p.id === paymentId);
    if (!existing) {
      return { status: 404, data: { message: "پرداخت یافت نشد" } };
    }
    mockStore.payments = mockStore.payments.map((p) =>
      p.id === paymentId ? { ...p, status } : p,
    );
    const updated = mockStore.payments.find((p) => p.id === paymentId);
    return ok({ payment: updated, status });
  }

  if (path.match(/\/api\/payments\/\d+$/) && method === "get") {
    const id = Number(path.split("/").pop());
    const payment = mockStore.payments.find((p) => p.id === id);
    if (!payment) {
      return { status: 404, data: { message: "پرداخت یافت نشد" } };
    }
    return ok({ payment });
  }

  if (path.includes("/api/payments") && method === "get") {
    return ok({ payments: mockStore.payments, data: mockStore.payments });
  }

  if (path.includes("/api/payments") && method === "post") {
    const id = ++mockStore.nextId;
    const amount = Number(body.amount || 0);
    const callbackUrl =
      typeof body.callbackUrl === "string" && body.callbackUrl
        ? body.callbackUrl
        : "/";
    const payment = {
      id,
      amount,
      status: "pending",
      type: body.type || "booking",
      description: body.description || "",
      created_at: new Date().toISOString(),
      bookingId: body.bookingId || null,
      callbackUrl,
      paymentUrl: `/payment/fake-gateway?paymentId=${id}&amount=${amount}&callback=${encodeURIComponent(callbackUrl)}`,
    };
    mockStore.payments.unshift(payment);
    return ok(payment, 201);
  }

  // --- Dashboard ---
  if (path.includes("/api/dashboard/summary")) {
    return ok(mockDashboardSummary);
  }

  if (path.includes("/api/dashboard/market-trends")) {
    return ok(mockMarketTrends);
  }

  if (path.includes("/api/admin/dashboard")) {
    return ok(mockAdminDashboard);
  }

  // --- User profile (also users/:id and user-activity) ---
  if (path.match(/\/api\/users\/\d+$/) && method === "get") {
    return ok({ user: mockUsers[0] });
  }

  if (path.match(/\/api\/users\/\d+$/) && method === "put") {
    return ok({ user: { ...mockUsers[0], ...body } });
  }

  if (path.includes("/api/user-activity")) {
    return ok(mockUserActivity);
  }

  if (path.includes("/api/user/profile") && method === "get") {
    return ok({
      user: { user: mockUsers.find((u) => u.role === "buyer") || mockUsers[2] },
      activity: mockUserActivity,
    });
  }

  if (path.includes("/api/user/profile") && method === "put") {
    return ok({
      user: {
        ...(mockUsers.find((u) => u.role === "buyer") || mockUsers[2]),
        ...body,
      },
    });
  }

  // --- Appointments ---
  if (path.includes("/api/visit-appointments")) {
    return ok(mockAppointments);
  }

  // --- Maintenance ---
  if (
    path.match(/\/api\/maintenance-requests\/\d+$/) &&
    method === "delete"
  ) {
    const id = Number(path.split("/").pop());
    mockStore.maintenance = mockStore.maintenance.filter((m) => m.id !== id);
    return ok({ message: "deleted" });
  }

  if (path.includes("/api/maintenance-requests") && method === "get") {
    return ok(mockStore.maintenance);
  }

  if (path.includes("/api/maintenance-requests") && method === "post") {
    const item = {
      id: ++mockStore.nextId,
      houseId: Number(body.houseId || 1),
      description: body.description || "",
      isRead: false,
      created_at: new Date().toISOString(),
    };
    mockStore.maintenance.unshift(item);
    return ok(item, 201);
  }

  // --- Admin users ---
  if (path.match(/\/api\/admin\/users\/\d+\/role$/) && method === "put") {
    const id = path.split("/")[4];
    mockStore.users = mockStore.users.map((u) =>
      String(u.id) === String(id) ? { ...u, role: body.role || u.role } : u,
    );
    return ok({ message: "role updated" });
  }

  if (path.match(/\/api\/admin\/users\/\d+$/) && method === "delete") {
    const id = path.split("/").pop();
    mockStore.users = mockStore.users.filter((u) => String(u.id) !== String(id));
    return ok({ message: "deleted" });
  }

  if (path.match(/\/api\/admin\/users\/\d+$/) && method === "get") {
    const id = path.split("/").pop();
    return ok(mockStore.users.find((u) => String(u.id) === String(id)));
  }

  if (path.includes("/api/admin/users")) {
    return ok({ data: mockStore.users });
  }

  // --- Chats ---
  if (path.includes("/api/chats/send") && method === "post") {
    const room = body.room || "support-1";
    const msg = {
      id: ++mockStore.nextId,
      senderId: 1,
      message: body.message || "",
      files: null,
      createdAt: new Date().toISOString(),
      sender: {
        id: 1,
        fullName: "علی محمدی",
        email: "admin@mock.com",
      },
    };
    if (!mockStore.chatMessages[room]) mockStore.chatMessages[room] = [];
    mockStore.chatMessages[room].push(msg);
    return ok(msg, 201);
  }

  if (path.match(/\/api\/chats\/upload\//) && method === "post") {
    return ok({ message: "uploaded", url: "/mock-upload.png" }, 201);
  }

  if (path.match(/\/api\/chats\/delete\/\d+$/) && method === "delete") {
    return ok({ message: "deleted" });
  }

  if (path.match(/\/api\/chats\/edit\/\d+$/) && method === "put") {
    return ok({ message: "updated", messageText: body.message });
  }

  if (path.includes("/api/chats/home") || path.match(/\/api\/chats\/[^/]+$/)) {
    const room = path.split("/").pop() || "support-1";
    if (room === "chats" || room === "home") {
      return ok(mockChatRooms);
    }
    return ok(mockStore.chatMessages[room] || mockStore.chatMessages["support-1"] || []);
  }

  if (path.endsWith("/api/chats") || path.endsWith("/api/chats/")) {
    return ok(mockChatRooms);
  }

  // --- Contact & QA ---
  if (path.includes("/api/contact-us") && method === "post") {
    return ok({ message: "پیام شما با موفقیت ارسال شد" });
  }

  if (path.includes("/api/property-qa/question") && method === "post") {
    return ok({
      answer:
        "این پاسخ آزمایشی است. API واقعی در دسترس نیست؛ ملک مورد نظر امکانات کاملی دارد.",
    });
  }

  // --- Tours ---
  if (path.match(/\/api\/admin\/tours\/\d+$/)) {
    const id = Number(path.split("/").pop());
    return ok(mockTours.find((t) => t.id === id) || mockTours[0]);
  }

  if (path.includes("/api/admin/tours")) {
    return ok({ data: mockTours });
  }

  // --- Auth (used when BFF proxies call BaseUrl, or direct) ---
  if (path.includes("/api/auth/login") && method === "post") {
    const email = String(body.email || "").toLowerCase();
    let user = mockUsers.find((u) => u.email === email);
    if (!user) {
      if (email.includes("admin")) user = mockUsers[0];
      else if (email.includes("seller")) user = mockUsers[1];
      else user = mockUsers[2];
    }
    return ok({
      message: "Login successful",
      accessToken: "mock-token",
      refreshToken: "mock-refresh",
      user,
    });
  }

  if (path.includes("/api/auth/register") && method === "post") {
    return ok({ message: "registered", tempUserId: "mock-temp-1" });
  }

  if (path.includes("/api/auth/verify-email") && method === "post") {
    return ok({ message: "verified", tempUserId: body.tempUserId || "mock-temp-1" });
  }

  if (path.includes("/api/auth/complete-registration") && method === "post") {
    return ok({
      message: "completed",
      accessToken: "mock-token",
      refreshToken: "mock-refresh",
      user: mockUsers[2],
    });
  }

  if (path.includes("/api/auth/forgot-password")) {
    return ok({ message: "ok", success: true });
  }

  if (path.includes("/api/auth/logout")) {
    return ok({ message: "logged out" });
  }

  // Fallback so unknown endpoints don't crash the UI
  console.warn("[mock-api] unhandled:", method.toUpperCase(), path);
  return ok({ message: "mock ok", path, method });
}
