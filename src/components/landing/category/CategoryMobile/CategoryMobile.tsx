import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import boom from '../../../../assets/landing/boom.png'
import arrow from '../../../../assets/landing/Frame.svg'
import apartment from '../../../../assets/landing/apartment.jpg'
import kolbe from '../../../../assets/landing/kolbe.jpg'
import beech from '../../../../assets/landing/beech.png'
import pool from '../../../../assets/landing/pool.jpg'
import villa from '../../../../assets/landing/villa.png'

const CategoryMobile = () => {
    return (
        <div>


            {/* والد: flex-nowrap برای جلوگیری از شکستن خط و snap-x برای اسکرول نرم */}
            <div className='w-full flex flex-row flex-nowrap max-sm:justify-start justify-center items-center gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scroll py-4 max-sm:px-4'>

                {/* left div */}
                {/* فرزند: shrink-0 برای فشرده نشدن و snap-center برای قرار گرفتن در مرکز موقع اسکرول */}
                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 rounded-4xl flex justify-center overflow-hidden '>
                    <Image
                        src={boom}
                        fill
                        alt="landing background"
                        className=" object-cover overflow-hidden brightness-75 hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />
                    <Link href={"/"} className=' absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[35%] rounded-4xl'>بوم گردی </Link>
                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75  "
                            unoptimized
                        />
                    </button>
                </div>

                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 overflow-hidden rounded-4xl'>
                    <Image
                        src={kolbe}
                        fill
                        alt="landing background"
                        className="h-full object-cover overflow-hidden brightness-75 rounded-4xl hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />
                    <Link href={"/"} className='absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[35%] rounded-4xl'>ملک کلبه</Link>
                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75  "
                            unoptimized
                        />
                    </button>

                </div>

                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 overflow-hidden rounded-4xl'>
                    <Image
                        src={beech}
                        fill
                        alt="landing background"
                        className="h-full object-cover overflow-hidden brightness-75 rounded-4xl hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />
                    <Link href={"/"} className='absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[40%] rounded-4xl'>ملک ساحلی </Link>

                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75 "
                            unoptimized
                        />
                    </button>
                </div>

                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 overflow-hidden rounded-4xl'>
                    <Image
                        src={villa}
                        fill
                        alt="landing background"
                        className="h-full object-cover overflow-hidden brightness-75 rounded-4xl hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />
                    <Link href={"/"} className='absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[40%] rounded-4xl'>ملک ویلایی </Link>

                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75  "
                            unoptimized
                        />
                    </button>
                </div>

                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 overflow-hidden rounded-4xl'>
                    <Image
                        src={pool}
                        fill
                        alt="landing background"
                        className="h-full object-cover overflow-hidden brightness-75 rounded-4xl hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />

                    <Link href={"/"} className='absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[40%] rounded-4xl'> استخر دار </Link>
                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75 "
                            unoptimized
                        />
                    </button>
                </div>

                {/* right div */}
                <div className='relative w-[16.6%] max-sm:w-[80vw] shrink-0 snap-center h-110 rounded-4xl flex justify-center overflow-hidden '>
                    <Image
                        src={apartment}
                        fill
                        alt="landing background"
                        className=" object-cover overflow-hidden brightness-75 hover:scale-110 transition-all duration-300 hover:brightness-100"
                        unoptimized
                    />
                    <Link href={"/"} className=' absolute bottom-5 right-5 bg-white text-black text-center text-2xl max-sm:text-xl p-2 w-[35%] rounded-4xl'>آپارتمان  </Link>
                    <button className='absolute bottom-5 left-5 bg-white w-[10%] max-sm:w-12 max-sm:h-12 flex justify-center items-center rounded-full overflow-hidden'>
                        <Image
                            src={arrow}
                            width={100}
                            alt="landing background"
                            className=" object-cover overflow-hidden brightness-75 "
                            unoptimized
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CategoryMobile
