"use client"
import React, { Suspense } from 'react'
import Breadcrumb from './Breadcrumb'

import PayMentCard from '@/components/reserve/payment/PaymentCard'
import PaymentWizard from '@/components/reserve/payment/PaymentWizard'
import { useHouseById } from '@/core/api/houses/queries'

const PayMentsForm = ({ id }) => {

    const { data } = useHouseById(id)

    return (
        <div className='w-full flex flex-col justify-center items-center ' dir='rtl'>

            <Breadcrumb />

            <div className='w-full flex flex-row max-sm:flex-col justify-center items-center gap-10 p-10 max-sm:p-5 '>

                <form className='w-[70%] max-sm:w-full flex flex-col justify-center items-center gap-5 ' action="">
                    <Suspense fallback={<div className="py-10 text-center text-gray-500">در حال بارگذاری...</div>}>
                        <PaymentWizard bookingData={data} />
                    </Suspense>
                </form>

                <div className='w-[30%] max-sm:w-full p-10 max-sm:p-5'>
                    <PayMentCard value={data} />
                </div>

            </div>
        </div>
    )
}

export default PayMentsForm