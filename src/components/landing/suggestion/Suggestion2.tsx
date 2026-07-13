
import { getSuggestion } from '@/core/api/landing/api'
import Link from 'next/link'
import Card from '@/components/common/Card'

const Suggestion2 = async () => {

  const response = await getSuggestion()

  return (
    <div className="w-full flex flex-col gap-10 p-20 max-sm:p-5 max-sm:mt-20">
      {/* Header */}
      <div className="w-full flex flex-col gap-7 max-sm:hidden md:block">

        <h2 className='text-center w-full text-2xl text-blue-900'>همه جا ما با شما هستیم</h2>
        <h2 className='w-full text-center text-5xl mt-5'> بهترین اقامتگاه ها برای شما   </h2>
      </div>

      {/* header mobile */}
      <div className='max-sm:flex flex-col justify-center items-center gap-3 md:hidden'>
        <p className='text-blue-900 text-sm'> ویژگی های ویژه </p>
        <h2 className='text-xl font-bold'> برای شما توصیه می شود </h2>
      </div>

      {/* Array map */}
      <div className=" gap-10 flex flex-row w-full max-sm:flex-col ">
        {Array.isArray(response) &&
          response.slice(3, 6).map((item, index) => (
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

export default Suggestion2