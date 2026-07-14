import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import boom from '../../../../assets/landing/boom.png'
import arrow from '../../../../assets/landing/Frame.svg'
import apartment from '../../../../assets/landing/apartment.jpg'
import kolbe from '../../../../assets/landing/kolbe.jpg'
import beech from '../../../../assets/landing/beech.png'
import pool from '../../../../assets/landing/pool.jpg'
import villa from '../../../../assets/landing/villa.png'

const items = [
    { src: boom, label: 'بوم گردی' },
    { src: kolbe, label: 'ملک کلبه' },
    { src: beech, label: 'ملک ساحلی' },
    { src: villa, label: 'ملک ویلایی' },
    { src: pool, label: 'استخر دار' },
    { src: apartment, label: 'آپارتمان' },
]

const CategoryMobile = () => {
    return (
        <div className='w-full'>
            <div className='flex w-full flex-nowrap items-center justify-start gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                {items.map((item) => (
                    <div
                        key={item.label}
                className='relative h-[22rem] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] sm:w-[55vw] md:h-[24rem] md:w-[42vw] lg:w-[320px]'
                    >
                        <Image
                            src={item.src}
                            fill
                            alt={item.label}
                            className="object-cover brightness-[0.72] transition-all duration-500 hover:scale-110 hover:brightness-100"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        <Link
                            href="/"
                            className='absolute bottom-4 right-3 rounded-full bg-white/95 px-4 py-2 text-center text-base font-bold text-ink shadow-md backdrop-blur-sm'
                        >
                            {item.label}
                        </Link>
                        <Link
                            href="/"
                            className='absolute bottom-4 left-3 flex size-11 items-center justify-center overflow-hidden rounded-full bg-white/95 shadow-md'
                            aria-label={item.label}
                        >
                            <Image
                                src={arrow}
                                width={28}
                                height={28}
                                alt=""
                                className="object-contain"
                                unoptimized
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryMobile
