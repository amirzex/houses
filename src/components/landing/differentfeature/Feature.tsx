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
        return (
            <div className="section-wrap py-20 text-center text-ink-muted">
                در حال بارگزاری ...
            </div>
        );
    }

    const comments = data?.comments ?? [];

    return (
        <>
            <section dir="rtl" className='relative mt-12 block w-full overflow-hidden bg-brand py-10 md:hidden'>
                <div className='section-wrap'>
                    <div className='flex flex-col gap-5 text-right text-white'>
                        <p className="text-sm font-bold tracking-wide text-white/70">نظرات کاربران</p>
                        <h2 className='text-2xl font-extrabold leading-snug'>
                            رضایت شما اعتبار ماست
                        </h2>
                        <p className='text-sm leading-7 text-white/85'>
                            پیدا کردن ویلای مناسب همیشه کار راحتی نیست. ما اینجاییم تا همه چیز را برای شما ساده کنیم.
                        </p>
                    </div>
                    <div className='mt-6 flex flex-col gap-4'>
                        {comments.map((comment, index) => (
                            <CommentCard key={comment.id ?? index} value={comment} />
                        ))}
                    </div>
                </div>
            </section>

            <section dir="rtl" className='relative mt-12 hidden min-h-[560px] w-full items-center overflow-hidden py-12 md:mt-16 md:flex xl:mt-24 xl:min-h-[80vh] xl:py-20' >

                <div className='absolute inset-0 -z-10'>
                    <Image
                        src={feature}
                        alt='background'
                        fill
                        className='object-cover object-center'
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/35 to-black/20" />
                </div>

                <div className='section-wrap'>
                    <div className='flex flex-col items-center gap-12 lg:flex-row lg:gap-16'>

                        <div className='flex w-full flex-col gap-5 text-right text-white lg:w-1/2'>
                            <p className="text-sm font-bold tracking-wide text-white/70">نظرات کاربران</p>
                            <h2 className='text-3xl font-extrabold leading-snug drop-shadow-md sm:text-4xl lg:text-5xl'>
                                رضایت شما اعتبار ماست
                            </h2>
                            <p className='max-w-xl text-sm leading-8 text-white/85 sm:text-base sm:leading-9'>
                                پیدا کردن ویلای مناسب همیشه کار راحتی نیست. ما اینجاییم تا همه چیز را برای شما ساده کنیم و تجربه‌ای مطمئن بسازیم.
                            </p>
                        </div>

                        <div className='relative flex w-full justify-center lg:w-1/2 lg:justify-end'>
                            <div className='h-[min(620px,70dvh)] w-full max-w-[400px] overflow-x-hidden overflow-y-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                                <div className='flex flex-col gap-5'>
                                    {comments.map((comment, index) => (
                                        <CommentCard key={comment.id ?? index} value={comment} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Feature;
