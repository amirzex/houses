
import Image from 'next/image'
import Link from 'next/link'
import home from '../../../assets/landing/Vector.svg'

import DarkModeSwitch from './DarkModeSwitch'

const MobileMenuDrawer = ({ isOpen, onClose, handleDarkMode }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-[#f4f6fb] dark:bg-[#272727]  flex flex-col transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Drawer Header */}
      <div className="flex flex-row-reverse justify-between items-center p-5 border-b border-gray-200/60">
        <div className='flex flex-row-reverse items-center gap-2'>
          <Image src={home} width={32} height={32} unoptimized alt='logo' />
          <p className='text-3xl font-bold text-black'>Home</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#2644a6] text-3xl pb-1 px-2"
        >
          &times;
        </button>
      </div>

      {/* Drawer Links */}
      <div className="flex flex-col p-6 gap-8 font-bold text-black text-lg" dir="rtl">
        <Link href='FastReserve' onClick={onClose} className="flex dark:text-white justify-between items-center cursor-pointer">
          <span>رزرو سریع</span>
          {/* <svg width="12" height="7" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> */}
        </Link>

        <Link href='rent' onClick={onClose} className="flex dark:text-white justify-between items-center cursor-pointer">
          <span>رهن و اجاره</span>
          {/* <svg width="12" height="7" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> */}
        </Link>

        <Link href="/contact-us" onClick={onClose} className='dark:text-white'>تماس با ما</Link>
        <Link href="/blogs" onClick={onClose} className='dark:text-white'> مهم ترین اخبار </Link>

        {/* dark mode */}
        <DarkModeSwitch />

      </div>
    </div>
  )
}

export default MobileMenuDrawer
