"use client"

import Image from 'next/image';
import user from '../../assets/details/Noah.svg'
import Link from 'next/link';
import home from '../../assets/reserve/home.svg';
import { useState } from 'react';
import ChatModal from './modal/ChatModal';

const RentForm = ({
    price,
    discount,
    id,
}: {
    price?: number | string
    discount?: number | string | null
    id: string
}) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div dir="rtl" className="surface-card flex w-full flex-col gap-5 p-5 font-sans xl:p-6">
            <div className='flex items-center justify-center gap-2'>
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft">
                    <Image src={home} alt='' unoptimized className='size-5' />
                </div>
                <h2 className='text-lg font-extrabold text-ink dark:text-white'>رزرو خونه برای</h2>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-5 dark:border-white/10 dark:bg-[#2a3340]/50">
                <div className="size-16 overflow-hidden rounded-full ring-2 ring-brand/20 ring-offset-2 ring-offset-card">
                    <Image src={user} alt="Avatar" className="size-full object-cover" />
                </div>
                <p className="text-base font-bold text-ink dark:text-white">امیر محمد خیرآبادی</p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-ink-muted">
                    <span className="rounded-full bg-card px-3 py-1 dark:bg-[#1a222d]">۳ تیر ۱۴۰۴</span>
                    <span className="rounded-full bg-card px-3 py-1 dark:bg-[#1a222d]">۱۰:۱۰</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className='h-px flex-1 bg-border dark:bg-white/10' />
                <h3 className="text-sm font-bold text-ink dark:text-white">قیمت</h3>
                <div className='h-px flex-1 bg-border dark:bg-white/10' />
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <span className="shrink-0 text-xs font-medium text-ink-muted sm:text-sm">قیمت رهن از</span>
                    <div className="rounded-full bg-muted px-4 py-2.5 dark:bg-[#2a3340]">
                        <span className="text-sm font-bold text-ink tabular-nums dark:text-white sm:text-base">
                            {Number(price || 0).toLocaleString("fa-IR")} تومان
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="shrink-0 text-xs font-medium text-ink-muted sm:text-sm">قیمت اجاره از</span>
                    <div className="rounded-full bg-muted px-4 py-2.5 dark:bg-[#2a3340]">
                        <span className="text-sm font-bold text-ink tabular-nums dark:text-white sm:text-base">
                            {Number(discount || 0).toLocaleString("fa-IR")} تومان
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className='h-px flex-1 bg-border dark:bg-white/10' />
                <h3 className="text-sm font-bold text-ink dark:text-white">ارتباط با فروشنده</h3>
                <div className='h-px flex-1 bg-border dark:bg-white/10' />
            </div>

            <div className="flex flex-col gap-2.5">
                <Link href="tel:09390000353" className="btn-brand w-full py-3.5">
                    تماس با ۰۹۳۹****۳۵۳
                </Link>

                <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="btn-outline-brand w-full py-3.5"
                >
                    گفت و گو با فروشنده
                </button>
            </div>

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
