"use client"

import Image from "next/image"
import Link from "next/link"
import notFound from "../assets/404/Frame 1890164144.png"
import arrow from "../assets/404/Vector.svg"

const NotFound = () => {
    return (
        <div className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-background">
            <div className="absolute inset-x-0 top-[18%] z-10 flex flex-col items-center justify-center gap-4 px-4 text-center sm:top-[22%]">
                <span className="bg-gradient-to-b from-brand to-brand-hover bg-clip-text text-7xl font-black text-transparent sm:text-[100px]">
                    ۴۰۴
                </span>

                <h2 className="text-lg font-bold text-ink dark:text-white sm:text-xl">
                    صفحه مورد نظر یافت نشد
                </h2>

                <Link href="/" className="btn-brand-lg gap-3">
                    <Image src={arrow} alt="" unoptimized />
                    برگردیم به صفحه اصلی
                </Link>
            </div>

            <Image src={notFound} alt="" unoptimized className="w-full opacity-90" />
        </div>
    )
}

export default NotFound
