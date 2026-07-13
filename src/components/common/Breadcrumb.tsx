"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const routeNameMap: Record<string, string> = {
    rent: "رهن و اجاره",
    apartment: "آپارتمان",
    FastReserve: "رزور سریع",
    Payment: "رزرو هتل ",
    blogs: "اخبار",
    ContactUs: "تماس با ما ",
}

const Breadcrumb = () => {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean)

    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-gray-500 w-full mb-8 mt-4 px-10">
            <Link href="/" className="cursor-pointer hover:text-gray-800"> 
                خانه
            </Link>

            {pathSegments.map((segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/")
                const isLast = index === pathSegments.length - 1
                const label = routeNameMap[segment] || decodeURIComponent(segment)

                return (
                    <div key={index} className="flex items-center gap-2">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>

                        {isLast ? (
                            <span className="text-[#1a3b99] font-bold border-b border-[#1a3b99] pb-0.5">
                                {label}
                            </span>
                        ) : (
                            <Link href={href} className="cursor-pointer hover:text-gray-800">
                                {label}
                            </Link>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Breadcrumb
