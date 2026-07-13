"use client";

import { Trash2, ShieldAlert } from "lucide-react";
import { useDeleteAdminUser, useGetAdminUsers, useUpdateAdminUserRole } from "@/core/api/admin/users/queries";


const AdminUsersPage = () => {
    const { data: users, isLoading } = useGetAdminUsers();
    const { mutate: deleteUser } = useDeleteAdminUser();
    const { mutate: updateRole } = useUpdateAdminUserRole();

    const handleDelete = (id: string) => {
        if (confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
            deleteUser(id);
        }
    };

    const handleRoleChange = (id: string, currentRole: string) => {
        const newRole = currentRole === "admin" ? "user" : "admin";
        updateRole({ id, body: { role: newRole } });
    };

    if (isLoading) return <div className="p-8 text-center">در حال بارگذاری...</div>;

    return (
        <div className=" space-y-8">
            <h1 className="text-xl font-black text-right">مدیریت کاربران ادمین</h1>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] border overflow-hidden">
                <div className="overflow-x-auto text-right" dir="rtl">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-100/50 dark:bg-white/5 text-xs font-black">
                                <th className="p-6">نام کاربر</th>
                                <th className="p-6 text-center">ایمیل</th>
                                <th className="p-6 text-center">نقش</th>
                                <th className="p-6 text-left">عملیات</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {users?.data?.map((user: any) => (
                                <tr key={user.id} className="hover:bg-slate-50/50">
                                    <td className="p-6 text-sm">{user.fullName}</td>
                                    <td className="p-6 text-center text-sm ">{user.email}</td>
                                    <td className="p-6 text-center">
                                        <span className={`px-3 py-1  rounded-full text-[10px] ${user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6 text-left flex gap-3 justify-end">
                                        <button
                                            onClick={() => handleRoleChange(user.id, user.role)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="تغییر نقش"
                                        >
                                            <ShieldAlert size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-rose-500 hover:text-rose-700"
                                            title="حذف کاربر"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
