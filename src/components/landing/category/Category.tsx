import CategoryDesktop from './CategoryDesktop/CategoryDesktop'
import CategoryMobile from './CategoryMobile/CategoryMobile'

const Category = () => {
    return (
        <section className='section-wrap mt-12 flex flex-col gap-6 text-right sm:mt-16 sm:gap-8 xl:mt-24 xl:gap-10'>
            <div className='flex w-full flex-col items-center gap-2 text-center'>
                <p className='section-eyebrow'>فقط بگرد و پیدا کن</p>
                <h2 className='section-title'>هر ملکی بخوای اینجا پیدا میشه!</h2>
            </div>

            {/* Full 6-col grid only on wide screens; scroll strip on laptop (e.g. 1366) */}
            <div className='hidden 2xl:block'>
                <CategoryDesktop />
            </div>

            <div className='2xl:hidden'>
                <CategoryMobile />
            </div>
        </section>
    )
}

export default Category
