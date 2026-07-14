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
    { title: "داشبورد", icon: <LayoutDashboard size={22} />, href: "/panel/dashboard", roles: ["seller", "buyer"] },
    { title: "داشبورد", icon: <LayoutDashboard size={22} />, href: "/panel/dashboard/admin", roles: ["admin"] },
    { title: "اطلاعات کاربری", icon: <User size={22} />, href: "/panel/profile", roles: ["seller", "buyer"] },
    { title: " کاربران", icon: <User size={22} />, href: "/panel/user", roles: ["admin"] },
    { title: " مدریت املاک", icon: <Home size={22} />, href: "/panel/houses", roles: ["admin", "seller"] },
    { title: "مدیریت رزروها", icon: <CalendarDays size={22} />, href: "/panel/booking", roles: ["seller", "buyer"] },
    { title: "مدیریت رزروها", icon: <CalendarDays size={22} />, href: "/panel/booking/admin", roles: ["admin"] },
    { title: "مدیریت مالی", icon: <PieChart size={22} />, href: "/panel/financial", roles: ["seller", "buyer"] },
    { title: "علاقه‌مندی‌ها", icon: <Heart size={22} />, href: "/panel/favorites", roles: ["buyer"] },
    { title: "پرداخت ها ", icon: <BadgeDollarSign size={22} />, href: "/panel/payments/admin", roles: ["admin"] },
    { title: "اعلان‌ها", icon: <Bell size={22} />, href: "/panel/notifications", roles: ["admin", "seller", "buyer"] },
    { title: "ملاقات ها", icon: <UserRoundSearch size={22} />, href: "/panel/appointments", roles: ["seller", "buyer"] },
    { title: " چت ها ", icon: <BadgeAlert size={22} />, href: "/panel/chat-room", roles: ["admin"] },
    { title: "  کامنت ها ", icon: <BotMessageSquare size={22} />, href: "/panel/comments", roles: ["admin"] },
    { title: "  تور ها ", icon: <CableCar size={22} />, href: "/panel/tours", roles: ["admin"] },
    { title: "گزارش خرابی ", icon: <MailWarning size={22} />, href: "/panel/maintenance", roles: ["admin", "seller"] },
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
        return <div className="p-6">Loading...</div>;
    }

    const visibleItems = menuItems.filter((item) =>
        item.roles.includes(role)
    );


    return (
        <div className="flex h-full min-h-[640px] flex-col overflow-y-auto p-5">
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-brand font-sans text-sm font-black text-white shadow-lg shadow-brand/25">
                    H
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tight text-ink dark:text-white">
                        Home
                    </span>
                    <span className="text-xs font-medium text-ink-muted">پنل مدیریت</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5">
                {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-all duration-300 ${isActive
                                ? "bg-brand text-white shadow-md shadow-brand/25"
                                : "text-ink-muted hover:bg-brand-soft hover:text-brand dark:hover:bg-white/5"
                                }`}
                        >
                            <span className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-bold">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={() => logout()}
                disabled={isPending}
                className={`mt-auto flex items-center gap-3 rounded-2xl px-3.5 py-3.5 font-bold text-danger transition-colors hover:bg-danger/10 ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <LogOut size={20} className={isPending ? "animate-pulse" : ""} />
                <span>{isPending ? "در حال خروج..." : "خروج"}</span>
            </button>
        </div>
    );
}
