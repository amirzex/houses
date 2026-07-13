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

    if (isLoading)
        return <p className="text-center p-10">در حال دریافت اطلاعات...</p>;

    if (isError)
        return (
            <p className="text-center p-10 text-red-500">خطا در دریافت اطلاعات کاربر</p>
        );

    const handleSave = () => {
        updateUserMutation.mutate({
            fullName,
            phoneNumber,
            email,
        });
    };

    return (
        <div className="mx-auto space-y-8" dir="rtl">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-6 pb-8 border-b dark:border-white/5">
                    <div className="relative">
                        <div className="w-24 h-24 bg-slate-200 rounded-[28px] flex items-center justify-center overflow-hidden">
                            {user?.profilePicture && user.profilePicture !== "string" ? (
                                <img
                                    src={user.profilePicture}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserIcon size={40} className="text-slate-400" />
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-black text-lg dark:text-white">
                            {user?.fullName || "نامشخص"}
                        </h3>
                        <p className="text-slate-400 text-sm">
                            سطح دسترسی: {user?.role === "buyer" ? "خریدار" : user?.role}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row gap-6 mt-8 ">
                    <div className="space-y-2 flex flex-col w-[33%]">
                        <label className="text-sm font-bold text-slate-500">
                            نام و نام خانوادگی
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w/full bg-slate-50 dark:bg-white/5 rounded-2xl p-4 outline-none"
                        />
                    </div>

                    <div className="space-y-2 flex flex-col w-[33%]">
                        <label className="text-sm font-bold text-slate-500">شماره تماس</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w/full bg-slate-50 text-right dark:bg-white/5 rounded-2xl p-4 outline-none"
                        />
                    </div>

                    <div className="space-y-2 flex flex-col w-[33%]">
                        <label className="text-sm font-bold text-slate-500">ایمیل</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w/full bg-slate-50 dark:bg-white/5 rounded-2xl p-4 outline-none text-right"
                        />
                    </div>
                </div>

                <div className="pt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={updateUserMutation.isLoading}
                        className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {updateUserMutation.isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                    </button>
                </div>
            </div>
        </div>
    );
}
