import React from "react";
import { Users, Home, CalendarDays, Star } from "lucide-react";

export default function AdminStats({ info }: { info: any }) {
  const stats = [
    {
      title: "تعداد کاربران",
      value: info?.totalUsers || 0,
      icon: <Users size={18} className="text-brand" />,
    },
    {
      title: "کل خانه‌ها",
      value: info?.totalHouses || 0,
      icon: <Home size={18} className="text-accent-teal" />,
    },
    {
      title: "کل رزروها",
      value: info?.totalBookings || 0,
      icon: <CalendarDays size={18} className="text-deal" />,
    },
    {
      title: "کل امتیاز",
      value: info?.averageRating ?? "—",
      icon: <Star size={18} className="text-amber-500" />,
    },
  ];

  return (
    <div className="panel-stat-grid">
      {stats.map((stat) => (
        <div key={stat.title} className="panel-stat">
          <div className="relative z-10 mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-muted p-2.5 dark:bg-white/5">
              {stat.icon}
            </div>
          </div>
          <p className="relative z-10 text-sm font-bold text-ink-muted">
            {stat.title}
          </p>
          <p className="relative z-10 mt-1 text-xl font-black text-ink sm:text-2xl dark:text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
