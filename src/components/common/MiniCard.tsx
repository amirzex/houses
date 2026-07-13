import Image from 'next/image'
import minicard from '../../assets/landing/minicard.jpg'
import arrow from '../../assets/landing/Group 4.svg'
import Link from 'next/link'
import { FC } from 'react'
import { ILocation } from '@/core/types/ILocation'

interface MiniCardProps {
    value: ILocation
}

const MiniCard: FC<MiniCardProps> = ({ value }) => {
    return (
        <div className=' w-full h-full flex flex-row-reverse justify-center bg-gray-200 rounded-4xl p-1'>
            {/* img holder */}
            <div className='w-[35%] rounded-4xl overflow-hidden'>
                <Image
                    src={minicard}
                    alt='next'
                    // width={20}
                    // height={20}
                    className='border-2 w-full h-full rounded-4xl'
                />
            </div>
            {/* card info */}
            <div className='w-[65%] flex flex-col gap-3 items-end pr-2'>
                {/* <p className='w-full text-right text-xl'>اجاره ویلا در رامسر</p> */}
                <p className='w-full text-xl text-right '>{value.area_name}</p>
                <span className='w-full flex flex-row-reverse items-center justify-start gap-1 text-gray-400'>
                    {value.id}
                    <p>مورد</p>
                </span>
                <div className='w-full h-6'></div>
                <Link
                    href={"/"}
                    className='flex flex-row w-full '
                >
                    <Image
                        src={arrow}
                        alt='next'
                        width={20}
                        height={20}
                        className='border-2 w-[20%] h-5'
                    />
                    <p className='w-[80%] text-right'>مشاهده</p>
                </Link>
            </div>
        </div>
    )
}

export default MiniCard