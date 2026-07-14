"use client";

import { useGetPayments } from "@/core/api/admin/payments/queries";
import Link from "next/link";
import React, { useMemo } from "react";

export default function AdminIncomeCard() {
  const { data: payments, isLoading, isError } = useGetPayments();

  const stats = useMemo(() => {
    if (!payments?.data || !Array.isArray(payments?.data)) {
      return {
        total: 0,
        pending: { count: 0, sum: 0 },
        success: { count: 0, sum: 0 },
      };
    }

    return payments.data.reduce(
      (acc: any, payment: any) => {
        const amount = Number(payment.amount) || 0;
        acc.total += amount;

        if (payment.status === "pending") {
          acc.pending.count += 1;
          acc.pending.sum += amount;
        } else if (payment.status === "success") {
          acc.success.count += 1;
          acc.success.sum += amount;
        }
        return acc;
      },
      { total: 0, pending: { count: 0, sum: 0 }, success: { count: 0, sum: 0 } }
    );
  }, [payments]);

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <h3 className="mb-2 text-sm font-bold opacity-80">
          مجموع درآمد تقریبی
        </h3>

        {isLoading ? (
          <p className="text-sm opacity-80">در حال محاسبه درآمد...</p>
        ) : isError ? (
          <p className="text-sm text-rose-200">خطا در دریافت پرداخت‌ها</p>
        ) : (
          <>
            <p className="mb-4 text-2xl font-black sm:text-3xl">
              {stats.total.toLocaleString("fa-IR")}
              <span className="mr-2 text-sm font-bold opacity-80">تومان</span>
            </p>

            <div className="space-y-2 text-sm">
              <p className="rounded-xl border border-emerald-400/40 bg-emerald-400/20 p-2.5 backdrop-blur-sm">
                موفق: {stats.success.count} (
                {stats.success.sum.toLocaleString("fa-IR")} ت)
              </p>
              <p className="rounded-xl border border-amber-300/40 bg-amber-300/20 p-2.5 backdrop-blur-sm">
                در انتظار: {stats.pending.count} (
                {stats.pending.sum.toLocaleString("fa-IR")} ت)
              </p>
            </div>
          </>
        )}
      </div>

      <Link
        href="/panel/payments/admin"
        className="block w-full rounded-2xl bg-white/20 py-3.5 text-center text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30 active:scale-[0.98] sm:py-4"
      >
        مدیریت پرداخت‌ها
      </Link>
    </div>
  );
}
