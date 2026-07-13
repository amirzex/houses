
import { getSuggestion } from '@/core/api/landing/api'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MySwiper from '@/components/common/Swiper'
import Image from 'next/image'
import clock from '../../../assets/landing/megaphone-01.svg'

export const slides = [
  {
    id: 1,
    title: "ویلای مدرن با چشم‌انداز کوهستان",
    adress: "بلوار ساحلی، سانتا مونیکا، لس آنجلس",
    bed: 3,
    bath: 2,
    space: 180,
    park: 2,
    rate: 4.7,
    discount: 3200000,
    price: 4800000
  },
  {
    id: 2,
    title: "خانه کلاسیک حیاط‌دار",
    adress: "خیابان 12 شرقی، بروکلین، نیویورک",
    bed: 4,
    bath: 2,
    space: 210,
    park: 1,
    rate: 4.3,
    discount: 2500000,
    price: 3900000
  },
  {
    id: 3,
    title: "پنت‌هاوس لوکس با بالکن بزرگ",
    adress: "خیابان 5 مرکزی، منهتن، نیویورک",
    bed: 2,
    bath: 2,
    space: 150,
    park: 1,
    rate: 4.9,
    discount: 5200000,
    price: 6800000
  },
  {
    id: 4,
    title: "خانه ویلایی استخردار",
    adress: "خیابان سن‌دیگو 45، کالیفرنیا",
    bed: 5,
    bath: 3,
    space: 260,
    park: 3,
    rate: 4.6,
    discount: 4100000,
    price: 6200000
  },
  {
    id: 5,
    title: "آپارتمان شیک نزدیک مرکز شهر",
    adress: "خیابان هالیوود 222، لس آنجلس",
    bed: 1,
    bath: 1,
    space: 95,
    park: 1,
    rate: 4.2,
    discount: 1500000,
    price: 2500000
  }, {
    id: 5,
    title: "آپارتمان شیک نزدیک مرکز شهر",
    adress: "خیابان هالیوود 222، لس آنجلس",
    bed: 1,
    bath: 1,
    space: 95,
    park: 1,
    rate: 4.2,
    discount: 1500000,
    price: 2500000
  }, {
    id: 5,
    title: "آپارتمان شیک نزدیک مرکز شهر",
    adress: "خیابان هالیوود 222، لس آنجلس",
    bed: 1,
    bath: 1,
    space: 95,
    park: 1,
    rate: 4.2,
    discount: 1500000,
    price: 2500000
  }, {
    id: 5,
    title: "آپارتمان شیک نزدیک مرکز شهر",
    adress: "خیابان هالیوود 222، لس آنجلس",
    bed: 1,
    bath: 1,
    space: 95,
    park: 1,
    rate: 4.2,
    discount: 1500000,
    price: 2500000
  }, {
    id: 5,
    title: "آپارتمان شیک نزدیک مرکز شهر",
    adress: "خیابان هالیوود 222، لس آنجلس",
    bed: 1,
    bath: 1,
    space: 95,
    park: 1,
    rate: 4.2,
    discount: 1500000,
    price: 2500000
  },
]


const Suggestion = async () => {

  const response = await getSuggestion()

  return (
    <div className="w-full flex flex-col gap-10 p-20 max-sm:p-5 max-sm:mt-20">
      {/* Header */}
      <div className="w-full flex flex-col gap-7 max-sm:hidden md:block">
        <div className="w-full flex flex-row-reverse justify-center items-center text-2xl gap-5">
          <div className='flex flex-row px-7 py-3 rounded-full gap-3 bg-orange-500 justify-center items-center'>
            <Image
              src={clock}
              alt=''
              unoptimized
              className='w-full text-white' />
            <span className='text-white'>2:25:00</span>
          </div>
          <p className="text-orange-500"> فرصت رو از دست نده  </p>
        </div>
        <h2 className='w-full text-center text-5xl mt-5'> تخفیفات ویژه  برای شروع تابستان </h2>
      </div>

      {/* header mobile */}
      <div className='max-sm:flex flex-col justify-center items-center gap-3 md:hidden'>
        <p className='text-blue-900 text-sm'> ویژگی های ویژه </p>
        <h2 className='text-xl font-bold'> برای شما توصیه می شود </h2>
      </div>

      {/* Array map */}
      <div className=" gap-10 flex flex-row w-full max-sm:flex-col ">
        {Array.isArray(response) &&
          response.slice(0, 3).map((item, index) => (
            <Card value={item} key={index} />
          ))
        }
      </div>
      <div className='w-full flex justify-center items-center '>
        <Link href="/" className='border border-blue-900 p-5 max-sm:p-3 rounded-full text-blue-900 text-2xl max-sm:text-sm'> مشاهده بیشتر </Link>
      </div>
    </div>
  )
}

export default Suggestion