"use client";
import React, { useState } from "react";
import { Heart, Trash2, MoreHorizontal, MapPin, Star } from "lucide-react";
import { useGetFavorites } from "@/core/api/dashboard/favorites/queries";
import picture from '../../../assets/details/blogsbg.jpg'
import Image from "next/image";

type House = {
    id: number;
    title: string;
    address: string;
    photos?: string[] | null;
    rate: string;
    price: string | number;
};

type FavoriteItem = {
    id: number;
    user_id: number;
    house_id: number;
    created_at: string;
    updated_at: string;
    house?: House;
};

const Modal = ({
    house,
    onClose,
}: {
    house: House | undefined;
    onClose: () => void;
}) => {
    if (!house) return null;

    return (
        <div
            className="fixed inset-0 bg-white/5 drop-shadow-2xl bg-opacity-50 flex flex-col justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-[#1E1E1E] h-90 rounded-2xl w-[30%] p-10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-600 dark:text-slate-300 font-bold"
                >
                    ✕
                </button>
                <Image
                    src={picture}
                    alt={'asas'}
                    className="rounded-xl h-32 w-full object-cover flex-shrink-0"
                />

                <h2 className="text-xl font-black mb-4 text-right mt-5">
                    {house.title || "بدون نام"}
                </h2>
                <p className="flex items-center gap-2 mb-2 text-slate-600 dark:text-slate-300">
                    <MapPin size={16} />
                    {house.address || "نامشخص"}
                </p>
                <p className="flex items-center gap-2 mb-2 text-yellow-600">
                    <Star size={16} />
                    امتیاز: {house.rate || "0"}
                </p>
                <p className="mb-4 font-black text-slate-800 dark:text-white text-lg">
                    قیمت هر شب: {Number(house.price || 0).toLocaleString()} ت
                </p>
            </div>


        </div>
    );
};

const FavoritesPage = () => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [selectedHouse, setSelectedHouse] = useState<House | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: responseData, isLoading, isError } = useGetFavorites();

    const favorites: FavoriteItem[] = responseData?.data || [];

    if (isLoading)
        return <div className="p-8 text-center">در حال بارگذاری...</div>;
    if (isError)
        return (
            <div className="p-8 text-center text-red-500">خطا در دریافت اطلاعات</div>
        );

    const openHouseModal = (house: House | undefined) => {
        setSelectedHouse(house);
        setIsModalOpen(true);
        setOpenMenu(null);
    };

    const closeHouseModal = () => {
        setIsModalOpen(false);
        setSelectedHouse(undefined);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in h-auto  fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row justify-between items-end gap-6 bg-white dark:bg-[#1E1E1E]">
                <h1 className="text-xl text-right font-black text-slate-800 dark:text-white">
                    لیست علاقه‌مندی‌های شما
                </h1>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] shadow-sm border border-slate-50 h-152 overflow-y-scroll dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto text-right" dir="rtl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 text-slate-400 text-[11px] font-black uppercase tracking-wider">
                                <th className="p-5 text-center">نام اقامتگاه</th>
                                <th className="p-5">موقعیت</th>
                                <th className="p-5 text-center">امتیاز</th>
                                <th className="p-5">قیمت هر شب</th>
                                <th className="p-5 w-10"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {favorites.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        موردی یافت نشد.
                                    </td>
                                </tr>
                            ) : (
                                favorites.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="group hover:bg-slate-50/30 dark:hover:bg-white/[0.02] transition-all"
                                    >
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-slate-100 dark:bg-white/10 rounded-2xl flex-shrink-0"></div>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {item.house?.title || "بدون نام"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-5 text-xs  mt-5 font-medium text-slate-500 flex items-center gap-1">
                                            <MapPin size={14} />
                                            {item.house?.address || "نامشخص"}
                                        </td>

                                        <td className="p-5">
                                            <div className="flex justify-center">
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-600 rounded-full text-[10px] font-black border border-yellow-200">
                                                    <Star size={12} />
                                                    {item.house?.rate || "0"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-5 text-sm font-black text-slate-800 dark:text-white">
                                            {Number(item.house?.price || 0).toLocaleString()}
                                            <span className="text-[10px] font-normal opacity-60 mr-1">ت</span>
                                        </td>

                                        <td className="p-5 relative">
                                            <button
                                                onClick={() =>
                                                    setOpenMenu(openMenu === index ? null : index)
                                                }
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-400"
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {openMenu === index && (
                                                <div className="absolute  top-0 left-full mt-2 w-36 bg-white dark:bg-[#252525] shadow-2xl rounded-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden animate-in zoom-in-95">
                                                    <button
                                                        onClick={() => openHouseModal(item.house)}
                                                        className="w-full px-4 py-3 text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between"
                                                    >
                                                        مشاهده <Heart size={14} className="text-slate-400" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Modal house={selectedHouse} onClose={closeHouseModal} />
            )}

            {/* ... بخش Pagination ... */}
        </div>
    );
};

export default FavoritesPage;
