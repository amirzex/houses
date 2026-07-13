"use client"
import React from 'react'
import Breadcrumb from '../common/Breadcrumb'
import clock from '../../assets/details/Clock01Icon.svg'
import calende from '../../assets/details/calendar-03.svg'
import copy from '../../assets/details/Only-IconButton.svg'
import shair from '../../assets/reserve/Only-IconButton.svg'
import bg from '../../assets/details/blogsbg.jpg'
import arrow from '../../assets/details/arrow-left.svg'
import Image from 'next/image';
import { useGetBlog, useGetBlogById } from '@/core/api/blog/queries'
import BlogCard from '../common/BlogCard'
import Link from 'next/link'
import BlogSwiper from './BlogSwiper'

const BlogDetail = (id) => {

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
    <div className='w-full flex flex-col justify-center items-center' dir='rtl'>

      <Breadcrumb />
      <div className='w-full flex flex-col gap-3 justify-center items-center'>
        <div className='w-full flex flex-row justify-center items-center px-5'>
          <h1 className='w-[50%] flex justify-start items-center text-3xl'>
            {data?.title}
          </h1>
          <div className='w-[50%] flex justify-end items-center '>
            <div className='bg-blue-900 px-5 py-2 w-[15%]  rounded-full text-white flex flex-row-reverse justify-center items-center gap-1'>
              <Image src={clock} alt='' unoptimized />
              <p>
                { }
              </p>
              {data?.estimated_reading_time}
            </div>
          </div>
        </div>

        <div className='w-full flex flex-row justify-center items-center px-5'>
          <h1 className='w-[50%] flex justify-start gap-1 items-center text-gray-400 text-xl'>
            <Image src={calende} alt='' unoptimized />
            {formatDate(data?.created_at)}
          </h1>
          <div className='w-[50%] flex justify-end items-center '>
            <div className=' w-[15%]  flex flex-row-reverse justify-start items-center gap-2'>
              <Image src={shair} alt='' unoptimized />
              <Image src={copy} alt='' unoptimized className='' />
            </div>
          </div>
        </div>
      </div>
      {/* top bg */}
      <div className='w-full mt-5 rounded-4xl overflow-hidden'>
        <Image src={bg} alt='backgraound' unoptimized className='w-full h-150 ' />
      </div>

      {/* text section */}
      <div className='w-full flex flex-col justify-center items-center gap-10 mt-5'>

        {/* first section */}
        <div className='w-full flex flex-col justify-center items-center gap-5'>
          <h2 className='w-full text-right text-gray-500 text-3xl'> بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟ </h2>
          <p className='text-gray-400 text-xl leading-9'>
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
        {/* second section */}
        <div className='w-full flex flex-col justify-center items-center gap-5'>
          <h2 className='w-full text-right text-gray-500 text-3xl'> بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟ </h2>
          <p className='text-gray-400 text-xl leading-9'>
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

      {/* card section */}

      <div className='w-full  flex flex-row flex-wrap gap-10 justify-center items-center p-10'>
        <div className='w-full flex flex-row justify-center items-center'>
          <h2 className='w-[85%] text-2xl'> مقالات مشابه </h2>
          <div className='w-[15%] flex justify-end'>

            <Link href='/blogs' className='w-[60%] flex flex-row-reverse border border-blue-900 p-4 rounded-full text-blue-900'>
              <Image src={arrow} alt='arrow' unoptimized />
              مشاهده همه </Link>
          </div>

        </div>

        <div className='w-full flex flex-row justify-center items-center'>
            {isLoading && <p>در حال بارگذاری مقالات...</p>}
            {error && <p>خطا در دریافت اطلاعات.</p>}
            {swiperData?.data && <BlogSwiper blogData={swiperData.data} />}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail