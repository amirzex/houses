import Image from 'next/image'
import bg from '../../../assets/landing/howshouldi.svg'
import bgMobile from '../../../assets/landing/bg mobile.svg'

const Help = () => {
    return (
        <section className='section-wrap mt-16 overflow-hidden rounded-3xl sm:mt-24 md:rounded-[3rem] md:rounded-r-[5rem]'>
            <Image
                src={bg}
                alt='راهنمای استفاده'
                unoptimized
                className='hidden w-full md:block' />
            <Image
                src={bgMobile}
                alt='راهنمای استفاده'
                unoptimized
                className='w-full md:hidden' />
        </section>
    )
}

export default Help
