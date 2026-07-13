"use client"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SLiderType {
    id: number | string
    content: React.ReactNode
}

interface MySwiperProps {
    slides?: SLiderType[];
}

const MySwiper = ({ slides = [] }: MySwiperProps) => {
    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="w-full ">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="modernSwiper"
            >

                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id || index}>
                        {slide.content}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MySwiper; 