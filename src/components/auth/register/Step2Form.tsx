import { useState } from "react";
import { useRegisterStep2 } from "@/core/api/auth/register/queries";

export const Step2Form = ({ onNext, onBack, tempUserId }) => {
    const { mutate, isPending } = useRegisterStep2();
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const verificationCode = code.join("");

        console.log("sending data:", {
            tempUserId,
            verificationCode,
        });
        mutate(
            {
                tempUserId: Number(tempUserId),
                verificationCode: String(verificationCode),
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
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300"
        >
            <p className="text-center text-sm text-gray-500">
                کد تایید ارسال شده را وارد کنید
            </p>

            <div className="flex justify-center gap-3" dir="ltr">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                        key={i}
                        id={`code-${i}`}
                        type="text"
                        maxLength="1"
                        value={code[i]}
                        onChange={(e) => handleChange(e.target.value, i)}
                        className="w-12 h-12 text-center border border-gray-200 rounded-xl text-lg font-bold focus:border-brand focus:outline-none transition-colors"
                    />
                ))}
            </div>

            <div className="text-center text-xs text-gray-400 mt-[-10px]">
                ارسال مجدد کد تا ۰۱:۵۹
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-brand text-white p-4 rounded-full font-bold text-sm hover:bg-brand-hover transition-colors"
            >
                ارسال کد تایید
            </button>

            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                    بازگشت
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>
        </form>
    );
};
