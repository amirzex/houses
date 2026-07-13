"use client"
import Image from 'next/image'
import background from '../../../assets/landing/topbg.jpg'
import FormSearch from '../form/FormSearch';
import { useState } from 'react';
import FormSearchMobile from '../form/FormSearchMobile';


const TopSide = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const options = ["رزرو ملک", "رهن و اجاره", "خرید و فروش"];

    return (
        <div className=" w-full flex flex-row justify-center">
            <div className="relative w-full h-250 flex justify-center">
                <Image
                    src={background}
                    alt="landing background"
                    fill
                    className="object-cover"
                    unoptimized
                />

                <div className="w-full absolute text-white flex flex-col items-center justify-center h-full px-6 text-center ">
                    {/* left */}
                    <div className='w-full flex flex-col justify-center items-center h-[50%] max-sm:h-[25%] max-sm:justify-start max-sm:pt-0 pt-50 text-right gap-5'>
                        <div className='flex flex-col justify-center items-center w-full gap-8'>
                            <span className="text-7xl max-sm:text-3xl text-center font-bold w-full leading-20 max-sm:leading-10">
                                خانه رویایی <br /> خودت رو پیدا کن
                            </span>
                            <p className="text-xl text-center w-full max-sm:hidden">
                                ما آژانس املاکی هستیم که به شما کمک می کنیم بهترین اقامتگاهی را که <br /> رویای آن را
                                دارید پیدا کنید، بیایید درباره خانه رویایی شما بحث کنیم؟
                            </p>
                            <p className="text-xl text-center w-full max-sm:text-sm md:hidden">
                                ما آژانس املاکی هستیم که به شما کمک می کنیم بهترین اقامتگاهی را که  رویای آن را
                                دارید پیدا کنید، بیایید درباره خانه رویایی شما بحث کنیم؟
                            </p>
                        </div>
                    </div>
                    {/* right */}
                    <div className='w-full flex flex-col justify-center items-center  h-[50%] '>
                        <div className='flex flex-col w-full gap-5 justify-center items-center'>
                            <div className="w-[80%] max-sm:w-full  flex flex-row-reverse justify-start max-sm:justify-center items-center gap-5 pt-5">
                                {options.map((option, index) => (
                                    <p
                                        key={index}
                                        onClick={() => setSelected(index)}
                                        className={`border-2 p-2 max-sm:p-3 text-xl max-sm:text-sm rounded-4xl cursor-pointer transition
                                                ${selected === index
                                                ? "border-blue-900 bg-blue-900 text-white"
                                                : "border-gray-200 text-gray-100"}`}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                            {/* form */}
                            <div className='w-[80%] max-sm:hidden flex flex-row-reverse justify-center items-center bg-white dark:bg-[#272727] h-auto rounded-4xl p-5'>
                                <FormSearch selectedTab={options[selected]} />
                            </div>
                            <div className='max-sm:flex md:hidden w-full rounded-4xl bg-white '>
                                <FormSearchMobile selectedTab={options[selected]}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopSide