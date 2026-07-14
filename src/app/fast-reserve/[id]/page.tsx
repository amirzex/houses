
import FastReserveDetail from '@/components/reserve/FastReserveDetail'
import { FC, use } from 'react'

interface IProps {
    params: Promise<{ id: string }>
}

const page: FC<IProps> = ({ params }) => {

    const { id } = use(params)
    return (
        <div className='page-top w-full'>
            <FastReserveDetail id={id} />
        </div>
    )
}

export default page