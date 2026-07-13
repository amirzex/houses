import BlogDetail from '@/components/blog/BlogDetail'
import React, { FC, use } from 'react'

interface IProps {
    params: Promise<{ id: string }>
}

const page: FC<IProps> = ({ params }) => {

    const { id } = use(params)

    return (
        <div className='w-full flex flex-col justify-center items-center mt-30 p-10'>
            <BlogDetail id={id} />
        </div>
    )
}

export default page