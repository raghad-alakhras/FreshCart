
import React from 'react'
import Products from './Products'
import Link from 'next/link'
import { IoLayers } from 'react-icons/io5'

export default async function page({params}:{params : Promise<{searchedProducts:string}>}) {
    const searchedProducts = (await params)?.searchedProducts
    


  return (
    <>
     <div className="bg-linear-to-r from-green-600 to-green-500 my-4 px-30 py-10 h-fit">
          <p className="flex items-center gap-3 *:text-sm my-2">
                  <Link href={"/"} className="text-gray-300">
                    Home /{" "}
                  </Link>
                 
                  <Link href={`/products/${searchedProducts}`} className="text-white">
                    Products
                  </Link>
                  
                </p>
                <div className="flex items-center gap-6 my-5">
                  <div className="size-16 rounded-lg bg-green-400/50 text-white flex items-center justify-center">
                    <IoLayers className='text-4xl' />
                  </div>
                  <div>
                    <h2 className='text-white'>Targeted Products</h2>
                    <p className="text-sm text-gray-50 mt-1">Browse our wide range of products</p>
                  </div>
                </div>
        </div>
        <div className='my-10 container mx-auto max-w-[1280px]'>

      <Products searchedProduct={searchedProducts}/>
    </div>
    </>
    
  )
}
