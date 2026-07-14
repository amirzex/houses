"use client";

import { useMemo, useState } from "react";
import { useDeletePayment, useGetPayments, useUpdatePayment } from "@/core/api/admin/payments/queries";
import { getPaymentColumns } from "@/components/panel/payments/Columns";
import { DataTable } from "@/components/panel/comments/DataTable";

const PaymentsUserPageAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ status: "all", type: "all" });
    const itemsPerPage = 6;

    const { data, isLoading, isError } = useGetPayments();
    const { mutate: updatePayment } = useUpdatePayment();
    const { mutate: deletePayment } = useDeletePayment();

    const mappedData = useMemo(() => {
        const apiPayments = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        return apiPayments.map((p: any) => ({
            id: p.id,
            date: p.created_at ? new Date(p.created_at).toLocaleDateString("fa-IR") : "-",
            bookingId: p.bookingId || p.booking_id || "-",
            amount: typeof p.amount === "number" ? p.amount.toLocaleString("fa-IR") : p.amount || "-",
            status: p.status === "completed" ? "تایید شده" : "تایید نشده",
            type: p.type === "wallet" ? "شارژ کیف پول" : "رزرو",
        }));
    }, [data]);

    const filteredData = useMemo(() => {
        return mappedData.filter((item) =>
            (filters.status === "all" || item.status === filters.status) &&
            (filters.type === "all" || item.type === filters.type)
        );
    }, [mappedData, filters]);

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleUpdate = (payload: { id: string | number; body: { status: string } }) => {
        updatePayment(payload);
        console.log(payload)
    };

    const columns = getPaymentColumns(deletePayment, handleUpdate);

    if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;

    return (
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <h1 className="panel-heading">تراکنش‌های مالی</h1>
                <div className="panel-filter-field">
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))}
                        className="panel-input w-full cursor-pointer sm:w-44"
                    >
                        <option value="all">همه</option>
                        <option value="تایید شده">تایید شده</option>
                        <option value="تایید نشده">تایید نشده</option>
                    </select>
                </div>
            </div>

            {isError ? (
                <div className="panel-card panel-empty text-danger">خطا در دریافت اطلاعات</div>
            ) : (
                <DataTable columns={columns} data={paginatedData} emptyMessage="هیچ تراکنشی یافت نشد" />
            )}

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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

export default PaymentsUserPageAdmin;
