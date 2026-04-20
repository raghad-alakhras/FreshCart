'use client'

import { addToCart } from '@/apis/cart/actions/addToCart.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
interface BtnUtlties{
    children:React.ReactNode,
    cls:string,
    id:string
}

export default  function AddToCartButton ({children,cls,id}:BtnUtlties) {
  const queryClient = useQueryClient()
  const{mutate,data}= useMutation({
    mutationFn:addToCart,
    onSuccess:()=>{
       toast.success('Product Added Successfully',{
        position:'top-right'
       })
       queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError:()=>{
          toast.error('login first',{
              position:'top-right'
        })
    }
  })
    function handleAddToCart(){
    mutate(id)
    }
  return (
      <button className={cls} onClick={handleAddToCart}>
                {children}
      </button>
  )
}
