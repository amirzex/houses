import { useForgotStep1 } from "@/core/api/auth/forgot/queries";
import Link from "next/link";
import { useState } from "react";

const Step1Form = ({ onNext, setTempCode, email, setEmail }) => {

    const { mutate, isPending } = useForgotStep1()


    const handleForgot = (e) => {
        e.preventDefault()

        mutate(
            { email },
            {
                onSuccess(data) {
                    setTempCode(data.TempCode)
                    onNext()
                },
                onError: (error) => {
                    console.log(error)

                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        "خطایی رخ داده است"

                    alert(message)
                }
            }
        )
    }
    return (
        <form onSubmit={handleForgot} className="w-full flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative w-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border dark:bg-[#353535] dark:text-white text-gray-700 outline-none p-4 pr-12 rounded-full focus:border-brand transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="ایمیل خود را وارد کنید"
                    type="email"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                // onClick={(e) => { e.preventDefault(); onNext(); }}
                className="bg-brand text-white p-4 rounded-full mt-2 font-bold text-sm hover:bg-brand-hover transition-colors"
            >
                ارسال کد تایید
            </button>

            <div className="text-center mt-4">
                <Link href="/login" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                    بازگشت به ورود
                </Link>
            </div>
        </form>
    )
}



export default Step1Form