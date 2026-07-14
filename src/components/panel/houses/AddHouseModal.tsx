'use client';

import { useCreateHouse } from '@/core/api/admin/houses/queries';
import React, { useState } from 'react';

const AddHouseModal = ({ isOpen, onClose }) => {
    const { mutate, isPending } = useCreateHouse();

    const [formData, setFormData] = useState({
        title: "",
        address: "",
        location: "",
        price: "",
        discounted_price: "",
        capacity: "",
        rooms: "",
        bathrooms: "",
        parking: "",
        tags: "apartment", 
        transaction_type: "rental",
        caption: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            price: String(formData.price),
            discounted_price: String(formData.discounted_price),
            capacity: Number(formData.capacity),
            rooms: Number(formData.rooms),
            bathrooms: Number(formData.bathrooms),
            parking: Number(formData.parking),
            rate: "3.5",
            sellerId: 175,
            sellerName: "ادمین اکانت",
            last_updated: new Date().toISOString(),
            num_comments: 0,
            favoriteId: 0,
            bookings: 0,
            isFavorite: false,
            photos: null,
            categories: null,
            yard_type: null,
            discount_id: null,
        };

        mutate(payload, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">ثبت ملک جدید</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="عنوان" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <input placeholder="آدرس" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

                        <input type="number" placeholder="قیمت اصلی" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                        <input type="number" placeholder="قیمت تخفیف‌خورده" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, discounted_price: e.target.value })} />

                        <input type="number" placeholder="ظرفیت" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} />
                        <input type="number" placeholder="تعداد اتاق" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />

                        <input type="number" placeholder="سرویس بهداشتی" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />
                        <input type="number" placeholder="پارکینگ" className="p-3 rounded-xl bg-gray-50 outline-none" onChange={(e) => setFormData({ ...formData, parking: e.target.value })} />
                    </div>

                    <select className="w-full p-3 rounded-xl bg-gray-50" onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}>
                        <option value="rental">اجاره</option>
                        <option value="sale">فروش</option>
                    </select>

                    <textarea placeholder="توضیحات" className="w-full p-3 rounded-xl bg-gray-50 h-24 outline-none" onChange={(e) => setFormData({ ...formData, caption: e.target.value })} />

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 font-medium hover:bg-gray-200 transition">انصراف</button>
                        <button type="submit" disabled={isPending} className="flex-1 py-3 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover transition">
                            {isPending ? 'در حال ثبت...' : 'ثبت نهایی'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHouseModal;
