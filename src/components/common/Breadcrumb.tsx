"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const routeNameMap: Record<string, string> = {
    rent: "رهن و اجاره",
    apartment: "آپارتمان",
    "fast-reserve": "رزرو سریع",
    Payment: "پرداخت",
    blogs: "اخبار",
    "contact-us": "تماس با ما",
}

const Breadcrumb = () => {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean)

    return (
        <nav
            aria-label="مسیر صفحه"
            className="flex w-full flex-row flex-wrap items-center justify-center gap-1.5 text-xs text-ink-muted sm:gap-2 sm:text-sm"
            dir="rtl"
        >
            <Link href="/" className="transition-colors hover:text-brand">
                خانه
            </Link>

            {pathSegments.map((segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/")
                const isLast = index === pathSegments.length - 1
                const isId = /^\d+$/.test(segment)
                const label = isId
                    ? "جزئیات ملک"
                    : routeNameMap[segment] || decodeURIComponent(segment)

                return (
                    <div key={href} className="flex items-center gap-1.5 sm:gap-2">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="opacity-50"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>

                        {isLast ? (
                            <span className="max-w-[140px] truncate font-bold text-brand sm:max-w-none">
                                {label}
                            </span>
                        ) : (
                            <Link href={href} className="transition-colors hover:text-brand">
                                {label}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

export default Breadcrumb
