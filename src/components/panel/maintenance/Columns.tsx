import { Bell } from "lucide-react";
import { TableActions } from "@/components/panel/houses/Action";

export const formatPersianDate = (dateString: string) => {
    if (!dateString) return "نامشخص";

    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "لحظاتی پیش";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} دقیقه پیش`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;

    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(past);
};

export const getMaintenanceColumns = (
    onDelete: (id: number) => void,
    onEdit: (id: number) => void,
    isDeleting: boolean
) => [
        {
            header: "خانه",
            accessor: (item: any) => (
                <p className="text-xs font-medium text-slate-500">{item.houseId}</p>
            ),
        },
        {
            header: "توضیحات",
            accessor: (item: any) => (
                <p className="text-xs font-medium text-slate-500 max-w-[200px] truncate">
                    {item.description}
                </p>
            ),
        },
        {
            header: "زمان ثبت",
            accessor: (item: any) => (
                <span className="text-xs text-slate-500 dir-rtl">
                    {formatPersianDate(item.created_at)}
                </span>
            ),
        },
        {
            header: "وضعیت",
            accessor: (item: any) => (
                <span
                    className={`px-3 py-1 text-[10px] font-black rounded-full ${item.isRead ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}
                >
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
                    disabled={isDeleting}
                />
            ),
        },
    ];
