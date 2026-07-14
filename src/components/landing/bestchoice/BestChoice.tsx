import { getBestChoice } from '@/core/api/landing/api'
import Link from 'next/link'
import React from 'react'
import Card from '@/components/common/Card'

const BestChoice = async () => {
    const response = await getBestChoice()
    return (
        <div className='section-wrap flex w-full flex-col items-center justify-center gap-8 py-8 md:gap-10 md:py-12 lg:mt-30'>

            <div className='flex w-full flex-col gap-4 sm:flex-row-reverse sm:items-center sm:justify-between'>
                <p className='text-right text-xl font-bold sm:text-2xl'>بهترین انتخاب برای تعطیلات و اقامت</p>
                <Link
                    href={"/"}
                    className='inline-flex w-full items-center justify-center rounded-4xl border-2 border-brand p-3 text-center text-sm text-brand sm:w-auto'
                >
                    مشاهده همه
                </Link>
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