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
        <div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'>
            {data.map((item, index) => (
                <div key={index} className='flex flex-row-reverse items-center gap-2 rounded-3xl border-2 p-2.5 sm:gap-3 sm:p-3'>
                    <div className='flex shrink-0 items-center justify-center'>
                        <Image
                            width={40}
                            height={40}
                            src={item.icon}
                            alt={item.title}
                            className='size-8 sm:size-10'
                            unoptimized
                        />
                    </div>
                    <div className='flex min-w-0 flex-1 flex-col gap-0.5 text-right'>
                        <p className='truncate text-sm font-bold sm:text-base'>{item.title}</p>
                        <p className='text-sm text-ink-muted'>{item.count}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default IconHolder
