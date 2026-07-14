import { getBestChoice } from '@/core/api/landing/api'
import Link from 'next/link'
import React from 'react'
import Card from '@/components/common/Card'

const BestChoice = async () => {
    const response = await getBestChoice()
    return (
        <div className='w-full flex flex-col gap-10 justify-center items-center  p-15 mt-30'>

            <div className='w-full flex flex-row-reverse justify-start items-center'>
                <p className='text-2xl text-right justify-end w-[50%] flex '>بهترین انتخاب برای تعطیلات و اقامت</p>
                <div className='w-[50%] flex '>
                    <Link
                        href={"/"}
                        className='w-[15%] border-2 flex rounded-4xl justify-center items-center text-brand border-brand p-3 text-center '
                    >
                        مشاهده همه
                    </Link>
                </div>
            </div>

            {/* card holder */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(response) && response?.length > 0 ? (
                    response?.map((item) => (
                        <Card key={item.id} value={item} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">هیچ خانه‌ای یافت نشد</p>
                )}
            </div>
        </div>
    )
}

export default BestChoice