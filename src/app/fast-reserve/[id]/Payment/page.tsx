import PayMentsForm from '@/components/common/PayMentsForm'
import React, { FC, use } from 'react'
interface IProps {
  params: Promise<{ id: string }>
}

const page: FC<IProps> = ({params}) => {
  const { id } = use(params)
  return (
    <div className='w-full flex flex-col justify-center items-center gap-10 mt-30'>
      <PayMentsForm id={id} />
    </div>
  )
}

export default page