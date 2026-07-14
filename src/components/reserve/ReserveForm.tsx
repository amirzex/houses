"use client";

import Image from 'next/image';
import home from '../../assets/reserve/home.svg';
import { useState } from 'react';
import { useCreateBooking } from '@/core/api/dashboard/booking/queries';
import { useRouter } from 'next/navigation';

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const Field = ({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) => (
    <label className="flex w-full flex-col gap-1.5">
        <span className="px-1 text-xs font-bold text-ink dark:text-white sm:text-sm">{label}</span>
        {children}
    </label>
);

const ReservationForm = ({ data }: { data: any }) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateBooking();

    const [dates, setDates] = useState({
        start: "",
        end: ""
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        nationalId: "",
        sharedEmail: "",
        sharedMobile: "",
    });

    const price = Number(data?.price);
    const discounted = Number(data?.discounted_price);

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const bookingData = {
            houseId: data?.id,
            reservedDates: [dates.start, dates.end],
            traveler_details: [
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    gender: formData.gender,
                    birthDate: formData.birthDate,
                    nationalId: formData.nationalId,
                }
            ],
            sharedEmail: formData.sharedEmail,
            sharedMobile: formData.sharedMobile,
        };

        mutate(bookingData, {
            onSuccess: (response: any) => {
                const firstTraveler = response.traveler_details?.[0] || {};
                localStorage.setItem(
                    "bookingInfo",
                    JSON.stringify({
                        bookingId: response.id,
                        userId: response.user_id,
                        firstName: firstTraveler.firstName,
                        lastName: firstTraveler.lastName,
                        gender: firstTraveler.gender,
                        birthDate: firstTraveler.birthDate,
                        nationalId: firstTraveler.nationalId,
                    })
                );
                router.push(`${data?.id}/Payment`);
            }
        });
    };

    return (
        <div dir="rtl" className="surface-card flex w-full flex-col gap-4 p-5 xl:p-6">
            <div className='flex items-center justify-center gap-2'>
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft">
                    <Image src={home} alt='' unoptimized className='size-5' />
                </div>
                <h2 className='text-lg font-extrabold text-ink dark:text-white'>رزرو خونه برای</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3.5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="تاریخ رفت">
                        <input
                            type='date'
                            className="field-input rounded-full"
                            value={dates.start}
                            onChange={(e) => setDates({ ...dates, start: e.target.value })}
                        />
                    </Field>
                    <Field label="تاریخ برگشت">
                        <input
                            type='date'
                            className="field-input rounded-full"
                            value={dates.end}
                            onChange={(e) => setDates({ ...dates, end: e.target.value })}
                        />
                    </Field>
                </div>

                <Field label="تعداد مسافران">
                    <input type='text' className="field-input rounded-full" placeholder='۵ نفر' />
                </Field>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="نام">
                        <input
                            type="text"
                            className="field-input rounded-full"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </Field>
                    <Field label="نام خانوادگی">
                        <input
                            type="text"
                            className="field-input rounded-full"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="جنسیت">
                        <input
                            type="text"
                            className="field-input rounded-full"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            placeholder="مرد / زن"
                        />
                    </Field>
                    <Field label="تاریخ تولد">
                        <input
                            type="date"
                            className="field-input rounded-full"
                            value={formData.birthDate}
                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        />
                    </Field>
                </div>

                <Field label="کد ملی">
                    <input
                        type="text"
                        className="field-input rounded-full"
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    />
                </Field>

                <div className="mt-1 rounded-2xl bg-muted/60 p-4 dark:bg-[#2a3340]/60">
                    <p className="mb-3 text-center text-xs font-bold text-ink-muted">قیمت نهایی</p>
                    <div className="flex items-center gap-2.5">
                        {discountPercent != null && (
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-deal text-xs font-bold text-white shadow-md shadow-deal/25">
                                %{discountPercent.toLocaleString("fa-IR")}
                            </div>
                        )}
                        <div className='flex min-w-0 flex-1 flex-row-reverse flex-wrap items-center justify-center gap-2 rounded-full bg-card px-3 py-2.5 dark:bg-[#1a222d]'>
                            <p className="text-sm font-extrabold text-ink tabular-nums dark:text-white">
                                {Number(data?.discounted_price || data?.price || 0).toLocaleString("fa-IR")}
                                <span className="mr-1 text-xs font-normal text-ink-muted">تومان</span>
                            </p>
                            {discountPercent != null && (
                                <p className="text-xs text-danger line-through tabular-nums">
                                    {Number(data?.price).toLocaleString("fa-IR")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-brand-lg mt-1 w-full gap-2 disabled:opacity-50"
                >
                    <span>{isPending ? "در حال ثبت..." : "همین الان رزرو کن"}</span>
                    <ArrowLeftIcon />
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
