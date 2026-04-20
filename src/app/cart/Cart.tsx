'use client'
import { clearCart } from '@/apis/cart/actions/clearCart.action'
import { deleteCartItem } from '@/apis/cart/actions/deleteCart.action'
import { updateCart } from '@/apis/cart/actions/updateCart.action'
import { CartProduct, productItem } from '@/interfaces/ProductCart.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaArrowLeft, FaCartShopping, FaLock, FaRegTrashCan } from 'react-icons/fa6'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { TbCardsFilled, TbTruckDelivery } from 'react-icons/tb'
import { toast } from 'sonner'

export default function Cart() {
   const queryClient = useQueryClient()
   
    const {data} = useQuery<CartProduct>({
        queryKey:['cart'],
        queryFn:async()=>{

           const data = await fetch(`/api/cart`)
           if(!data.ok){
            toast.error(data?.statusText || 'unathorized User',{position:'top-right'})
           }
      
           return data.json()
        }
    })
   
    console.log(data)
     // clear cart item
        const{mutate:clearMutate,data:clearData,isPending:clearPending} = useMutation({
        mutationFn:clearCart,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    })
    if(clearPending){
        return (
            <div className='h-screen flex items-center justify-center'>
                <LiaSpinnerSolid className='animate-spin text-2xl' />
            </div>
        )
    }


  return (
    <div className='container mx-auto max-w-[1280px]'>
        <p className='flex items-center gap-3 *:text-sm my-2'>
            <Link href={'/'} className='text-gray-600'>Home  /</Link>
            <Link href={'/cart'}>Shopping Cart</Link>
        </p>
        <div className="flex items-center gap-2 mt-6 mb-2">
            <div className="size-12 rounded-xl bg-linear-to-bl from-green-700 to-green-400 flex items-center justify-center text-white">
                <FaCartShopping className='text-2xl' />
            </div>
            <p className='text-[30px] font-bold'>Shopping Cart</p>
        </div>
        <p className='text-gray-600 ml-2 mb-3'>You have <span className='text-green-600'>{data?.numOfCartItems}</span> items in your cart</p>

        <div className="lg:flex gap-7">
           <div className="lg:w-3/4">
             {data?.data?.products?.map((product:productItem)=><ProductCart prod={product} key={product?.product?._id}/>)}
                 {
                data?.data?.products.length === 0 &&  
                <><h3 className='text-center my-5' >your cart is Empty</h3></>
             }
             <div className="flex items-center justify-between my-8 *:flex *:items-center *:gap-2">
                 <Link href={'/'} className="text-green-600 text-md  group">
                    <FaArrowLeft className='group-hover:-translate-x-2 transition-all duration-400'/>
                    <span>Continue Shopping</span>
                </Link>
          {
            data?.data?.products?.length  &&  <button  
                 onClick={()=>{ clearMutate() }}
                 className="text-gray-600 text-md cursor-pointer ">
                    <FaRegTrashAlt/>
                    <span>Clear Cart</span>
                </button>
          }
           
             </div>
         
           </div>
             <div className="lg:w-1/4 rounded-xl shadow-sm shadow-gray-200">
            <div className="px-6 py-4 bg-linear-to-r from-green-600 to-green-700 rounded-t-xl">
              <div className="flex items-center gap-1 text-white">
                <FaLock />
                <h6>Order Summary</h6>
              </div>
              <p className="text-white/70 text-sm my-1">{data?.numOfCartItems} items in your cart</p>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-5 bg-green-50 text-green-600 p-2 rounded-md">
                   <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TbTruckDelivery  className='text-xl'/>
                   </div>
                   <div>
                    <p className="font-semibold">Free Shipping!</p>
                    <p className="text-sm mt-1">You qualify for free delivery</p>
                   </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 font-semibold">Subtotal</p>
                    <p className=" font-bold">{data?.data?.totalCartPrice} EGP</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 font-semibold">Shipping</p>
                    <p className="text-green-600 font-semibold">FREE</p>
                </div>
                <div className="flex justify-between items-center mt-4  pt-2 border-t border-dashed border-gray-200">
                    <p className="font-bold">Total</p>
                    <p className=" font-extrabold">{data?.data?.totalCartPrice} <span className='font-light text-gray-600 text-sm'>EGP</span></p>
                </div>
                <button className="border border-dashed border-gray-300 my-4 rounded-lg w-full py-3 text-gray-600 flex items-center justify-center gap-2">
                    <TbCardsFilled />
                    <span>Apply Promo Code</span>
                </button>
                <Link href={`/checkout`} className="bg-linear-to-r from-green-600 to-green-700 shadow-lg shadow-green-100 text-white my-4 rounded-lg w-full py-3 flex items-center justify-center gap-2">
                    <FaLock />
                    <span>Secure Checkout</span>
                </Link>
                <div className="flex items-center my-4 justify-center gap-1 *:flex *:items-center *:gap-1 *:text-xs">
                    <div className='pr-3 border-r border-gray-200'>
                        <AiFillSafetyCertificate className='text-md text-green-600' />
                        <span className='text-gray-600'>Secure Payment</span>
                    </div>
                    <div >
                        <CiDeliveryTruck className='text-md text-blue-600' />
                        <span className='text-gray-600'>Fast Delivery</span>
                    </div>

                </div>
                 <Link href={'/'} className="text-green-600 mt-6 text-md  w-full  flex items-center justify-center gap-2 group">
                    <FaArrowLeft className='group-hover:-translate-x-2 transition-all duration-400'/>
                    <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
        </div>
        
    </div>
  )
}


function ProductCart({prod}:{prod:productItem}){
        const queryClient = useQueryClient()

    // delete cart item
        const{mutate:delMutate,data:deleteData,isPending:delPending} = useMutation({
        mutationFn:deleteCartItem,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    })
    // update cart item
        const{mutate:updateMutate,data:updateData,isPending:updatePending} = useMutation({
        mutationFn:updateCart,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    })

    function handlemutate(productId:string,count:number){
        updateMutate({prodId:productId,count})
    }
   

    return (
        <>
        <div className="flex  gap-4 p-[20px] rounded-lg shadow-sm shadow-gray-200 mb-5">
           <Image src={prod?.product?.imageCover} alt={prod?.product?.title} width={100} height={100} className='w-[120px] h-[160px] object-cover'/>

           <div className='w-full'>
            <h5 className='text-gray-800'>{prod?.product?.title}</h5>
            <div className="flex items-center gap-2 mt-1">
                <div className="px-1 py-2 bg-green-50 text-green-600 text-xs rounded-full">
                    {prod?.product?.category?.name}
                </div>
                <p className='text-gray-600 text-xs'>SKU: {prod?.product?._id.slice(-6,-1)}</p>
            </div>
            <div className="flex gap-2 items-center my-3">
                <h6 className='text-green-600'>{prod?.price} EGP</h6>
                <p className='text-gray-500 text-xs'>Per unit</p>
            </div>

            <div className="w-full md:flex md:justify-between md:items-center mt-3">
                <div className="flex justify-between gap-2 items-center p-1 rounded-md bg-gray-50 border border-gray-200">
                    <button className={`bg-white cursor-pointer border rounded-lg size-8 font-bold flex items-center justify-center border-gray-300 ${updatePending ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={()=>{
                        handlemutate(prod?.product?._id, prod?.count+1)
                      }}
                    >
                       +
                    </button>
                    <span className="font-semibold mx-2">{prod?.count}</span>
                    <button className={`bg-green-600 cursor-pointer text-white size-8 font-bold flex items-center justify-center rounded-lg border border-gray-300 ${updatePending ? 'opacity-50 cursor-not-allowed' : ''}`}
                     onClick={()=>{
                        handlemutate(prod?.product?._id, prod?.count-1)
                      }}
                    >
                         -
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-gray-500 text-xs">Total</p>
                       <h6 className='flex items-center gap-1'>{prod?.price * prod?.count} <p className="text-gray-500 text-xs">EGP</p></h6>
                    </div>
                    <div onClick={()=>{
                        delMutate(prod?.product?._id)
                    }}  className="size-9 rounded-lg cursor-pointer flex items-center justify-center bg-red-50 text-red-600">
                        {delPending?<LiaSpinnerSolid className='animate-spin'/>:<FaRegTrashCan />}
                    </div>
                </div>
            </div>
           </div>
        </div>
        </>
    )
}