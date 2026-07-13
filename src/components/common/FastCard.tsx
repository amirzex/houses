import img from '../../assets/landing/card.jpg'
import bed from '../../assets/reserve/BedIcon.svg'
import bath from '../../assets/landing/bath.svg'
import user from '../../assets/reserve/user.svg'
import park from '../../assets/reserve/CarParking02Icon.svg'
import Link from 'next/link'
import arrowleft from '../../assets/landing/arrowleft.svg'
import start from '../../assets/landing/start.svg'
import loca from '../../assets/landing/location.svg'
import Image from 'next/image'
import { IData } from '@/core/types/IData'
import { FC } from 'react'

interface CardProps {
    value: IData
}


const FastCard: FC<CardProps> = ({ item }) => {

    const price = Number(item.price)
    const discounted = Number(item.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null
    return (
        <div>
            <div className='w-full dark:bg-[#272727] flex flex-row justify-center items-center gap-5 border rounded-3xl p-5'>
                <div className='w-[30%] h-70'>
                    <Image src={img} alt='' unoptimized className='w-full h-full rounded-2xl ' />
                </div>
                <div className='w-[70%] flex flex-col justify-center items-start gap-3 '>
                    <div className='w-full text-4xl'>{item?.title}</div>
                    <div className='flex flex-row justify-center gap-5'>
                        <div className='bg-blue-900 px-5 py-2  rounded-full text-white flex flex-row-reverse justify-center items-center gap-1'>
                            <Image src={start} alt='' unoptimized />
                            <p>ستاره</p>
                            {item?.rate}
                        </div>
                        <div className='bg-[#FF4D4D] text-white w-12 h-12 rounded-full text-sm max-sm:px-2 max-sm:py-0 max-sm:h-10 max-sm:text-sm font-bold flex items-center justify-center shadow-md'>
                            %{discountPercent}
                        </div>
                    </div>
                    <div className='w-full flex flex-row justify-start items-center text-gray-500 text-xl gap-3'>
                        <Image src={loca} alt='' unoptimized />
                        {item?.address}
                    </div>
                    <div className='w-full flex flex-row justify-start items-center gap-5'>
                        <div className='w-[15%] flex flex-row justify-start gap-1 text-xl text-gray-500 items-center'>
                            <Image src={bed} alt='' unoptimized className='w-6 ' />
                            <div>{item?.rooms}</div>
                            <p>خواب</p>

                        </div>
                        <div className='w-[15%] flex flex-row justify-start text-gray-500 gap-1 text-xl items-center'>
                            <Image src={bath} alt='' unoptimized className='w-6' />
                            <div>{item?.bathrooms}</div>
                            <p>حمام</p>

                        </div>
                        <div className='w-[15%] flex flex-row justify-start text-xl text-gray-500 gap-1 items-center'>
                            <Image src={user} alt='' unoptimized className='w-6' />
                            <div>{item?.capacity}</div>
                            <p>نفر</p>
                        </div>
                        <div className='w-[15%] flex flex-row justify-start text-xl text-gray-500 gap-1 items-center'>
                            <Image src={park} alt='' unoptimized className='w-6' />
                            <div>{item?.parking}</div>
                            <p>پارکینگ</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-row gap-10'>
                        <div className='w-[80%] bg-gray-200 dark:bg-[#353535] flex flex-row justify-center items-center p-3 rounded-full'>
                            {!item.discounted_price && (
                                <p className='w-[40%] text-gray-400 text-2xl'>اجاره ماهانه</p>
                            )}

                            <div className='w-full flex flex-row-reverse text-2xl justify-center items-center gap-3'>
                                <p className='text-gray-400 text-xl'>هر شب</p>

                                <div className='flex flex-row-reverse gap-2'>
                                    {item.discounted_price ? (
                                        <>
                                            <span>{Number(item.discounted_price).toLocaleString("fa-IR")}</span> /
                                            <span className='line-through text-red-500'>
                                                {Number(item.price).toLocaleString("fa-IR")}
                                            </span>
                                        </>
                                    ) : (
                                        <span>{Number(item.price).toLocaleString("fa-IR")}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='w-[20%] flex flex-row-reverse justify-end items-center'>
                            <Image src={arrowleft} alt='' unoptimized />
                            <Link href={`FastReserve/${item.id}`} className='text-blue-900'> مشاهده جزییات </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FastCard