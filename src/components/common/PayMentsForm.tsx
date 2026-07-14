"use client"
import React, { Suspense } from 'react'
import Breadcrumb from './Breadcrumb'

import PayMentCard from '@/components/reserve/payment/PaymentCard'
import PaymentWizard from '@/components/reserve/payment/PaymentWizard'
import { useHouseById } from '@/core/api/houses/queries'

const PayMentsForm = ({ id }) => {

    const { data } = useHouseById(id)

    return (
        <div className='page-shell flex w-full min-w-0 flex-col items-center justify-center max-sm:px-3' dir='rtl'>

            <Breadcrumb />

            <div className='flex w-full flex-col items-stretch justify-center gap-6 py-6 lg:flex-row lg:gap-10'>

                <div className='w-full lg:w-[70%]'>
                    <Suspense fallback={<div className="py-10 text-center text-gray-500">در حال بارگذاری...</div>}>
                        <PaymentWizard bookingData={data} />
                    </Suspense>
                </div>

                <div className='w-full lg:w-[30%]'>
                    <PayMentCard value={data} />
                </div>

            </div>
        </div>
    )
}

export default PayMentsForm