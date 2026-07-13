import Image from 'next/image';
import user from '../../assets/details/Noah.svg'
import Link from 'next/link';
import home from '../../assets/reserve/home.svg';
import money from '../../assets/details/money-01.svg'
import money2 from '../../assets/details/MoneyExchange01Icon.svg'
import { useState } from 'react';
import ChatModal from './modal/ChatModal';

const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
);

const RefreshMoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const UserContactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const TimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const RentForm = ({ price, discount , id }) => {

    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div dir="rtl" className="w-[90%] max-w-md mx-auto flex flex-col justify-center items-center bg-[#FFFFFA] dark:bg-[#272727] border rounded-3xl p-6 gap-6 shadow-sm font-sans">

            {/* Title */}
            <div className='w-full flex flex-row-reverse  justify-center items-center gap-2 font-bold'>
                <h2 className='text-xl text-gray-900 dark:text-[#D9D9E0]'>رزرو خونه برای</h2>
                <Image src={home} alt='home' unoptimized className='w-6 h-6' />

            </div>

            {/* Profile Section */}
            <div className="w-[70%] flex flex-col items-center gap-4 border border-gray-200 rounded-2xl py-5 px-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                    {/* تصویر آواتار را اینجا قرار دهید */}
                    <Image src={user} alt="Avatar" className="w-15 h-15" />
                </div>

                {/* Name */}
                <p className="text-gray-900 font-bold text-lg dark:text-[#D9D9E0]">امیر محمد خیرآبادی</p>

                {/* Date and Time */}
                <div className="flex items-center gap-4 bg-white p-1 text-gray-800 font-medium">
                    <div className="flex items-center gap-1">
                        <TimeIcon />
                        <span className="pt-1">3 تیر - 1404</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <TimeIcon />
                        <span className="pt-1">10:10</span>
                    </div>
                </div>
            </div>

            {/* Divider: Price */}
            <div className="w-full flex items-center gap-5">
                <div className='flex-1 border-b border-gray-200'></div>
                <h3 className="font-bold text-gray-800 text-xl dark:text-[#D9D9E0]">قیمت</h3>
                <div className='flex-1 border-b border-gray-200'></div>
            </div>

            {/* Price Info */}
            <div className="w-full flex flex-col gap-4">
                {/* Mortgage */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex w-[30%] items-center gap-2">
                        <Image src={money} alt='' unoptimized />
                        <span className="text-gray-800 font-medium text-sm dark:text-[#D9D9E0]">قیمت رهن از</span>
                    </div>
                    <div className="bg-gray-100 w-[70%] rounded-full px-6 py-2.5 flex items-center dark:bg-[#353535] justify-center">
                        <span className="text-gray-900 dark:text-[#D9D9E0] font-bold text-xl tracking-wide">
                            {Number(price).toLocaleString("fa-IR")} ت
                        </span>

                    </div>
                </div>

                {/* Rent */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex w-[30%] items-center gap-2">
                        <Image src={money2} alt='' unoptimized />
                        <span className="text-gray-800 font-medium text-sm dark:text-[#D9D9E0]">قیمت اجاره از</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-[#353535] dark:text-[#D9D9E0] rounded-full w-[70%] px-6 py-2.5 flex items-center  justify-center">
                        <span className="text-gray-900 dark:text-[#D9D9E0] font-bold text-xl tracking-wide">
                            {Number(discount).toLocaleString("fa-IR")} ت
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider: Contact */}
            <div className="w-full flex items-center gap-5 mt-2">
                <div className='flex-1 border-b border-gray-200'></div>
                <div className="flex items-center gap-1">
                    <Image src={money} alt='' unoptimized />
                    <h3 className="font-bold text-gray-800 text-xl dark:text-[#D9D9E0]">ارتباط با فروشنده</h3>
                </div>
                <div className='flex-1 border-b border-gray-200'></div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-3">
                <Link href="#" className="w-full bg-[#1e3a8a] text-white font-medium py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors duration-300">
                    <span className="pt-0.5 text-[15px]">تماس با 0939****353</span>
                    <ArrowLeftIcon />
                </Link>

                <button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full bg-white dark:bg-transparent text-[#1e3a8a] border border-[#1e3a8a] dark:border-blue-600/90 font-medium py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors duration-300"
                >
                    <span className="pt-0.5 text-[15px] dark:text-blue-600/90">گفت و گو با فروشنده</span>
                </button>

            </div>
            {/* فراخوانی مودال */}
            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                sellerName="امیر محمد خیرآبادی"
                houseId={id}
            />
        </div>
    );
};

export default RentForm;
