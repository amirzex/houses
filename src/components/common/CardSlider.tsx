"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./Card";
import righticon from "../../assets/landing/rightarrow.svg";
import lefticon from "../../assets/landing/leftarrow.svg";

const Slider = () => {
    const [index, setIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    const cards = [
        <Card key={1} />,
        <Card key={2} />,
        <Card key={3} />,
        <Card key={4} />,
        <Card key={5} />,
        <Card key={6} />,
        <Card key={7} />,
    ];

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth >= 1280) setVisibleCards(4);
            else if (window.innerWidth >= 768) setVisibleCards(2);
            else setVisibleCards(1);
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % cards.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const slideWidth = 100 / visibleCards;

    return (
        <div className="relative w-full overflow-hidden px-10 sm:px-12">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${index * slideWidth}%)`,
                }}
            >
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className="shrink-0 px-2"
                        style={{ width: `${slideWidth}%` }}
                    >
                        {card}
                    </div>
                ))}
            </div>

            <button
                type="button"
                aria-label="بعدی"
                className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-brand sm:size-12"
                onClick={nextSlide}
            >
                <Image
                    src={righticon}
                    alt="next"
                    width={15}
                    height={15}
                    className="object-contain"
                />
            </button>

            <button
                type="button"
                aria-label="قبلی"
                className="absolute left-0 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-brand sm:size-12"
                onClick={prevSlide}
            >
                <Image
                    src={lefticon}
                    alt="prev"
                    width={15}
                    height={15}
                    className="object-contain"
                />
            </button>
        </div>
    );
}

export default Slider;
