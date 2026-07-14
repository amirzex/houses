"use client"
import Image from 'next/image'
import picture from '../../assets/landing/card.jpg'
import loc from '../../assets/landing/location.svg'
import bath from '../../assets/landing/bath.svg'
import bed from '../../assets/landing/bed.svg'
import count from '../../assets/landing/count.svg'
import car from '../../assets/landing/car.svg'
import star from '../../assets/landing/start.svg'
import { IData } from '@/core/types/IData'
import { FC } from 'react'
import Link from 'next/link'

interface CardProps {
    value: IData
    detailPath?: "rent" | "fast-reserve"
}

const Card: FC<CardProps> = ({ value, detailPath = "rent" }) => {
    const price = Number(value.price)
    const discounted = Number(value.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null

    return (
        <Link
            href={`/${detailPath}/${value.id}`}
            className='surface-card group flex w-full min-w-0 max-w-full flex-col font-sans sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]'
        >
            <div className='relative h-48 w-full overflow-hidden sm:h-56 xl:h-64'>
                <Image
                    src={value.photos?.[0] || picture}
                    fill
                    alt={value.title || "property"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className='absolute top-3 right-3 flex gap-2'>
                    {discountPercent != null && (
                        <div className='flex h-9 items-center justify-center rounded-full bg-danger px-3 text-sm font-bold text-white shadow-md sm:h-10 sm:px-3.5 sm:text-base'>
                            %{discountPercent.toLocaleString("fa-IR")}
                        </div>
                    )}
                    <div className='flex h-9 flex-row-reverse items-center justify-center gap-1.5 rounded-full bg-brand px-3 text-sm font-bold text-white shadow-md sm:h-10 sm:gap-2 sm:text-base'>
                        <span>{value.rate}</span>
                        <Image src={star} alt='star' unoptimized className="size-4" />
                    </div>
                </div>

                <div className='absolute bottom-3 right-3 left-3 flex flex-row-reverse items-center justify-start gap-1.5 text-white drop-shadow-md'>
                    <Image
                        src={loc}
                        width={16}
                        height={16}
                        alt="location"
                        className="size-4 shrink-0 object-contain brightness-0 invert"
                        unoptimized
                    />
                    <p className='truncate text-xs font-medium sm:text-sm'>{value.address || "خیابان 404 بروکلین کالیفرنیا نیویورک"}</p>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-4 sm:gap-5 sm:p-5'>
                <h3 className='line-clamp-2 text-right text-lg font-extrabold leading-snug text-ink sm:text-xl dark:text-white'>
                    {value.title || "خانه ویلایی با پارکینگ اختصاصی"}
                </h3>

                <div className='grid w-full grid-cols-4 gap-2 text-[11px] font-medium text-ink-muted sm:text-xs'>
                    <div className='flex flex-row-reverse items-center justify-center gap-1'>
                        <Image src={bed} width={16} height={16} alt="bed" unoptimized className="size-4" />
                        <span>{value.rooms || "3"}</span>
                        <span>خواب</span>
                    </div>
                    <div className='flex flex-row-reverse items-center justify-center gap-1'>
                        <Image src={bath} width={16} height={16} alt="bath" unoptimized className="size-4" />
                        <span>{value.bathrooms || "3"}</span>
                        <span>حمام</span>
                    </div>
                    <div className='flex flex-row-reverse items-center justify-center gap-1'>
                        <Image src={count} width={16} height={16} alt="guests" unoptimized className="size-4" />
                        <span>{value.num_comments || "3"}</span>
                        <span>نفر</span>
                    </div>
                    <div className='flex flex-row-reverse items-center justify-center gap-1'>
                        <Image src={car} width={16} height={16} alt="parking" unoptimized className="size-4" />
                        <span>{value.parking || "1"}</span>
                        <span>پارک</span>
                    </div>
                </div>

                <div className='mt-1 flex flex-row-reverse items-center justify-center gap-2 rounded-2xl bg-muted px-3 py-3.5 dark:bg-[#2a3340]'>
                    {value.price && discountPercent != null && (
                        <>
                            <span className='flex flex-row-reverse items-center text-xs font-medium text-danger line-through sm:text-sm'>
                                {Number(value.price).toLocaleString("fa-IR")}
                                <span className='mr-1'>تومان</span>
                            </span>
                            <div className='mx-1 h-4 w-px bg-border' />
                        </>
                    )}
                    <span className='flex flex-row-reverse items-center gap-1 text-sm font-bold text-ink sm:text-base dark:text-white'>
                        {Number(value.discounted_price ? value.discounted_price : value.price || 2500000000).toLocaleString("fa-IR")}
                        <span className='text-xs font-normal text-ink-muted sm:text-sm'>تومان</span>
                        <span className='text-xs font-normal text-ink-muted'>/ هر شب</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Card
