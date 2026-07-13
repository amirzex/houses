"use client";

import { useDeleteHouse } from "@/core/api/admin/houses/queries";
import { useGetHousesAdmin } from "@/core/api/admin/houses/queries";
import { Trash2 } from "lucide-react";
import React from "react";

export default function AdminHouseTable() {
    const { data: houses, isLoading, error } = useGetHousesAdmin();
    const { mutate: deleteHouse, isPending } = useDeleteHouse();

    const handleDelete = (id: number) => {
        if (window.confirm("آیا از حذف این ملک مطمئن هستید؟")) {
            deleteHouse(id);
        }
    };

    if (isLoading) return <div className="p-6">در حال بارگذاری لیست املاک...</div>;
    if (error) return <div className="p-6 text-red-500">خطا در دریافت اطلاعات</div>;

    return (
        <div className="bg-white rounded-3xl shadow p-6 dark:bg-[#353535] flex flex-col h-95"> 
            <h3 className="font-bold text-lg mb-4">مدیریت خانه‌ها</h3>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-right border-collapse">
                    <thead className="sticky top-0 bg-white dark:bg-[#353535] z-10 shadow-sm">
                        <tr className="border-b font-semibold text-slate-500">
                            <th className="p-3">شناسه</th>
                            <th className="p-3">نام</th>
                            <th className="p-3">وضعیت</th>
                            <th className="p-3">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {houses?.houses?.map((h: any) => (
                            <tr key={h.id} className="border-b hover:bg-gray-50 dark:hover:bg-[#404040]">
                                <td className="p-3">{h.id}</td>
                                <td className="p-3">{h.title}</td>
                                <td className="p-3">{h.status || 'فعال'}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(h.id)}
                                        disabled={isPending}
                                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                        title="حذف ملک"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
