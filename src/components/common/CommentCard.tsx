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
        <div dir="rtl" className='bg-[#2A8481] rounded-[2.5rem] w-full flex flex-col p-6 shadow-md text-white font-sans'>

            <div className='w-full flex justify-start mb-2'>
                <Image
                    src={usere}
                    alt='quote'
                    className='w-14 h-auto opacity-80'
                />
            </div>

            <div className='w-full text-right text-sm sm:text-base leading-8 sm:leading-[2.2rem] mb-6 min-h-[120px]'>
                {value.caption}
            </div>

            <div className='bg-[#1E5C5A] rounded-[1.5rem] w-full flex items-center p-4 gap-4 shadow-inner'>

                {/* عکس کاربر */}
                <Image
                    src={user}
                    alt='user'
                    className='w-14 h-14 rounded-2xl object-cover bg-gray-200'
                />

                <div className='flex flex-col flex-1 justify-center gap-2'>
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-sm">{value.id}</p>

                        <div className='flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-lg'>
                            <span className="text-xs font-medium pt-1">{value.rating}</span>
                            <Image
                                src={star}
                                alt="star"
                                className='w-3 h-3'
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-2 text-xs text-gray-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70">
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
