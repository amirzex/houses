"use client"
import React, { FC } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import clock from '../../assets/details/Clock01Icon.svg'
import calende from '../../assets/details/calendar-03.svg'
import copy from '../../assets/details/Only-IconButton.svg'
import shair from '../../assets/reserve/Only-IconButton.svg'
import bg from '../../assets/details/blogsbg.jpg'
import arrow from '../../assets/details/arrow-left.svg'
import Image from 'next/image';
import { useGetBlog, useGetBlogById } from '@/core/api/blog/queries'
import Link from 'next/link'
import BlogSwiper from './BlogSwiper'

interface BlogDetailProps {
  id: string
}

const BlogDetail: FC<BlogDetailProps> = ({ id }) => {

  const { data } = useGetBlogById(id)
  const { data: swiperData, isLoading, error } = useGetBlog();
  const formatDate = (date) => {
    const d = new Date(date);

    const day = d.toLocaleDateString("fa-IR", { day: "numeric" });
    const month = d.toLocaleDateString("fa-IR", { month: "long" });
    const year = d.toLocaleDateString("fa-IR", { year: "numeric" });
    const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

    return `${day} ${month} - ${year} / ${time}`;
  };

  return (
    <div className='page-shell flex w-full min-w-0 flex-col items-center justify-center pb-8' dir='rtl'>

      <Breadcrumb />
      <div className='flex w-full min-w-0 flex-col items-center justify-center gap-3'>
        <div className='flex w-full min-w-0 flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between sm:px-0'>
          <h1 className='min-w-0 text-right text-xl font-bold leading-snug sm:text-2xl md:text-3xl'>
            {data?.title}
          </h1>
          <div className='flex shrink-0 items-center justify-start sm:justify-end'>
            <div className='flex flex-row-reverse items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm text-white sm:px-5'>
              <Image src={clock} alt='' unoptimized className="size-4" />
              <span>{data?.estimated_reading_time}</span>
            </div>
          </div>
        </div>

        <div className='flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-0 items-center justify-start gap-1.5 text-sm text-gray-400 sm:text-base md:text-xl'>
            <Image src={calende} alt='' unoptimized className="size-4 shrink-0 sm:size-5" />
            <span className="truncate">{formatDate(data?.created_at)}</span>
          </div>
          <div className='flex shrink-0 items-center justify-start gap-2 sm:justify-end'>
            <Image src={shair} alt='' unoptimized className="size-5" />
            <Image src={copy} alt='' unoptimized className="size-5" />
          </div>
        </div>
      </div>

      <div className='mt-5 w-full overflow-hidden rounded-3xl sm:rounded-4xl'>
        <Image src={bg} alt='backgraound' unoptimized className='h-48 w-full object-cover sm:h-64 md:h-80 lg:h-150' />
      </div>

      <div className='mt-5 flex w-full flex-col items-center justify-center gap-8 sm:gap-10'>

        <div className='flex w-full flex-col items-center justify-center gap-4 sm:gap-5'>
          <h2 className='w-full text-right text-lg font-bold text-gray-500 sm:text-2xl md:text-3xl'> بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟ </h2>
          <p className='text-sm leading-7 text-gray-400 sm:text-base sm:leading-8 md:text-xl md:leading-9'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون
            و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ط
            راحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
            از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .
          </p>
        </div>

        <div className='flex w-full flex-col items-center justify-center gap-4 sm:gap-5'>
          <h2 className='w-full text-right text-lg font-bold text-gray-500 sm:text-2xl md:text-3xl'> بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟ </h2>
          <p className='text-sm leading-7 text-gray-400 sm:text-base sm:leading-8 md:text-xl md:leading-9'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون
            و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ط
            راحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
            از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .
          </p>
        </div>
      </div>

      <div className='flex w-full min-w-0 flex-col items-center justify-center gap-6 p-4 sm:gap-10 sm:p-6 md:p-10'>
        <div className='flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-xl font-bold sm:text-2xl'> مقالات مشابه </h2>
          <Link href='/blogs' className='inline-flex w-full flex-row-reverse items-center justify-center gap-2 rounded-full border border-brand px-4 py-3 text-sm text-brand sm:w-auto sm:px-5'>
            <Image src={arrow} alt='arrow' unoptimized className="size-4" />
            مشاهده همه
          </Link>
        </div>

        <div className='w-full min-w-0 overflow-hidden'>
            {isLoading && <p>در حال بارگذاری مقالات...</p>}
            {error && <p>خطا در دریافت اطلاعات.</p>}
            {swiperData?.data && <BlogSwiper blogData={swiperData.data} />}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
