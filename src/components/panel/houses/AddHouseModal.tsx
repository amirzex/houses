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
        <div className="panel-modal-backdrop">
            <div className="panel-modal max-h-[90dvh] overflow-hidden p-0 sm:p-0">
                <div className="border-b border-border/60 p-5 dark:border-white/10 sm:p-6">
                    <h2 className="panel-heading">ثبت ملک جدید</h2>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <input placeholder="عنوان" className="panel-input" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <input placeholder="آدرس" className="panel-input" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

                        <input type="number" placeholder="قیمت اصلی" className="panel-input" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                        <input type="number" placeholder="قیمت تخفیف‌خورده" className="panel-input" onChange={(e) => setFormData({ ...formData, discounted_price: e.target.value })} />

                        <input type="number" placeholder="ظرفیت" className="panel-input" onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} />
                        <input type="number" placeholder="تعداد اتاق" className="panel-input" onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />

                        <input type="number" placeholder="سرویس بهداشتی" className="panel-input" onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />
                        <input type="number" placeholder="پارکینگ" className="panel-input" onChange={(e) => setFormData({ ...formData, parking: e.target.value })} />
                    </div>

                    <select className="panel-input w-full cursor-pointer" onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}>
                        <option value="rental">اجاره</option>
                        <option value="sale">فروش</option>
                    </select>

                    <textarea placeholder="توضیحات" className="panel-input h-24 resize-none" onChange={(e) => setFormData({ ...formData, caption: e.target.value })} />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button type="button" onClick={onClose} className="btn-outline-brand flex-1 py-3">انصراف</button>
                        <button type="submit" disabled={isPending} className="btn-brand flex-1 py-3">
                            {isPending ? 'در حال ثبت...' : 'ثبت نهایی'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHouseModal;
