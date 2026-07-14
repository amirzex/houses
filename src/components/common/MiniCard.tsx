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
        <div className='flex h-full w-full flex-row-reverse items-center justify-center gap-2 rounded-3xl border border-border/60 bg-muted p-1.5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] dark:border-white/5 dark:bg-[#2a3340]'>
            <div className='relative h-full min-h-24 w-[35%] overflow-hidden rounded-2xl'>
                <Image
                    src={minicard}
                    alt={value.area_name}
                    fill
                    className='object-cover'
                />
            </div>
            <div className='flex w-[65%] flex-col items-end gap-1.5 py-2 pr-2'>
                <p className='w-full text-right text-base font-bold text-ink dark:text-white'>{value.area_name}</p>
                <span className='flex w-full flex-row-reverse items-center justify-start gap-1 text-sm text-ink-muted'>
                    {value.id}
                    <p>مورد</p>
                </span>
                <Link
                    href={"/"}
                    className='mt-auto flex w-full flex-row items-center justify-start'
                >
                    <Image
                        src={arrow}
                        alt='next'
                        className="size-8"
                    />
                </Link>
            </div>
        </div>
    )
}

export default MiniCard
