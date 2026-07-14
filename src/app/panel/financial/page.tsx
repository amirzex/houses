"use client";

import React, { useMemo, useState } from "react";
import { Download, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { usePayments } from "@/core/api/dashboard/payments/queries";
import ReceiptModal from "@/components/panel/financial/ReceipModal";

const staticData = [
    {
        id: 1,
        date: "۱۴۰۲/۰۵/۱۲",
        trackingId: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
        amount: "۱,۲۵۰,۰۰۰",
        status: "تایید شده",
        type: "رزرو",
    },
    {
        id: 2,
        date: "۱۴۰۲/۰۵/۱۲",
        trackingId: "۹۸۷۶۵۴۳۲۱۰۹۸۷۶۵",
        amount: "۵۵۰,۰۰۰",
        status: "تایید نشده",
        type: "شارژ کیف پول",
    },
];

const FinancialPage = () => {
    const [filters, setFilters] = useState({
        sort: "createdAt",
        order: "DESC",
        status: "",
        type: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const { data } = usePayments(filters);


    const apiPayments = Array.isArray(data?.payments) ? data.payments : [];

    const mappedApiData = useMemo(() => {
        return apiPayments.map((p: any) => ({
            id: p.id,
            date: p.created_at
                ? new Date(p.created_at).toLocaleDateString("fa-IR")
                : "-",
            bookingId: p.bookingId || p.bookingId || "-",
            amount:
                typeof p.amount === "number"
                    ? p.amount.toLocaleString("fa-IR")
                    : p.amount || "-",
            status: p.status === "completed" ? "تایید شده" : "تایید نشده",
            type: p.type === "wallet" ? "شارژ کیف پول" : "رزرو",
        }));
    }, [apiPayments]);

    const filteredData = useMemo(() => {
        const source = mappedApiData.length > 0 ? mappedApiData : staticData;

        return source.filter((item: any) => {
            const statusMatch =
                filters.status === "" || item.status === filters.status;

            const typeMatch =
                filters.type === "" || item.type === filters.type;

            return statusMatch && typeMatch;
        });
    }, [mappedApiData, filters]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        return filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredData, currentPage]);


    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="panel-page" dir="rtl">
            {mappedApiData.length === 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
                    در حال حاضر داده‌ای از API دریافت نشد و داده‌های نمونه نمایش داده می‌شوند.
                </div>
            )}

            <div className="panel-toolbar">
                <h1 className="panel-heading shrink-0">لیست تراکنش های شما</h1>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="panel-filter-field">
                        <span className="panel-filter-label">وضعیت پرداخت:</span>
                        <div className="relative">
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        status: e.target.value,
                                    }))
                                }
                                className="panel-select"
                            >
                                <option value="all">همه</option>
                                <option value="تایید شده">تایید شده</option>
                                <option value="تایید نشده">تایید نشده</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                            />
                        </div>
                    </div>

                    <div className="panel-filter-field">
                        <span className="panel-filter-label">نوع تراکنش:</span>
                        <div className="relative">
                            <select
                                value={filters.type}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        type: e.target.value,
                                    }))
                                }
                                className="panel-select"
                            >
                                <option value="all">همه</option>
                                <option value="رزرو">رزرو</option>
                                <option value="شارژ کیف پول">شارژ کیف پول</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                            />
                        </div>
                    </div>

                    <div className="panel-filter-field">
                        <span className="panel-filter-label">مرتب‌سازی بر اساس:</span>
                        <div className="relative">
                            <select
                                value={filters.sort}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sort: e.target.value,
                                    }))
                                }
                                className="panel-select"
                            >
                                <option value="createdAt">تاریخ ایجاد</option>
                                <option value="updatedAt">تاریخ بروزرسانی</option>
                                <option value="amount">مبلغ</option>
                                <option value="status">وضعیت</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                            />
                        </div>
                    </div>

                    <div className="panel-filter-field">
                        <span className="panel-filter-label">ترتیب:</span>
                        <div className="relative">
                            <select
                                value={filters.order}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        order: e.target.value,
                                    }))
                                }
                                className="panel-select"
                            >
                                <option value="ASC">صعودی (ASC)</option>
                                <option value="DESC">نزولی (DESC)</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                            />
                        </div>
                    </div>

                    <button className="panel-icon-btn shrink-0">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            <div className="panel-table-shell">
                <div className="overflow-x-auto text-right">
                    <table className="panel-table">
                        <thead>
                            <tr>
                                <th>تاریخ</th>
                                <th className="text-center">شماره پیگیری</th>
                                <th className="text-center">مبلغ</th>
                                <th className="text-center">وضعیت</th>
                                <th className="text-center">نوع</th>
                                <th className="text-left">عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((t: any) => (
                                    <tr key={t.id}>
                                        <td className="text-xs">{t.date}</td>

                                        <td className="text-center text-sm">
                                            {t.bookingId}
                                        </td>

                                        <td className="text-center text-sm font-black">
                                            {t.amount}
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                {t.status === "تایید شده" ? (
                                                    <span className="panel-badge-success inline-flex items-center gap-1">
                                                        <CheckCircle2 size={12} />
                                                        {t.status}
                                                    </span>
                                                ) : (
                                                    <span className="panel-badge-danger inline-flex items-center gap-1">
                                                        <XCircle size={12} />
                                                        {t.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="text-center text-xs">{t.type}</td>

                                        <td
                                            onClick={() => {
                                                setSelectedPayment(t);
                                                setOpenModal(true);
                                            }}
                                            className="cursor-pointer text-left text-[10px] font-black text-ink-muted hover:text-brand"
                                        >
                                            مشاهده رسید
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="panel-empty">
                                        موردی برای نمایش وجود ندارد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReceiptModal
                open={openModal}
                payment={selectedPayment}
                onClose={() => setOpenModal(false)}
            />

            {filteredData.length > itemsPerPage && (
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


        </div>
    );
};

export default FinancialPage;
