import { MessageSquare } from "lucide-react";
import { ActionMenu } from "./ActionMenu";
import { TableActions } from "@/components/panel/houses/Action";

export const getCommentColumns = (
    onDelete: (id: number) => void,
    onApprove: (id: number, item: any) => void
) => [
        {
            header: "کاربر",
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
                        <MessageSquare size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {item?.user?.firstName || "کاربر"}
                    </span>
                </div>
            ),
        },
        {
            header: "خانه مربوطه",
            accessor: (item: any) => (
                <div className="group relative cursor-help inline-block">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg">
                        {item.house?.title?.substring(0, 15) || "نامشخص"}...
                    </span>
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                        <p className="font-bold">{item.house?.title || "بدون عنوان"}</p>
                        <p className="text-slate-300 mt-1">{item.house?.address || "آدرس ثبت نشده"}</p>
                    </div>
                </div>
            ),
        },
        {
            header: "متن کامنت",
            accessor: (item: any) => (
                <p className="text-xs font-medium text-slate-500 line-clamp-2 max-w-[300px]">
                    {item.text || item.caption}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: (item: any) => (
                <span className={`px-3 py-1 text-[10px] font-black rounded-full ${item.isApproved ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                    {item.isApproved ? "تایید شده" : "در انتظار تایید"}
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
