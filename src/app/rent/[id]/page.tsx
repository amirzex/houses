
import RentDetail from '@/components/rent/RentDetail'
import { FC, use } from 'react'

interface IProps {
    params: Promise<{ id: string }>
}

const page: FC<IProps> = ({ params }) => {

    const { id } = use(params)
    
    return (
        <div className='page-top w-full'>
            <RentDetail id={id} />
        </div>
    )
}

export default page