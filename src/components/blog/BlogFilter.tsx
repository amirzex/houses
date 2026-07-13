"use client";

import React, { useEffect, useState } from "react";

const BlogFilter = ({
    data,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
}) => {
    const [activeFilter, setActiveFilter] = useState("اخرین بروزرسانی");
    const [inputValue, setInputValue] = useState(searchTerm || "");

    const filters = ["اخرین بروزرسانی", "جدید ترین", "پر بازدید ترین"];

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 500); // تاخیر 500 میلی‌ثانیه

        return () => clearTimeout(timer);
    }, [inputValue, setSearchTerm]);

    return (
        <div dir="rtl" className="w-full font-sans">
            <form className="w-full flex flex-wrap lg:flex-nowrap justify-start items-end gap-4 p-4">
                <div className="flex flex-col flex-grow md:flex-grow-0 md:w-1/4">
                    <h2 className="mb-1"> جستجو </h2>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="جستجوی مقاله..."
                            className="w-full bg-gray-100 dark:text-gray-400 dark:bg-[#353535] text-gray-500 rounded-full py-4 px-10 outline-none text-sm appearance-none border border-transparent focus:border-blue-500 transition-all"
                        />

                        <svg
                            className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        {inputValue && (
                            <button
                                type="button"
                                onClick={() => {
                                    setInputValue("");
                                    setSearchTerm("");
                                }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-grow md:flex-grow-0 md:w-1/6">
                    <label className="text-gray-800 font-bold mb-2 text-sm pr-2 dark:text-white">
                        دسته بندی
                    </label>
                    <div className="relative w-full">
                        <select
                            className="w-full bg-gray-100 dark:text-gray-400 dark:bg-[#353535] text-gray-400 rounded-full py-4 px-5 outline-none text-sm appearance-none cursor-pointer"
                            value={selectedCategory || ""}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {data?.data?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <svg
                            className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex max-sm:hidden flex-row items-center gap-3 overflow-x-auto pb-1 md:pb-0">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="whitespace-nowrap bg-red-600 text-white rounded-full py-2.5 px-6 text-sm font-medium flex flex-row-reverse items-center justify-center gap-2 transition-colors hover:bg-red-700"
                    >
                        <span className="p-1 text-xl">حذف فیلتر</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 6l12 12M6 18L18 6"
                                className="text-white opacity-100"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogFilter;
