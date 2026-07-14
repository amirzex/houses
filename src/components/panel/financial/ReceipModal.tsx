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
        <div className="panel-modal-backdrop" onClick={onClose}>
            <div
                className="panel-modal w-full max-w-md space-y-6"
                onClick={(e) => e.stopPropagation()}
            >

                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 text-ink-muted transition-colors hover:text-danger"
                >
                    <X size={18} />
                </button>

                {/* title */}
                <div className="text-center">
                    <h2 className="panel-heading">رسید تراکنش</h2>
                    <p className="panel-subheading">Transaction Receipt</p>
                </div>

                {/* receipt body */}
                <div className="space-y-4 text-sm">

                    <div className="flex justify-between border-b border-border/60 pb-2 dark:border-white/10">
                        <span className="text-ink-muted">شماره پیگیری</span>
                        <span className="font-bold">
                            {payment?.trackingId || "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶"}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-border/60 pb-2 dark:border-white/10">
                        <span className="text-ink-muted">مبلغ</span>
                        <span className="font-bold">
                            {payment?.amount || "۱,۲۵۰,۰۰۰"} تومان
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-border/60 pb-2 dark:border-white/10">
                        <span className="text-ink-muted">تاریخ</span>
                        <span>{payment?.date || "۱۴۰۲/۰۵/۱۲"}</span>
                    </div>

                    <div className="flex justify-between border-b border-border/60 pb-2 dark:border-white/10">
                        <span className="text-ink-muted">وضعیت</span>
                        <span className="panel-badge-success">
                            {payment?.status || "تایید شده"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-ink-muted">نوع تراکنش</span>
                        <span>{payment?.type || "رزرو"}</span>
                    </div>
                </div>

                {/* footer */}
                <div className="pt-4">
                    <button
                        onClick={onClose}
                        className="btn-brand w-full"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;
