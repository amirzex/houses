import { useGetAppointments } from '@/core/api/dashboard/appointments/queries'
import React from 'react'

const Appointments = ({ id }) => {
    const { data } = useGetAppointments(id)

    if (!data || data.length === 0) {
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

            {data.map((appointment) => (
                <div key={appointment.id} className='w-full flex flex-col gap-2'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <p className='w-[50%] text-xl text-right text-gray-500'>تاریخ بازدید:</p>
                        <span className='w-[50%] text-sm text-left'>{formatDate(appointment.appointmentTime)}</span>
                    </div>

                    <div className='w-full flex flex-row justify-center items-center' >
                        <p className='w-[50%] text-xl text-right text-gray-500'>نوع بازدید:</p>
                        <p className='w-[50%] text-sm text-left'>{appointment.type === 'virtual' ? 'مجازی' : appointment.type}</p>
                    </div>

                    <div className='w-full flex flex-row justify-center items-center'>
                        <p className='w-[50%] text-xl text-right text-gray-500'>وضعیت:</p>
                        <p className='w-[50%] text-sm text-red-500 text-left'>{appointment.status === "pending" ? 'در حال انتظار' : appointment.this.status}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Appointments
