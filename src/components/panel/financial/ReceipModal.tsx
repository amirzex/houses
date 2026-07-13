"use client";

import React from "react";
import { X } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    payment?: any;
};

const ReceiptModal = ({ open, onClose, payment }: Props) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#1E1E1E] shadow-xl p-6 space-y-6 relative">

                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 text-slate-400 hover:text-red-500"
                >
                    <X size={18} />
                </button>

                {/* title */}
                <div className="text-center">
                    <h2 className="font-black text-lg">رسید تراکنش</h2>
                    <p className="text-xs text-slate-400">Transaction Receipt</p>
                </div>

                {/* receipt body */}
                <div className="space-y-4 text-sm">

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400">شماره پیگیری</span>
                        <span className="font-bold">
                            {payment?.trackingId || "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶"}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400">مبلغ</span>
                        <span className="font-bold">
                            {payment?.amount || "۱,۲۵۰,۰۰۰"} تومان
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400">تاریخ</span>
                        <span>{payment?.date || "۱۴۰۲/۰۵/۱۲"}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400">وضعیت</span>
                        <span className="text-green-500 font-bold">
                            {payment?.status || "تایید شده"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-400">نوع تراکنش</span>
                        <span>{payment?.type || "رزرو"}</span>
                    </div>
                </div>

                {/* footer */}
                <div className="pt-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-white rounded-xl py-2 text-sm font-bold"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;
