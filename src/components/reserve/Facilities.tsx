import Image from 'next/image'
import parkingg from '../../assets/reserve/CarParking02Icon.svg'
import member from '../../assets/details/user.svg'
import bath from '../../assets/details/whater.svg'
import room from '../../assets/details/BedIcon.svg'

const FacilitiesRent = ({ bathrooms, parking, rooms, capacity }) => {
    return (
        <div className=' w-full flex flex-row flex-wrap gap-5 p-10'>
            {/* cards */}

            <div className='w-[30%] bg-[#FFFFFA] dark:bg-[#272727] rounded-2xl  p-3 flex flex-col gap-1 justify-center items-center border  hover:border-r-6 hover:border-blue-900 transition-all duration-200 hover:bg-blue-100'>
                <div className='w-full flex justify-center items-center '>
                    <Image src={parkingg} alt='' unoptimized className='bg-blue-900 w-15 p-3  rounded-full' />
                </div>
                <h2 className='text-blue-900'>پارکینگ</h2>
                <p className='text-gray-300'>{parking}</p>
            </div>
            <div className='w-[30%] bg-[#FFFFFA] dark:bg-[#272727]  rounded-2xl  p-3 flex flex-col gap-1 justify-center items-center border  hover:border-r-6 hover:border-blue-900 transition-all duration-200 hover:bg-blue-100'>
                <div className='w-full flex justify-center items-center '>
                    <Image src={member} alt='' unoptimized className='bg-blue-900 w-15 p-3  rounded-full' />
                </div>
                <h2 className='text-blue-900'>ظرفیت</h2>
                <p className='text-gray-300'>{capacity}</p>
            </div>
            <div className='w-[30%] bg-[#FFFFFA] dark:bg-[#272727] rounded-2xl  p-3 flex flex-col gap-1 justify-center items-center border  hover:border-r-6 hover:border-blue-900 transition-all duration-200 hover:bg-blue-100'>
                <div className='w-full flex justify-center items-center '>
                    <Image src={bath} alt='' unoptimized className='bg-blue-900 w-15 p-3  rounded-full' />
                </div>
                <h2 className='text-blue-900'>حمام</h2>
                <p className='text-gray-300'>{bathrooms}</p>
            </div>
            <div className='w-[30%] bg-[#FFFFFA] dark:bg-[#272727] rounded-2xl  p-3 flex flex-col gap-1 justify-center items-center border  hover:border-r-6 hover:border-blue-900 transition-all duration-200 hover:bg-blue-100'>
                <div className='w-full flex justify-center items-center '>
                    <Image src={room} alt='' unoptimized className='bg-blue-900 w-15 p-3  rounded-full' />
                </div>
                <h2 className='text-blue-900'>اتاق</h2>
                <p className='text-gray-300'>{rooms}</p>
            </div>

        </div>
    )
}

export default FacilitiesRent