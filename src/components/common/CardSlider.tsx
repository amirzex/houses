"use client";
import { useState } from "react";
import Image from "next/image";
import Card from "./Card";
import righticon from "../../assets/landing/rightarrow.svg";
import lefticon from "../../assets/landing/leftarrow.svg";

const Slider = () => {
    const [index, setIndex] = useState(0);

    const cards = [
        <Card key={1} />,
        <Card key={2} />,
        <Card key={3} />,
        <Card key={4} />,
        <Card key={5} />,
        <Card key={6} />,
        <Card key={7} />,
    ];

    const visibleCards = 4;

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % cards.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Track */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${(index * 100) / visibleCards}%)`,
                }}
            >
                {cards.map((card, i) => (
                    <div key={i} className="w-1/4 shrink-0  mr-10">
                        {card}
                    </div>
                ))}
            </div>

            {/* Right button */}
            <div
                className="bg-blue-900 w-15 h-15 rounded-full flex justify-center items-center absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={nextSlide}
            >
                <Image
                    src={righticon}
                    alt="next"
                    width={15}
                    height={15}
                    className="object-contain"
                />
            </div>

            {/* Left button */}
            <div
                className="bg-blue-900 w-15 h-15 rounded-full flex justify-center items-center absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={prevSlide}
            >
                <Image
                    src={lefticon}
                    alt="prev"
                    width={15}
                    height={15}
                    className="object-contain "
                />
            </div>
        </div>
    );
}

export default Slider