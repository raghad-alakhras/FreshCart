import Link from 'next/link'
import React from 'react'
import { SiBrandfetch } from "react-icons/si";
import { getAllBrands } from '@/apis/brands/getAllBrands.api';
import Image from 'next/image';

export default async function page() {
   const payload =await getAllBrands()
  return (
    <div>
        <div className="bg-linear-to-r from-purple-600 to-purple-500 my-4 px-30 py-10 h-fit">
          <p className="flex items-center gap-3 *:text-sm my-2">
                  <Link href={"/"} className="text-gray-300">
                    Home /{" "}
                  </Link>
                  <Link href={"/brands"} className="text-white">
                    brands
                  </Link>
                  
                </p>
                <div className="flex items-center gap-6 my-5">
                  <div className="size-16 rounded-lg bg-purple-400 text-white flex items-center justify-center">
                    <SiBrandfetch className='text-xl' />
                  </div>
                  <div>
                    <h2 className='text-white'>Top Brands</h2>
                    <p className="text-sm text-gray-50 mt-1">Shop from your favorite brands</p>
                  </div>
                </div>
        </div>
       <div className="container mx-auto max-w-[1280px]">
     <div className='grid grid-cols-2  gap-4 md:grid-cols-6'>
{payload?.data?.map(brand => <Link href={`/brand/${brand?._id}`} key={brand?._id} className='border mb-2 border-gray-200 rounded-lg'>
    <Image src={brand?.image} alt={brand?.name} width={20} height={30} className='w-full'/>
    <p className="font-semibold text-center px-3 py-2">{brand?.name}</p>
</Link>)}
    </div>
   </div>
    </div>
  )
}
