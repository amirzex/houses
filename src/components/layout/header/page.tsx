"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import home from '../../../assets/landing/logo.svg'
import user from '../../../assets/landing/user.svg'
import HeaderNav from './Headernavbar/HeaderNav'
import MobileMenuDrawer from './MobileMenuDrawer'
import moon from '../../../assets/dark/moon.svg'
import { MessageCircle } from 'lucide-react'

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

  const handleDarkMode = () => {
    document.documentElement.classList.toggle("dark")
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className='z-40 absolute top-0 w-full px-2 pt-2 sm:px-4 sm:pt-3 lg:px-5 lg:pt-3 xl:px-8 xl:pt-4' dir='ltr'>
        <div className='glass-panel mx-auto flex max-w-7xl flex-row-reverse items-center justify-between gap-1.5 rounded-full px-2.5 py-1.5 sm:gap-2 sm:px-3 sm:py-2 lg:gap-3 lg:px-4 xl:px-5'>

          <Link href="/" className='flex min-w-0 shrink-0 flex-row-reverse items-center gap-1.5 transition-opacity hover:opacity-90 lg:gap-2'>
            <Image
              src={home}
              width={40}
              height={40}
              unoptimized
              alt='logo'
              className='size-7 shrink-0 lg:size-9 xl:size-11'
            />
            <p className='truncate text-base font-black tracking-tight text-ink sm:text-lg lg:text-xl xl:text-3xl dark:text-white'>Home</p>
          </Link>

          <div className='hidden min-w-0 flex-1 justify-center px-1 lg:flex'>
            <HeaderNav />
          </div>

          <div className='flex shrink-0 flex-row-reverse items-center gap-1 sm:gap-1.5 lg:gap-2'>

            <Link href="/chat" className="relative group" aria-label="گفتگو">
              <div className="btn-icon">
                <MessageCircle size={18} className="transition-transform group-hover:rotate-12 xl:size-5" />
                <span className="absolute top-0.5 right-0.5 size-2 rounded-full border-2 border-white bg-danger animate-pulse" />
              </div>
            </Link>

            <button
              type="button"
              onClick={handleDarkMode}
              aria-label="حالت تاریک"
              className='btn-icon hidden cursor-pointer lg:inline-flex'
            >
              <Image src={moon} alt='moon' unoptimized className="size-4 xl:size-5" />
            </button>

            <Link href={isLoggedIn ? '/panel/dashboard' : '/register'} className="shrink-0">
              <span className='btn-brand gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[11px] sm:px-3 sm:text-xs lg:px-3.5 lg:py-2 xl:px-5 xl:py-2.5 xl:text-sm'>
                <Image src={user} width={18} height={18} alt='user' className='size-3.5 shrink-0 sm:size-4 xl:size-5' unoptimized />
                <span className="hidden 2xl:inline">{isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت نام'}</span>
                <span className="2xl:hidden">{isLoggedIn ? 'پنل' : 'ورود'}</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="منو"
              className='btn-icon lg:hidden'
            >
              <span className='flex flex-col gap-1'>
                <span className='block h-0.5 w-3.5 rounded-full bg-white' />
                <span className='block h-0.5 w-3.5 rounded-full bg-white' />
                <span className='block h-0.5 w-2.5 rounded-full bg-white' />
              </span>
            </button>

          </div>
        </div>
      </header>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        handleDarkMode={handleDarkMode}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

export default Header
