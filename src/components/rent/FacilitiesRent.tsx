import Image from 'next/image'
import parkingg from '../../assets/reserve/CarParking02Icon.svg'
import member from '../../assets/details/user.svg'
import bath from '../../assets/details/whater.svg'
import room from '../../assets/details/BedIcon.svg'

const items = [
    { key: 'parking', label: 'پارکینگ', icon: parkingg },
    { key: 'capacity', label: 'ظرفیت', icon: member },
    { key: 'bathrooms', label: 'حمام', icon: bath },
    { key: 'rooms', label: 'اتاق', icon: room },
] as const

const FacilitiesRent = ({
    bathrooms,
    parking,
    rooms,
    capacity,
}: {
    bathrooms?: number
    parking?: number
    rooms?: number
    capacity?: number
}) => {
    const values = { bathrooms, parking, rooms, capacity }

    return (
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {items.map((item) => (
                <div
                    key={item.key}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-soft dark:border-white/10 dark:bg-[#1a222d]"
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-brand shadow-md shadow-brand/20 transition group-hover:scale-105">
                        <Image src={item.icon} alt="" unoptimized className="size-6 brightness-0 invert" />
                    </div>
                    <h3 className="text-sm font-bold text-brand">{item.label}</h3>
                    <p className="text-base font-extrabold text-ink dark:text-white">
                        {values[item.key] ?? "—"}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default FacilitiesRent
