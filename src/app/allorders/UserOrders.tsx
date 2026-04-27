'use client'
import { getUserOrder } from '@/apis/userOrders/getUserOrder.api'
import { OrderData } from '@/interfaces/OrderData.interface'
import { formatDate } from '@/utilties/formatDate'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiSolidCalendarHeart } from 'react-icons/bi'
import { FaCreditCard, FaListAlt, FaMoneyBill, FaPhone } from 'react-icons/fa'
import { FaBagShopping, FaLocationDot } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { PiShoppingBagFill } from 'react-icons/pi'
import { TbBusFilled } from 'react-icons/tb'
import { GoClockFill } from "react-icons/go";

export default function UserOrders() {

const {data:orderData}= useQuery<OrderData[]>({
    queryKey:['order'],
    queryFn:getUserOrder
})

  return (
    <div>
        <p className='flex items-center gap-3 *:text-sm my-7'>
            <Link href={'/'} className='text-gray-600'>Home  /</Link>
            <Link href={'/allorders'}>My Orders</Link>
        </p>
     <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 mt-6 mb-2">
                    <div className="size-12 rounded-xl bg-linear-to-bl from-green-700 to-green-400 flex items-center justify-center text-white">
                        <PiShoppingBagFill className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-[30px] font-bold'>My Orders</p>
                    <p className='text-gray-600  text-sm '>Track and manage your {orderData?.length} orders</p>
                    </div>
                </div>
                <Link className='text-green-600 text-sm' href={'/'}>Continue Shopping</Link>
     </div>
                {orderData?.map((order:OrderData)=> <OrderDetails order={order} key={order._id}></OrderDetails>)}

                 
    </div>
  )
}

function OrderDetails({order}:{order:OrderData}){
  
 const [openCart,setOpenCart] = useState(false)


    return (<>
    <div className="p-6 rounded-lg shadow-sm my-5 w-full">
        <div className="flex  justify-between">
           <div className='w-full'>
             <div className="flex w-full items-center gap-3">
                <div className="relative">
                    <Image src={order?.cartItems[0]?.product?.imageCover} alt={order?.cartItems[0]?.product?.title} width={20} height={20}
                className='size-20 object-cover rounded-md border border-gray-200'
                />
                {order?.cartItems.length >1 && <>
                <div className="absolute top-0 right-0 size-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
                    +{order?.cartItems.length - 1}
                </div>
                </>}
                </div>
                <div className='flex-1'>
                    {order?.isDelivered?<div className='py-1 px-2 rounded-full bg-blue-100 text-xs text-blue-700 flex items-center gap-1 w-fit'>
                        <TbBusFilled />
                        <span>on the way</span>
                    </div>:<div className='py-1 px-2 rounded-full bg-yellow-100 text-xs text-yellow-700 flex items-center gap-1 w-fit'>
                        <AiFillClockCircle />
                        <span>proccessing</span>
                    </div>}
                    <p className="text-gray-500 mt-1"># <span className="text-black font-bold">{order?.id}</span></p>
                    <div className="flex-col md:flex items-center my-1 gap-5 *:flex *:items-center *:gap-2 *:text-xs *:text-gray-600">
                        <div>
                            <BiSolidCalendarHeart />
                            <span>{formatDate(order?.createdAt)}</span>
                        </div>
                        <div>
                            <FaBagShopping />
                            <span>{order?.cartItems.length} items</span>
                        </div>
                        <div>
                            <FaLocationDot />
                            <span>{order?.shippingAddress?.city || '?'} city</span>
                        </div>

                    </div>
                    <div className="flex items-center mt-7 justify-between ">
                        <p className="font-bold">{order?.totalOrderPrice} <span className="font-normal text-gray-600">EGP</span></p>
                        {openCart? <button onClick={()=>{setOpenCart(!openCart)}} className="px-4 py-2 font-semibold bg-green-600 text-white flex items-center gap-1 text-xs text-gray-900 rounded-md shadow-md">
                          Hide  <MdKeyboardArrowUp />
                            </button>: <button 
                            onClick={()=>{setOpenCart(!openCart)}}
                            className="px-4 py-2 font-semibold bg-gray-200 flex items-center gap-1 text-xs text-gray-900 rounded-md">
                          Details  <MdKeyboardArrowDown />
                            </button>}
                       
                    </div>
              
                </div>      
            </div>
             {openCart && <div className='mt-6'>
                        <div className="flex items-center gap-5">
                            <div className="size-6 text-xs rounded-md bg-green-50 text-green-600 flex items-center justify-center">
                                <FaListAlt />
                            </div>
                            <h6 className="text-sm">Order Items</h6>
                        </div>
                        {order?.cartItems?.map( cart=>{return <>
                        <div className='flex items-center justify-between p-4 rounded-lg'>
                            <div className="flex items-center gap-3">
                                <Image src={cart?.product?.imageCover} alt={cart?.product?.title} width={30} height={30} className='object-cover size-16 rounded-md'/>
                                <div>
                                    <p className="font-semibold mb-1">{cart?.product?.title}</p>
                                    <p className="font-light text-gray-500 text-sm mb-1">{cart?.count} x {cart?.price} EGP</p>
                                </div>
                            </div>
                            <div>
                                <h6>{cart?.count*cart?.price}</h6>
                                <p className="text-gray-500 text-sm">EGP</p>
                            </div>
                        </div>
                       
                        </>})}
                        {/* order details */}
                         <div className="md:flex md:gap-10 *:w-full *:md:w-1/2 *:p-4 *:rounded-lg *:border ">
                           <div className='border-gray-200 my-5'>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <IoLocationSharp />
                                </div>
                               <h6 className="text-sm">Delivery Address</h6>
                            </div>
                            <p className='font-semibold'>{order?.shippingAddress?.city||'x city'}</p>
                            <p className='text-gray-600 text-sm my-2'>{order?.shippingAddress?.phone||'x address'}</p>
                            <p className='text-gray-600 text-sm flex items-center gap-1'>
                                <FaPhone />
                                {order?.shippingAddress?.phone || '010xxxxxxx'}</p>

                           </div>
                           <div className='bg-orange-50 border-orange-300'>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-6 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center">
                                   <GoClockFill />
                                </div>
                               <h6 className="text-sm">Order Summary</h6>
                            </div>
                           <div className='my-4 *:flex *:items-center *:justify-between *:text-gray-500 *:text-sm'>
                            <div>
                                <p>Subtotal:</p>
                                <p>{order?.totalOrderPrice} EGP</p>
                            </div>
                            <div className='mt-2 pb-5'>
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>
                            <div className="pt-5 border-t border-gray-300">
                                <p className="font-bold text-black">Total:</p>
                                <p className="font-black text-black">{order?.totalOrderPrice} EGP</p>
                            </div>
                           </div>
                           </div>
                        </div>
                        </div>}
           </div>

           {order?.paymentMethodType==="cash"?
           <div className='size-8 rounded-md bg-gray-200 text-gray-500 flex items-center justify-center'>
           <FaMoneyBill />
           </div>
           :<div className='size-8 rounded-md bg-purple-200 text-purple-500 flex items-center justify-center'>
           <FaCreditCard />
           </div>}
        </div>

    </div>
    </>)
}