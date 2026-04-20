import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoLocationSharp, IoSettings } from 'react-icons/io5'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import AddAddressBtn from './accountAddress/AddAddressBtn'

export default function layout({children}:{children : ReactNode}) {
  return (
    <div>
         <div className="bg-linear-to-r from-green-600 to-green-500 my-4 px-30 py-10 h-fit">
                  <p className="flex items-center gap-3 *:text-sm my-2">
                          <Link href={"/"} className="text-gray-300">
                            Home /{" "}
                          </Link>
                         
                          <Link href={`/profile`} className="text-white">
                            My Account
                          </Link>
                          
                        </p>
                        <div className="flex items-center gap-6 my-5">
                          <div className="size-16 rounded-lg bg-green-400/50 text-white flex items-center justify-center">
                            <FaUser  className='text-4xl' />
                          </div>
                          <div>
                            <h2 className='text-white'>My Account</h2>
                            <p className="text-sm text-gray-50 mt-1">Manage your addresses and account settings</p>
                          </div>
                        </div>
                </div>
                <div className="container mx-auto max-w-[1280px] flex gap-10 my-5 *:p-4 *:rounded-xl">
               
            <div className="md:w-1/4 border h-fit border-gray-300">
              <h6 className='pb-4 border-b border-gray-100'>My Account</h6>
              <div className="*:flex *:items-center *:justify-between p-2 *:px-4 *:py-3 *:rounded-lg *:w-full">
                <Link href={`/profile/accountAddress`} className='group focus:bg-green-50 cursor-pointer'>
                    <div className="group-parent flex items-center gap-3">
                        <div className="size-9 group-focus:bg-green-600 group-focus:text-white rounded-md flex items-center justify-center bg-gray-100 text-gray-400 text-xl">
                            <IoLocationSharp />
                        </div>
                        <span className='text-gray-400 group-focus:text-green-600'>My Addresses</span>
                    </div>
                    <MdOutlineKeyboardArrowRight className='text-gray-400 group-focus:text-green-600' />
                </Link>
                <Link href='/profile/settings' className='group focus:bg-green-50 mt-3'>
                    <div className="group-parent flex items-center gap-3">
                        <div className="size-9 group-focus:bg-green-600 group-focus:text-white rounded-md flex items-center justify-center bg-gray-100 text-gray-400 text-xl">
                            <IoSettings  />
                        </div>
                        <span className='text-gray-400 group-focus:text-green-600'>Settings</span>
                    </div>
                    <MdOutlineKeyboardArrowRight className='text-gray-400 group-focus:text-green-600' />
                </Link>

              </div>
            </div>
             <div className="md:w-3/4">
             
             {children}
              </div>

        
                </div>
    </div>
  )
}
