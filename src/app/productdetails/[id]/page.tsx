import { getSingleProd } from '@/apis/productItem/getSingleProduct.api'
import ProductItem from '@/app/_components/ProductItem/ProductItem'
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {

    const id =( await params)?.id
    const product = await getSingleProd({id})
    
  return (
    <div className='container mx-auto max-w-[1280px]'>
        <ProductItem product={product}/>
       
    </div>
  )
}
