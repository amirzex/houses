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

    if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;
    if (isError) return <div className="panel-empty text-danger">خطا در دریافت اطلاعات</div>;

    return (
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <h1 className="panel-heading">کامنت‌های کاربران</h1>
            </div>
            <DataTable columns={columns} data={comments?.data || []} />
        </div>
    );
};

export default Comments;
