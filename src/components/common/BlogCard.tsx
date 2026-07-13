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
        <Link href={`blogs/${item.id}`} dir="rtl" className="w-full h-auto font-sans dark:bg-[#272727] bg-[#FFFFFA] border rounded-[2rem] overflow-hidden shadow-sm flex flex-col">

            <div className="relative  w-full h-90 max-sm:h-70 transition-all duration-300">
                <Image
                    src={blog}
                    alt="نمای داخلی اتاق"
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute top-3 right-3 flex items-center gap-2">

                    <div className="bg-[#1e3b99] text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="pt-0.5 text-xl max-sm:text-sm">{item?.estimated_reading_time} </span>
                    </div>
                    <div className="bg-[#1e3b99] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md">
                        <span className="pt-0.5 text-2xl max-sm:text-sm">{categoryNames[item?.category_id] || "بدون دسته"}</span>
                    </div>
                </div>

                <div className="absolute bottom-3 right-3 text-white text-sm font-medium flex items-center gap-2">
                    <svg className="w-7 h-7 max-sm:w-5 max-sm:h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="pt-0.5 text-xl max-sm:text-sm">
                        {formatDate(item?.created_at)}
                    </span>

                </div>
            </div>

            <div className="p-5  flex flex-col gap-4">

                <h2 className="text-3xl max-sm:text-xl font-bold dark:text-white text-black leading-tight truncate">
                    {item?.title}
                </h2>

                <p className="text-gray-500 text-xl max-sm:text-sm dark:text-gray-400 leading-relaxed ">
                    {item.caption}
                </p>

                <button className="w-full bg-[#1e3b99] max-sm:text-sm hover:bg-blue-900 transition-colors text-white font-medium py-3.5 rounded-full mt-2">
                    مشاهده جزئیات
                </button>
            </div>

        </Link>
    );
}

export default BlogCard;
