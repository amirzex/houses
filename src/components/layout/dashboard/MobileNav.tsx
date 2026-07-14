"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, CalendarDays, Bell } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const navs = [
    {
      icon: <LayoutDashboard size={22} />,
      href: "/panel/dashboard",
      label: "خانه",
    },
    {
      icon: <CalendarDays size={22} />,
      href: "/panel/booking",
      label: "رزروها",
    },
    {
      icon: <Bell size={22} />,
      href: "/panel/notifications",
      label: "اعلان‌ها",
    },
    { icon: <User size={22} />, href: "/panel/profile", label: "پروفایل" },
  ];

  return (
    <div className="flex h-14 items-center justify-around">
      {navs.map((nav) => {
        const isActive =
          pathname === nav.href || pathname.startsWith(nav.href + "/");
        return (
          <Link
            key={nav.href}
            href={nav.href}
            className="flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-colors"
          >
            <div
              className={`rounded-xl p-1.5 transition-all ${
                isActive
                  ? "bg-brand text-white shadow-md shadow-brand/25"
                  : "text-ink-muted"
              }`}
            >
              {nav.icon}
            </div>
            <span
              className={`text-[10px] font-bold ${
                isActive ? "text-brand" : "text-ink-muted"
              }`}
            >
              {nav.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
