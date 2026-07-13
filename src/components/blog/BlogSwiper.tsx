"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import BlogCard from '../common/BlogCard';

const BlogSwiper = ({ blogData }) => {
    // اگر داده‌ای وجود نداشت، چیزی رندر نکن
    if (!blogData || blogData.length === 0) {
        return null;
    }

    return (
        // این کانتینر اصلی است که استایل‌های pagination را نگهداری می‌کند
        <div 
            className="w-full"
            style={{
                '--swiper-pagination-color': '#1E3A8A', // رنگ نقطه فعال
                '--swiper-pagination-bullet-inactive-color': '#D1D5DB', // رنگ نقطه غیرفعال
                '--swiper-pagination-bullet-inactive-opacity': '1',
                '--swiper-pagination-bullet-size': '30px',
                '--swiper-pagination-bullet-horizontal-gap': '6px',
            }}
        >
            <Swiper
                // ماژول‌های مورد استفاده
                modules={[Pagination, A11y]}

                // تنظیمات اسلایدر
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                
                // نقطه‌های pagination به کانتینر خارجی متصل می‌شوند
                pagination={{ 
                    el: '.swiper-pagination-custom', // اتصال به کلاس تعریف شده در پایین
                    clickable: true 
                }}

                // واکنش‌گرایی
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1280: { slidesPerView: 3, spaceBetween: 30 },
                }}
                
                // دیگر نیازی به استایل و پدینگ در اینجا نیست
            >
                {blogData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BlogCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* کانتینر جداگانه برای نقطه‌های pagination */}
            {/* کلاس pt-8 برای ایجاد فاصله از بالا و text-center برای وسط‌چین کردن */}
            <div className="swiper-pagination-custom text-center pt-8"></div>
        </div>
    );
};

export default BlogSwiper;
