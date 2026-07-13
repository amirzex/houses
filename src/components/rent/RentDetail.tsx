"use client"
import React, { FC, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { slides } from '../landing/suggestion/Suggestion';
import Image from 'next/image';
import start from '../../assets/landing/start.svg'
import loca from '../../assets/landing/location.svg'
import shair from '../../assets/reserve/Only-IconButton.svg'
import copy from '../../assets/details/Only-IconButton.svg'
import houses from '../../assets/reserve/Frame 14333.png'
import house1 from '../../assets/reserve/image 2.svg'
import house2 from '../../assets/reserve/image 3.svg'
import ReserveComments from "@/components/reserve/ReserveComments";
import RentForm from './RentForm';
import FacilitiesRent from './FacilitiesRent';
import Card from '../common/Card';
import { useHouseById } from '@/core/api/houses/queries';
import Appointments from '../common/Appointments';
import { useAddFavorite } from '@/core/api/favorites/queries';
import toast from 'react-hot-toast';
import { useCreateMaintenance } from '@/core/api/admin/maintenance/queries';

interface IProps {
    id: string;
}

const RentDetail: FC<IProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState("");

    const { data } = useHouseById(id);
    const { mutate: addFavorite, isPending } = useAddFavorite();

    const { mutate: createMaintenance, isPending: isMaintenanceLoading } = useCreateMaintenance();

    const handleAddFavorite = () => {
        if (!id) return;
        addFavorite(
            { house_id: id },
            {
                onSuccess: () => toast.success("به علاقه‌مندی‌ها اضافه شد ✅"),
                onError: () => toast.error("خطا در افزودن به علاقه‌مندی‌ها ❌"),
            }
        );
    };

    const handleMaintenanceSubmit = () => {
        if (!description.trim()) {
            toast.error("لطفاً شرح خرابی را بنویسید");
            return;
        }

        createMaintenance(
            { houseId: Number(id), description },
            {
                onSuccess: () => {
                    toast.success("گزارش خرابی با موفقیت ثبت شد");
                    setIsModalOpen(false);
                    setDescription("");
                },
                onError: () => toast.error("خطا در ثبت گزارش خرابی"),
            }
        );
    };

    return (
        <div className='w-full flex flex-col justify-center items-center gap-10 p-10' dir='rtl'>
            <Breadcrumb />

            <div className='w-full flex flex-col justify-center items-center gap-5 '>
                {/* title div */}
                <div className='w-full flex flex-row justify-center items-center px-5'>
                    <h1 className='w-[50%] flex justify-start items-center text-3xl'>{data?.title}</h1>
                    <div className='w-[50%] flex justify-end items-center '>
                        <div className='bg-blue-900 px-5 py-2 w-[15%]  rounded-full text-white flex flex-row-reverse justify-center items-center gap-1'>
                            <Image src={start} alt='' unoptimized />
                            <p>ستاره</p>
                            {data?.rate}
                        </div>
                    </div>
                </div>

                {/* location div */}
                <div className='w-full flex flex-row justify-center items-center px-5'>
                    <h1 className='w-[50%] flex justify-start items-center text-gray-400 text-xl'>
                        <Image src={loca} alt='' unoptimized />
                        {data?.address}
                    </h1>
                    <div className='w-[50%] flex justify-end items-center '>
                        <div className=' w-auto flex flex-row-reverse justify-start items-center gap-3'>
                            <Image src={shair} alt='' unoptimized className="cursor-pointer" />
                            <Image src={copy} alt='' unoptimized className="cursor-pointer" />

                            {/* دکمه گزارش خرابی با استایل مدرن */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-xl transition-all duration-300 font-medium border border-orange-200"
                            >
                                <span className="text-sm text-nowrap">گزارش خرابی</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                            </button>

                            <button
                                onClick={handleAddFavorite}
                                disabled={isPending}
                                className='text-gray-500 hover:text-red-500 transition text-2xl'
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-12 h-12 text-gray-500 hover:text-red-500 transition"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.53h.56 C12.09 5.01 13.76 4 15.5 4 18 4 20 6 20 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal برای گزارش خرابی */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl w-[90%] max-w-md border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">ثبت گزارش خرابی</h2>
                            <p className="text-gray-500 mb-6 text-sm">لطفاً جزئیات خرابی مشاهده شده در "{data?.title}" را شرح دهید.</p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none bg-gray-50 dark:bg-slate-900"
                                placeholder="مثلاً: شیر آب آشپزخانه چکه می‌کند..."
                            />
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleMaintenanceSubmit}
                                    disabled={isMaintenanceLoading}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-bold transition-all disabled:opacity-50"
                                >
                                    {isMaintenanceLoading ? "در حال ارسال..." : "ارسال گزارش"}
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold transition-all"
                                >
                                    انصراف
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* بقیه بخش‌ها بدون تغییر استایل */}
                <div className='w-full '>
                    <Image src={houses} alt='' unoptimized className='w-full' />
                </div>

                <div className='w-full flex flex-row justify-center items-start gap-20 p-10 '>
                    <div className="w-[70%] bg-white dark:bg-transparent flex flex-col justify-center items-center rounded-lg">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-right dark:text-[#D9D9E0]">چرا {data?.title} رو انتخاب کنیم؟</h2>
                            <p className="text-gray-600 leading-relaxed text-xl text-right dark:text-[#D9D9E0]">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...
                            </p>
                            <div className="w-full flex flex-row justify-center items-center gap-10 p-5">
                                <div className='w-[70%] flex flex-row justify-center items-center gap-10 '>
                                    <Image src={house1} alt="Lighthouse" className="w-full rounded-lg h-64" />
                                    <Image src={house2} alt="Lighthouse" className="w-full rounded-lg h-64" />
                                </div>
                            </div>
                        </section>

                        <div className='w-full flex felx-row justify-center items-center '>
                            <FacilitiesRent
                                bathrooms={data?.bathrooms}
                                parking={data?.parking}
                                rooms={data?.rooms}
                                capacity={data?.capacity}
                            />
                        </div>
                        <ReserveComments id={id} />
                    </div>

                    <div className='w-[30%] flex flex-col justify-center gap-5 items-center'>
                        <RentForm id={id} price={data?.price} discount={data?.discounted_price} />
                        <Appointments id={id} />
                    </div>
                </div>
            </div>

            <div className=' w-full flex flex-row overflow-x-auto' dir='ltr'>
                {slides.slice(0, 3).map((item, index) => (
                    <Card value={item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default RentDetail
