"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Download, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { usePayments } from "@/core/api/dashboard/payments/queries";

const PaymentsUserPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
    });

    const { data, isLoading } = usePayments();

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const mappedData = useMemo(() => {
        const apiPayments = Array.isArray(data?.payments) ? data.payments : [];
        return apiPayments.map((p: any) => ({
            id: p.id,
            date: p.created_at ? new Date(p.created_at).toLocaleDateString("fa-IR") : "-",
            bookingId: p.bookingId || p.bookingId || "-",
            amount: typeof p.amount === "number" ? p.amount.toLocaleString("fa-IR") : p.amount || "-",
            status: p.status === "completed" ? "تایید شده" : "تایید نشده",
            type: p.type === "wallet" ? "شارژ کیف پول" : "رزرو",
        }));
    }, [data]);

    const filteredData = useMemo(() => {
        return mappedData.filter((item) => {
            const statusMatch = filters.status === "all" || item.status === filters.status;
            const typeMatch = filters.type === "all" || item.type === filters.type;
            return statusMatch && typeMatch;
        });
    }, [mappedData, filters]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage]);

    if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;

    return (
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <h1 className="panel-heading">تراکنش‌های مالی</h1>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <div className="panel-filter-field">
                        <span className="panel-filter-label">وضعیت:</span>
                        <div className="relative">
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                className="panel-select"
                            >
                                <option value="all">همه</option>
                                <option value="تایید شده">تایید شده</option>
                                <option value="تایید نشده">تایید نشده</option>
                            </select>
                            <ChevronDown size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
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
                                <th className="text-right">تاریخ</th>
                                <th className="text-center">شماره پیگیری</th>
                                <th className="text-center">مبلغ (تومان)</th>
                                <th className="text-center">وضعیت</th>
                                <th className="text-center">نوع تراکنش</th>
                                <th className="text-left">عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((t) => (
                                    <tr key={t.id}>
                                        <td className="text-xs font-medium text-ink-muted">{t.date}</td>
                                        <td className="text-center font-mono text-sm tracking-wider">{t.bookingId}</td>
                                        <td className="text-center text-sm font-black">{t.amount}</td>
                                        <td>
                                            <div className="flex justify-center">
                                                {t.status === "تایید شده" ? (
                                                    <span className="panel-badge-success inline-flex items-center gap-1.5">
                                                        <CheckCircle2 size={12} />
                                                        {t.status}
                                                    </span>
                                                ) : (
                                                    <span className="panel-badge-danger inline-flex items-center gap-1.5">
                                                        <XCircle size={12} />
                                                        {t.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-center text-xs font-bold text-ink-muted">{t.type}</td>
                                        <td className="text-left">
                                            <button className="text-[10px] font-black text-ink-muted underline underline-offset-4 transition-colors hover:text-brand">
                                                جزئیات
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="panel-empty">
                                        هیچ تراکنشی یافت نشد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 py-4">
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

export default PaymentsUserPage;
