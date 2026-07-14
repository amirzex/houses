"use client"
import React, { FC, useMemo, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { slides } from '../landing/suggestion/Suggestion';
import Image from 'next/image';
import loca from '../../assets/landing/location.svg'
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
import { Heart, Share2, Link2, Wrench, Star, MapPin } from 'lucide-react'

interface IProps {
    id: string;
}

const RentDetail: FC<IProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [activeImage, setActiveImage] = useState(0);

    const { data, isLoading } = useHouseById(id);
    const { mutate: addFavorite, isPending } = useAddFavorite();
    const { mutate: createMaintenance, isPending: isMaintenanceLoading } = useCreateMaintenance();

    const gallery = useMemo(() => {
        const raw = data?.photos as unknown
        const fromApi = Array.isArray(raw)
            ? raw.filter(Boolean)
            : typeof raw === "string" && raw
                ? [raw]
                : []
        const fallbacks = [houses, house1, house2]
        const merged = [...fromApi, ...fallbacks].slice(0, 5)
        return merged.length ? merged : fallbacks
    }, [data?.photos])

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

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: data?.title, url: window.location.href })
            } else {
                await navigator.clipboard.writeText(window.location.href)
                toast.success("لینک کپی شد")
            }
        } catch {
            /* user cancelled */
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("لینک کپی شد")
    }

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

    if (isLoading) {
        return (
            <div className="section-wrap flex min-h-[50vh] items-center justify-center pt-24 text-ink-muted">
                در حال بارگذاری جزئیات ملک...
            </div>
        )
    }

    return (
        <div className='section-wrap flex w-full flex-col gap-6 pb-12 pt-20 sm:gap-8 sm:pt-24 xl:pt-28' dir='rtl'>
            <Breadcrumb />

            {/* Header */}
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className='text-xl font-extrabold leading-snug text-ink sm:text-2xl xl:text-3xl dark:text-white'>
                            {data?.title || "جزئیات ملک"}
                        </h1>
                        {data?.rate != null && (
                            <span className='inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-brand/20'>
                                <Star className="size-3.5 fill-white" />
                                {data.rate}
                            </span>
                        )}
                    </div>
                    <p className='flex items-start gap-1.5 text-sm text-ink-muted sm:text-base'>
                        <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                        <Image src={loca} alt="" unoptimized className="hidden" />
                        <span>{data?.address || "آدرس ثبت نشده"}</span>
                    </p>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-deal/30 bg-deal-soft px-3 py-2 text-xs font-bold text-deal transition hover:bg-deal hover:text-white"
                    >
                        <Wrench className="size-3.5" />
                        گزارش خرابی
                    </button>
                    <button type="button" onClick={handleShare} className="btn-icon size-9 xl:size-10" aria-label="اشتراک‌گذاری">
                        <Share2 className="size-4" />
                    </button>
                    <button type="button" onClick={handleCopy} className="btn-icon size-9 xl:size-10" aria-label="کپی لینک">
                        <Link2 className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleAddFavorite}
                        disabled={isPending}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-ink-muted transition hover:border-danger/40 hover:text-danger disabled:opacity-50 xl:size-10 dark:border-white/10"
                        aria-label="علاقه‌مندی"
                    >
                        <Heart className={`size-4 ${data?.isFavorite ? "fill-danger text-danger" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Gallery */}
            <div className="grid w-full gap-3 lg:grid-cols-[1fr_220px] xl:grid-cols-[1fr_260px] xl:gap-4">
                <div className="relative aspect-[16/10] min-h-[240px] overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] sm:min-h-[320px]">
                    <Image
                        src={gallery[activeImage] || houses}
                        alt={data?.title || "property"}
                        fill
                        priority
                        unoptimized
                        className="object-cover transition-opacity duration-300"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="flex h-auto gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/70 [&::-webkit-scrollbar-track]:bg-transparent lg:h-145 lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0">
                    {gallery.map((src, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImage(index)}
                            className={`relative aspect-[4/3] h-20 w-28 shrink-0 overflow-hidden rounded-2xl border-2 transition lg:h-auto lg:min-h-[72px] lg:w-full ${
                                activeImage === index
                                    ? "border-brand shadow-md shadow-brand/20"
                                    : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                        >
                            <Image src={src} alt="" fill unoptimized className="object-cover" sizes="120px" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Main layout */}
            <div className='grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-8'>
                <div className="flex min-w-0 flex-col gap-6">
                    <section className="surface-card p-5 sm:p-6 xl:p-8">
                        <h2 className="mb-3 text-lg font-extrabold text-ink sm:text-xl dark:text-white">
                            چرا {data?.title || "این ملک"} رو انتخاب کنیم؟
                        </h2>
                        <p className="text-sm leading-8 text-ink-muted sm:text-base sm:leading-9 dark:text-white/70">
                            {data?.caption ||
                                "این اقامتگاه با امکانات کامل و موقعیت عالی، گزینه‌ای مطمئن برای اجاره کوتاه‌مدت یا بلندمدت است. فضای دلنشین، دسترسی مناسب و خدمات پشتیبانی، تجربه‌ای آرامش‌بخش برای شما می‌سازد."}
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image src={house1} alt="" fill className="object-cover" unoptimized />
                            </div>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image src={house2} alt="" fill className="object-cover" unoptimized />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-3 text-base font-extrabold text-ink dark:text-white">امکانات ملک</h3>
                        <FacilitiesRent
                            bathrooms={data?.bathrooms}
                            parking={data?.parking}
                            rooms={data?.rooms}
                            capacity={data?.capacity}
                        />
                    </section>

                    <ReserveComments id={id} />
                </div>

                <aside className='flex w-full flex-col gap-4 xl:sticky xl:top-24'>
                    <RentForm id={id} price={data?.price} discount={data?.discounted_price} />
                    <Appointments id={id} />
                </aside>
            </div>

            {/* Similar */}
            <section className="mt-4 flex w-full flex-col gap-4">
                <h3 className="section-title text-xl md:text-2xl xl:text-3xl">ملک‌های مشابه</h3>
                <div className="cards-grid flex flex-row flex-wrap justify-center items-center gap-6">
                    {slides.slice(0, 3).map((item, index) => (
                        <Card value={item} key={item.id ?? index} detailPath="rent" />
                    ))}
                </div>
            </section>

            {/* Maintenance modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-lift)] dark:border-white/10">
                        <h2 className="mb-2 text-xl font-extrabold text-ink dark:text-white">ثبت گزارش خرابی</h2>
                        <p className="mb-4 text-sm text-ink-muted">
                            جزئیات خرابی مشاهده‌شده در «{data?.title}» را بنویسید.
                        </p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="field-input h-32 resize-none rounded-2xl"
                            placeholder="مثلاً: شیر آب آشپزخانه چکه می‌کند..."
                        />
                        <div className="mt-5 flex gap-2.5">
                            <button
                                type="button"
                                onClick={handleMaintenanceSubmit}
                                disabled={isMaintenanceLoading}
                                className="flex-1 rounded-full bg-deal py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                            >
                                {isMaintenanceLoading ? "در حال ارسال..." : "ارسال گزارش"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 rounded-full bg-muted py-3 text-sm font-bold text-ink transition hover:bg-muted/80 dark:text-white"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RentDetail
