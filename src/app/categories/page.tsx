import Link from 'next/link'
import React from 'react'
import { SiBrandfetch } from "react-icons/si";
import Image from 'next/image';
import { getCategoris } from '@/apis/categories/allCategories.api';
import { IoLayers } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { getSubcategories } from '@/apis/categories/subcategory.api';

export default async function page() {
   const payload =await getCategoris()
   const firstCategoryId = payload?.[0]?._id
   const data = firstCategoryId ? await getSubcategories(firstCategoryId) : []
   
  return (
    <div>
        <div className="bg-linear-to-r from-green-600 to-green-500 my-4 md:px-30 px-6 py-10 h-fit">
          <p className="flex items-center gap-3 *:text-sm my-2">
                  <Link href={"/"} className="text-gray-300">
                    Home /{" "}
                  </Link>
                  <Link href={"/categories"} className="text-white">
                    Categories
                  </Link>
                  
                </p>
                <div className="flex items-center gap-6 my-5">
                  <div className="w-16 h-10 md:size-16 rounded-lg bg-green-400/50 text-white flex items-center justify-center">
                    <IoLayers className='text-lg md:text-4xl' />
                  </div>
                  <div>
                    <h2 className='text-white'>All Categories</h2>
                    <p className="text-sm text-gray-50 mt-1">Browse our wide range of product categories</p>
                  </div>
                </div>
        </div>
       <div className="container mx-auto max-w-[1280px] my-10">
        {/* category cards */}
        <h2 className="my-7 before:absolute before:left-0 before:top-0 relative before:w-2 before:h-10 before:rounded-full before:bg-linear-to-b before:from-green-300 before:to-green-700 pl-5 my-5">Shop By <span className="text-green-600">Categories</span></h2>
     <div className='grid grid-cols-2  gap-4 md:grid-cols-6'>
{payload?.map(category => <Link href={`/category/${category?._id}`} key={category?._id} className='group h-fit hover:-translate-y-4 hover:shadow-md transition-all duration-400 shadow-sm border mb-7 p-4 border-gray-200 rounded-lg'>
    <Image src={category?.image} alt={category?.name} width={20} height={30} className='w-full h-[200px] object-cover rounded-xl'/>
    <p className="font-semibold text-center px-3 py-2 group-hover:text-green-600 transition-colors duration-300">{category?.name}</p>
    <div className="font-semibold text-xs my-2 hidden group-hover:flex text-green-600 gap-2 items-center justify-center transition-all duration-300">
        <span>View Products</span>
        <FaArrowRight />
    </div>
</Link>)}

   
    </div>
    {/* subactegory cards */}
      <h2 className="my-7 before:absolute before:left-0 before:top-0 relative before:w-2 before:h-10 before:rounded-full before:bg-linear-to-b before:from-green-300 before:to-green-700 pl-5 my-5">Shop By <span className="text-green-600">SubCategories</span></h2>
      <div className='grid grid-cols-3  gap-4 md:grid-cols-6'>
{data?.map(subCateg => <Link href={`/subcategory/${subCateg?._id}`} key={subCateg?._id} className='group h-fit hover:-translate-y-4 hover:shadow-md transition-all duration-400 shadow-sm border mb-7 p-4 border-gray-200 rounded-lg'>
   
    <p className="font-semibold text-center px-3 py-2 group-hover:text-green-600 transition-colors duration-300">{subCateg?.name}</p>
</Link>)}
    </div>
   </div>
    </div>
  )
}

