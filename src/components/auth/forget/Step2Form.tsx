import { useForgotStep2 } from "@/core/api/auth/forgot/queries";
import { useState, useRef } from "react";

export const Step2Form = ({ onNext, onBack, email }) => {

    const { mutate, isPending } = useForgotStep2()
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace") {

            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputs.current[index - 1]?.focus();
            }

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const verificationCode = otp.join("");

        if (verificationCode.length !== 6) {
            alert("کد را کامل وارد کنید");
            return;
        }

        mutate(
            {
                email,
                verificationCode,
            },
            {
                onSuccess: () => {
                    onNext();
                },
                onError: (error) => {
                    console.log(error?.response?.data);

                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        "خطایی رخ داده است";

                    alert(message);
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">

            <div className="flex justify-center gap-3" dir="ltr">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => (inputs.current[i] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleBackspace(e, i)}
                        className="w-14 h-14 text-center border border-gray-200 rounded-xl text-xl font-bold focus:border-[#1a3b99] focus:outline-none transition-colors"
                    />
                ))}
            </div>

            <div className="text-center text-sm text-gray-500 mt-[-10px]">
                ارسال مجدد کد تا ۰۱:۵۹
            </div>

            <button
                disabled={isPending}
                type="submit"
                className="bg-[#1a3b99] text-white p-4 rounded-full font-bold text-sm hover:bg-blue-900 transition-colors"
            >
                تایید کد
            </button>

            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                >
                    بازگشت
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>

        </form>
    );
};
