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

    if (isLoading) return <div className="p-8 text-center font-black">در حال بارگذاری...</div>;

    return (
        <div className="p-4 md:p-8 space-y-8" dir="rtl">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-row-reverse items-center gap-4">
                    <select value={filters.status} onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))} className="w-44 border-2 rounded-full px-5 py-3 text-xs font-bold bg-transparent outline-none cursor-pointer">
                        <option value="all">همه</option>
                        <option value="تایید شده">تایید شده</option>
                        <option value="تایید نشده">تایید نشده</option>
                    </select>
                </div>
                <h1 className="text-xl font-black">تراکنش‌های مالی</h1>
            </div>

            <DataTable columns={columns} data={paginatedData} emptyMessage="هیچ تراکنشی یافت نشد" />

            {/* Pagination Logic */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-11 h-11 rounded-2xl ${currentPage === page ? "bg-black text-white" : "bg-white border"}`}>
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentsUserPageAdmin;
