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

  if (isLoading)
    return <div className="panel-card-pad panel-empty">در حال بارگذاری...</div>;
  if (error)
    return (
      <div className="panel-card-pad panel-empty text-danger">
        خطا در دریافت اطلاعات
      </div>
    );

  return (
    <div className="panel-card-pad flex h-80 flex-col sm:h-95">
      <h3 className="panel-heading mb-4">مدیریت خانه‌ها</h3>

      <div className="flex-1 overflow-auto">
        <table className="panel-table min-w-[480px]">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {houses?.houses?.map((h: any) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td className="font-bold">{h.title}</td>
                <td>
                  <span className="panel-badge-success">
                    {h.status || "فعال"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(h.id)}
                    disabled={isPending}
                    className="rounded-xl p-2 text-danger transition-colors hover:bg-danger/10"
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
