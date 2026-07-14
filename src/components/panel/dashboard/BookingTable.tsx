import { useBookings } from "@/core/api/dashboard/booking/queries";
import React from "react";

const staticBookings = [
  {
    id: 1,
    villaName: "ویلای دوبلکس ساحلی",
    date: "۲۴ مهر ۱۴۰۲",
    status: "تکمیل شده",
  },
  {
    id: 2,
    villaName: "سوئیت جنگلی رامسر",
    date: "۱۸ مهر ۱۴۰۲",
    status: "در انتظار",
  },
  {
    id: 3,
    villaName: "کلبه لوکس کوهستانی",
    date: "۱۲ مهر ۱۴۰۲",
    status: "لغو شده",
  },
];

const BookingTable = () => {
  const { data } = useBookings();
  const booking = data?.data;

  const bookingsData =
    booking && booking.length > 0 ? booking : staticBookings;

  const isStaticData = !booking || booking.length === 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "panel-badge-success";
      case "pending":
        return "panel-badge-warn";
      case "canceled":
        return "panel-badge-danger";
      default:
        return "panel-badge-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "تکمیل شده";
      case "pending":
        return "در انتظار";
      case "canceled":
        return "لغو شده";
      default:
        return status;
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const day = d.toLocaleDateString("fa-IR", { day: "numeric" });
    const month = d.toLocaleDateString("fa-IR", { month: "long" });
    const year = d.toLocaleDateString("fa-IR", { year: "numeric" });
    const time = d.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${day} ${month} - ${year} / ${time}`;
  };

  return (
    <div className="panel-card-pad">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
        <h3 className="panel-heading">آخرین رزروها</h3>
        {isStaticData && (
          <span className="panel-badge-warn">داده نمایشی</span>
        )}
      </div>

      <div className="max-h-72 space-y-2 overflow-y-auto sm:space-y-3">
        {bookingsData.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-muted/70 dark:hover:bg-white/5 sm:rounded-2xl sm:p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-bold text-brand sm:size-12 dark:bg-brand/20">
                #
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink dark:text-white">
                  {item?.house?.title || item?.villaName}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {item?.reservedDates
                    ? formatDate(item.reservedDates)
                    : item?.date}
                </p>
              </div>
            </div>
            <span className={getStatusColor(item?.status)}>
              {getStatusLabel(item?.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTable;
