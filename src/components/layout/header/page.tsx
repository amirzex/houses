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
      <div className='z-10 absolute top-0 w-full flex flex-row-reverse justify-between items-center px-4 py-3 ' dir='ltr'>

        {/* Logo (Right) */}
        <div className='flex flex-row-reverse items-center gap-2 md:w-[25%] md:justify-start md:pr-10'>
          <Image
            src={home}
            width={40}
            height={40}
            unoptimized
            alt='logo'
            className='w-5 h-5 md:w-[50px] md:h-[50px]'
          />
          <p className='text-2xl max-sm:text-sm md:text-4xl font-bold text-black dark:text-[#D9D9E0]'>Home</p>
        </div>

        {/* Navigate Desktop */}
        <div className='hidden md:flex md:w-[50%] p-2 font-bold text-lg lg:text-2xl flex-row-reverse gap-10 justify-center items-center text-black'>
          <HeaderNav />
        </div>

        <div className='flex flex-row-reverse items-center gap-13 md:w-[25%] bo md:justify-end md:pl-10'>

          <Link href="/chat" className="relative group ml-[-40px]">
            <div className="p-3 bg-blue-900 hover:bg-[#2481cc] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center cursor-pointer active:scale-90">
              <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
          </Link>

          {/* dark mode */}
          <div onClick={handleDarkMode} className='p-3 ml-[-40px] bg-blue-900 rounded-full max-sm:hidden cursor-pointer'>
            <Image src={moon} alt='moon' unoptimized />
          </div>

          {/* Conditional Button: Login or Dashboard */}
          <Link href={isLoggedIn ? 'panel/dashboard' : '/register'}>
            <button className='text-white bg-blue-900 flex flex-row-reverse items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full text-sm md:text-xl'>
              <Image src={user} width={20} height={20} alt='user' className='w-5 h-5 md:w-6 md:h-6' unoptimized />
              <span>{isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت نام'}</span>
            </button>
          </Link>

          {/* Hamburger Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className='md:hidden bg-blue-900 flex flex-col justify-center items-center gap-[4px] w-10 h-10 rounded-full'
          >
            <span className='block w-5 h-[2px] bg-white rounded-full'></span>
            <span className='block w-5 h-[2px] bg-white rounded-full'></span>
            <span className='block w-5 h-[2px] bg-white rounded-full'></span>
          </button>

        </div>
      </div>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        handleDarkMode={handleDarkMode}
        isLoggedIn={isLoggedIn} // ارسال وضعیت به دراور موبایل در صورت نیاز
      />
    </>
  )
}

export default Header
