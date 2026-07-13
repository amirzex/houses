"use client";

import { useDeleteCommentsAdminById, useGetCommentsAdmin, useUpdateCommentsAdminById } from "@/core/api/admin/comments/queries";
import { DataTable } from "@/components/panel/comments/DataTable";
import { getCommentColumns } from "@/components/panel/comments/Columns";

const Comments = () => {
    const { data: comments, isLoading, isError } = useGetCommentsAdmin();
    const deleteMutation = useDeleteCommentsAdminById();
    const updateMutation = useUpdateCommentsAdminById();

    const handleDelete = (id: number) => deleteMutation.mutate(id);
    const handleApprove = (id: number, item: any) =>
        updateMutation.mutate({ id, body: { ...item, isApproved: true } });

    const columns = getCommentColumns(handleDelete, handleApprove);

    if (isLoading) return <div className="p-8 text-center">در حال بارگذاری...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">خطا در دریافت اطلاعات</div>;

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-700">
            <h1 className="text-xl font-black text-slate-800 dark:text-white">کامنت‌های کاربران</h1>
            <DataTable columns={columns} data={comments?.data || []} />
        </div>
    );
};

export default Comments;
