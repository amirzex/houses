import BlogDetail from '@/components/blog/BlogDetail'
import React, { FC, use } from 'react'

interface IProps {
    params: Promise<{ id: string }>
}

const page: FC<IProps> = ({ params }) => {

    const { id } = use(params)

    return (
        <div className='page-top w-full'>
            <BlogDetail id={id} />
        </div>
    )
}

export default page