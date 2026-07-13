"use client";

import { useGetAppointUser } from "@/core/api/dashboard/appointments/queries";
import { useMemo, useState, useEffect } from "react";

interface Appointment {
    id: number;
    houseId: number;
    userId: number;
    appointmentTime: string;
    type: "virtual" | "in_person" | string;
    status: "pending" | "approved" | "rejected" | string;
    created_at: string;
    updated_at: string;
}

const WEEK_DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
        case "approved":
            return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
        case "rejected":
            return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
    }
};

const AppointmentsFullCalendar = () => {
    const { data, isLoading } = useGetAppointUser() as { data: Appointment[], isLoading: boolean };

    const [currentDateTitle, setCurrentDateTitle] = useState("");
    const [todayJalaliDay, setTodayJalaliDay] = useState<number | null>(null);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("fa-IR", {
            month: "long",
            year: "numeric"
        });
        setCurrentDateTitle(formattedDate);

        // استخراج روز جاری شمسی به صورت عدد
        const jalaliDayStr = today.toLocaleDateString("fa-IR-u-nu-latn", { day: "numeric" });
        setTodayJalaliDay(parseInt(jalaliDayStr, 10));
    }, []);

    // استخراج شماره روز از تاریخ برای قرار دادن در خانه مناسب تقویم
    const appointmentsByDay = useMemo(() => {
        if (!data) return {};

        return data.reduce((acc: Record<number, Appointment[]>, appointment) => {
            const dateObj = new Date(appointment.appointmentTime);
            // دریافت روز در تقویم شمسی (خروجی مثلاً "15" یا "2")
            const jalaliDayStr = dateObj.toLocaleDateString("fa-IR-u-nu-latn", { day: "numeric" });
            const dayNum = parseInt(jalaliDayStr, 10);

            if (!acc[dayNum]) acc[dayNum] = [];
            acc[dayNum].push(appointment);

            return acc;
        }, {});
    }, [data]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><span className="text-gray-500 animate-pulse text-lg font-bold">در حال ساخت تقویم...</span></div>;
    }

    // شبیه‌سازی یک ماه ۳۱ روزه که روز اول آن مثلاً دوشنبه (ایندکس 2) است.
    // در پروژه واقعی این مقادیر را با date-fns-jalali داینامیک کنید.
    const daysInMonth = 31;
    const startDayOffset = 2; // دوشنبه

    // آرایه‌ای برای تولید خانه‌های تقویم
    const calendarCells = Array.from({ length: 42 }, (_, i) => {
        const dayNumber = i - startDayOffset + 1;
        const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
        return { index: i, dayNumber, isCurrentMonth };
    });

    return (
        <div className="w-full mx-auto p-4 lg:p-8" dir="rtl">
            <div className="mb-8 mt-[-40px] flex justify-between items-end">
                <div className="">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight dark:text-white">تقویم من</h2>
                    <p className="mt-2 text-gray-500 font-medium" dir="ltr">
                        {currentDateTitle || "در حال بارگذاری..."}
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600"><span className="w-3 h-3 rounded-full bg-green-400"></span> تایید شده</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> در انتظار</div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#272727] rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* هدر روزهای هفته */}
                <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/80">
                    {WEEK_DAYS.map((day, idx) => (
                        <div key={idx} className="py-4 text-center dark:bg-[#272727] dark:text-white text-sm font-black text-gray-600">
                            {day}
                        </div>
                    ))}
                </div>

                {/* شبکه‌ی روزها (Grid) */}
                <div className="grid grid-cols-7 dark:bg-black auto-rows-[minmax(90px,auto)]">
                    {calendarCells.map((cell) => {
                        const dayAppointments = cell.isCurrentMonth ? (appointmentsByDay[cell.dayNumber] || []) : [];
                        const isToday = cell.dayNumber === todayJalaliDay; // بررسی روز جاری

                        return (
                            <div
                                key={cell.index}
                                className={`
                                     p-2 border-b border-l last:border-l-0 border-gray-100 relative transition-colors
                                    ${!cell.isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'bg-white dark:bg-[#272727] hover:bg-gray-50/30'}
                                    ${isToday ? 'bg-blue-50/30' : ''} /* هایلایت روز جاری */
                                `}
                            >
                                {/* شماره روز */}
                                {cell.isCurrentMonth && (
                                    <span className={`
                                        inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-2
                                        ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 dark:text-white'}
                                    `}>
                                        {cell.dayNumber}
                                    </span>
                                )}

                                {/* لیست قرارهای این روز */}
                                {cell.isCurrentMonth && dayAppointments.length > 0 && (
                                    <div className="flex flex-col gap-1.5 mt-1">
                                        {dayAppointments.map((app) => {
                                            const time = new Date(app.appointmentTime).toLocaleTimeString("fa-IR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });
                                            return (
                                                <div
                                                    key={app.id}
                                                    // کلاس group اضافه شد برای کنترل هاور
                                                    className={`group relative px-2 py-1.5 rounded-lg border text-xs font-bold shadow-sm cursor-pointer transition-transform hover:scale-[1.02] ${getStatusColor(app.status)}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{time}</span>
                                                        <span className="opacity-75">#{app.houseId}</span>
                                                    </div>

                                                    {/* تولتیپ اطلاعات تکمیلی */}
                                                    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 scale-95 group-hover:scale-100 pointer-events-none">
                                                        <div className="text-sm font-black border-b border-gray-700 pb-2 mb-2">
                                                            جزئیات ملاقات
                                                        </div>
                                                        <div className="flex flex-col gap-2 text-xs font-medium text-gray-300">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">ساعت:</span>
                                                                <span className="text-white">{time}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">شناسه ملک:</span>
                                                                <span className="text-white">#{app.houseId}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">نوع قرار:</span>
                                                                <span className="text-white">{app.type === 'virtual' ? 'مجازی' : 'حضوری'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">وضعیت:</span>
                                                                <span className={`
                                                                    ${app.status === 'approved' ? 'text-green-400' : ''}
                                                                    ${app.status === 'pending' ? 'text-yellow-400' : ''}
                                                                    ${app.status === 'rejected' ? 'text-red-400' : ''}
                                                                `}>
                                                                    {app.status === 'approved' ? 'تایید شده' : app.status === 'rejected' ? 'رد شده' : 'در انتظار'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* مثلث پایین تولتیپ */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsFullCalendar;
