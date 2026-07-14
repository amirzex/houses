"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Moon, Sun, ChevronDown, UserIcon, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/core/api/dashboard/user/queries";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data } = useUser();
  const user = data?.user?.user;

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const pageTitle = useMemo(() => {
    const routes: Record<string, string> = {
      "/panel/dashboard": "داشبورد",
      "/panel/dashboard/admin": "داشبورد ادمین",
      "/panel/profile": "اطلاعات کاربری",
      "/panel/user": "کاربران",
      "/panel/houses": "مدیریت املاک",
      "/panel/booking": "مدیریت رزروها",
      "/panel/booking/admin": "مدیریت رزروها",
      "/panel/financial": "مدیریت مالی",
      "/panel/favorites": "علاقه‌مندی‌ها",
      "/panel/payments": "پرداخت‌ها",
      "/panel/payments/admin": "پرداخت‌ها",
      "/panel/notifications": "اعلان‌ها",
      "/panel/appointments": "ملاقات‌ها",
      "/panel/comments": "کامنت‌ها",
      "/panel/maintenance": "گزارش خرابی",
      "/panel/tours": "تورها",
      "/panel/chat-room": "چت‌ها",
    };

    return routes[pathname] || "پنل مدیریت";
  }, [pathname]);

  if (!mounted) return null;

  return (
    <header className="mb-1 w-full sm:mb-2">
      <div className="panel-header-bar">
        <div className="flex flex-row-reverse items-center gap-2 sm:gap-3 md:gap-5">
          <div className="flex cursor-pointer flex-row-reverse items-center gap-2 rounded-2xl p-1.5 transition-colors hover:bg-muted/80 dark:hover:bg-white/5 sm:gap-3 sm:p-2">
            <ChevronDown
              size={14}
              className="hidden text-ink-muted sm:block"
            />

            <div className="hidden text-left sm:block">
              <p className="max-w-[120px] truncate text-sm font-black leading-tight text-ink dark:text-white md:max-w-[160px]">
                {user?.fullName || "کاربر"}
              </p>
              <p className="mt-0.5 text-[10px] font-bold text-ink-muted">
                {user?.role || "—"}
              </p>
            </div>

            <div className="size-9 overflow-hidden rounded-xl border-2 border-card shadow-sm sm:size-11 sm:rounded-2xl">
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand to-accent-teal text-white">
                {user?.profilePicture && user.profilePicture !== "string" ? (
                  <img
                    src={user.profilePicture}
                    alt="profile"
                    className="size-full object-cover"
                  />
                ) : (
                  <UserIcon size={22} className="text-white/90" />
                )}
              </div>
            </div>
          </div>

          <div className="hidden h-8 w-px bg-border dark:bg-white/10 md:block" />

          <button
            type="button"
            className="panel-icon-btn"
            aria-label="اعلان‌ها"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-card bg-danger" />
          </button>

          <Link href="/" className="panel-icon-btn" aria-label="صفحه اصلی">
            <Home size={18} />
          </Link>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="relative flex w-16 items-center rounded-xl bg-muted p-1 transition-all dark:bg-white/10 sm:w-20 sm:rounded-2xl sm:p-1.5"
            aria-label="تغییر تم"
          >
            <div
              className={`absolute size-7 rounded-lg bg-card shadow-sm transition-all duration-300 sm:size-8 sm:rounded-xl dark:bg-brand ${
                isDark ? "-translate-x-7 sm:-translate-x-9" : "translate-x-0"
              }`}
            />

            <div className="relative z-10 flex w-full justify-between px-1 pointer-events-none sm:px-1.5">
              <Sun
                size={14}
                className={isDark ? "text-ink-muted" : "text-brand"}
              />
              <Moon
                size={14}
                className={isDark ? "text-white" : "text-ink-muted"}
              />
            </div>
          </button>
        </div>

        <div className="min-w-0 flex-1 pe-2 sm:flex-none sm:pe-0">
          <h2 className="truncate text-base font-black tracking-tight text-ink sm:text-xl md:text-2xl dark:text-white">
            {pageTitle}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
