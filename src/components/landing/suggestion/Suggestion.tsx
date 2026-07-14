
import { getSuggestion } from '@/core/api/landing/api'
import Link from 'next/link'
import Card from '@/components/common/Card'
import Image from 'next/image'
import clock from '../../../assets/landing/megaphone-01.svg'
import { IData } from '@/core/types/IData'

/** Fallback mock cards used by detail pages */
export const slides = [
  {
    id: 1,
    title: "ویلای مدرن با چشم‌انداز کوهستان",
    address: "بلوار ساحلی، سانتا مونیکا، لس آنجلس",
    rooms: 3,
    bathrooms: 2,
    parking: 2,
    rate: 4.7,
    discounted_price: 3200000,
    price: 4800000,
  },
  {
    id: 2,
    title: "خانه کلاسیک حیاط‌دار",
    address: "خیابان 12 شرقی، بروکلین، نیویورک",
    rooms: 4,
    bathrooms: 2,
    parking: 1,
    rate: 4.3,
    discounted_price: 2500000,
    price: 3900000,
  },
  {
    id: 3,
    title: "پنت‌هاوس لوکس با بالکن بزرگ",
    address: "خیابان 5 مرکزی، منهتن، نیویورک",
    rooms: 2,
    bathrooms: 2,
    parking: 1,
    rate: 4.9,
    discounted_price: 5200000,
    price: 6800000,
  },
] as unknown as IData[]

const Suggestion = async () => {

  const response = await getSuggestion()

  return (
    <section className="section-wrap mt-12 flex flex-col gap-6 sm:mt-16 sm:gap-8 xl:mt-20">
      <div className="hidden w-full flex-col items-center gap-4 md:flex">
        <div className="flex flex-row-reverse items-center justify-center gap-3 text-base">
          <div className='flex flex-row items-center justify-center gap-2 rounded-full bg-deal px-5 py-2.5 shadow-md shadow-deal/25'>
            <Image
              src={clock}
              alt=''
              unoptimized
              className='size-5 brightness-0 invert' />
            <span className='font-bold text-white tabular-nums'>۲:۲۵:۰۰</span>
          </div>
          <p className="font-bold text-deal">فرصت رو از دست نده</p>
        </div>
        <h2 className='section-title text-center'>تخفیفات ویژه برای شروع تابستان</h2>
      </div>

      <div className='flex flex-col items-center justify-center gap-2 md:hidden'>
        <p className='section-eyebrow text-sm'>ویژگی های ویژه</p>
        <h2 className='text-xl font-extrabold text-ink dark:text-white'>برای شما توصیه می شود</h2>
      </div>

      <div className="cards-grid flex flex-row flex-wrap justify-center items-center gap-6">
        {Array.isArray(response) &&
          response.slice(0, 3).map((item, index) => (
            <Card value={item} key={item.id ?? index} />
          ))
        }
      </div>
      <div className='flex w-full items-center justify-center'>
        <Link href="/rent" className='btn-outline-brand-lg'>
          مشاهده بیشتر
        </Link>
      </div>
    </section>
  )
}

export default Suggestion
