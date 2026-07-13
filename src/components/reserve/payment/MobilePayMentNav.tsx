import React, { useState } from 'react'
import Image from "next/image";
import step1 from "../../../assets/payment/Apartment.svg";
import step2 from "../../../assets/payment/user.svg";
import step2blue from "../../../assets/payment/userblue.svg";
import step3 from "../../../assets/payment/Tick.svg";
import step3blue from "../../../assets/payment/Tickblue.svg";
import step4 from "../../../assets/payment/money-01.svg";
import step5 from "../../../assets/payment/tiket.svg";
const MobilePayMentNav = () => {

    const [currentStep, setCurrentStep] = useState(2);
    

    const steps = [
        { id: 1, title: 'انتخاب هتل', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
        { id: 2, title: 'مشخصات مسافران', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
        { id: 3, title: 'تایید اطلاعات', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' },
        { id: 4, title: 'پرداخت آنلاین', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending' },
        { id: 5, title: 'صدور بلیت', status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'active' : 'pending' },
    ];
    return (
        <div>
            <div className="flex items-center bg-gray-100 md:bg-gray-50 p-2  rounded-full mb-6 md:border text-sm overflow-x-auto w-full ">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div
                            onClick={() => setCurrentStep(step.id)}
                            // استایل‌دهی متفاوت برای موبایل (دایره‌ای) و دسکتاپ (بیضی با متن)
                            className={`flex items-center justify-center gap-2 rounded-full cursor-pointer transition-colors
                    w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2
                    ${step.status === 'completed'
                                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                                    : step.status === 'active'
                                        ? 'md:border md:border-blue-800 text-blue-800 md:bg-white bg-transparent'
                                        : 'text-gray-400 bg-transparent'
                                }`}
                        >
                            {/* آیکون‌ها */}
                            <span className="flex items-center justify-center">
                                {step.id === 1 && <Image src={step1} alt="" unoptimized className="w-6 h-6 md:w-10" />}
                                {step.id === 2 && <Image src={step.status === 'completed' ? step2 : step2blue} alt="" unoptimized className="w-6 h-6 md:w-10" />}
                                {step.id === 3 && <Image src={step.status === 'completed' ? step3 : step3blue} alt="" unoptimized className="w-6 h-6 md:w-10" />}
                                {step.id === 4 && <Image src={step4} alt="" unoptimized className="w-6 h-6 md:w-10" />}
                                {step.id === 5 && <Image src={step5} alt="" unoptimized className="w-6 h-6 md:w-10" />}
                            </span>

                            {/* متن: فقط در دسکتاپ نمایش داده شود */}
                            <span className='hidden md:block text-base font-medium whitespace-nowrap'>
                                {step.title}
                            </span>
                        </div>

                        {/* خطوط رابط: در موبایل مخفی، در دسکتاپ نمایش */}
                        {index < steps.length - 1 && (
                            <div className={`hidden md:block flex-1 h-[2px] mx-2 transition-colors ${step.status === 'completed' ? 'bg-blue-800' : 'bg-gray-200'
                                }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

        </div>
    )
}

export default MobilePayMentNav