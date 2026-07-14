import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

export interface DestinationCardProps {
    title: string;
    count: number | string;
    countLabel?: string;
    imageSrc: string | StaticImageData;
}

const DestinationCard: FC<DestinationCardProps> = ({
    title = "اجاره ویلا در سوادکوه",
    count = 50,
    countLabel = "مورد",
    imageSrc
}) => {
    return (
        <div className="group relative aspect-[4/3] min-h-[220px] w-full overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:min-h-[240px]">
            <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div
                dir="rtl"
                className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-2xl border border-white/50 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:gap-3 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-[#1a222d]/95"
            >
                <h3 className="min-w-0 truncate text-xs font-bold text-ink sm:text-sm xl:text-base dark:text-white">
                    {title}
                </h3>

                <div className="flex shrink-0 items-center justify-center gap-1 rounded-full border border-brand/30 bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand sm:px-3 sm:text-xs">
                    <span>{count}</span>
                    <span>{countLabel}</span>
                </div>
            </div>
        </div>
    );
}

export default DestinationCard;
