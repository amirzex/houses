
import RentDetail from '@/components/rent/RentDetail'
import { FC, use } from 'react'

interface IProps {
    params: Promise<{ id: string }>
}

const page: FC<IProps> = ({ params }) => {

    const { id } = use(params)
    
    return (
        <div className='flex flex-col justify-center items-center mt-30'>
            <RentDetail id={id} />
        </div>
    )
}

export default page