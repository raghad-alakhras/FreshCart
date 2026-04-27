import { getProducts } from '@/apis/featureProducts.api'
import ProductCard from '@/app/_components/ProductCard/ProductCard'
import Link from 'next/link'
import React from 'react'
import { IoLayers } from 'react-icons/io5'

export default async function page({params}:{params:Promise<{subcategoryId:string}>}) {
     const subcategoryId = (await params)?.subcategoryId
     const allProoducts = await getProducts()
     const filteredData = allProoducts?.filter(prod=>prod?.subcategory[0]?._id === subcategoryId)
      if(filteredData.length === 0){
      return <h3 className='text-center my-20'>There's no Products to This SubCategory Yet.</h3>
    }
  return (
        <div>
        <div className="bg-linear-to-r from-green-600 to-green-500 my-4 md:px-30 px-6 py-10 h-fit">
          <p className="flex items-center gap-3 *:text-sm my-2">
                  <Link href={"/"} className="text-gray-300">
                    Home /{" "}
                  </Link>
                 
                  <Link href={`/categories`} className="text-white">
                    Categories
                  </Link>
                  
                </p>
                <div className="flex items-center gap-6 my-5">
                  <div className="w-16 h-10 md:size-16 rounded-lg bg-green-400/50 text-white flex items-center justify-center">
                    <IoLayers className='text-lg md:text-4xl' />
                  </div>
                  <div>
                    <h2 className='text-white'>All  SubCategory Products</h2>
                    <p className="text-sm text-gray-50 mt-1">Browse our wide range of products</p>
                  </div>
                </div>
        </div>
       <div className="container mx-auto max-w-[1280px] my-10">
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
         {filteredData?.map(prod=> <ProductCard key={prod?._id} product={prod}/>)}
       </div>
          </div>
    </div>
  )
}
