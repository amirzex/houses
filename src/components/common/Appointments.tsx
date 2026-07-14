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

const getStatusClass = (status?: string) => {
    switch (status) {
        case 'pending':
            return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
        case 'approved':
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
        case 'rejected':
            return 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300'
        default:
            return 'bg-muted text-ink-muted'
    }
}

const Appointments = ({ id }: { id: string }) => {
    const { data } = useGetAppointments(id)
    const appointments = Array.isArray(data) ? data : data?.data ?? []

    const formatDate = (date: string) => {
        const d = new Date(date)
        const day = d.toLocaleDateString("fa-IR", { day: "numeric" })
        const month = d.toLocaleDateString("fa-IR", { month: "long" })
        const year = d.toLocaleDateString("fa-IR", { year: "numeric" })
        const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
        return `${day} ${month} ${year} — ${time}`
    }

    if (!appointments.length) {
        return (
            <div className="surface-card w-full p-5 text-center text-sm text-ink-muted">
                ملاقاتی یافت نشد.
            </div>
        )
    }

    return (
        <div className="surface-card flex w-full flex-col gap-4 p-5" dir="rtl">
            <h2 className="text-base font-extrabold text-ink dark:text-white">تاریخ ملاقات‌های شما</h2>

            <div className="flex flex-col gap-3">
                {appointments.map((appointment: any) => (
                    <div
                        key={appointment.id}
                        className="rounded-2xl border border-border/60 bg-muted/50 p-3.5 dark:border-white/10 dark:bg-[#2a3340]/60"
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="text-xs text-ink-muted">تاریخ بازدید</span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${getStatusClass(appointment.status)}`}>
                                {getStatusLabel(appointment.status)}
                            </span>
                        </div>
                        <p className="text-sm font-bold text-ink dark:text-white">
                            {formatDate(appointment.appointmentTime)}
                        </p>
                        <p className="mt-1.5 text-xs text-ink-muted">
                            نوع بازدید:{" "}
                            <span className="font-medium text-ink dark:text-white/80">
                                {appointment.type === 'virtual'
                                    ? 'مجازی'
                                    : appointment.type === 'in_person'
                                        ? 'حضوری'
                                        : appointment.type}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Appointments
