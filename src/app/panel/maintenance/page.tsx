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
    <div className="panel-page" dir="rtl">
      <div className="panel-toolbar">
        <h1 className="panel-heading">
          درخواست‌های نگهداری
        </h1>

        <button
          onClick={() => refetch()}
          className="btn-brand w-full shrink-0 sm:w-auto"
        >
          بروزرسانی
        </button>
      </div>

      {isLoading && (
        <div className="panel-card panel-empty">
          در حال بارگذاری درخواست‌ها...
        </div>
      )}

      {isError && (
        <div className="panel-card panel-empty text-danger">
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
