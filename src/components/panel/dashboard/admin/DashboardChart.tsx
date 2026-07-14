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

interface AdminChartProps {
  info: {
    totalUsers: number;
    totalHouses: number;
    totalBookings: number;
    averageRating: string;
  };
}

const DashboardChart = ({ info }: AdminChartProps) => {
  const data = [
    { name: "کاربران", value: info?.totalUsers || 0 },
    { name: "خانه‌ها", value: info?.totalHouses || 0 },
    { name: "رزروها", value: info?.totalBookings || 0 },
    { name: "امتیاز", value: parseFloat(info?.averageRating || "0") * 10 },
  ];

  return (
    <div className="panel-card-pad flex h-full flex-col">
      <div className="mb-4 px-1 sm:mb-6">
        <h3 className="panel-heading">خلاصه عملکرد سیستم</h3>
        <p className="panel-subheading">آمار کلی پلتفرم</p>
      </div>

      <div className="h-[200px] w-full flex-grow sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="adminChartFill" x1="0" y1="0" x2="0" y2="1">
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
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0c2d5a"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#adminChartFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl bg-ink p-3 text-white shadow-xl">
        <p className="mb-1 text-[10px] font-bold opacity-60">
          {payload[0].payload.name}
        </p>
        <p className="text-sm font-black">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default DashboardChart;
