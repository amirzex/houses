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

  const { mutate: deleteHouse } = useDeleteHouse();

  const handleDelete = (id: number | string) => {
    if (!window.confirm("آیا از حذف این ملک مطمئن هستید؟")) return;

    deleteHouse(id, {
      onSuccess: () => {
        refetch?.();
      },
    });
  };

  const columns = getHouseColumns(handleDelete, (id) =>
    console.log("Edit:", id)
  );

  return (
    <div className="panel-page" dir="rtl">
      <div className="panel-toolbar">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:w-64 sm:flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="جستجو در ملک‌ها..."
              className="panel-input pe-4 ps-10"
              onChange={(e) =>
                setFilters((p) => ({ ...p, search: e.target.value }))
              }
            />
            <Search
              size={16}
              className="absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />
          </div>
          <select
            className="panel-input w-full cursor-pointer sm:w-auto"
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
          className="btn-brand w-full shrink-0 sm:w-auto"
        >
          <Plus size={16} />
          افزودن ملک جدید
        </button>
      </div>

      {isLoading ? (
        <div className="panel-card panel-empty">در حال بارگذاری...</div>
      ) : error ? (
        <div className="panel-card panel-empty text-danger">
          خطا در دریافت اطلاعات
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data || []}
          emptyMessage="ملکی یافت نشد"
        />
      )}

      <AddHouseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HousesAdminPage;
