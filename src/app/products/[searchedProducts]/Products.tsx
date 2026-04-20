'use client'
import { getProducts } from '@/apis/featureProducts.api'
import ProductCard from '@/app/_components/ProductCard/ProductCard'
import ProductItem from '@/app/_components/ProductItem/ProductItem'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Products({searchedProduct}:{searchedProduct:string}) {
     const {data}= useQuery({
  queryKey:['products'],
  queryFn:getProducts
 })   
 const filteredData = data?.filter(prod => prod?.title.toLowerCase().includes(searchedProduct.toLowerCase()) || prod?.brand?.name.toLowerCase().includes(searchedProduct.toLowerCase())  )
 
 console.log('data', filteredData)
  return (

    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
        {filteredData?.map(prod =>  <ProductCard product={prod} key={prod?._id}></ProductCard>)}
       
    </div>
  )
}
