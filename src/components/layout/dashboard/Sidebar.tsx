"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Bell,
  LogOut,
  PieChart,
  Heart,
  UserRoundSearch,
  BotMessageSquare,
  BadgeAlert,
  BadgeDollarSign,
  CableCar,
  Home,
  MailWarning,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLogout } from "@/core/api/auth/logout/queries";

const menuItems = [
  {
    title: "داشبورد",
    icon: <LayoutDashboard size={20} />,
    href: "/panel/dashboard",
    roles: ["seller", "buyer"],
  },
  {
    title: "داشبورد",
    icon: <LayoutDashboard size={20} />,
    href: "/panel/dashboard/admin",
    roles: ["admin"],
  },
  {
    title: "اطلاعات کاربری",
    icon: <User size={20} />,
    href: "/panel/profile",
    roles: ["seller", "buyer"],
  },
  {
    title: "کاربران",
    icon: <User size={20} />,
    href: "/panel/user",
    roles: ["admin"],
  },
  {
    title: "مدیریت املاک",
    icon: <Home size={20} />,
    href: "/panel/houses",
    roles: ["admin", "seller"],
  },
  {
    title: "مدیریت رزروها",
    icon: <CalendarDays size={20} />,
    href: "/panel/booking",
    roles: ["seller", "buyer"],
  },
  {
    title: "مدیریت رزروها",
    icon: <CalendarDays size={20} />,
    href: "/panel/booking/admin",
    roles: ["admin"],
  },
  {
    title: "مدیریت مالی",
    icon: <PieChart size={20} />,
    href: "/panel/financial",
    roles: ["seller", "buyer"],
  },
  {
    title: "علاقه‌مندی‌ها",
    icon: <Heart size={20} />,
    href: "/panel/favorites",
    roles: ["buyer"],
  },
  {
    title: "پرداخت‌ها",
    icon: <BadgeDollarSign size={20} />,
    href: "/panel/payments/admin",
    roles: ["admin"],
  },
  {
    title: "اعلان‌ها",
    icon: <Bell size={20} />,
    href: "/panel/notifications",
    roles: ["admin", "seller", "buyer"],
  },
  {
    title: "ملاقات‌ها",
    icon: <UserRoundSearch size={20} />,
    href: "/panel/appointments",
    roles: ["seller", "buyer"],
  },
  {
    title: "چت‌ها",
    icon: <BadgeAlert size={20} />,
    href: "/panel/chat-room",
    roles: ["admin"],
  },
  {
    title: "کامنت‌ها",
    icon: <BotMessageSquare size={20} />,
    href: "/panel/comments",
    roles: ["admin"],
  },
  {
    title: "تورها",
    icon: <CableCar size={20} />,
    href: "/panel/tours",
    roles: ["admin"],
  },
  {
    title: "گزارش خرابی",
    icon: <MailWarning size={20} />,
    href: "/panel/maintenance",
    roles: ["admin", "seller"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  const { mutate: logout, isPending } = useLogout();

  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();
      setRole(data.role);
    };

    fetchRole();
  }, []);

  if (!role) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="size-8 animate-pulse rounded-full bg-brand/20" />
      </div>
    );
  }

  const visibleItems = menuItems.filter((item) => item.roles.includes(role));

  return (
    <div className="flex h-full max-h-[calc(100dvh-1.25rem)] flex-col overflow-y-auto p-4 sm:p-5">
      <div className="mb-6 flex items-center gap-3 px-1 sm:mb-8">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-brand font-sans text-sm font-black text-white shadow-lg shadow-brand/25">
          H
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-lg font-black tracking-tight text-ink dark:text-white">
            Home
          </span>
          <span className="text-xs font-medium text-ink-muted">پنل مدیریت</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {visibleItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group panel-nav-link ${
                isActive ? "panel-nav-link-active" : "panel-nav-link-idle"
              }`}
            >
              <span
                className={`shrink-0 transition-transform ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate text-[13px] sm:text-sm">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => logout()}
        disabled={isPending}
        className={`mt-4 flex items-center gap-3 rounded-2xl px-3.5 py-3 font-bold text-danger transition-colors hover:bg-danger/10 ${
          isPending ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <LogOut size={18} className={isPending ? "animate-pulse" : ""} />
        <span className="text-sm">
          {isPending ? "در حال خروج..." : "خروج"}
        </span>
      </button>
    </div>
  );
}
