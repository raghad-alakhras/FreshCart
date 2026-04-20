import { Category } from '@/interfaces/ProductInterface.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({cate}:{cate: Category}) {
  return (
    <Link href={`/category/${cate?._id}`} className='p-4 bg-white rounded-[8px] shadow-sm shadow-gray-300 hover:shadow-md'>
        <Image src={cate?.image} alt={cate?.name} width={100} height={100} className='size-20 rounded-full object-cover mx-auto'/>
        <h6 className='text-center text-gray-700 font-medium my-4'>{cate?.name}</h6>
    </Link>
  )
}
