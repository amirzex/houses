"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormSearch = ({ selectedTab }: { selectedTab: string }) => {

    const router = useRouter();

    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const handleSearch = (e: React.FormEvent) => {

        e.preventDefault();

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
        <form
            onSubmit={handleSearch}
            className='grid w-full grid-cols-2 items-end gap-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3'
            dir="rtl"
        >
            <label className="flex min-w-0 flex-col gap-1 text-right">
                <span className="px-1 text-xs font-bold text-ink xl:text-sm dark:text-white">انتخاب مقصد</span>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="field-input appearance-none cursor-pointer"
                >
                    <option value="">مقصد را انتخاب کنید</option>
                    <option value="ساری">ساری</option>
                    <option value="بابل">بابل</option>
                    <option value="بابلسر">بابلسر</option>
                    <option value="رامسر">رامسر</option>
                </select>
            </label>

            <label className="flex min-w-0 flex-col gap-1 text-right">
                <span className="px-1 text-xs font-bold text-ink xl:text-sm dark:text-white">تعداد نفرات</span>
                <input
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="field-input"
                    type="number"
                    min={1}
                    placeholder="تعداد نفرات"
                />
            </label>

            <label className="flex min-w-0 flex-col gap-1 text-right">
                <span className="px-1 text-xs font-bold text-ink xl:text-sm dark:text-white">تاریخ ورود</span>
                <input
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    type="date"
                    className="field-input min-w-0"
                />
            </label>

            <label className="flex min-w-0 flex-col gap-1 text-right">
                <span className="px-1 text-xs font-bold text-ink xl:text-sm dark:text-white">تاریخ خروج</span>
                <input
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    type="date"
                    className="field-input min-w-0"
                />
            </label>

            <button type="submit" className="btn-brand col-span-2 h-11 w-full text-sm lg:col-span-1 xl:h-[52px] xl:text-base">
                جستجو کنید
            </button>
        </form>
    );
};

export default FormSearch;
