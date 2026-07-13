"use client"
import Image from 'next/image'
import bath from '../../assets/landing/bath.svg'
import car from '../../assets/landing/car.svg'
import bed from '../../assets/landing/bed.svg'
import yard from '../../assets/landing/count.svg'

const IconHolder = ({ items }) => {

    const data = [
        {
            id: 1, title: 'دستشویی', count: items.bathrooms, icon: bath },
        { id: 2, title: 'پارکینگ', count: items.parking, icon: car },
        { id: 3, title: 'اتاق', count: items.rooms, icon: bed },
        { id: 4, title: 'حیاط', count: items.num_comments, icon: yard },
    ]

    return (
        <div className='w-full flex flex-row flex-wrap justify-end items-center gap-4'>
            {data.map((item, index) => (
                <div key={index} className='w-[20%] flex flex-row-reverse items-center gap-3 border-2 rounded-4xl p-2'>
                    <div className='w-[20%] flex justify-center items-center '>
                        <Image
                            width={50}
                            height={50}
                            src={item.icon}
                            alt={item.title}
                            className='w-15'
                            unoptimized
                        />
                    </div>
                    <div className='w-[80%] flex flex-col gap-1 text-right '>
                        <p className='text-xl w-full pr-1'>{item.title}</p>
                        <p className='w-full pr-1'>  {item.count} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default IconHolder