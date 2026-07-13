import Image from 'next/image'
import bg from '../../../assets/landing/howshouldi.svg'
import bgMobile from '../../../assets/landing/bg mobile.svg'

const Help = () => {
    return (
        <div className='w-full mt-30 overflow-hidden rounded-r-[100px] max-sm:rounded-2xl'>
            {/* desktop */}
            <Image
                src={bg}
                alt=''
                unoptimized
                className='w-full max-sm:hidden md:block' />
            {/* mobile */}
            <Image
                src={bgMobile}
                alt=''
                unoptimized
                className='w-full max-sm:block md:hidden' />
        </div>
    )
}

export default Help