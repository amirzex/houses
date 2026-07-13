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
}

const Card: FC<CardProps> = ({ value }) => {
    const price = Number(value.price)
    const discounted = Number(value.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null

    return (
        <Link href={`rent/${value.id}`} className='flex flex-col mt-15 w-[31.5%] max-sm:w-full max-sm:h-100 bg-white dark:bg-[#272727] rounded-3xl overflow-hidden border dark:border-none border-gray-200 shadow-sm mx-auto font-sans'>
            {/* image holder */}
            <div className='relative h-80 w-full overflow-hidden'>
                <Image
                    src={value.photos?.[0] || picture}
                    fill
                    alt="landing background"
                    className="object-cover"
                    unoptimized
                />

                {/* Top Right Badges */}
                <div className='absolute top-3 right-3 flex gap-2'>
                    <div className='bg-[#FF4D4D] text-white px-4 py-3  rounded-full text-2xl max-sm:px-2 max-sm:py-0 max-sm:h-10 max-sm:text-sm font-bold flex items-center justify-center shadow-md'>
                        %{discountPercent}
                    </div>
                    <div className='bg-[#1E3A8A] text-white px-3 py-3 rounded-full text-2xl max-sm:text-sm max-sm:h-10 font-bold flex flex-row-reverse items-center justify-center gap-3 shadow-md'>
                        <span >{value.rate}</span>
                        <Image src={star} alt='star' unoptimized />
                    </div>
                </div>

                {/* Location Overlay */}
                <div className=' w-full absolute bottom-3 right-3 flex flex-row-reverse gap-1 justify-start items-center text-white drop-shadow-md'>
                    <Image
                        src={loc}
                        width={20}
                        height={20}
                        alt="location"
                        className="object-contain w-[5%] text-white"
                        unoptimized
                    />
                    <p className='text-2xl max-sm:text-sm font-medium'>{value.address || "خیابان 404 بروکلین کالیفرنیا نیویورک"}</p>
                </div>
            </div>

            {/* card info */}
            <div className='flex flex-col p-5 gap-6'>

                {/* Title */}
                <div className='flex dark:text-blue-600/90 flex-row-reverse justify-start items-center text-3xl max-sm:text-xl font-extrabold text-gray-800 w-full'>
                    <p>{value.title || "خانه ویلایی با پارکینگ اختصاصی"}</p>
                </div>

                {/* Amenities */}
                <div className='w-full flex text-2xl max-sm:text-xs flex-row-reverse justify-between items-center  text-gray-500 font-medium'>
                    <div className='flex flex-row-reverse gap-1 justify-center items-center'>
                        <Image src={bed} width={20} height={20} alt="bed" unoptimized />
                        <span>{value.rooms || "3"}</span>
                        <p>خواب</p>
                    </div>
                    <div className='flex flex-row-reverse gap-1 justify-center items-center'>
                        <Image src={bath} width={20} height={20} alt="bath" unoptimized />
                        <span>{value.bathrooms || "3"}</span>
                        <p>حمام</p>
                    </div>
                    <div className='flex flex-row-reverse gap-1 justify-center items-center'>
                        <Image src={count} width={20} height={20} alt="guests" unoptimized />
                        <span>{value.num_comments || "3"}</span>
                        <p>نفر</p>
                    </div>
                    <div className='flex flex-row-reverse gap-1 justify-center items-center'>
                        <Image src={car} width={20} height={20} alt="parking" unoptimized />
                        <span>{value.parking || "1"}</span>
                        <p>پارکینگ</p>
                    </div>
                </div>

                {/* Pricing Area */}
                <div className='bg-[#F3F4F6] dark:bg-[#353535] rounded-2xl flex flex-row-reverse justify-center items-center py-5 px-4 mt-2'>
                    {value.price && (
                        <>
                            <span className='flex flex-row-reverse justify-center items-center text-2xl max-sm:text-xs text-[#EF4444] line-through ml-2 font-medium'>
                                {Number(value.price ).toLocaleString("fa-IR") }
                                <span className='mr-1'>تومان</span>
                            </span>
                            <div className='w-[1px] h-4 bg-gray-300 mx-2'></div>
                        </>
                    )}
                    <span className='flex flex-row-reverse justify-center  dark:text-white items-center text-2xl max-sm:text-xs font-bold text-black gap-1'>
                        {Number(value.discounted_price ? value.discounted_price : "2500000000").toLocaleString("fa-IR")}
                        <span className='text-3xl font-normal ml-1 max-sm:text-xs'>ت</span> /
                        <span className='text-xl max-sm:text-xs text-gray-500 font-normal dark:text-gray-200'> هر شب</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Card
