import Image from 'next/image'
import LoadingGif from '../assets/landing/output-onlinegiftools.gif'

const Loading = () => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30'>
            <Image
                width={200}
                height={200}
                src={LoadingGif}
                alt='loading'
                unoptimized />
        </div>
    )
}

export default Loading