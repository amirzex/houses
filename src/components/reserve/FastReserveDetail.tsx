"use client"
import React, { FC, useMemo, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { slides } from '../landing/suggestion/Suggestion';
import Image from 'next/image';
import houses from '../../assets/reserve/Frame 14333.png'
import house1 from '../../assets/reserve/image 2.svg'
import house2 from '../../assets/reserve/image 3.svg'
import ReserveComments from './ReserveComments';
import ReservationForm from './ReserveForm';
import Facilities from './Facilities';
import Card from '../common/Card';
import { useHouseById } from '@/core/api/houses/queries';
import Appointments from '../common/Appointments';
import toast from 'react-hot-toast';
import { Share2, Link2, Star, MapPin, Heart } from 'lucide-react'
import { useAddFavorite } from '@/core/api/favorites/queries';

interface IProps {
  id: string;
}

const FastReserveDetail: FC<IProps> = ({ id }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { data, isLoading } = useHouseById(id)
  const { mutate: addFavorite, isPending } = useAddFavorite();

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
      /* cancelled */
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    toast.success("لینک کپی شد")
  }

  if (isLoading) {
    return (
      <div className="section-wrap flex min-h-[50vh] items-center justify-center pt-24 text-ink-muted">
        در حال بارگذاری جزئیات اقامتگاه...
      </div>
    )
  }

  return (
    <div className='section-wrap flex w-full flex-col gap-6 pb-12  sm:gap-8 ' dir='rtl'>
      <Breadcrumb />

      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className='text-xl font-extrabold leading-snug text-ink sm:text-2xl xl:text-3xl dark:text-white'>
              {data?.title || "جزئیات اقامتگاه"}
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
            <span>{data?.address || "آدرس ثبت نشده"}</span>
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
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

      <div className="grid w-full gap-3 lg:grid-cols-[1fr_220px] xl:grid-cols-[1fr_260px] xl:gap-4">
        <div className="relative aspect-[16/10] min-h-[240px] overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] sm:min-h-[320px]">
          <Image
            src={gallery[activeImage] || houses}
            alt={data?.title || "property"}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {data?.discounted_price && Number(data.discounted_price) < Number(data.price) && (
            <span className="absolute top-3 right-3 rounded-full bg-deal px-3 py-1.5 text-xs font-bold text-white shadow-md">
              تخفیف ویژه
            </span>
          )}
        </div>
        <div className="flex h-auto gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/70 [&::-webkit-scrollbar-track]:bg-transparent lg:h-145 lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0">
          {gallery.map((src, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`relative aspect-[4/3] h-10 w-28 shrink-0 overflow-hidden rounded-2xl border-2 transition lg:h-auto lg:min-h-[72px] lg:w-full ${
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

      <div className='grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-8'>
        <div className="flex min-w-0 flex-col gap-6">
          <section className="surface-card p-5 sm:p-6 xl:p-8">
            <h2 className="mb-3 text-lg font-extrabold text-ink sm:text-xl dark:text-white">
              چرا {data?.title || "این اقامتگاه"} رو انتخاب کنیم؟
            </h2>
            <p className="text-sm leading-8 text-ink-muted sm:text-base sm:leading-9 dark:text-white/70">
              {data?.caption ||
                "اقامتگاهی ایده‌آل برای رزرو سریع با امکاناتی کامل، فضای دلنشین و دسترسی آسان. مناسب سفرهای خانوادگی و اقامت کوتاه‌مدت با تجربه‌ای راحت و مطمئن."}
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

          <ReserveComments id={id} />
        </div>

        <aside className='flex w-full flex-col gap-4 xl:sticky xl:top-24'>
          <ReservationForm data={data} />
          <Facilities
            bathrooms={data?.bathrooms}
            parking={data?.parking}
            rooms={data?.rooms}
            capacity={data?.capacity}
          />
          <Appointments id={id} />
        </aside>
      </div>

      <section className="mt-4 flex w-full flex-col gap-4">
        <h3 className="section-title text-xl md:text-2xl xl:text-3xl">اقامتگاه‌های مشابه</h3>
        <div className="cards-grid flex flex-row flex-wrap justify-center items-center gap-6">
          {slides.slice(0, 3).map((item, index) => (
            <Card value={item} key={item.id ?? index} detailPath="fast-reserve" />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FastReserveDetail
