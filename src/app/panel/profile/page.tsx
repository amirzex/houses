"use client";

import { useUser } from "@/core/api/dashboard/user/queries";
import { useUpdateUser } from "@/core/api/dashboard/user/queries";
import { User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data, isLoading, isError } = useUser();
  const user = data?.user?.user;

  const updateUserMutation = useUpdateUser();

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName ?? "");
      setPhoneNumber(user.phoneNumber ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  if (isLoading) return <p className="panel-empty">در حال دریافت اطلاعات...</p>;

  if (isError)
    return (
      <p className="panel-empty text-danger">خطا در دریافت اطلاعات کاربر</p>
    );

  const handleSave = () => {
    updateUserMutation.mutate({
      fullName,
      phoneNumber,
      email,
    });
  };

  return (
    <div className="panel-page mx-auto max-w-4xl" dir="rtl">
      <div className="panel-card-pad">
        <div className="flex flex-col items-center gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:gap-6 sm:pb-8 dark:border-white/5">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted sm:size-24 sm:rounded-3xl">
            {user?.profilePicture && user.profilePicture !== "string" ? (
              <img
                src={user.profilePicture}
                alt="profile"
                className="size-full object-cover"
              />
            ) : (
              <UserIcon size={40} className="text-ink-muted" />
            )}
          </div>

          <div className="text-center sm:text-right">
            <h3 className="panel-heading">
              {user?.fullName || "نامشخص"}
            </h3>
            <p className="panel-subheading">
              سطح دسترسی:{" "}
              {user?.role === "buyer" ? "خریدار" : user?.role}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-ink-muted">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="panel-input"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-ink-muted">شماره تماس</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="panel-input text-right"
            />
          </div>

          <div className="flex flex-col space-y-2 sm:col-span-2 lg:col-span-1">
            <label className="text-sm font-bold text-ink-muted">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="panel-input text-right"
            />
          </div>
        </div>

        <div className="flex justify-stretch pt-6 sm:justify-end sm:pt-8">
          <button
            onClick={handleSave}
            disabled={updateUserMutation.isPending}
            className="btn-brand w-full px-8 py-3.5 sm:w-auto"
          >
            {updateUserMutation.isPending
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
}
