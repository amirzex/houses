import Image from 'next/image'
import Link from 'next/link'
import home from '../../../assets/landing/Vector.svg'
import DarkModeSwitch from './DarkModeSwitch'

const MobileMenuDrawer = ({
  isOpen,
  onClose,
  handleDarkMode,
}: {
  isOpen: boolean
  onClose: () => void
  handleDarkMode: () => void
  isLoggedIn?: boolean
}) => {
  const links = [
    { href: '/', label: 'خانه' },
    { href: '/fast-reserve', label: 'رزرو سریع' },
    { href: '/rent', label: 'رهن و اجاره' },
    { href: '/contact-us', label: 'تماس با ما' },
    { href: '/blogs', label: 'اخبار مهم' },
  ]

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-surface transition-transform duration-300 ease-out md:hidden dark:bg-[#121820] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-row-reverse items-center justify-between border-b border-border/60 p-5">
        <div className='flex flex-row-reverse items-center gap-2'>
          <Image src={home} width={32} height={32} unoptimized alt='logo' />
          <p className='text-2xl font-black text-ink dark:text-white'>Home</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-2xl text-brand transition hover:bg-brand hover:text-white dark:bg-brand-soft"
          aria-label="بستن منو"
        >
          &times;
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-5" dir="rtl">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-2xl px-4 py-3.5 text-lg font-bold text-ink transition-colors hover:bg-brand-soft hover:text-brand dark:text-white dark:hover:bg-white/5"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 rounded-2xl border border-border/60 bg-card p-4 dark:border-white/10">
          <DarkModeSwitch />
        </div>
      </nav>
    </div>
  )
}

export default MobileMenuDrawer
