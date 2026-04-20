import { getBrandProducts } from '@/apis/brands/getBrandDetails.api'
import ProductCard from '@/app/_components/ProductCard/ProductCard'
import React from 'react'

export default async function BrandPage({params}:{params:Promise<{brandId:string}>}) {
    const brandId = (await params)?.brandId
   const products =await getBrandProducts(brandId)
   if(products.length===0)
    return <p className='text-center font-semibold my-10'>There's No Products Yet</p>
  return (
    <div className='container mx-auto max-w-[1280px] my-10'>
        <p className='font-bold mb-4'>{products[0]?.brand?.name}'S Products:</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
         {products?.map(prod=> <ProductCard product={prod} key={prod?._id}/>)}
       </div>
        
    </div>
  )
}
