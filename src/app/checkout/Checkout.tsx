"use client";
import { CartProduct, productItem } from "@/interfaces/ProductCart.interface";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBookmark, FaCity, FaCreditCard, FaLock, FaNewspaper, FaPhoneAlt, FaRegCreditCard } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { PiWarningCircle } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { onlinePayment } from "@/apis/checkout/checkout.api";
import { cachPayment } from "@/apis/checkout/cachPayment.api";
import { useRouter } from "next/navigation";


export default function Checkout() {
  const route = useRouter()
  interface formData{
    city:string,
    phone:string,
    details:string,
    postalCode:string
  }
  const { data: cartData } = useQuery<CartProduct>({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetch(`/api/cart`);
      if (!data.ok) {
        throw new Error("faild to fetch cart");
      }
      return data.json();
    },
  });  
 
  

  const {register,handleSubmit} = useForm<formData>()
  async function handleCheckOut(data:formData){
     const response =await  onlinePayment(cartData?.cartId! , data)
     if(response.status==='success'){
      window.location.href = response?.session?.url
     }
     console.log('online',response)
     
  }
  async function handleCachPayment(data:formData){
     const response =await  cachPayment(cartData?.cartId! , data)
    if(response?.status === 'success'){
       route.push(`/allorders`)
    }
     
     
  }


  return (
    <div>
      <p className="flex items-center gap-3 *:text-sm my-2">
        <Link href={"/"} className="text-gray-600">
          Home /{" "}
        </Link>
        <Link href={"/cart"} className="text-gray-600">
          cart /{" "}
        </Link>
        <Link href={"/checkout"}>Checkout</Link>
      </p>
      <div className="flex items-center gap-2 mt-6 mb-2">
        <div className="size-12 rounded-xl bg-linear-to-bl from-green-700 to-green-400 flex items-center justify-center text-white">
          <FaNewspaper className="text-2xl" />
        </div>
        <p className="text-[30px] font-bold">Complete Your Order</p>
      </div>
      <p className="text-gray-600 ml-2 mb-3">
        Review your items and complete your purchase
      </p>

      <div className="md:flex md:gap-10">
        <div className="md:w-2/3 mb-20 ">
        <div className=" rounded-md">
          <div className="px-6 py-4  rounded-t-lg bg-linear-to-r from-green-600 to-green-700 text-white flex items-center gap-3">
            <HiHome className="text-lg" />

            <div>
              <p className="font-semibold">Shipping address</p>
            <p className="text-sm mt-1 text-gray-200">
              Where should we deliver your order?
            </p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-6">
              <FaBookmark className="text-lg text-green-600" />
              <span className="font-semibold">Saved Addressed</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Select a saved address or enter a new one below
            </p>
            <div className="p-4 rounded-lg bg-blue-50 flex items-center gap-5 my-7">
              <div className="size-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                <PiWarningCircle className='text-lg' />
              </div>
              <div>
                <p className="text-blue-800">Delivery Information</p>
                <p className="text-blue-700 text-xs font-light mt-1">Please ensure your address is accurate for smooth delivery</p>
              </div>

            </div>

            {/* inputs */}
        <form>
          <div className="">
            
              {/* city */}
            <div className="my-5 ">
              <label htmlFor="city" className="font-semibold text-sm mb-3">City*</label>
            <div className="relative">
                <input type="text" {...register('city')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10  rounded-md border border-gray-300" placeholder="e.g. Cairo, Alexandria, Giza" />
              <div className="size-8 rounded-md absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 text-gray-600">
                <FaCity />
              </div>
            </div>
            </div>
            {/* street address */}
            <div className="my-5 ">
              <label htmlFor="details" className="font-semibold text-sm mb-3">Street Address*</label>
           <div className="relative">
               <input type="text" {...register('details')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10 rounded-md border border-gray-300" placeholder="Street name, building number, floor, apartment..." />
              <div className="size-8 rounded-md absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 text-gray-600">
                <FaLocationDot />
              </div>
           </div>
            </div>
            {/* phone number*/}
            <div className="my-5 ">
              <label htmlFor="phone" className="font-semibold text-sm mb-3">Phone Number*</label>
           <div className="relative">
               <input type="tel" {...register('phone')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10 rounded-md border border-gray-300" placeholder="01xxxxxxxxx" />
              
                <div className="size-8 rounded-md flex items-center absolute left-3 top-1/2 -translate-y-1/2 justify-center bg-gray-200 text-gray-600">
                <FaPhoneAlt />
              </div> 
           </div>
            </div>
          </div>
     {/* payment methods */}
          <div>
             <div className="px-6 py-4 mt-10 rounded-t-lg bg-linear-to-r from-green-600 to-green-700 text-white flex items-center gap-3">
            <FaRegCreditCard  className="text-lg" />

        <div>
              <p className="font-semibold">Payment Methods</p>
            <p className="text-sm mt-1 text-gray-200">
              Choose how you'd like to pay
            </p>
        </div>
          </div>
          <div className="p-6 *:p-5 *:bg-green-50 rounded-xl *:rounded-xl *:flex *:items-center *:gap-4 shadow-lg">
            <button
            type="submit"
            onClick={handleSubmit(handleCachPayment)}
            className=" focus:border-3 focus:border-green-600 w-full">
              <div className="size-14 rounded-lg bg-linear-to-b from-green-500 to-green-600 text-white flex items-center justify-center">
                 <FaRegCreditCard  className="text-xl" />
              </div>
              <div >
                <h6 className=" text-left">Cash on Delivery</h6>
                <p className="text-sm text-gray-500">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </button>
            <button
            type="submit"
            onClick={handleSubmit(handleCheckOut)}
            className=" focus:border-3 focus:border-green-600 w-full mt-4">
              <div className="size-14 rounded-md bg-gray-300 text-gray-500 flex items-center justify-center">
                 <FaRegCreditCard  className="text-xl" />
              </div>
              <div className="group">
                <h6 className=" text-left">Pay Online</h6>
                <p className="text-sm text-gray-500">
                  Secure payment with Credit/Debit Card via Stripe
                </p>
              </div>
            </button>

          </div>
          </div>
        </form>
          </div>
          </div>
         
         
        </div>
        <div className="md:w-1/3 h-fit pb-10  rounded-md mb-20 shadow-lg">
          <div className="px-6 py-4 rounded-t-lg bg-linear-to-r from-green-600 to-green-700 text-white flex items-center gap-3">
            <FaLock className="text-lg" />

            <div>
              <p className="font-semibold">Order Summary</p>
              <p className="text-sm mt-1 text-gray-200">
                {cartData?.numOfCartItems} items
              </p>
            </div>
          </div>
          <div className="p-5 *:flex *:items-center *:justify-between *:p-4 *:rounded-md *:bg-green-50/30">
            {cartData?.data?.products?.map((product: productItem) => (
              <>
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={product?.product?.imageCover}
                      alt={product?.product?.title}
                      width={14}
                      height={14}
                      className="size-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product?.product?.title}</p>
                      <p className="text-gray-400 text-sm">
                        {product?.count} x {product?.price} EGP
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">{product?.count * product?.price}</p>
                </div>
              </>
            ))}
          </div>

       <div className="p-4">
           <div className="flex items-center justify-between pt-5  border-t border-gray-200">
            <p className=" text-gray-600">Subtotal</p>
            <p className="text-gray-600">
              {cartData?.data?.totalCartPrice} EGP
            </p>
          </div>
          <div className="flex items-center justify-between pt-5  ">
            <p className=" text-gray-600">Shipping</p>
            <p className="text-green-600 font-semibold">Free</p>
          </div>
          <div className="flex items-center justify-between pt-10  ">
            <p className="font-bold text-gray-600">Total</p>
            <p className="text-green-600 font-semibold flex items-center gap-1">
              <span>{cartData?.data?.totalCartPrice}</span>
              <span className="text-gray-500 text-sm font-light">EGP</span>
            </p>
          </div>
          <Link href={'/allorders'} className="w-full mx-4 my-6 bg-linear-to-r font-semibold from-green-600 to-green-700 gap-2 rounded-lg py-4 text-white shadow-md shadow-gray-300 flex items-center justify-center">
            <FaCreditCard />
            <span>Place Order</span>
          </Link>
       </div>

          <div className="flex items-center my-4 justify-center gap-3 *:flex *:items-center *:gap-1 *:text-xs">
            <div>
              <AiFillSafetyCertificate className="text-md text-green-600" />
              <span className="text-gray-600">Secure Payment</span>
            </div>
            <div>
              <CiDeliveryTruck className="text-md text-blue-600" />
              <span className="text-gray-600">Fast Delivery</span>
            </div>
            <div>
              <MdShoppingBag className="text-md text-orange-600" />
              <span className="text-gray-600">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
