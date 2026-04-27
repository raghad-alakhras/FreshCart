'use client'
import { addUserAddress } from '@/apis/userAddress/addUserAddress.api'
import { deleteUserAddress } from '@/apis/userAddress/deleteUserAddress.api'
import { UserAddress } from '@/interfaces/UserAddress.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaCity, FaPen, FaPhoneAlt, FaPlus, FaTrash } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import { toast } from 'sonner'



export default function AddAddressBtn() {
  interface AddressItem {
   status : string
   data : UserAddress
  }

  const queryClient = useQueryClient()
  const [openForm,setOpenForm] = useState(false)
  const [editForm,setEditForm] = useState<string | null>(null)
  const {register,handleSubmit,reset} = useForm<UserAddress>()
 


  // get user addresses
  const {data:userAddresses}= useQuery({queryKey:['userAddress'],
    queryFn: async ()=>{
      const data = await fetch(`/api/address`)
      if(!data.ok){
            throw new Error('faild to fetch cart')
         }
           return data.json()
    }
  })

  // add address

  // didn't make reset() to save the info after editing (if i put reset just the updated info appear , other data null)
  const {data:addAddressData , mutate:AddMutate}= useMutation({
    mutationFn:addUserAddress, 
    onSuccess:()=>{
      toast.success('Address Added Sucessfully',{position:'top-right'})
      queryClient.invalidateQueries({queryKey:['userAddress']})
      setOpenForm(false)
    }
  })
function handleAddAddress(addressData:UserAddress){
   AddMutate(addressData)
   reset()
}

// delete address
  const {data:delAddressData , mutate:DelMutate, isPending:DelPending}= useMutation({
    mutationFn:deleteUserAddress, 
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['userAddress']})
      setOpenForm(false)
    }
  })

function handleDelAddress(addressId:string){
   DelMutate(addressId)
}


  

// edit
const {data:addressItemsData} = useQuery<AddressItem>({
    queryKey:['address',editForm],
  queryFn: async() =>{
    if(!editForm)
      return
  const data = await fetch(`/api/addressItem/${editForm}`)
    if(!data?.ok){
      toast.error(data?.statusText,{position:'top-right'})
    }
    return data.json()
  },
    enabled: editForm!==null,
})
  useEffect(() => {
  if (addressItemsData?.data) {
    reset(addressItemsData.data)
  }
}, [addressItemsData])

function handleEditForm(editedData: UserAddress){
  
  handleAddAddress(editedData)
   queryClient.invalidateQueries({queryKey:['userAddress']})
   setEditForm(null)
}




  return (
  <>
   <div className='flex-col  md:flex md:justify-between md:items-center'>
                <div>
                  <h6>My Addresses</h6>
             <p className='text-gray-600 mt-1'>Manage your saved delivery addresses</p>
                </div>
                <button
                onClick={()=>{setOpenForm(true)}}
                className='cursor-pointer flex px-3 py-2 mt-4 items-center gap-2 text-white bg-green-600 rounded-md shadow-md'>
                  <FaPlus />
                  <span>Add Address</span>
                </button>
           


    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         {userAddresses?.data?.length !== 0 && (userAddresses?.data?.map((address:UserAddress) =><>
    <div key={address?._id} className=" mt-10 p-5 flex  justify-between rounded-lg border border-gray-300">
      <div className="flex gap-2">
        <div className="size-9 bg-green-200  rounded-md flex items-center justify-center text-green-600 text-xl">
            <IoLocationSharp />
          </div>
        <div>
           <h6>{address?.city} City</h6>
           <p className='text-gray-600 mt-1'>{address?.details}</p>
           <div className=" mt-10 flex items-center gap-4 *:flex *:items-center *:gap-1 *:text-gray-500 *:text-sm">
              <div>
                <BsFillTelephoneFill />
                <span>{address?.phone}</span>
              </div>
              <div>
                <FaCity />
                <span>{address?.name}</span>
              </div>
           </div>
          </div>
      </div>
      <div className="flex items-center gap-2 *:cursor-pointer *:size-9 *:rounded-md *:bg-gray-200 *:text-gray-500 *:flex *:items-center *:justify-center">
         <button  onClick={()=>{setEditForm(address?._id)
          }}>
          <FaPen />
         </button>
         <button className={`${DelPending && 'opacity-60'}`} onClick={()=>{handleDelAddress(address?._id)}}>
          <FaTrash />
         </button>
      </div>
    </div>
    </>))}
    </div>
   

    {openForm && <>
    <h5 className='mt-7 mb-3 text-green-600 text-center'>Please Fill The Form Correctly</h5>
       <form onSubmit={handleSubmit(handleAddAddress)}>
               
                
                   {/* name */}
                 <div className="my-5 ">
                   <label htmlFor="name" className="font-semibold text-sm mb-3">Name*</label>
                 <div className="relative">
                     <input type="text" {...register('name')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10  rounded-md border border-gray-300" placeholder="e.g.Home , Shop" />
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
              
       <button type='submit' className='w-full bg-green-600 text-white text-center py-4 rounded-lg my-5 font-semibold'>Submit</button>
             </form>
    
    </>}

    {editForm !== null && <>
    <h5 className='mt-7 mb-3 text-green-600 text-center'>Edit The Address</h5>
       <form onSubmit={handleSubmit(handleEditForm)}>
               
                
                   {/* name */}
                 <div className="my-5 ">
                   <label htmlFor="name" className="font-semibold text-sm mb-3">Name*</label>
                 <div className="relative">
                     <input type="text" defaultValue={addressItemsData?.data?.name} {...register('name')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10  rounded-md border border-gray-300" placeholder="e.g.Home , Shop" />
                   <div className="size-8 rounded-md absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 text-gray-600">
                     <FaCity />
                   </div>
                 </div>
                 </div>
                     {/* street address */}
                 <div className="my-5 ">
                   <label htmlFor="details" className="font-semibold text-sm mb-3">Street Address*</label>
                <div className="relative">
                    <input type="text" defaultValue={addressItemsData?.data?.details} {...register('details')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10 rounded-md border border-gray-300" placeholder="Street name, building number, floor, apartment..." />
                   <div className="size-8 rounded-md absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 text-gray-600">
                     <FaLocationDot />
                   </div>
                </div>
                 </div>
            
             
                 {/* phone number*/}
                 <div className="my-5 ">
                   <label htmlFor="phone" className="font-semibold text-sm mb-3">Phone Number*</label>
                <div className="relative">
                    <input type="tel" defaultValue={addressItemsData?.data?.phone} {...register('phone')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10 rounded-md border border-gray-300" placeholder="01xxxxxxxxx" />
                   
                     <div className="size-8 rounded-md flex items-center absolute left-3 top-1/2 -translate-y-1/2 justify-center bg-gray-200 text-gray-600">
                     <FaPhoneAlt />
                   </div> 
                </div>
                 </div>
                        {/* city */}
                 <div className="my-5 ">
                   <label htmlFor="city" className="font-semibold text-sm mb-3">City*</label>
                 <div className="relative">
                     <input type="text" defaultValue={addressItemsData?.data?.city}  {...register('city')} className="w-full mt-4 py-4 pl-14 pr-4 pb-10  rounded-md border border-gray-300" placeholder="e.g. Cairo, Alexandria, Giza" />
                   <div className="size-8 rounded-md absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 text-gray-600">
                     <FaCity />
                   </div>
                 </div>
                 </div>
              
       <button type='submit' onClick={()=>{handleDelAddress(addressItemsData?.data?._id!)}} className='w-full bg-green-600 text-white text-center py-4 rounded-lg my-5 font-semibold'>Submit</button>
             </form></>}


</>
  )
}
