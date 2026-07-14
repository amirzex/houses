"use client";

import { Trash2, ShieldAlert } from "lucide-react";
import {
  useDeleteAdminUser,
  useGetAdminUsers,
  useUpdateAdminUserRole,
} from "@/core/api/admin/users/queries";

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

  if (isLoading) return <div className="panel-empty">در حال بارگذاری...</div>;

  return (
    <div className="panel-page">
      <h1 className="panel-heading text-right">مدیریت کاربران ادمین</h1>

      <div className="panel-table-shell">
        <div className="overflow-x-auto text-right" dir="rtl">
          <table className="panel-table">
            <thead>
              <tr>
                <th>نام کاربر</th>
                <th className="text-center">ایمیل</th>
                <th className="text-center">نقش</th>
                <th className="text-left">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {users?.data?.map((user: any) => (
                <tr key={user.id}>
                  <td className="font-bold">{user.fullName}</td>
                  <td className="text-center text-ink-muted">{user.email}</td>
                  <td className="text-center">
                    <span
                      className={
                        user.role === "admin"
                          ? "panel-badge-warn"
                          : "panel-badge-muted"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleRoleChange(user.id, user.role)
                        }
                        className="rounded-xl p-2 text-brand transition-colors hover:bg-brand-soft"
                        title="تغییر نقش"
                      >
                        <ShieldAlert size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="rounded-xl p-2 text-danger transition-colors hover:bg-danger/10"
                        title="حذف کاربر"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
