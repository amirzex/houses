import Image from 'next/image';
import blog from '../../assets/details/blog.jpg';
import Link from 'next/link';

const BlogCard = ({ item }) => {

    const categoryNames = {
        1: "ویلایی",
        5: "مغازه",
        6: "زمین",
        4: "دفتر اداری",
        3: "پنت هاوس",
        7: "باغ",
        2: "آپارتمان"
    };


    const formatDate = (date) => {
        const d = new Date(date);

        const day = d.toLocaleDateString("fa-IR", { day: "numeric" });
        const month = d.toLocaleDateString("fa-IR", { month: "long" });
        const year = d.toLocaleDateString("fa-IR", { year: "numeric" });
        const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

        return `${day} ${month} - ${year} / ${time}`;
    };

    return (
        <Link href={`/blogs/${item.id}`} dir="rtl" className="surface-card group flex h-auto w-full flex-col font-sans">

            <div className="relative h-64 w-full transition-all duration-300 sm:h-80">
                <Image
                    src={blog}
                    alt="نمای داخلی اتاق"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute top-3 right-3 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-brand/95 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-sm">
                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="pt-0.5">{item?.estimated_reading_time}</span>
                    </div>
                    <div className="rounded-full bg-brand/95 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-sm">
                        <span className="pt-0.5">{categoryNames[item?.category_id] || "بدون دسته"}</span>
                    </div>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm font-medium text-white">
                    <svg className="size-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="pt-0.5 text-xs sm:text-sm">
                        {formatDate(item?.created_at)}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-5">
                <h2 className="truncate text-lg font-bold leading-tight text-ink sm:text-xl dark:text-white">
                    {item?.title}
                </h2>

                <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted dark:text-white/60">
                    {item.caption}
                </p>

                <span className="btn-brand mt-2 w-full">
                    مشاهده جزئیات
                </span>
            </div>
        </Link>
    );
}

export default BlogCard;
