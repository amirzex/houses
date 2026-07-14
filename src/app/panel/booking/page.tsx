"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    MoreHorizontal,
    SlidersHorizontal,
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    Info,
    Trash2,
    AlertCircle,
} from "lucide-react";
import { useBookings } from "@/core/api/dashboard/booking/queries";

const BookingsPage = () => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;

    const { data: apiData, isLoading } = useBookings();

    const staticBookings = [
        {
            id: 1,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "تایید شده",
            payment: "لغو شده",
            travelerDetails: [],
        },
        {
            id: 2,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "در انتظار",
            payment: "تایید شده",
            travelerDetails: [],
        },
        {
            id: 3,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "تایید شده",
            payment: "تایید شده",
            travelerDetails: [],
        },
    ];

    const rawData = Array.isArray(apiData) ? apiData : (apiData as any)?.data || [];
    const isDataStatic = !isLoading && rawData.length === 0;

    const allMappedData = useMemo(() => {
        return isDataStatic
            ? staticBookings
            : rawData.map((item: any) => ({
                id: item.id,
                property: item?.house?.title || `اقامتگاه کد ${item.houseId}`,
                date: item?.reservedDates?.length
                    ? `${new Date(item.reservedDates[0]).toLocaleDateString("fa-IR")} - ${new Date(
                        item.reservedDates[1]
                    ).toLocaleDateString("fa-IR")}`
                    : new Date(item.created_at).toLocaleDateString("fa-IR"),
                amount: item?.house?.price
                    ? Number(item.house.price).toLocaleString("fa-IR")
                    : "نامشخص",
                passengers: `${item.traveler_details?.length || 0} عدد مسافر`,
                travelerDetails: item.traveler_details || [],
                status:
                    item.status === "pending"
                        ? "در انتظار"
                        : item.status === "confirmed"
                            ? "تایید شده"
                            : "لغو شده",
                payment:
                    item.status === "confirmed"
                        ? "تایید شده"
                        : item.status === "pending"
                            ? "در انتظار"
                            : "لغو شده",
            }));
    }, [isDataStatic, rawData]);

    const filteredData = useMemo(() => {
        return allMappedData.filter((item: any) =>
            item.property?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allMappedData, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        return filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [filteredData, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "تایید شده":
                return (
                    <span className="panel-badge-success inline-flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> {status}
                    </span>
                );
            case "لغو شده":
                return (
                    <span className="panel-badge-danger inline-flex items-center gap-1.5">
                        <XCircle size={12} /> {status}
                    </span>
                );
            case "در انتظار":
                return (
                    <span className="panel-badge-warn inline-flex items-center gap-1.5">
                        <Clock size={12} /> {status}
                    </span>
                );
            default:
                return null;
        }
    };

    if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;

    return (
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <div className="flex w-full flex-col gap-1 sm:w-auto">
                    <h1 className="panel-heading">لیست رزرو های شما</h1>
                    {isDataStatic && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                            <AlertCircle size={12} /> در حال نمایش دیتای استاتیک
                        </span>
                    )}
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <div className="panel-filter-field w-full sm:w-80 sm:flex-none">
                        <span className="panel-filter-label">جستجو:</span>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="نام هتل مورد نظر..."
                            className="panel-input"
                        />
                    </div>

                    <button className="btn-brand w-full shrink-0 sm:w-auto">
                        فیلترها
                        <SlidersHorizontal size={16} />
                    </button>
                </div>
            </div>

            <div className="panel-table-shell">
                <div className="overflow-x-auto text-right">
                    <table className="panel-table">
                        <thead>
                            <tr>
                                <th className="text-center">نام اقامتگاه</th>
                                <th>تاریخ رزرو</th>
                                <th>قیمت کل</th>
                                <th className="text-center">تعداد مسافر</th>
                                <th className="text-center">وضعیت رزرو</th>
                                <th className="text-center">وضعیت پرداخت</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item: any, index: number) => (
                                    <tr key={item.id ?? index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-14 w-14 shrink-0 rounded-2xl bg-muted dark:bg-white/10"></div>
                                                <span className="text-sm font-bold text-ink dark:text-slate-200">
                                                    {item.property}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="text-xs font-medium leading-relaxed text-ink-muted tabular-nums">
                                            {item.date}
                                        </td>

                                        <td className="text-sm font-black tabular-nums">
                                            {item.amount} <span className="text-[10px] font-normal opacity-60">ت</span>
                                        </td>

                                        <td className="text-center text-xs font-bold text-ink-muted">
                                            {item.passengers}
                                        </td>

                                        <td>
                                            <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">{getStatusBadge(item.payment)}</div>
                                        </td>

                                        <td className="relative">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                                                className="panel-icon-btn"
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {openMenu === index && (
                                                <div className="absolute left-full top-0 z-50 mt-2 w-32 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-lift)] animate-in zoom-in-95 dark:border-white/10">
                                                    <button className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-black text-ink-muted hover:bg-muted dark:hover:bg-white/5">
                                                        پرداخت <CreditCard size={14} className="text-ink-muted" />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(item);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex w-full items-center justify-between border-y border-border/60 px-4 py-3 text-[11px] font-black text-ink-muted hover:bg-muted dark:border-white/5 dark:hover:bg-white/5"
                                                    >
                                                        جزئیات <Info size={14} className="text-ink-muted" />
                                                    </button>

                                                    <button className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-black text-danger hover:bg-danger/10">
                                                        حذف <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="panel-empty">
                                        موردی یافت نشد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2 py-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`panel-pager-btn ${
                                currentPage === page
                                    ? "panel-pager-btn-active"
                                    : "panel-pager-btn-idle"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {selectedBooking && (
                <div className="panel-modal-backdrop" onClick={() => setSelectedBooking(null)}>
                    <div
                        className="panel-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute left-4 top-4 text-ink-muted transition-colors hover:text-danger"
                        >
                            ✕
                        </button>

                        <h2 className="panel-heading mb-6">جزئیات رزرو</h2>

                        <div className="mb-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
                            <div>
                                <div className="mb-1 text-xs text-ink-muted">نام اقامتگاه</div>
                                <div className="font-bold">{selectedBooking.property}</div>
                            </div>

                            <div>
                                <div className="mb-1 text-xs text-ink-muted">تاریخ رزرو</div>
                                <div className="font-bold">{selectedBooking.date}</div>
                            </div>

                            <div>
                                <div className="mb-1 text-xs text-ink-muted">قیمت کل</div>
                                <div className="font-bold">{selectedBooking.amount} ت</div>
                            </div>

                            <div>
                                <div className="mb-1 text-xs text-ink-muted">وضعیت رزرو</div>
                                <div>{getStatusBadge(selectedBooking.status)}</div>
                            </div>
                        </div>

                        {selectedBooking.travelerDetails?.length > 0 && (
                            <div>
                                <h3 className="mb-4 text-sm font-black">اطلاعات مسافران</h3>

                                <div className="space-y-4">
                                    {selectedBooking.travelerDetails.map((traveler: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border border-border/70 bg-muted/60 p-4 dark:border-white/5 dark:bg-white/5"
                                        >
                                            <div className="mb-2 font-black">
                                                {traveler.firstName} {traveler.lastName}
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 text-xs text-ink-muted sm:grid-cols-2">
                                                <div>کد ملی: {traveler.nationalId}</div>
                                                <div>جنسیت: {traveler.gender}</div>
                                                <div>
                                                    تاریخ تولد: {traveler.birthDate ? new Date(traveler.birthDate).toLocaleDateString("fa-IR") : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;
