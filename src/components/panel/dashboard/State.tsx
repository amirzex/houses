import React from "react";
import { Calendar, Wallet, Star, CirclePercent } from "lucide-react";
import { useUserActivity } from "@/core/api/dashboard/user/queries";

const State = () => {
  const { data } = useUserActivity();

  const stats = [
    {
      title: "کل رزروها",
      value: data?.activity?.bookingCount,
      icon: <Calendar className="text-brand" size={20} />,
      trend: "+۱۲٪",
      tone: "panel-badge-success" as const,
    },
    {
      title: "موجودی کیف پول",
      value: "۴,۵۰۰,۰۰۰ تومان",
      icon: <Wallet className="text-accent-teal" size={20} />,
      trend: "+۵٪",
      tone: "panel-badge-success" as const,
    },
    {
      title: "رزروهای پرداخت‌شده",
      value: data?.activity?.housesCreated,
      icon: <Star className="text-deal" size={20} />,
      trend: "جدید",
      tone: "panel-badge-warn" as const,
    },
    {
      title: "مشخصات تکمیلی",
      value: data?.user?.additionalPercentage,
      icon: <CirclePercent className="text-brand" size={20} />,
      trend: "%",
      tone: "panel-badge-brand" as const,
    },
  ];

  return (
    <div className="panel-stat-grid">
      {stats.map((stat, i) => (
        <div key={i} className="panel-stat">
          <div className="relative z-10 flex items-start justify-between mb-3 sm:mb-4">
            <div className="rounded-xl bg-muted p-2.5 dark:bg-white/5 sm:rounded-2xl sm:p-3">
              {stat.icon}
            </div>
            <span className={stat.tone}>{stat.trend}</span>
          </div>
          <p className="relative z-10 text-sm font-bold text-ink-muted">
            {stat.title}
          </p>
          <p className="relative z-10 mt-1 text-lg font-black text-ink sm:text-xl dark:text-white">
            {stat.value ?? "—"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default State;
