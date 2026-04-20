'use client'

import { resetNewPassword } from '@/apis/forgetPassword/resetPassword.action'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'

import { MdEmail, MdOutlineDone } from 'react-icons/md'
import { toast } from 'sonner'

export default function ResetPasswordForm() {
  const router = useRouter()
  const {register , handleSubmit} = useForm<{email:string, newPassword:string}>()

      const {data,mutate,isPending,error}= useMutation({mutationFn:resetNewPassword,
      onSuccess:(data: boolean)=>{
        if(data){
          toast.success('Password reset successfully!',{position:'top-right'})
          router.push('/login')
        } else {
          toast.error('Failed to reset password',{position:'top-right'})
        }
      }
    })
    
    
    function getUserData(data: { email: string , newPassword:string}) {
    
      mutate(data)
    }
  return (
    <div className=" px-4 py-10  ">
              <div className="text-center">
                <h1 className="text-gray-800">
                <span className="text-green-600">Fresh</span>Cart
              </h1>
              <h1>Reset Password</h1>
              <p className="mt-4 text-gray-500">
                Enter your email and new password to reset
              </p>
              </div>
              <div className="flex items-center justify-center mt-6 gap-1 mb-8">
                <div className="bg-green-600 text-white   size-10 rounded-full flex items-center justify-center">
                  <MdOutlineDone />
                </div>
                <span className="bg-gray-300 w-16 h-1 rounded-full "></span>
                <div className="bg-green-600 text-white  size-10 rounded-full flex items-center justify-center">
                 <MdOutlineDone />
                </div>
                <span className="bg-gray-300 w-16 h-1 rounded-full "></span>
                <div className="bg-green-600 text-white border-4 border-green-50 size-10 rounded-full flex items-center justify-center ">
                  <FaLock />
                </div>
              </div>
              <form onSubmit={handleSubmit(getUserData)}>
               <div>
                 <label htmlFor="email" className="font-semibold  mb-3">
                  Email Address:
                </label>
      
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full mt-4 py-4  pr-4 pl-10  rounded-md border border-gray-300"
                    placeholder="Enter Your Email Address"
                  />
                  <MdEmail className=" absolute left-3 top-2/3 -translate-y-2/3 text-gray-600" />
                </div>
               </div>
               <div className='mt-6'>
                 <label htmlFor="newPassword" className="font-semibold  mb-3">
                  New Password:
                </label>
      
                <div className="relative">
                  <input
                    type="password"
                    {...register('newPassword')}
                    className="w-full mt-4 py-4  pr-4 pl-10  rounded-md border border-gray-300"
                    placeholder="Enter New Password"
                  />
                  <FaLock className=" absolute left-3 top-2/3 -translate-y-2/3 text-gray-600" />
                </div>
               </div>
               <button className={`w-full py-3 bg-green-600 text-white font-semibold shadow-md shadow-green-300 rounded-lg my-5 ${ isPending &&'opacity-70'}`}>Reset Password</button>
              </form>
   
              
            </div>
  )
}
