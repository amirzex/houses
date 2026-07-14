import Image from 'next/image'
import user from '../../assets/landing/commnet.png'
import usere from '../../assets/landing/Group 5,,.svg'
import { FC } from 'react'
import { IComment } from '@/core/types/IComment'
import star from '../../assets/landing/icons8-star-48.png'

interface CommentCardProps {
    value: IComment
}

const CommentCard: FC<CommentCardProps> = ({ value }) => {

    return (
        <div dir="rtl" className='flex w-full flex-col rounded-[1.75rem] bg-accent-teal p-5 text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1'>

            <div className='mb-2 flex w-full justify-start'>
                <Image
                    src={usere}
                    alt='quote'
                    className='h-auto w-12 opacity-70'
                />
            </div>

            <div className='mb-5 min-h-[110px] w-full text-right text-sm leading-8 sm:text-base sm:leading-[2rem]'>
                {value.caption}
            </div>

            <div className='flex w-full items-center gap-3 rounded-2xl bg-black/20 p-3.5 backdrop-blur-sm'>
                <Image
                    src={user}
                    alt='user'
                    className='size-12 rounded-xl object-cover bg-white/10'
                />

                <div className='flex flex-1 flex-col justify-center gap-1.5'>
                    <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-bold">{value.id}</p>

                        <div className='flex items-center gap-1 rounded-lg bg-white/10 px-2 py-0.5'>
                            <span className="pt-0.5 text-xs font-medium">{value.rating}</span>
                            <Image
                                src={star}
                                alt="star"
                                className='size-3'
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-2 text-xs text-white/70'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span>{value.created_at?.slice(0, 10)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
