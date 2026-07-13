import { ActionMenu } from "@/components/panel/comments/ActionMenu";
import { TableActions } from "@/components/panel/houses/Action";


const getStatusBadge = (status: string) => {
    const styles: any = {
        "تایید شده": "bg-green-500/20 text-green-700",
        "لغو شده": "bg-rose-100 text-rose-500",
        "در انتظار": "bg-amber-100 text-amber-500",
        "نامشخص": "bg-slate-100 text-slate-500",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${styles[status] || "bg-slate-100 text-slate-500"}`}>
            {status}
        </span>
    );
};

export const getBookingColumns = (
    onDelete: (id: number) => void,
    onUpdate: (id: number) => void
) => [
        { header: "اقامتگاه", accessor: (item: any) => <span className="font-bold text-slate-800">{item.property}</span> },
        { header: "تاریخ", accessor: (item: any) => <span className="text-slate-500">{item.date}</span> },
        { header: "مبلغ", accessor: (item: any) => <span className="font-black">{item.amount}</span> },
        { header: "وضعیت رزرو", accessor: (item: any) => getStatusBadge(item.status) },
        { header: "وضعیت پرداخت", accessor: (item: any) => getStatusBadge(item.payment) },
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
