import { useState } from "react";
import { useForgotStep3 } from "@/core/api/auth/forgot/queries";

export const Step3Form = ({ onBack, email }) => {

    const { mutate, isPending } = useForgotStep3();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            alert("لطفا همه فیلدها را پر کنید");
            return;
        }

        if (password !== confirmPassword) {
            alert("رمز عبور و تکرار آن یکسان نیست");
            return;
        }

        mutate(
            {
                email,
                password
            },
            {
                onSuccess: () => {
                    alert("رمز عبور با موفقیت تغییر کرد!");
                },
                onError: (error) => {
                    console.log(error?.response?.data);

                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        "خطایی رخ داده است";

                    alert(message);
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">

            <div className="relative w-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border dark:bg-[#353535] dark:text-white text-gray-700 outline-none p-4 pr-12 rounded-full focus:border-brand transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="رمز عبور جدید"
                    type="password"
                />
            </div>

            <div className="relative w-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border dark:bg-[#353535] dark:text-white text-gray-700 outline-none p-4 pr-12 rounded-full focus:border-brand transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="تکرار رمز عبور"
                    type="password"
                />
            </div>

            <button
                disabled={isPending}
                type="submit"
                className="bg-brand text-white p-4 rounded-full mt-2 font-bold text-sm hover:bg-brand-hover transition-colors"
            >
                تغییر رمز عبور
            </button>

            <div className="flex justify-end mt-2">
                <button type="button" onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
                    بازگشت
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
            </div>

        </form>
    );
};
