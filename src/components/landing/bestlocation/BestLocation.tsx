import { getLocationData } from '@/core/api/landing/api'
import MiniCard from '../../common/MiniCard'


const BestLocation = async () => {

    const response = await getLocationData()


    return (
        <div className='flex flex-col w-full p-15 mt-30 '>
            <p className='text-2xl text-right'>اجاره ویلا در محبوب ترین مقاصد ایران</p>

            {/* Card holder */}
            <div className=' w-full flex flex-row justify-end items-center flex-wrap gap-10 pt-10'>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {Array.isArray(response) && response?.length > 0 ? (
                        response?.map((item) => (
                            <MiniCard key={item.id} value={item} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">هیچ خانه‌ای یافت نشد</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BestLocation