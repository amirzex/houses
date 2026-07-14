"use client"
import Image from 'next/image'
import horn from '../../../../assets/landing/megaphone-01.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNav = () => {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'خانه', short: 'خانه' },
        { href: '/rent', label: 'رهن و اجاره', short: 'اجاره' },
        { href: '/fast-reserve', label: 'رزرو سریع', short: 'رزرو' },
        { href: '/contact-us', label: 'تماس با ما', short: 'تماس' },
    ]

    return (
        <nav className='nav-pill flex w-full max-w-full flex-row-reverse items-center justify-center gap-0.5 overflow-hidden text-[11px] font-bold text-ink-muted lg:text-xs xl:text-sm dark:text-white/70'>
            {navItems.map((item) => {
                const active = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative shrink-0 rounded-full px-2 py-1.5 transition-all flex justify-center items-center duration-300 xl:px-2.5 xl:py-2 w-[15%] 2xl:px-4 2xl:py-2.5 ${
                            active
                                ? 'bg-brand text-white shadow-md shadow-brand/25'
                                : 'hover:bg-brand-soft hover:text-brand dark:hover:bg-white/5 dark:hover:text-white'
                        }`}
                    >
                        <span className="2xl:hidden">{item.short}</span>
                        <span className="hidden 2xl:inline">{item.label}</span>
                    </Link>
                )
            })}
            <Link
                href="/blogs"
                className='ms-0.5 flex shrink-0 flex-row-reverse items-center justify-center gap-1 rounded-full bg-brand px-2 py-1.5 text-white shadow-md shadow-brand/20 transition-all duration-300 hover:bg-brand-hover xl:ms-1 xl:gap-1.5 xl:px-2.5 xl:py-2 2xl:px-4 2xl:py-2.5'
            >
                <Image src={horn} alt='' unoptimized className='size-3.5 brightness-0 invert xl:size-4' />
                <span className='whitespace-nowrap text-[10px] xl:text-xs'>اخبار</span>
            </Link>
        </nav>
    )
}

export default HeaderNav
