"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { useRentQuery } from "@/core/api/landing/queries";
import { DataTable } from "@/components/panel/comments/DataTable";
import { getHouseColumns } from "@/components/panel/houses/Columns";
import AddHouseModal from "@/components/panel/houses/AddHouseModal";
import { useDeleteHouse } from "@/core/api/admin/houses/queries";

const HousesAdminPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filters, setFilters] = useState({
        transactionType: "rental",
        search: "",
    });

    const debouncedFilters = useDebounce(filters, 700);

    const { data, isLoading, error, refetch } = useRentQuery(debouncedFilters);

    const { mutate: deleteHouse, isPending: isDeleting } = useDeleteHouse();

    const handleDelete = (id: number | string) => {
        if (!window.confirm("آیا از حذف این ملک مطمئن هستید؟")) return;

        deleteHouse(id, {
            onSuccess: () => {
                refetch?.();
            },
        });
    };

    const columns = getHouseColumns(
        handleDelete,
        (id) => console.log("Edit:", id)
    );

    return (
        <div className="space-y-8" dir="rtl">
            {/* Header & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-3xl p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-grow md:w-64">
                        <input
                            type="text"
                            placeholder="جستجو در ملک‌ها..."
                            className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-xs outline-none"
                            onChange={(e) =>
                                setFilters((p) => ({ ...p, search: e.target.value }))
                            }
                        />
                        <Search
                            size={16}
                            className="absolute left-4 top-3.5 text-slate-400"
                        />
                    </div>
                    <select
                        className="border-2 border-slate-100 rounded-full px-4 py-3 text-xs outline-none cursor-pointer"
                        value={filters.transactionType}
                        onChange={(e) =>
                            setFilters((p) => ({
                                ...p,
                                transactionType: e.target.value,
                            }))
                        }
                    >
                        <option value="rental">اجاره</option>
                        <option value="sale">فروش</option>
                    </select>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-brand-hover transition"
                >
                    <Plus size={16} />
                    افزودن ملک جدید
                </button>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] border overflow-hidden">
                {isLoading ? (
                    <div className="p-10 text-center">در حال بارگذاری...</div>
                ) : error ? (
                    <div className="p-10 text-center text-rose-500">
                        خطا در دریافت اطلاعات
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data || []}
                        emptyMessage="ملکی یافت نشد"
                    />
                )}
            </div>

            <AddHouseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default HousesAdminPage;
