// src/component/Form/Form.tsx
"use client";

import SortFilter from '@/components/filters/SortFilter';
import PriceRange from '@/components/filters/PriceRange';
import { useReserve } from '@/core/context/ReserveContext';
import { useState, useEffect } from 'react';

const Form = () => {
    const { filters, setFilters, clearFilters: clearContextFilters } = useReserve();

    const [search, setSearch] = useState(filters.search || "");
    const [currentSort, setCurrentSort] = useState(filters.sort || "last_updated");
    const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
    const [location, setLocation] = useState(filters.location || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters({
                search: search || undefined,
                sort: currentSort,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                location: location || undefined,
                page: 1,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [search, currentSort, minPrice, maxPrice, location, setFilters]);

    const clearFilters = () => {
        setSearch("");
        setCurrentSort("last_updated");
        setMinPrice("");
        setMaxPrice("");
        setLocation("");
        clearContextFilters();
    };

    return (
        <form
            className='w-full flex flex-col gap-5 border-2 border-gray-300 rounded-4xl p-5'
            onSubmit={(e) => e.preventDefault()}
        >
            {/* top */}
            <div className='w-full flex flex-row-reverse justify-center items-center gap-5'>
                {/* search */}
                <div className='w-[50%] flex flex-col gap-4'>
                    <p className='w-full text-right pr-3'>جستجو</p>
                    <input
                        type="text"
                        placeholder='نام هتل یا اقامتگاه'
                        className='w-full text-right p-3 bg-gray-100 rounded-4xl outline-0 focus:ring-2 focus:ring-blue-900 transition-all'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* sort */}
                <div className='w-[50%] flex flex-col gap-5'>
                    <p className='w-full text-right pr-3'>مرتب سازی بر اساس</p>
                    <SortFilter
                        currentSort={currentSort}
                        onChange={(value) => setCurrentSort(value)}
                    />
                </div>
            </div>

            {/* bottom */}
            <div className='w-full flex flex-row-reverse justify-center items-center gap-5'>
                {/* امکانات */}
                <div className='w-[50%] flex flex-col gap-4'>
                    <p className='w-full text-right pr-3'>امکانات هتل</p>
                    <input
                        type="text"
                        placeholder='استان,شهر'
                        className='text-right bg-gray-100 p-3 rounded-4xl outline-0 focus:ring-2 focus:ring-blue-900 transition-all'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                {/* price range */}
                <div className='w-[50%] flex flex-col gap-4'>
                    <p className='w-full text-right pr-3'>رنج قیمت</p>
                    <PriceRange
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onChange={(min, max) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                        }}
                    />
                </div>
            </div>

            {/* delete button */}
            <div className='flex justify-end items-center gap-4 mt-2'>
                {/* active filter */}
                <div className='flex flex-row gap-2 text-sm text-gray-600'>
                    {search && <span className='bg-gray-100 px-3 py-1 rounded-full'>جستجو: {search}</span>}
                    {currentSort && currentSort !== "last_updated" &&
                        <span className='bg-gray-100 px-3 py-1 rounded-full'>مرتب‌سازی: {currentSort}</span>
                    }
                    {(minPrice || maxPrice) && (
                        <span className='bg-gray-100 px-3 py-1 rounded-full'>
                            قیمت: {minPrice || 0} - {maxPrice || "∞"}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-700 text-sm underline transition-colors"
                >
                    حذف فیلترها
                </button>
            </div>
        </form>
    );
};

export default Form;