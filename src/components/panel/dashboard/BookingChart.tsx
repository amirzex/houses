"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BookingChartProps {
  bookingCount: number;
  pendingBookings: number;
  conformedBookings: number;
  canceledBookings: number;
}

const BookingChart = ({
  bookingCount,
  pendingBookings,
  conformedBookings,
  canceledBookings,
}: BookingChartProps) => {
  const data = [
    { name: "کل", count: bookingCount },
    { name: "در انتظار", count: pendingBookings },
    { name: "تایید شده", count: conformedBookings },
    { name: "لغو شده", count: canceledBookings },
  ];

  return (
    <div className="panel-card-pad flex h-full min-w-0 flex-col">
      <div className="mb-4 flex items-center justify-between gap-3 px-1 sm:mb-6">
        <div className="min-w-0">
          <h3 className="panel-heading">وضعیت رزروها</h3>
          <p className="panel-subheading">تحلیل کلی رزروهای سیستم</p>
        </div>
        <div className="panel-badge-brand shrink-0">{bookingCount} رزرو</div>
      </div>

      {bookingCount === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm font-bold text-ink-muted">
            هنوز رزروی ثبت نشده
          </p>
        </div>
      ) : (
        <div className="h-[200px] min-h-[200px] w-full min-w-0 flex-grow sm:h-[220px] xl:h-[250px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0c2d5a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0c2d5a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#0c2d5a",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#0c2d5a"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
                animationDuration={1600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border-none bg-ink p-3 text-white shadow-xl">
        <p className="mb-1 text-[10px] font-bold opacity-60">
          {payload[0].payload.name}
        </p>
        <p className="text-sm font-black tracking-tight">
          {payload[0].value}
          <span className="mr-1 font-normal opacity-80">رزرو</span>
        </p>
      </div>
    );
  }
  return null;
};

export default BookingChart;
