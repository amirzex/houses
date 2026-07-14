import { getLocationData } from '@/core/api/landing/api'
import MiniCard from '../../common/MiniCard'


const BestLocation = async () => {

    const response = await getLocationData()


    return (
        <div className='section-wrap flex w-full flex-col gap-8 py-8 md:gap-10 md:py-12 lg:mt-30'>
            <p className='text-right text-xl font-bold sm:text-2xl'>اجاره ویلا در محبوب ترین مقاصد ایران</p>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {Array.isArray(response) && response?.length > 0 ? (
                    response?.map((item) => (
                        <MiniCard key={item.id} value={item} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">هیچ خانه‌ای یافت نشد</p>
                )}
            </div>
        </div>
    )
}

export default BestLocation
