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

  if (isLoading) return <div className="p-10 text-center">در حال بارگذاری...</div>;

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center bg-white rounded-3xl">
        <h1 className="text-xl font-black">مدیریت رزروها</h1>
        <input
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          placeholder="جستجو در اقامتگاه‌ها..."
          className="border rounded-full px-4 py-2 text-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData.slice((currentPage - 1) * 5, currentPage * 5)}
        emptyMessage="رزروی یافت نشد"
      />
    </div>
  );
};

export default BookingsAdminPage;
