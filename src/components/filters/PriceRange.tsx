"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { useSearchParams } from "next/navigation"

interface PriceRangeProps {
    onChange: (min: string, max: string) => void;
    minPrice?: string;
    maxPrice?: string;
}

const PriceRange = ({ onChange, minPrice = "", maxPrice = "" }: PriceRangeProps) => {
    const searchParams = useSearchParams();

    const initialMin = minPrice ? parseInt(minPrice) : 0;
    const initialMax = maxPrice ? parseInt(maxPrice) : 10000000;

    const [value, setValue] = useState<[number, number]>([initialMin, initialMax]);


    useEffect(() => {
        const urlMin = searchParams.get("minPrice");
        const urlMax = searchParams.get("maxPrice");

        setValue([
            urlMin ? parseInt(urlMin) : 0,
            urlMax ? parseInt(urlMax) : 10000000
        ]);
    }, [searchParams]);

    const handleChange = (newValue: [number, number]) => {
        setValue(newValue);
        onChange(newValue[0].toString(), newValue[1].toString());
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('fa-IR');
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">رنج قیمت</span>
                <span className="text-xs text-gray-500">
                    {formatPrice(value[0])} - {formatPrice(value[1])} تومان
                </span>
            </div>

            <Slider
                id="slider"
                max={10000000}
                min={0}
                step={100000}
                onValueChange={handleChange}
                value={value}
                className="rtl:scale-x-[-1]"
            />

            <div className="flex items-center justify-between text-muted-foreground text-xs">
                <span>حداقل: {formatPrice(value[0])}</span>
                <span>حداکثر: {formatPrice(value[1])}</span>
            </div>
        </div>
    )
}

export default PriceRange