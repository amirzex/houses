
import { getSuggestion } from '@/core/api/landing/api'
import Link from 'next/link'
import Card from '@/components/common/Card'

const Suggestion2 = async () => {

  const response = await getSuggestion()

  return (
    <section className="section-wrap mt-12 flex flex-col gap-6 sm:mt-16 sm:gap-8 xl:mt-20">
      <div className="hidden w-full flex-col items-center gap-2 md:flex">
        <p className='section-eyebrow'>همه جا ما با شما هستیم</p>
        <h2 className='section-title text-center'>بهترین اقامتگاه ها برای شما</h2>
      </div>

      <div className='flex flex-col items-center justify-center gap-2 md:hidden'>
        <p className='section-eyebrow text-sm'>ویژگی های ویژه</p>
        <h2 className='text-xl font-extrabold text-ink dark:text-white'>برای شما توصیه می شود</h2>
      </div>

      <div className="cards-grid flex flex-row flex-wrap justify-center items-center gap-6">
        {Array.isArray(response) &&
          response.slice(3, 6).map((item, index) => (
            <Card value={item} key={item.id ?? index} />
          ))
        }
      </div>
      <div className='flex w-full items-center justify-center'>
        <Link href="/fast-reserve" className='btn-outline-brand-lg'>
          مشاهده بیشتر
        </Link>
      </div>
    </section>
  )
}

export default Suggestion2
