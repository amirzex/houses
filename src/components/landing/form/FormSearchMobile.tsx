"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const FormSearchMobile = ({ selectedTab }: { selectedTab: string }) => {

    const router = useRouter();

    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const handleSearch = () => {

        const queryParams = new URLSearchParams();

        if (location) queryParams.append("location", location);
        if (guests) queryParams.append("guests", guests);
        if (checkIn) queryParams.append("checkIn", checkIn);
        if (checkOut) queryParams.append("checkOut", checkOut);

        let path = "/houses";

        switch (selectedTab) {
            case "رزرو ملک":
                path = "/fast-reserve";
                break;

            case "رهن و اجاره":
                path = "/rent";
                break;

            default:
                path = "/";
        }

        router.push(`${path}?${queryParams.toString()}`);
    };

    return (
        <div className='w-full rounded-3xl border border-white/50 bg-white/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1a222d]/95'>
            <button
                onClick={handleSearch}
                type='button'
                className='btn-brand mb-5 w-full'
            >
                <span>جستجو کن</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <form className='flex w-full flex-col gap-4' dir="rtl">
                <label className="flex flex-col gap-1.5">
                    <span className="px-1 text-sm font-bold text-ink dark:text-white">انتخاب مقصد</span>
                    <select
                        className="field-input appearance-none cursor-pointer"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">استان ، شهر ، اقامتگاه ....</option>
                        <option value="ساری">ساری</option>
                        <option value="بابل">بابل</option>
                        <option value="بابلسر">بابلسر</option>
                        <option value="رامسر">رامسر</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="px-1 text-sm font-bold text-ink dark:text-white">تاریخ ورود</span>
                    <input
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        type="date"
                        className="field-input"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="px-1 text-sm font-bold text-ink dark:text-white">تاریخ خروج</span>
                    <input
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        type="date"
                        className="field-input"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="px-1 text-sm font-bold text-ink dark:text-white">تعداد نفرات</span>
                    <input
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="field-input"
                        type="text"
                        placeholder="وارد کنید ...."
                    />
                </label>
            </form>
        </div>
    )
}

export default FormSearchMobile
