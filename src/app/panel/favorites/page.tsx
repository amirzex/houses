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
            className="panel-modal-backdrop"
            onClick={onClose}
        >
            <div
                className="panel-modal w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 font-bold text-ink-muted hover:text-danger"
                >
                    ✕
                </button>
                <Image
                    src={picture}
                    alt={'asas'}
                    className="h-32 w-full shrink-0 rounded-xl object-cover"
                />

                <h2 className="panel-heading mt-5 mb-4 text-right">
                    {house.title || "بدون نام"}
                </h2>
                <p className="mb-2 flex items-center gap-2 text-ink-muted">
                    <MapPin size={16} />
                    {house.address || "نامشخص"}
                </p>
                <p className="mb-2 flex items-center gap-2 text-amber-600">
                    <Star size={16} />
                    امتیاز: {house.rate || "0"}
                </p>
                <p className="mb-4 text-lg font-black">
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
        return <div className="panel-empty">در حال بارگذاری...</div>;
    if (isError)
        return (
            <div className="panel-empty text-danger">خطا در دریافت اطلاعات</div>
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
        <div className="panel-page" dir="rtl">
            <div className="panel-toolbar">
                <h1 className="panel-heading text-right">
                    لیست علاقه‌مندی‌های شما
                </h1>
            </div>

            <div className="panel-table-shell">
                <div className="overflow-x-auto text-right">
                    <table className="panel-table">
                        <thead>
                            <tr>
                                <th className="text-center">نام اقامتگاه</th>
                                <th>موقعیت</th>
                                <th className="text-center">امتیاز</th>
                                <th>قیمت هر شب</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {favorites.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="panel-empty">
                                        موردی یافت نشد.
                                    </td>
                                </tr>
                            ) : (
                                favorites.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-14 w-14 shrink-0 rounded-2xl bg-muted dark:bg-white/10"></div>
                                                <span className="text-sm font-bold">
                                                    {item.house?.title || "بدون نام"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="text-xs font-medium text-ink-muted">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin size={14} />
                                                {item.house?.address || "نامشخص"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="panel-badge-warn inline-flex items-center gap-1.5">
                                                    <Star size={12} />
                                                    {item.house?.rate || "0"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="text-sm font-black">
                                            {Number(item.house?.price || 0).toLocaleString()}
                                            <span className="mr-1 text-[10px] font-normal opacity-60">ت</span>
                                        </td>

                                        <td className="relative">
                                            <button
                                                onClick={() =>
                                                    setOpenMenu(openMenu === index ? null : index)
                                                }
                                                className="panel-icon-btn"
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {openMenu === index && (
                                                <div className="absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-lift)] animate-in zoom-in-95 dark:border-white/10 sm:top-0 sm:left-full sm:right-auto">
                                                    <button
                                                        onClick={() => openHouseModal(item.house)}
                                                        className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-black text-ink-muted hover:bg-muted dark:hover:bg-white/5"
                                                    >
                                                        مشاهده <Heart size={14} className="text-ink-muted" />
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
        </div>
    );
};

export default FavoritesPage;
