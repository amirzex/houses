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
        {
            name: "کل",
            count: bookingCount,
        },
        {
            name: "در انتظار",
            count: pendingBookings,
        },
        {
            name: "تایید شده",
            count: conformedBookings,
        },
        {
            name: "لغو شده",
            count: canceledBookings,
        },
    ];

    return (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-white/5 h-full flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
                <div>
                    <h3 className="font-black text-slate-800 dark:text-white text-lg">
                        وضعیت رزروها
                    </h3>

                    <p className="text-xs text-slate-400 font-medium mt-1">
                        تحلیل کلی رزروهای سیستم
                    </p>
                </div>

                <div className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full">
                    {bookingCount} رزرو
                </div>
            </div>

            {/* Empty State */}
            {bookingCount === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-slate-400 font-bold text-sm">
                        هنوز رزروی ثبت نشده
                    </p>
                </div>
            ) : (
                <div className="flex-grow w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id="colorCount"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#4F46E5"
                                        stopOpacity={0.35}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#4F46E5"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#f1f5f9"
                            />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#94a3b8",
                                    fontSize: 12,
                                    fontWeight: 700,
                                }}
                                dy={10}
                            />

                            <YAxis hide />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    stroke: "#4F46E5",
                                    strokeWidth: 1,
                                    strokeDasharray: "5 5",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#4F46E5"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorCount)"
                                animationDuration={2000}
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
            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border-none">
                <p className="text-[10px] font-bold opacity-60 mb-1">
                    {payload[0].payload.name}
                </p>

                <p className="text-sm font-black tracking-tight">
                    {payload[0].value}

                    <span className="font-normal opacity-80 mr-1">
                        رزرو
                    </span>
                </p>
            </div>
        );
    }

    return null;
};

export default BookingChart;
