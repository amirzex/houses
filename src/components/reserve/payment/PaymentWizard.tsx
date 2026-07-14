"use client"
import React, { useEffect, useState } from "react";
import { Step3Confirmation } from "./Step3Confirmation";
import { SuccessModal } from "./SuccessModal";
import Image from "next/image";
import step1 from "../../../assets/payment/Apartment.svg";
import step1blue from "../../../assets/payment/Apartment-blue.svg";
import step2 from "../../../assets/payment/user.svg";
import step2blue from "../../../assets/payment/userblue.svg";
import step3 from "../../../assets/payment/Tick.svg";
import step3blue from "../../../assets/payment/Tickblue.svg";
import step4 from "../../../assets/payment/money-01.svg";
import step4blue from "../../../assets/payment/money-blue.svg";
import step5 from "../../../assets/payment/tiket.svg";
import step5blue from "../../../assets/payment/tiket-blue.svg";
import { useCreatePayment } from "@/core/api/dashboard/payments/queries";
import { Step2Passengers } from "./Step2Passengers ";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const STEP_ICONS: Record<
    number,
    { completed: typeof step1; active: typeof step1blue }
> = {
    1: { completed: step1, active: step1blue },
    2: { completed: step2, active: step2blue },
    3: { completed: step3, active: step3blue },
    4: { completed: step4, active: step4blue },
    5: { completed: step5, active: step5blue },
};

const buildFakeGatewayUrl = (
    paymentId: number | string,
    amount: number,
    callback: string,
) =>
    `/payment/fake-gateway?paymentId=${paymentId}&amount=${amount}&callback=${encodeURIComponent(callback)}`;

const resolvePaymentUrl = (
    res: { paymentUrl?: string; id?: number; amount?: number },
    callback: string,
) => {
    const fallback =
        res?.id != null
            ? buildFakeGatewayUrl(res.id, Number(res.amount || 0), callback)
            : "";
    const raw = res?.paymentUrl || fallback;
    if (!raw) return "";
    if (raw.startsWith("http")) return raw;
    return `${window.location.origin}${raw.startsWith("/") ? raw : `/${raw}`}`;
};


const PaymentWizard = ({ bookingData }) => {
    const [passengerInfo, setPassengerInfo] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const item = localStorage.getItem("bookingInfo");
        if (item) {
            setPassengerInfo(JSON.parse(item));
        }
    }, []);

    const [currentStep, setCurrentStep] = useState(2);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const status = searchParams.get("status");
        if (!status) return;

        if (status === "success") {
            setCurrentStep(5);
            setShowSuccessModal(true);
            toast.success("پرداخت با موفقیت انجام شد");
        } else if (status === "failed") {
            setCurrentStep(3);
            toast.error("پرداخت ناموفق بود یا لغو شد");
        }

        const url = new URL(window.location.href);
        url.searchParams.delete("status");
        url.searchParams.delete("paymentId");
        router.replace(url.pathname + url.search, { scroll: false });
    }, [searchParams, router]);

    const { mutate, isPending } = useCreatePayment();

    const steps = [
        { id: 1, title: 'انتخاب هتل', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
        { id: 2, title: 'مشخصات مسافران', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
        { id: 3, title: 'تایید اطلاعات', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' },
        { id: 4, title: 'پرداخت آنلاین', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending' },
        { id: 5, title: 'صدور بلیت', status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'active' : 'pending' },
    ];

    const handleNextStep = () => {
        if (currentStep === 3) {

            const payload = {
                amount: bookingData?.discounted_price,
                description: `پرداخت بابت رزرو شماره ${bookingData?.id || 'تست'}`,
                callbackUrl: `${window.location.origin}/fast-reserve/${bookingData?.id}/Payment`,
                bookingId: passengerInfo?.bookingId
            };

            mutate(payload, {
                onSuccess: (res) => {
                    setCurrentStep(4);
                    const paymentUrl = resolvePaymentUrl(res, payload.callbackUrl);
                    if (paymentUrl) {
                        window.location.href = paymentUrl;
                    } else {
                        toast.error("آدرس درگاه پرداخت دریافت نشد");
                        setCurrentStep(3);
                    }
                },
                onError: () => {
                    toast.error("خطا در برقراری ارتباط با درگاه");
                }
            });
        } else if (currentStep === 5) {
            setShowSuccessModal(true);
        } else {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
    };

    return (
        <div dir="rtl" className="relative h-full w-full p-4 max-sm:pb-24 max-sm:p-0">

            <div className="mb-5 flex items-center justify-between gap-1 overflow-x-auto rounded-full border bg-gray-50 p-1.5 text-sm dark:bg-[#353535] dark:text-white sm:mb-6 sm:gap-2 sm:p-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div
                            onClick={() => !isPending && setCurrentStep(step.id)}
                            className={`flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full transition-all
                                h-11 w-11 sm:h-auto sm:w-auto sm:px-4 sm:py-2
                                ${step.status === 'completed' ? 'bg-brand text-white shadow-sm' :
                                step.status === 'active' ? 'bg-white text-blue-800 shadow-sm ring-2 ring-brand/25 dark:bg-[#353535] sm:border sm:border-blue-800' :
                                    'bg-gray-100/90 text-gray-400 dark:bg-white/5'
                                }`}
                        >
                            <span className="flex items-center justify-center">
                                <Image
                                    src={step.status === 'completed' ? STEP_ICONS[step.id].completed : STEP_ICONS[step.id].active}
                                    alt=""
                                    unoptimized
                                    className={`h-7 w-7 object-contain sm:h-10 sm:w-10 ${step.status === 'pending' ? 'opacity-45' : ''}`}
                                />
                            </span>
                            <span className='hidden whitespace-nowrap text-sm font-medium sm:block md:text-base'>{step.title}</span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`hidden h-[2px] flex-1 transition-colors sm:block ${step.status === 'completed' ? 'bg-brand' : 'bg-gray-200'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="border rounded-3xl p-4 sm:p-6 md:p-8 bg-white dark:bg-[#272727] shadow-sm flex flex-col gap-6 sm:gap-8 max-sm:rounded-2xl max-sm:border-gray-100">

                {currentStep === 2 && <Step2Passengers passengerInfo={passengerInfo} setPassengerInfo={setPassengerInfo} />}
                {currentStep === 3 && <Step3Confirmation />}
                {(currentStep === 4 || isPending) && (
                    <div className="text-center py-10 text-lg font-bold text-gray-600 animate-pulse">
                        در حال اتصال به درگاه پرداخت امن...
                    </div>
                )}
                {currentStep === 5 && (
                    <div className="text-center py-10 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-[#2b8a7b] rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-brand dark:text-white">بلیت شما صادر شد</p>
                        <p className="text-sm text-gray-500">پرداخت با موفقیت ثبت شد و رزرو تأیید گردید.</p>
                    </div>
                )}

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between pt-2 max-sm:hidden" dir='ltr'>
                    <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isPending || currentStep === 4}
                        className={`${isPending || currentStep === 4 ? 'bg-gray-400' : 'bg-brand hover:bg-brand-hover'} text-white px-6 py-3 rounded-full font-semibold flex flex-row-reverse items-center gap-2 transition`}
                    >
                        {isPending ? 'لطفاً صبر کنید...' : currentStep === 3 ? 'پرداخت آنلاین' : currentStep === 5 ? 'مشاهده جزئیات' : 'تایید و ادامه فرایند'}
                        <span>‹</span>
                    </button>

                    <div className="text-gray-800 flex items-center gap-2 flex-row-reverse" dir='rtl'>
                        <span className="text-gray-500 text-sm">قیمت کل</span>
                        <span className="text-2xl font-bold text-brand">{Number(bookingData?.discounted_price).toLocaleString("fa-IR")}</span>
                        <span className="text-gray-500 text-sm">تومان</span>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-card/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:hidden dark:border-white/10" dir="ltr">
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isPending || currentStep === 4}
                        className={`${isPending || currentStep === 4 ? 'bg-gray-400' : 'bg-brand hover:bg-brand-hover'} flex flex-1 flex-row-reverse items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition`}
                    >
                        {isPending ? 'لطفاً صبر کنید...' : currentStep === 3 ? 'پرداخت آنلاین' : currentStep === 5 ? 'مشاهده جزئیات' : 'تایید و ادامه'}
                        <span>‹</span>
                    </button>
                    <div className="flex shrink-0 flex-col items-end text-gray-800" dir="rtl">
                        <span className="text-[10px] text-gray-500">قیمت کل</span>
                        <span className="text-base font-bold text-brand">{Number(bookingData?.discounted_price).toLocaleString("fa-IR")} <span className="text-xs font-normal">تومان</span></span>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default PaymentWizard;
