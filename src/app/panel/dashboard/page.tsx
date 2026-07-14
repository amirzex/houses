"use client";
import BookingChart from "@/components/panel/dashboard/BookingChart";
import { useDashboardSummary } from "@/core/api/dashboard/queries";
import BookingTable from "@/components/panel/dashboard/BookingTable";
import State from "@/components/panel/dashboard/State";

export default function DashboardPage() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <div className="panel-empty">در حال بارگذاری ...</div>;
  }

  return (
    <div className="panel-page">
      <State />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-6">
        <div className="min-w-0 xl:col-span-2">
          <BookingTable />
        </div>
        <div className="min-w-0">
          <BookingChart
            bookingCount={data?.bookings?.bookingCount || 6}
            pendingBookings={data?.bookings?.pendingBookings || 10}
            conformedBookings={data?.bookings?.conformedBookings || 15}
            canceledBookings={data?.bookings?.canceledBookings || 4}
          />
        </div>
      </div>
    </div>
  );
}
