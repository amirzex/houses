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
        <div className='w-full flex flex-row-reverse justify-center items-center'>

            <form
                onSubmit={handleSearch}
                className='w-full flex flex-row-reverse justify-center items-center'
            >

                <div className="w-[20%] text-black flex flex-col gap-1 items-end p-5">

                    <p className="text-xl font-bold dark:text-white">
                        انتخاب مقصد
                    </p>

                    <div className="relative w-full">

                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="appearance-none bg-gray-100 dark:bg-[#353535] dark:text-white w-full text-right p-5 rounded-4xl cursor-pointer pr-4"
                            dir="rtl"
                        >

                            <option value="">مقصد را انتخاب کنید</option>

                            <option value="ساری">ساری</option>
                            <option value="بابل">بابل</option>
                            <option value="بابلسر">بابلسر</option>
                            <option value="رامسر">رامسر</option>

                        </select>

                    </div>
                </div>

                <div className='w-[20%] text-black flex flex-col gap-1 items-end p-5'>

                    <p className='text-xl font-bold dark:text-white'>
                        تعداد نفرات
                    </p>

                    <input
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className='bg-gray-100 dark:bg-[#353535] dark:text-white w-full text-right p-4 rounded-4xl'
                        type="number"
                        placeholder='تعداد نفرات'
                    />

                </div>

                <div className="w-[20%] text-black flex flex-col gap-1 items-end p-5">

                    <p className="text-xl font-bold dark:text-white">
                        تاریخ ورود
                    </p>

                    <input
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        type="date"
                        className="bg-gray-100 dark:bg-[#353535] dark:text-white w-full text-right p-4 rounded-4xl"
                    />

                </div>

                <div className="w-[20%] text-black flex flex-col gap-1 items-end p-5">

                    <p className="text-xl font-bold dark:text-white">
                        تاریخ خروج
                    </p>

                    <input
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        type="date"
                        className="bg-gray-100 dark:bg-[#353535] dark:text-white w-full text-right p-4 rounded-4xl"
                    />

                </div>

                <button
                    type="submit"
                    className='text-xl bg-blue-900 text-white font-bold mt-8 w-[20%] rounded-4xl p-4'
                >
                    جستجو کنید
                </button>

            </form>
        </div>
    );
};

export default FormSearch;
