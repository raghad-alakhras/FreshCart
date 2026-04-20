import { getSubcategories } from '@/apis/categories/subcategory.api'
import { getProducts } from '@/apis/featureProducts.api'
import ProductCard from '@/app/_components/ProductCard/ProductCard'
import Link from 'next/link'
import React from 'react'
import { IoLayers } from 'react-icons/io5'

export default async function page({params}:{params:Promise<{categoryId:string}>}) {
    const categoryId = (await params)?.categoryId
    const allProducts =await getProducts()
    const categoryProducts= allProducts?.filter(prod=>prod.category?._id === categoryId)
    if(categoryProducts.length === 0){
      return <h3 className='text-center my-20'>There's no Products to This Category Yet.</h3>
    }
   
  return (
       <div>
        <div className="bg-linear-to-r from-green-600 to-green-500 my-4 px-30 py-10 h-fit">
          <p className="flex items-center gap-3 *:text-sm my-2">
                  <Link href={"/"} className="text-gray-300">
                    Home /{" "}
                  </Link>
                 
                  <Link href={`/category/${categoryId}`} className="text-white">
                    Categories
                  </Link>
                  
                </p>
                <div className="flex items-center gap-6 my-5">
                  <div className="size-16 rounded-lg bg-green-400/50 text-white flex items-center justify-center">
                    <IoLayers className='text-4xl' />
                  </div>
                  <div>
                    <h2 className='text-white'>All {categoryProducts[0]?.category?.name} Category Products</h2>
                    <p className="text-sm text-gray-50 mt-1">Browse our wide range of product categories</p>
                  </div>
                </div>
        </div>
       <div className="container mx-auto max-w-[1280px] my-10">
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
         {categoryProducts?.map(prod=> <ProductCard key={prod?._id} product={prod}/>)}
       </div>
          </div>
    </div>
  )
}
