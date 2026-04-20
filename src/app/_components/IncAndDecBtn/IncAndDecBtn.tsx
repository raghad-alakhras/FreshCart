'use client'
import { updateCart } from '@/apis/cart/actions/updateCart.action'
import { ProductInterface } from '@/interfaces/ProductInterface.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function IncAndDecBtn({product}:{product:ProductInterface}) {
   const [count, setCount] = useState(product?.count || 1)
   const queryClient = useQueryClient()

   const {mutate:updateMutate, isPending:updatePending} = useMutation({
        mutationFn:updateCart,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    })

   function handleCount(newCount:number){
     if(newCount < 1) return
     setCount(newCount)
     updateMutate({prodId:product._id, count:newCount})
   }


  return (
    <>
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                  onClick={()=>{handleCount(count+1)}}
                  disabled={updatePending}
                  className='p-4 cursor-pointer flex items-center text-gray-600 justify-center disabled:opacity-50'>+</button>
                  <button className='p-4 flex items-center text-gray-800 justify-center'>{count}</button>
                  <button 
                   onClick={()=>{handleCount(count-1)}}
                   disabled={updatePending}
                  className='p-4 cursor-pointer flex items-center text-gray-600 justify-center disabled:opacity-50'>-</button>
                </div>   
   </>
  )
}
