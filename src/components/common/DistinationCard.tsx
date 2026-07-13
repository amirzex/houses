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
        <div className="relative w-[25%] max-sm:w-full h-90  aspect-[4/3] rounded-3xl overflow-hidden shadow-md font-sans">
            
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                unoptimized
            />

            <div
                dir="rtl"
                className="absolute bottom-4 left-4 right-4 bg-white dark:bg-[#353535]  rounded-2xl px-5 py-5 flex justify-between items-center shadow-lg" 
            >
                
                <h3 className="text-lg sm:text-xl max-sm:text-sm dark:text-white font-bold text-gray-900">
                    {title}
                </h3>

                
                <div className="border border-[#1E3A8A] text-[#1E3A8A] dark:text-blue-600/90  dark:border-blue-600/90 rounded-full px-5 py-2 font-bold text-2xl max-sm:text-sm flex gap-1 justify-center items-center">
                    <span>{count}</span>
                    <span>{countLabel}</span>
                </div>
            </div>
        </div>
    );
}

export default DestinationCard;
