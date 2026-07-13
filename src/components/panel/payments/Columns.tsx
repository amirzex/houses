
import { ActionMenu } from "@/components/panel/comments/ActionMenu";
import { TableActions } from "@/components/panel/houses/Action";
import { CheckCircle2, XCircle } from "lucide-react";

export const getPaymentColumns = (
    onDelete: (id: string | number) => void,
    onUpdate: (id: string | number) => void
) => [
        { header: "تاریخ", accessor: (item: any) => <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.date}</span> },
        { header: "شماره پیگیری", accessor: (item: any) => <span className="text-sm font-mono tracking-wider">{item.bookingId}</span> },
        { header: "مبلغ (تومان)", accessor: (item: any) => <span className="text-sm font-black">{item.amount}</span> },
        {
            header: "وضعیت",
            accessor: (item: any) => (
                <div className="flex justify-center">
                    {item.status === "تایید شده" ? (
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-black rounded-full flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-500/20">
                            <CheckCircle2 size={12} /> {item.status}
                        </span>
                    ) : (
                        <span className="px-4 py-1.5 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 text-[10px] font-black rounded-full flex items-center gap-1.5 border border-rose-200 dark:border-rose-500/20">
                            <XCircle size={12} /> {item.status}
                        </span>
                    )}
                </div>
            ),
        },
        { header: "نوع تراکنش", accessor: (item: any) => <span className="text-xs font-bold text-slate-500">{item.type}</span> },
        {
            header: "عملیات",
            accessor: (item: any) => (
                <TableActions
                    onDelete={() => onDelete(item.id)}
                    onEdit={() => onEdit(item.id)}
                />
            ),
        },
    ];
