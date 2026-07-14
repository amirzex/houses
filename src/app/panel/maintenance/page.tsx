"use client";

import {
  useMaintenanceRequests,
  useDeleteMaintenance
} from "@/core/api/admin/maintenance/queries";
import { DataTable } from "@/components/panel/comments/DataTable";
import { getMaintenanceColumns } from "@/components/panel/maintenance/Columns";
import { toast } from "react-hot-toast"; // یا هر کتابخانه توستی که دارید

const MaintenancePage = () => {
  const { data, isLoading, isError, error, refetch } = useMaintenanceRequests();

  const { mutate: deleteMaintenance, isPending: isDeleting } = useDeleteMaintenance();

  const handleDelete = (id: number) => {
    if (confirm("آیا از حذف این درخواست اطمینان دارید؟")) {
      deleteMaintenance(id, {
        onSuccess: () => {
          toast.success("درخواست با موفقیت حذف شد");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "خطا در حذف درخواست");
        }
      });
    }
  };

  const handleEdit = (id: number) => {
    console.log("Edit ID:", id);
    
  };

  const columns = getMaintenanceColumns(handleDelete, handleEdit, isDeleting);

  return (
    <div className=" space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-black text-slate-800 dark:text-white">
          درخواست‌های نگهداری
        </h1>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-md bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors"
        >
          بروزرسانی
        </button>
      </div>

      {isLoading && (
        <div className="text-sm text-slate-500 dark:text-slate-300">
          در حال بارگذاری درخواست‌ها...
        </div>
      )}

      {isError && (
        <div className="text-sm text-red-600">
          خطا در دریافت اطلاعات: {(error as any)?.message || "خطای نامشخص"}
        </div>
      )}

      {!isLoading && !isError && (
        <DataTable
          columns={columns}
          data={data || []}
          emptyMessage="درخواستی برای نگهداری ثبت نشده است."
        />
      )}
    </div>
  );
};

export default MaintenancePage;
