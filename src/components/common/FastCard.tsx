import img from '../../assets/landing/card.jpg'
import bed from '../../assets/reserve/BedIcon.svg'
import bath from '../../assets/landing/bath.svg'
import user from '../../assets/reserve/user.svg'
import park from '../../assets/reserve/CarParking02Icon.svg'
import Link from 'next/link'
import start from '../../assets/landing/start.svg'
import loca from '../../assets/landing/location.svg'
import Image from 'next/image'
import { IData } from '@/core/types/IData'
import { FC } from 'react'
import { ChevronLeft } from 'lucide-react'

interface FastCardProps {
    item: IData
}

const FastCard: FC<FastCardProps> = ({ item }) => {

    const price = Number(item.price)
    const discounted = Number(item.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null
    return (
        <div className='surface-card flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5'>
            <div className='relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-[32%]'>
                <Image src={item.photos?.[0] || img} alt={item?.title || ''} fill unoptimized className='object-cover' />
            </div>
            <div className='flex w-full flex-col items-stretch gap-3 sm:w-[68%]'>
                <h3 className='text-right text-xl font-extrabold text-ink sm:text-2xl dark:text-white'>{item?.title}</h3>
                <div className='flex flex-row-reverse flex-wrap items-center justify-start gap-2'>
                    <div className='flex flex-row-reverse items-center justify-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-sm text-white'>
                        <Image src={start} alt='' unoptimized className="size-4" />
                        <span>ستاره</span>
                        <span>{item?.rate}</span>
                    </div>
                    {discountPercent != null && (
                        <div className='flex size-10 items-center justify-center rounded-full bg-danger text-xs font-bold text-white shadow-md'>
                            %{discountPercent.toLocaleString("fa-IR")}
                        </div>
                    )}
                </div>
                <div className='flex flex-row-reverse items-center justify-start gap-2 text-sm text-ink-muted'>
                    <Image src={loca} alt='' unoptimized className="size-4" />
                    <span className="truncate">{item?.address}</span>
                </div>
                <div className='flex flex-row-reverse flex-wrap items-center justify-start gap-4 text-sm text-ink-muted'>
                    <div className='flex flex-row-reverse items-center gap-1'>
                        <Image src={bed} alt='' unoptimized className='size-5' />
                        <span>{item?.rooms}</span>
                        <span>خواب</span>
                    </div>
                    <div className='flex flex-row-reverse items-center gap-1'>
                        <Image src={bath} alt='' unoptimized className='size-5' />
                        <span>{item?.bathrooms}</span>
                        <span>حمام</span>
                    </div>
                    <div className='flex flex-row-reverse items-center gap-1'>
                        <Image src={user} alt='' unoptimized className='size-5' />
                        <span>{item?.capacity}</span>
                        <span>نفر</span>
                    </div>
                    <div className='flex flex-row-reverse items-center gap-1'>
                        <Image src={park} alt='' unoptimized className='size-5' />
                        <span>{item?.parking}</span>
                        <span>پارکینگ</span>
                    </div>
                </div>
                <div className='mt-1 flex flex-col gap-3 sm:flex-row sm:items-center'>
                    <div className='flex flex-1 flex-row-reverse items-center justify-center gap-2 rounded-2xl bg-muted px-4 py-3 dark:bg-[#2a3340]'>
                        {!item.discounted_price && (
                            <p className='text-sm text-ink-muted'>اجاره ماهانه</p>
                        )}
                        <div className='flex flex-row-reverse items-center gap-2 text-sm font-bold sm:text-base'>
                            <span className='text-xs font-normal text-ink-muted sm:text-sm'>هر شب</span>
                            {item.discounted_price ? (
                                <>
                                    <span>{Number(item.discounted_price).toLocaleString("fa-IR")}</span>
                                    <span className='text-danger line-through font-medium'>
                                        {Number(item.price).toLocaleString("fa-IR")}
                                    </span>
                                </>
                            ) : (
                                <span>{Number(item.price).toLocaleString("fa-IR")}</span>
                            )}
                        </div>
                    </div>

                    <Link
                        href={`/fast-reserve/${item.id}`}
                        className='btn-outline-brand shrink-0 gap-1'
                    >
                        مشاهده جزییات
                        <ChevronLeft size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FastCard
