import { Bell } from "lucide-react";
import { ActionMenu } from "@/components/panel/comments/ActionMenu";
import { TableActions } from "@/components/panel/houses/Action";

export const getNotificationColumns = (
    onDelete: (id: number) => void,
    onRead: (id: number) => void
) => [
        {
            header: "اعلان",
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
                        <Bell size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.title}</span>
                </div>
            ),
        },
        {
            header: "توضیحات",
            accessor: (item: any) => <p className="text-xs font-medium text-slate-500">{item.description}</p>,
        },
        {
            header: "زمان",
            accessor: (item: any) => <span className="text-xs text-slate-500">{item.time}</span>,
        },
        {
            header: "وضعیت",
            accessor: (item: any) => (
                <span className={`px-3 py-1 text-[10px] font-black rounded-full ${item.isRead ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                    {item.isRead ? "خوانده شده" : "جدید"}
                </span>
            ),
        },
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
