/**
 * Central mock dataset for the whole site while the real API is down.
 * Toggle via NEXT_PUBLIC_USE_MOCK (default: true).
 */

const PHOTO =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const PHOTO_2 =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
const PHOTO_3 =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80";

export const mockUsers = [
  {
    id: 1,
    fullName: "علی محمدی",
    email: "admin@mock.com",
    phoneNumber: "09121234567",
    role: "admin",
    profilePicture: null,
  },
  {
    id: 2,
    fullName: "سارا احمدی",
    email: "seller@mock.com",
    phoneNumber: "09129876543",
    role: "seller",
    profilePicture: null,
  },
  {
    id: 3,
    fullName: "رضا کریمی",
    email: "buyer@mock.com",
    phoneNumber: "09121112233",
    role: "buyer",
    profilePicture: null,
  },
];

export const mockCategories = [
  { id: 1, name: "ویلایی" },
  { id: 2, name: "آپارتمان" },
  { id: 3, name: "پنت هاوس" },
  { id: 4, name: "دفتر اداری" },
  { id: 5, name: "مغازه" },
  { id: 6, name: "زمین" },
  { id: 7, name: "باغ" },
];

export const mockLocations = [
  {
    id: "1",
    area_name: "رامسر",
    lat: "36.9031",
    lng: "50.6583",
    value: "ramsar",
  },
  {
    id: "2",
    area_name: "کیش",
    lat: "26.5570",
    lng: "53.9800",
    value: "kish",
  },
  {
    id: "3",
    area_name: "شمال تهران",
    lat: "35.8044",
    lng: "51.4330",
    value: "tehran-north",
  },
  {
    id: "4",
    area_name: "اصفهان",
    lat: "32.6539",
    lng: "51.6660",
    value: "isfahan",
  },
  {
    id: "5",
    area_name: "شیراز",
    lat: "29.5918",
    lng: "52.5837",
    value: "shiraz",
  },
  {
    id: "6",
    area_name: "ماسال",
    lat: "37.3631",
    lng: "49.1320",
    value: "masal",
  },
];

function makeHouse(overrides: Record<string, unknown> = {}) {
  return {
    id: "1",
    title: "ویلای لوکس جنگلی",
    address: "مازندران، رامسر، جاده جواهرده",
    photos: [PHOTO, PHOTO_2, PHOTO_3],
    rate: "4.8",
    discounted_price: "4500000",
    price: 5500000,
    tags: ["استخر", "پارکینگ", "ویو جنگل"],
    last_updated: "2026-07-01T10:00:00.000Z",
    capacity: 8,
    location: "رامسر",
    categories: { name: "ویلایی" },
    bathrooms: 3,
    parking: 2,
    rooms: 4,
    yard_type: "باغ",
    num_comments: 12,
    discount_id: "1",
    transaction_type: "rental",
    sellerId: "2",
    sellerName: "سارا احمدی",
    caption: "ویلایی زیبا با منظره جنگل و امکانات کامل برای اقامت خانوادگی.",
    bookings: 5,
    favoriteId: null,
    isFavorite: false,
    item: "villa",
    size: "280",
    total: 12,
    city: "رامسر",
    status: "فعال",
    ...overrides,
  };
}

export const mockHouses = [
  makeHouse({ id: "1", title: "ویلای لوکس جنگلی", transaction_type: "rental" }),
  makeHouse({
    id: "2",
    title: "آپارتمان مدرن ونک",
    address: "تهران، ونک، خیابان ولیعصر",
    location: "تهران",
    city: "تهران",
    categories: { name: "آپارتمان" },
    rooms: 2,
    bathrooms: 1,
    parking: 1,
    capacity: 4,
    price: 3200000,
    discounted_price: null,
    discount_id: null,
    rate: "4.5",
    transaction_type: "rental",
    photos: [PHOTO_2, PHOTO],
  }),
  makeHouse({
    id: "3",
    title: "پنت‌هاوس ساحلی کیش",
    address: "کیش، ساحل مرجان",
    location: "کیش",
    city: "کیش",
    categories: { name: "پنت هاوس" },
    rooms: 5,
    bathrooms: 4,
    parking: 3,
    capacity: 10,
    price: 12000000,
    discounted_price: "9800000",
    rate: "4.9",
    transaction_type: "reservation",
    photos: [PHOTO_3, PHOTO_2],
  }),
  makeHouse({
    id: "4",
    title: "خانه باغ ماسال",
    address: "گیلان، ماسال، ییلاق",
    location: "ماسال",
    city: "ماسال",
    categories: { name: "باغ" },
    rooms: 3,
    bathrooms: 2,
    parking: 2,
    capacity: 6,
    price: 2800000,
    discounted_price: "2400000",
    rate: "4.6",
    transaction_type: "rental",
  }),
  makeHouse({
    id: "5",
    title: "واحد اداری سعادت‌آباد",
    address: "تهران، سعادت‌آباد",
    location: "تهران",
    city: "تهران",
    categories: { name: "دفتر اداری" },
    rooms: 3,
    bathrooms: 1,
    parking: 2,
    capacity: 12,
    price: 8500000000,
    discounted_price: null,
    discount_id: null,
    rate: "4.2",
    transaction_type: "sale",
    photos: [PHOTO],
  }),
  makeHouse({
    id: "6",
    title: "سوئیت دنج اصفهان",
    address: "اصفهان، جلفا",
    location: "اصفهان",
    city: "اصفهان",
    categories: { name: "آپارتمان" },
    rooms: 1,
    bathrooms: 1,
    parking: 0,
    capacity: 2,
    price: 1800000,
    discounted_price: "1500000",
    rate: "4.4",
    transaction_type: "reservation",
  }),
];

export const mockComments = [
  {
    id: 1,
    house_id: 1,
    user_id: 3,
    title: "عالی بود",
    caption: "اقامت فوق‌العاده‌ای داشتیم، میزبان بسیار مهمان‌نواز بود.",
    rating: 5,
    created_at: "2026-06-20T12:00:00.000Z",
    parent_comment_id: null,
    isApproved: true,
  },
  {
    id: 2,
    house_id: 1,
    user_id: 3,
    title: "تمیز و مرتب",
    caption: "خانه خیلی تمیز بود و امکانات کامل داشت. پیشنهاد می‌کنم.",
    rating: 4,
    created_at: "2026-06-18T09:30:00.000Z",
    parent_comment_id: null,
    isApproved: true,
  },
  {
    id: 3,
    house_id: 2,
    user_id: 2,
    title: "موقعیت عالی",
    caption: "دسترسی به مترو و مراکز خرید خیلی خوب بود.",
    rating: 5,
    created_at: "2026-06-10T15:00:00.000Z",
    parent_comment_id: null,
    isApproved: false,
  },
  {
    id: 4,
    house_id: 3,
    user_id: 3,
    title: "ویو بی‌نظیر",
    caption: "غروب از تراس پنت‌هاوس فراموش‌نشدنی بود.",
    rating: 5,
    created_at: "2026-05-28T18:00:00.000Z",
    parent_comment_id: null,
    isApproved: true,
  },
];

export const mockBlogs = [
  {
    id: 1,
    title: "راهنمای اجاره ویلا در شمال",
    caption: "نکات مهم قبل از رزرو ویلا در شهرهای شمالی ایران.",
    category_id: 1,
    estimated_reading_time: "۵ دقیقه",
    created_at: "2026-06-01T10:00:00.000Z",
    content:
      "اجاره ویلا در شمال یکی از محبوب‌ترین انتخاب‌ها برای تعطیلات است. در این مطلب به نکات مهم انتخاب ویلا، بررسی امکانات، و زمان‌بندی سفر می‌پردازیم.",
  },
  {
    id: 2,
    title: "چطور آپارتمان مناسب پیدا کنیم؟",
    caption: "معیارهای کلیدی برای انتخاب آپارتمان اجاره‌ای در تهران.",
    category_id: 2,
    estimated_reading_time: "۴ دقیقه",
    created_at: "2026-06-05T11:00:00.000Z",
    content:
      "موقعیت مکانی، نورگیر بودن، دسترسی به حمل‌ونقل عمومی و هزینه شارژ از مهم‌ترین فاکتورها هستند.",
  },
  {
    id: 3,
    title: "سرمایه‌گذاری در املاک ساحلی",
    caption: "بررسی فرصت‌های سرمایه‌گذاری در کیش و مناطق ساحلی.",
    category_id: 3,
    estimated_reading_time: "۷ دقیقه",
    created_at: "2026-06-12T08:00:00.000Z",
    content:
      "املاک ساحلی معمولاً رشد قیمت پایدارتری دارند؛ البته هزینه‌های نگهداری را هم در نظر بگیرید.",
  },
];

export const mockBookings = [
  {
    id: 1,
    houseId: 1,
    userId: 3,
    status: "confirmed",
    created_at: "2026-06-15T10:00:00.000Z",
    reservedDates: ["2026-07-20", "2026-07-25"],
    traveler_details: [
      { fullName: "رضا کریمی", nationalId: "0012345678" },
      { fullName: "مینا کریمی", nationalId: "0012345679" },
    ],
    house: mockHouses[0],
  },
  {
    id: 2,
    houseId: 2,
    userId: 3,
    status: "pending",
    created_at: "2026-06-20T14:00:00.000Z",
    reservedDates: ["2026-08-01", "2026-08-03"],
    traveler_details: [{ fullName: "رضا کریمی", nationalId: "0012345678" }],
    house: mockHouses[1],
  },
  {
    id: 3,
    houseId: 3,
    userId: 3,
    status: "canceled",
    created_at: "2026-05-10T09:00:00.000Z",
    reservedDates: ["2026-06-01", "2026-06-05"],
    traveler_details: [],
    house: mockHouses[2],
  },
];

export const mockPayments = [
  {
    id: 1,
    amount: 4500000,
    status: "success",
    type: "booking",
    created_at: "2026-06-15T11:00:00.000Z",
    bookingId: 1,
  },
  {
    id: 2,
    amount: 3200000,
    status: "pending",
    type: "booking",
    created_at: "2026-06-20T15:00:00.000Z",
    bookingId: 2,
  },
  {
    id: 3,
    amount: 9800000,
    status: "failed",
    type: "booking",
    created_at: "2026-05-10T10:00:00.000Z",
    bookingId: 3,
  },
];

export const mockFavorites = [
  {
    id: 1,
    user_id: 3,
    house_id: 1,
    created_at: "2026-06-01T10:00:00.000Z",
    updated_at: "2026-06-01T10:00:00.000Z",
    house: mockHouses[0],
  },
  {
    id: 2,
    user_id: 3,
    house_id: 3,
    created_at: "2026-06-05T10:00:00.000Z",
    updated_at: "2026-06-05T10:00:00.000Z",
    house: mockHouses[2],
  },
];

export const mockAppointments = [
  {
    id: 1,
    houseId: 1,
    userId: 3,
    appointmentTime: new Date().toISOString(),
    type: "in_person",
    status: "pending",
    created_at: "2026-07-01T08:00:00.000Z",
    updated_at: "2026-07-01T08:00:00.000Z",
  },
  {
    id: 2,
    houseId: 2,
    userId: 3,
    appointmentTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    type: "virtual",
    status: "approved",
    created_at: "2026-07-02T08:00:00.000Z",
    updated_at: "2026-07-02T08:00:00.000Z",
  },
  {
    id: 3,
    houseId: 4,
    userId: 3,
    appointmentTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    type: "in_person",
    status: "rejected",
    created_at: "2026-07-03T08:00:00.000Z",
    updated_at: "2026-07-03T08:00:00.000Z",
  },
];

export const mockMaintenance = [
  {
    id: 1,
    houseId: 1,
    description: "شیر آب آشپزخانه چکه می‌کند",
    isRead: false,
    created_at: "2026-07-05T10:00:00.000Z",
  },
  {
    id: 2,
    houseId: 2,
    description: "کولر گازی اتاق خواب کار نمی‌کند",
    isRead: true,
    created_at: "2026-07-01T12:00:00.000Z",
  },
];

export const mockChatRooms = [
  { room: "support-1", users: [{ id: 1 }, { id: 3 }] },
  { room: "house-1-chat", users: [{ id: 2 }, { id: 3 }] },
  { room: "admin-general", users: [{ id: 1 }, { id: 2 }, { id: 3 }] },
];

export const mockChatMessages: Record<
  string,
  Array<{
    id: number;
    senderId: number;
    message: string;
    files: null | string[];
    createdAt: string;
    sender: { id: number; fullName: string; email: string };
  }>
> = {
  "support-1": [
    {
      id: 1,
      senderId: 3,
      message: "سلام، درباره رزرو ویلا سوال داشتم",
      files: null,
      createdAt: "2026-07-10T09:00:00.000Z",
      sender: {
        id: 3,
        fullName: "رضا کریمی",
        email: "buyer@mock.com",
      },
    },
    {
      id: 2,
      senderId: 1,
      message: "سلام! بفرمایید چطور می‌تونم کمکتون کنم؟",
      files: null,
      createdAt: "2026-07-10T09:05:00.000Z",
      sender: {
        id: 1,
        fullName: "علی محمدی",
        email: "admin@mock.com",
      },
    },
  ],
  "house-1-chat": [
    {
      id: 3,
      senderId: 3,
      message: "آیا استخر فعال است؟",
      files: null,
      createdAt: "2026-07-11T10:00:00.000Z",
      sender: {
        id: 3,
        fullName: "رضا کریمی",
        email: "buyer@mock.com",
      },
    },
    {
      id: 4,
      senderId: 2,
      message: "بله، استخر تا ساعت ۲۲ باز است.",
      files: null,
      createdAt: "2026-07-11T10:10:00.000Z",
      sender: {
        id: 2,
        fullName: "سارا احمدی",
        email: "seller@mock.com",
      },
    },
  ],
  "admin-general": [
    {
      id: 5,
      senderId: 1,
      message: "پیام تست اتاق عمومی ادمین",
      files: null,
      createdAt: "2026-07-12T08:00:00.000Z",
      sender: {
        id: 1,
        fullName: "علی محمدی",
        email: "admin@mock.com",
      },
    },
  ],
};

export const mockTours = [
  {
    id: 1,
    title: "تور ویلاهای شمال",
    description: "بازدید گروهی از ویلاهای منتخب رامسر و ماسال",
    date: "2026-08-15",
  },
  {
    id: 2,
    title: "تور املاک کیش",
    description: "بازدید از واحدهای ساحلی و سرمایه‌گذاری",
    date: "2026-09-01",
  },
];

export const mockDashboardSummary = {
  bookings: {
    bookingCount: 12,
    pendingBookings: 3,
    conformedBookings: 7,
    canceledBookings: 2,
  },
};

export const mockAdminDashboard = {
  totalUsers: 128,
  totalHouses: mockHouses.length,
  totalBookings: mockBookings.length,
  averageRating: 4.6,
};

export const mockMarketTrends = {
  labels: ["فروردین", "اردیبهشت", "خرداد", "تیر"],
  values: [12, 19, 15, 22],
};

export const mockUserActivity = {
  recentViews: 14,
  recentBookings: 2,
  favoriteCount: mockFavorites.length,
};

/** Mutable copies used by mock router for create/update/delete side-effects */
export const mockStore = {
  houses: [...mockHouses],
  comments: [...mockComments],
  bookings: [...mockBookings],
  payments: [...mockPayments],
  favorites: [...mockFavorites],
  maintenance: [...mockMaintenance],
  users: [...mockUsers],
  chatMessages: { ...mockChatMessages } as typeof mockChatMessages,
  nextId: 100,
};
