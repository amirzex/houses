import CategoryDesktop from './CategoryDesktop/CategoryDesktop'
import CategoryMobile from './CategoryMobile/CategoryMobile'

const Category = () => {
    return (
        <div className='w-full flex flex-col text-right mt-30 max-sm:mt-10 p-10 max-sm:p-5 gap-10'>
            <div className=' w-full flex flex-col gap-4 text-center '>
                <p className='text-blue-700 text-2xl max-sm:text-xl'>فقط بگرد و پیدا کن</p>
                <p className='text-4xl max-sm:text-xl '>هر ملکی بخوای اینجا پیدا میشه!</p>
            </div>

            <div className='max-sm:hidden md:block'>
                <CategoryDesktop />
            </div>

            <div className='max-sm:block md:hidden'>
                <CategoryMobile />
            </div>
        </div>

    )
}

export default Category