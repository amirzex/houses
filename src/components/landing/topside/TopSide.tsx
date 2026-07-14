"use client"
import Image from 'next/image'
import background from '../../../assets/landing/topbg.jpg'
import FormSearch from '../form/FormSearch';
import { useState } from 'react';
import FormSearchMobile from '../form/FormSearchMobile';


const TopSide = () => {
    const [selected, setSelected] = useState<number | null>(0);

    const options = ["رزرو ملک", "رهن و اجاره", "خرید و فروش"];

    return (
        <section className="relative w-full">
            <div className="hero-shell relative flex min-h-[560px] w-full items-center justify-center overflow-hidden h-[100svh] max-h-[860px] md:min-h-[600px] xl:h-[90vh]">
                <Image
                    src={background}
                    alt="landing background"
                    fill
                    priority
                    className="object-cover scale-105"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(0_0_0/0.35)_100%)]" />

                <div className="hero-inner relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center gap-5 px-3 pb-6 pt-20 text-center text-white sm:px-5 sm:gap-6 md:gap-7 md:pb-10 md:pt-24 xl:gap-8 xl:pt-28">
                    <div className='animate-fade-up flex w-full flex-col items-center gap-2.5 sm:gap-3 md:gap-4'>
                        <p className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wide backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-xs md:text-sm">
                            پلتفرم هوشمند املاک و اقامتگاه
                        </p>
                        <h1 className="hero-title max-w-4xl text-[1.75rem] font-black leading-[1.3] tracking-tight sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
                            خانه رویایی
                            <br />
                            خودت رو پیدا کن
                        </h1>
                        <p className="hero-subtitle hidden max-w-2xl text-sm leading-7 text-white/85 sm:block md:text-base md:leading-8 xl:text-lg">
                            ما آژانس املاکی هستیم که به شما کمک می‌کنیم بهترین اقامتگاهی را که رویای آن را دارید پیدا کنید.
                        </p>
                    </div>

                    <div className='animate-fade-up-delay flex w-full flex-col items-center gap-3 sm:gap-4'>
                        <div className="flex w-full max-w-4xl flex-row-reverse flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                            {options.map((option, index) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setSelected(index)}
                                    className={`rounded-full border px-3 py-2 text-xs font-bold transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm md:text-base xl:px-5 xl:text-lg ${
                                        selected === index
                                            ? "border-white bg-white text-brand shadow-lg shadow-black/20"
                                            : "border-white/35 bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className='hidden w-full max-w-5xl rounded-2xl border border-white/40 bg-white/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-xl md:block xl:rounded-[1.75rem] xl:p-4 dark:border-white/10 dark:bg-[#1a222d]/95'>
                            <FormSearch selectedTab={options[selected ?? 0]} />
                        </div>
                        <div className='w-full max-w-lg md:hidden'>
                            <FormSearchMobile selectedTab={options[selected ?? 0]}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopSide
