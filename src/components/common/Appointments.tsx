import { useGetAppointments } from '@/core/api/dashboard/appointments/queries'
import React from 'react'

const getStatusLabel = (status?: string) => {
    switch (status) {
        case 'pending':
            return 'در حال انتظار'
        case 'approved':
            return 'تایید شده'
        case 'rejected':
            return 'رد شده'
        default:
            return status || 'نامشخص'
    }
}

const getStatusColor = (status?: string) => {
    switch (status) {
        case 'pending':
            return 'text-yellow-600'
        case 'approved':
            return 'text-green-600'
        case 'rejected':
            return 'text-red-500'
        default:
            return 'text-gray-500'
    }
}

const Appointments = ({ id }) => {
    const { data } = useGetAppointments(id)
    const appointments = Array.isArray(data) ? data : data?.data ?? []

    if (!appointments.length) {
        return <div className='w-[90%] p-5 border rounded-2xl bg-[#FFFFFA] dark:bg-[#272727] flex flex-col justify-center items-center gap-8'>ملاقاتی یافت نشد.</div>
    }

    const formatDate = (date) => {
        const d = new Date(date);

        const day = d.toLocaleDateString("fa-IR", { day: "numeric" });
        const month = d.toLocaleDateString("fa-IR", { month: "long" });
        const year = d.toLocaleDateString("fa-IR", { year: "numeric" });
        const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

        return `${day} ${month} - ${year} / ${time}`;
    };

    return (
        <div className='w-[90%] dark:bg-[#272727] p-5 border rounded-2xl bg-[#FFFFFA] flex flex-col justify-center items-center gap-8'>
            <h2 className='text-xl mb-4'> تاریخ ملاقات های شما  </h2>

            {appointments.map((appointment) => (
                <div key={appointment.id} className='w-full flex flex-col gap-2'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <p className='w-[50%] text-xl text-right text-gray-500'>تاریخ بازدید:</p>
                        <span className='w-[50%] text-sm text-left'>{formatDate(appointment.appointmentTime)}</span>
                    </div>

                    <div className='w-full flex flex-row justify-center items-center' >
                        <p className='w-[50%] text-xl text-right text-gray-500'>نوع بازدید:</p>
                        <p className='w-[50%] text-sm text-left'>{appointment.type === 'virtual' ? 'مجازی' : appointment.type === 'in_person' ? 'حضوری' : appointment.type}</p>
                    </div>

                    <div className='w-full flex flex-row justify-center items-center'>
                        <p className='w-[50%] text-xl text-right text-gray-500'>وضعیت:</p>
                        <p className={`w-[50%] text-sm text-left ${getStatusColor(appointment.status)}`}>
                            {getStatusLabel(appointment.status)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Appointments
