"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, CalendarDays, Bell } from 'lucide-react';

export default function MobileNav() {
    const pathname = usePathname();
    const navs = [
        { icon: <LayoutDashboard size={24} />, href: "/dashboard", label: "خانه" },
        { icon: <CalendarDays size={24} />, href: "/bookings", label: "رزروها" },
        { icon: <Bell size={24} />, href: "/notifications", label: "اعلان‌ها" },
        { icon: <User size={24} />, href: "/profile", label: "پروفایل" },
    ];

    return (
        <div className="flex justify-around items-center h-14">
            {navs.map((nav) => {
                const isActive = pathname === nav.href;
                return (
                    <Link key={nav.href} href={nav.href} className="flex flex-col items-center gap-1">
                        <div className={`p-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                            {nav.icon}
                        </div>
                        <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                            {nav.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
