"use client"
import Image from 'next/image'
import horn from '../../../../assets/landing/megaphone-01.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNav = () => {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'خانه' },
        { href: '/rent', label: 'رهن و اجاره' },
        { href: '/fast-reserve', label: 'رزرو سریع' },
        { href: '/contact-us', label: 'تماس با ما' },

    ]

    return (
        <div className='w-full bg-gray-100 dark:bg-[#272727] dark:text-white p-2 text-gray-700 rounded-full text-2xl flex flex-row-reverse gap-10 justify-center items-center '>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`w-[17.5%] pb-2 transition-all ${pathname === item.href
                        ? ' text-blue-900'
                        : ''
                        }`}
                >
                    {item.label}
                </Link>
            ))}
            <Link href="/blogs" className='border w-[30%] py-3 rounded-full flex flex-row-reverse justify-center items-center gap-1 bg-blue-900'>
                <Image
                    src={horn}
                    alt=''
                    unoptimized
                    className='w-[20%]' />
                <p className='text-white'> ! مهم ترین اخبار  </p>
            </Link>
        </div>
    )
}

export default HeaderNav