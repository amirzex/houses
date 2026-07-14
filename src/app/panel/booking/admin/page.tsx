"use client";

import React, { useState, useMemo } from "react";
import { useDeleteAdminBooking, useUpdateAdminBooking } from "@/core/api/admin/booking/queries";
import { useBookings } from "@/core/api/dashboard/booking/queries";
import { getBookingColumns } from "@/components/panel/booking/Columns";
import { DataTable } from "@/components/panel/comments/DataTable";

const BookingsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apiData, isLoading, isError } = useBookings();
  const { mutate: deleteBooking } = useDeleteAdminBooking();
  const { mutate: updateBooking } = useUpdateAdminBooking();

  const bookings = Array.isArray(apiData?.data) ? apiData.data : [];

  const mappedData = useMemo(() => {
    return bookings.map((item: any) => ({
      id: item.id,
      property: item?.house?.title || `اقامتگاه کد ${item.houseId}`,
      date: item?.created_at ? new Date(item.created_at).toLocaleDateString("fa-IR") : "نامشخص",
      amount: item?.house?.price ? Number(item.house.price).toLocaleString("fa-IR") : "۰",
      status: item.status === "confirmed" ? "تایید شده" : item.status === "pending" ? "در انتظار" : "لغو شده",
      payment: "نامشخص",
    }));
  }, [bookings]);

  const filteredData = useMemo(() => {
    return mappedData.filter((item: any) => item.property.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [mappedData, searchTerm]);

  const columns = getBookingColumns(deleteBooking, (id) => updateBooking({ id, body: { status: "confirmed" } }));

  if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;

  return (
    <div className="panel-page" dir="rtl">
      <div className="panel-toolbar">
        <h1 className="panel-heading">مدیریت رزروها</h1>
        <div className="panel-filter-field w-full sm:w-64 sm:flex-none">
          <input
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="جستجو در اقامتگاه‌ها..."
            className="panel-input"
          />
        </div>
      </div>

      {isError ? (
        <div className="panel-card panel-empty text-danger">خطا در دریافت اطلاعات</div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData.slice((currentPage - 1) * 5, currentPage * 5)}
          emptyMessage="رزروی یافت نشد"
        />
      )}
    </div>
  );
};

export default BookingsAdminPage;
