import { getCommentData } from '@/core/api/landing/api'
import CommentCard from '../../common/CommentCard'
import MySwiper from '@/components/common/Swiper'


const LandingComment = async () => {

    const response = await getCommentData()
    console.log("comments,", response)

    const slides = Array.isArray(response) ? response.map(item => ({
        id: item.id,
        content: <CommentCard value={item} />
    })) : []

    return (
        <div className='section-wrap flex w-full flex-col gap-8 py-8'>
            <p className='text-2xl text-right w-full'>
                مشتریان در باره ما چه می گویند ؟
            </p>

            {/* card holder */}
            <div className='w-full flex flex-row justify-center items-center gap-10'>
                <div className="w-full flex justify-center items-center gap-6 ">
                    {slides.length > 0 ? (
                        <MySwiper slides={slides} />
                    ) : (
                        <p className="text-center text-gray-500">
                            هیچ نظری یافت نشد
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LandingComment