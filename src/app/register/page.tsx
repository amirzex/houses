'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import apartment from '../../assets/register/modern-tokyo-street-background_23-2149394920.avif';
import { Step2Form } from "@/components/auth/register/Step2Form";
import { Step3Form } from "@/components/auth/register/Step3Form";
import Step1Form from "@/components/auth/register/Step1Form";

const Register = () => {
    const [step, setStep] = useState(1);
    const [tempUserId, setTempUserId] = useState(null);
    return (
        <div className="page-top flex items-center justify-center p-4 font-sans max-sm:p-0" dir="rtl">
            <div className="flex w-full max-w-6xl flex-col gap-8 rounded-[32px] p-3 md:flex-row">

                <div className="flex w-full flex-col rounded-[32px] px-5 py-8 shadow-sm dark:bg-[#272727] md:w-[42%] sm:px-8 sm:py-10 lg:px-12">

                    {/* logo Home */}
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="text-3xl font-black tracking-tight">Home</span>
                    </div>

                    <h2 className="text-xl font-bold text-center mb-6">ایجاد حساب کاربری</h2>

                    {/* change tab*/}
                    <div className="max-sm:flex-col flex bg-gray-100 dark:bg-[#353535]  p-1.5 rounded-full max-sm:rounded-2xl mb-8">
                        <Link href="/login" className="flex-1 text-gray-600 dark:text-white  py-3 rounded-full max-sm:rounded-xl text-sm font-medium flex justify-center items-center gap-2 transition-colors hover:text-gray-900">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            ورود به حساب کاربری
                        </Link>
                        <button className="flex-1 bg-brand text-white py-3 rounded-full max-sm:rounded-xl text-sm font-medium flex justify-center items-center gap-2 shadow-md">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            ساخت حساب کاربری
                        </button>
                    </div>

                    {/* steps*/}
                    {step === 1 && <Step1Form setTempUserId={setTempUserId} onNext={() => setStep(2)} />}
                    {step === 2 && (<Step2Form tempUserId={tempUserId} onNext={() => setStep(3)} onBack={() => setStep(1)} />)}
                    {step === 3 && (<Step3Form userId={tempUserId} onBack={() => setStep(2)} />)}


                </div>

                {/* picture left*/}
                <div className="relative hidden h-[min(700px,80dvh)] md:block md:w-[58%]">
                    <div className="w-full h-full relative rounded-[28px] overflow-hidden">
                        <Image
                            src={apartment}
                            fill
                            alt="modern apartment"
                            className="object-cover"
                            unoptimized
                        />
                        {/* دکمه‌های اسلایدر */}
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



export default Register;
