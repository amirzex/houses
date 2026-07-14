'use client';
import { useState } from 'react';
import Image from 'next/image';
import apartment from '../../assets/register/modern-tokyo-street-background_23-2149394920.avif';
import { Step2Form } from "@/components/auth/forget/Step2Form";
import { Step3Form } from "@/components/auth/forget/Step3Form";
import Step1Form from "@/components/auth/forget/Step1Form";

const Forgot = () => {
    const [step, setStep] = useState(1);
    const [tempCode, setTempCode] = useState(null);
    const [email, setEmail] = useState("");

    return (
        <div className="page-top flex items-center justify-center p-4 font-sans max-sm:p-0" dir="rtl">
            <div className="flex w-full max-w-6xl flex-col gap-8 rounded-[32px] p-3 md:flex-row">

                <div className="relative flex w-full flex-col justify-center rounded-[32px] px-5 py-10 shadow-sm dark:bg-[#272727] dark:text-white md:w-[42%] sm:px-8 lg:px-16">

                    <div className="flex justify-center items-center gap-2 mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="text-3xl font-black tracking-tight">Home</span>
                    </div>

                    <h2 className="text-xl font-bold text-center mb-8">فراموشی رمز عبور</h2>

                    {step === 1 && (
                        <Step1Form
                            email={email}
                            setEmail={setEmail}
                            setTempCode={setTempCode}
                            onNext={() => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <Step2Form
                            email={email}
                            onNext={() => setStep(3)}
                            onBack={() => setStep(1)}
                        />
                    )}
                    {step === 3 && <Step3Form email={email} onBack={() => setStep(2)} />}


                </div>

                <div className="relative hidden h-[min(700px,80dvh)] md:block md:w-[58%]">
                    <div className="w-full h-full relative rounded-[28px] overflow-hidden bg-gray-200">
                        <Image
                            src={apartment}
                            fill
                            alt="modern apartment"
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            <div className="w-8 h-2.5 bg-brand rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default Forgot;
