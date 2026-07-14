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
            return "panel-badge-warn border border-amber-200/60 dark:border-amber-500/20";
        case "approved":
            return "panel-badge-success border border-emerald-200/60 dark:border-emerald-500/20";
        case "rejected":
            return "panel-badge-danger border border-rose-200/60 dark:border-rose-500/20";
        default:
            return "panel-badge-muted border border-border/60";
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
        return <div className="panel-empty">در حال ساخت تقویم...</div>;
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
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <div>
                    <h2 className="panel-heading text-xl sm:text-2xl">تقویم من</h2>
                    <p className="panel-subheading" dir="ltr">
                        {currentDateTitle || "در حال بارگذاری..."}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink-muted">
                        <span className="size-3 rounded-full bg-emerald-400"></span> تایید شده
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink-muted">
                        <span className="size-3 rounded-full bg-amber-400"></span> در انتظار
                    </div>
                </div>
            </div>

            <div className="panel-card overflow-x-auto">
                {/* هدر روزهای هفته */}
                <div className="grid min-w-[640px] grid-cols-7 border-b border-border/60 bg-muted/80 dark:border-white/5 dark:bg-white/5">
                    {WEEK_DAYS.map((day, idx) => (
                        <div key={idx} className="py-3 text-center text-sm font-black text-ink-muted sm:py-4">
                            {day}
                        </div>
                    ))}
                </div>

                {/* شبکه‌ی روزها (Grid) */}
                <div className="grid min-w-[640px] auto-rows-[minmax(90px,auto)] grid-cols-7">
                    {calendarCells.map((cell) => {
                        const dayAppointments = cell.isCurrentMonth ? (appointmentsByDay[cell.dayNumber] || []) : [];
                        const isToday = cell.dayNumber === todayJalaliDay; // بررسی روز جاری

                        return (
                            <div
                                key={cell.index}
                                className={`
                                     relative border-b border-l border-border/50 p-2 transition-colors last:border-l-0 dark:border-white/5
                                    ${!cell.isCurrentMonth ? 'bg-muted/40 text-ink-muted' : 'bg-card hover:bg-brand-soft/30'}
                                    ${isToday ? 'bg-brand-soft/40' : ''}
                                `}
                            >
                                {/* شماره روز */}
                                {cell.isCurrentMonth && (
                                    <span className={`
                                        mb-2 inline-flex size-8 items-center justify-center rounded-full text-sm font-bold
                                        ${isToday ? 'bg-brand text-white shadow-md' : 'text-ink dark:text-white'}
                                    `}>
                                        {cell.dayNumber}
                                    </span>
                                )}

                                {/* لیست قرارهای این روز */}
                                {cell.isCurrentMonth && dayAppointments.length > 0 && (
                                    <div className="mt-1 flex flex-col gap-1.5">
                                        {dayAppointments.map((app) => {
                                            const time = new Date(app.appointmentTime).toLocaleTimeString("fa-IR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });
                                            return (
                                                <div
                                                    key={app.id}
                                                    // کلاس group اضافه شد برای کنترل هاور
                                                    className={`group relative cursor-pointer px-2 py-1.5 text-xs font-bold shadow-sm transition-transform hover:scale-[1.02] ${getStatusColor(app.status)}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{time}</span>
                                                        <span className="opacity-75">#{app.houseId}</span>
                                                    </div>

                                                    {/* تولتیپ اطلاعات تکمیلی */}
                                                    <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 scale-95 rounded-xl bg-ink p-3 text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                                                        <div className="mb-2 border-b border-white/20 pb-2 text-sm font-black">
                                                            جزئیات ملاقات
                                                        </div>
                                                        <div className="flex flex-col gap-2 text-xs font-medium text-ink-muted">
                                                            <div className="flex justify-between">
                                                                <span className="text-white/50">ساعت:</span>
                                                                <span className="text-white">{time}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-white/50">شناسه ملک:</span>
                                                                <span className="text-white">#{app.houseId}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-white/50">نوع قرار:</span>
                                                                <span className="text-white">{app.type === 'virtual' ? 'مجازی' : 'حضوری'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-white/50">وضعیت:</span>
                                                                <span className={`
                                                                    ${app.status === 'approved' ? 'text-emerald-400' : ''}
                                                                    ${app.status === 'pending' ? 'text-amber-400' : ''}
                                                                    ${app.status === 'rejected' ? 'text-rose-400' : ''}
                                                                `}>
                                                                    {app.status === 'approved' ? 'تایید شده' : app.status === 'rejected' ? 'رد شده' : 'در انتظار'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* مثلث پایین تولتیپ */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
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
