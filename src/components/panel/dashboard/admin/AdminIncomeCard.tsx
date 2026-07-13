"use client";

import { useGetPayments } from "@/core/api/admin/payments/queries";
import Link from "next/link";
import React, { useMemo } from "react";

export default function AdminIncomeCard() {
    const { data: payments, isLoading, isError } = useGetPayments();

    const stats = useMemo(() => {
        if (!payments?.data || !Array.isArray(payments?.data)) {
            return { total: 0, pending: { count: 0, sum: 0 }, success: { count: 0, sum: 0 } };
        }

        return payments.data.reduce((acc: any, payment: any) => {
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
        }, { total: 0, pending: { count: 0, sum: 0 }, success: { count: 0, sum: 0 } });
    }, [payments]);

    return (
        <div>
            <div>
                <h3 className="font-bold opacity-80 mb-2 text-sm">مجموع درآمد تقریبی</h3>

                {isLoading ? (
                    <p className="text-sm opacity-80 ">در حال محاسبه درآمد...</p>
                ) : isError ? (
                    <p className="text-sm text-red-200">خطا در دریافت پرداخت‌ها</p>
                ) : (
                    <>
                        <p className="text-3xl font-black mb-4">
                            {stats.total.toLocaleString("fa-IR")}
                            <span className="text-sm mr-2">تومان</span>
                        </p>

                        <div className="text-sm space-y-2 opacity-90">
                            <p className="border-green-500 border-2 bg-green-300/80 p-2 rounded-xl">تراکنش‌های موفق: {stats.success.count} عدد ({stats.success.sum.toLocaleString("fa-IR")} تومان)</p>
                            <p className="border-yellow-500 border-2 bg-yellow-200/80 p-2 rounded-xl">تراکنش‌های در انتظار: {stats.pending.count} عدد ({stats.pending.sum.toLocaleString("fa-IR")} تومان)</p>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-22 space-y-3">
                <button className="w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl font-bold transition-all text-sm">
                    <Link href='/panel/payments/admin'>
                        مدیریت پرداخت ها
                    </Link>
                </button>
            </div>
        </div>
    );
}
