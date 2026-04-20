'use client'
import { verifyResetCode } from '@/apis/forgetPassword/resetCode.action'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { FaLock } from 'react-icons/fa'
import { GoArrowLeft } from 'react-icons/go'
import { IoKey } from 'react-icons/io5'
import { MdOutlineDone } from 'react-icons/md'
import { toast } from 'sonner'

export default function VerificationCode() {
  const router = useRouter()
    const {register , handleSubmit} = useForm<{resetCode:string}>()
   const {data,mutate,isPending}= useMutation({mutationFn:verifyResetCode,
      onSuccess:(data)=>{
      
         if(data?.status ==='success' ){
             router.push('/resetPassword')}
    
       if(data?.statusMsg ==='fail'){
          toast.error(data?.message,{position:'top-right'})
       }
       }      
      })

   function handleResetCode(resetData : { resetCode:string}){
    mutate(resetData)
   }
  return (
    <div className='px-4 py-10 '>
         <div className="text-center">
                     <h1 className="text-gray-800">
                     <span className="text-green-600">Fresh</span>Cart
                   </h1>
                   <h1>Check Your Email</h1>
                   <p className="mt-4 text-gray-500">
                    Enter the 6-digit code sent to usama.route@gmail.com
                   </p>
                   </div>
                   <div className="flex items-center justify-center mt-6 gap-1 mb-8">
                     <div className="bg-green-600 text-white   size-10 rounded-full flex items-center justify-center">
                       <MdOutlineDone />
                     </div>
                     <span className="bg-green-600 w-16 h-1 rounded-full "></span>
                     <div className="bg-green-600 text-white border-4 border-green-50 size-10 rounded-full flex items-center justify-center">
                       <IoKey />
                     </div>
                     <span className="bg-gray-300 w-16 h-1 rounded-full "></span>
                     <div className="bg-gray-300 text-gray-600 size-10 rounded-full flex items-center justify-center ">
                       <FaLock />
                     </div>
                   </div>
                    <form onSubmit={handleSubmit(handleResetCode)}>
                                <label htmlFor="resetCode" className="font-semibold  mb-3">
                                 New Psssword:
                                </label>
                      
                                <div className="relative">
                                  <input
                                    
                                    {...register('resetCode')}
                                    className="w-full mt-4 py-4  pr-4 pl-10  rounded-md border border-gray-300 placeholder:text-7xl"
                                    placeholder=". . . . . ."
                                  />
                                  <AiFillSafetyCertificate  className=" absolute text-lg left-3 top-2/3 -translate-y-2/3 text-gray-600" />
                                </div>
                                <div className="my-7 text-gray-500 text-sm text-center">Didn't receive the code?  <span onClick={()=>{}} className="text-green-600">Resend Code</span></div>
                               <button className={`w-full py-3 bg-green-600 text-white font-semibold shadow-md shadow-green-300 rounded-lg  ${isPending && 'opacity-70'}`}>Verify Code</button>
                              </form>
                   
                              <Link href={`/forgetPassword`} className="mt-10 text-gray-500 flex justify-center items-center gap-1 text-sm text-center"><GoArrowLeft />Change email address</Link>
    </div>
  )
}
