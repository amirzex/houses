"use client"
import Image from 'next/image'
import feature from '../../../assets/landing/commentsbg.svg'
import CommentCard from '@/components/common/CommentCard';
import { useGetAllComments } from "@/core/api/comments/queries";

const Feature = () => {

    const { data, isLoading } = useGetAllComments({
        page: 1,
        limit: 10,
        sort: "created_at",
        order: "DESC"
    });

    if (isLoading) {
        return <div> در حال بارگزاری ... </div>;
    }

    return (
        <section dir="rtl" className='relative w-full min-h-screen py-20  mt-30  flex items-center overflow-hidden max-sm:hidden md:block' >

            <div className='absolute inset-0 -z-10'>
                <Image
                    src={feature}
                    alt='background'
                    fill
                    className='object-cover object-center'
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className='container mx-auto px-4 sm:px-6 lg:px-12 '>
                <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>

                    <div className='lg:w-1/2 w-full text-white flex flex-col gap-6 text-right'>
                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md'>
                            رضایت شما اعتبار ماست
                        </h2>
                        <p className='text-sm sm:text-base leading-8 sm:leading-[2.5rem] text-gray-100 font-medium drop-shadow'>
                            پیدا کردن ویلای مناسب همیشه کار راحتی نیست. ما اینجاییم تا همه چیز رو برای شما ساده کنیم. ...
                        </p>
                    </div>

                    <div className='lg:w-1/2 w-full relative flex justify-center lg:justify-end'>

                        <div className='w-full max-w-[420px] h-[700px] overflow-y-auto overflow-x-hidden py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                            <div className='flex flex-col gap-8'>
                                {data?.comments?.map((comment, index) => (
                                    <CommentCard key={index} value={comment} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Feature;
