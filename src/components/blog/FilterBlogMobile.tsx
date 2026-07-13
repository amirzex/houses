// src/components/FilterWithMobileMenu.jsx

import React, { useState } from 'react';
import fillter from '../../assets/payment/Vector.svg'
import removefillter from '../../assets/payment/filter-remove.svg'
import Image from 'next/image';
import BlogFilter from './BlogFilter';


const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const FilterBlogMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="  w-full ">


            <div className="hidden lg:block bg-white  p-6 rounded-xl shadow-lg border border-gray-200/80">
                <h3 className="text-xl font-bold mb-6 text-gray-800">فیلترها</h3>

                <BlogFilter />
            </div>

            <div className="lg:hidden">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center justify-start gap-x-2 w-full px-4 py-3 bg-gray-300 dark:bg-[#272727] dark:text-blue-600/90 dark:border-blue-600/90 text-blue-900 rounded-full shadow-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    <div className='flex flex-row gap-1 border p-3 border-blue-900 rounded-full'>
                        <Image src={fillter} alt='flter' unoptimized />
                        <span> مشخصات</span>
                    </div>
                    <div className='flex flex-row gap-1 border p-3 border-blue-900 rounded-full'>
                        <Image src={fillter} alt='flter' unoptimized />
                        <span> فیلتر</span>
                    </div>
                    <div className='flex flex-row gap-1 bg-red-500 p-3  rounded-full'>
                        <Image src={removefillter} alt='flter' unoptimized />
                        <span className='text-white'> حذف</span>
                    </div>
                </button>
            </div>


            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">

                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300"
                        onClick={closeMenu}
                    ></div>


                    <div className="relative flex flex-col w-full max-w-sm h-full bg-white dark:bg-[#272727] shadow-2xl transform transition-transform duration-300 ease-in-out">

                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#D9D9E0]">فیلترها</h2>
                            <button
                                type="button"
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onClick={closeMenu}
                            >
                                <span className="sr-only">بستن منو</span>
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">

                            <BlogFilter isMobile={true} />
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={closeMenu}
                                className="w-full px-4 py-3 bg-blue-900 text-white rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                اعمال فیلترها
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBlogMobile;
