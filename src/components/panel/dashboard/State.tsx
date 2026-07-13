
import React from 'react'
import { Users, Calendar, Wallet, Star, BookHeart, CirclePercent } from 'lucide-react';
import { useUserActivity } from '@/core/api/dashboard/user/queries';

const State = () => {

    const { data } = useUserActivity()

    const stats = [
        { title: "کل رزروها", value: data?.activity?.bookingCount, icon: <Calendar className="text-blue-500" />, trend: "+۱۲٪" },
        { title: "موجودی کیف پول", value: "۴,۵۰۰,۰۰۰ تومان", icon: <Wallet className="text-emerald-500" />, trend: "+۵٪" },
        { title: " رزرو های پرداخت شده", value: data?.activity?.housesCreated, icon: <Star className="text-amber-500" />, trend: "جدید" },
        { title: "  مشخصات تکمیلی  ", value: data?.user?.additionalPercentage, icon: <CirclePercent className="text-purple-500" />, trend: "%" },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1E1E1E] p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl">{stat.icon}</div>
                            <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">{stat.trend}</span>
                        </div>
                        <p className="text-slate-500 text-sm font-bold">{stat.title}</p>
                        <p className="text-xl font-black mt-1 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default State