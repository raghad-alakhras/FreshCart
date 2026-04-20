'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { IoIosHeart } from 'react-icons/io'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {  WishListProduct } from '@/interfaces/WishListProduct.interface'
import Image from 'next/image'
import { ProductInterface } from '@/interfaces/ProductInterface.interface'
import { FaArrowLeft, FaCircle } from 'react-icons/fa'
import AddToCartButton from '../_components/AddToCartButton/AddToCartButton'
import { FaCartShopping } from 'react-icons/fa6'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { deleteWishListItem } from '@/apis/wishlist/actions/deleteWishlistItem.action'

export default function WishList() {

    const {data,isLoading}= useQuery({
        queryKey:['wishlist'],
        queryFn: async ()=>{
             const data=  await fetch(`/api/wishlist`)
              if(!data.ok){
            throw new Error('faild to fetch cart')
           }
           return data.json()
        }
    })
   if(isLoading){
    return <div className='flex items-center justify-center h-screen'>
     <LiaSpinnerSolid className='animate-spin text-2xl' />
    </div>
   }


  return (
    <div>
           <p className='flex items-center gap-3 *:text-sm my-2'>
            <Link href={'/'} className='text-gray-600'>Home  /</Link>
            <Link href={'/wishlist'}>wishlist</Link>
        </p>
        <div className="flex items-center gap-2 mt-6 mb-2">
            <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center text-white">
                <IoIosHeart className='text-2xl text-red-500' />
            </div>
            <p className='text-[30px] font-bold'>My WishList</p>
        </div>
        <p className='text-gray-600 ml-2 mb-3'>You have {data?.count}  items in your cart</p>
        <Table className='border border-gray-100 rounded-lg my-10'>
 
  <TableHeader>
    <TableRow className='bg-gray-50 *:font-semibold *:text-gray-500 px-6 py-4 hidden sm:flex sm:justify-between'>
      <TableHead className='sm:w-2/5'>Product</TableHead>
      <TableHead className='sm:w-1/5'>Price</TableHead>
      <TableHead className='sm:w-1/5'>Status</TableHead>
      <TableHead className="sm:w-1/5">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data?.data?.map((prod:ProductInterface) =><WishListProdCard product={prod}/>)}
  </TableBody>
</Table>
   <Link href={'/'} className="text-gray-600 text-md my-5 flex items-center gap-3 ml-4 group">
                    <FaArrowLeft className='group-hover:-translate-x-2 transition-all duration-400'/>
                    <span>Continue Shopping</span>
                </Link>

    </div>
  )
}

function WishListProdCard({product}:{product:ProductInterface}){
  const queryClient = useQueryClient()
      const{data:delData,mutate:delMutate,isPending:delPending} = useMutation({
    mutationFn:deleteWishListItem,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['wishlist']})
    }
   })

   function handleDeleteWishlist(){
    delMutate(product?._id)
   }
    return (<>
       <TableRow className='border-gray-100 py-3 block sm:flex sm:justify-between'>
      <TableCell className='flex items-center gap-3 xs:table-cell  w-full sm:w-2/5'>
        <Image src={product?.imageCover} alt={product?.title} width={20} height={20} className='size-20 object-cover rounded-lg'/>
        <div>
            <p className="font-semibold mb-2">{product?.title}</p>
            <p className="text-gray-500 text-xs">{product?.category?.name}</p>
        </div>

      </TableCell>
      <TableCell className='block xs:table-cell w-full sm:w-1/5'>
        <div className="flex items-center justify-between">
           <p className="text-sm text-gray-400 sm:hidden">Price:</p>
        <p className="font-bold">{product?.price} EGP</p>
        </div>
       </TableCell>
      <TableCell className='block xs:table-cell w-full sm:w-1/5'>
        <div className="flex items-center justify-between">
           <p className="text-sm text-gray-400 sm:hidden">Status:</p>
           {
        (product?.count || 0) > 0 ?<div className='flex items-center gap-1 text-xs w-fit text-green-600 bg-green-50 rounded-full p-2'>
            <FaCircle className='text-[10px]' />
            <span>In Stock</span>
        </div>:<div className='flex items-center gap-1 text-xs w-fit text-red-600 bg-red-50 rounded-full p-2'>
            <FaCircle className='text-[10px]' />
            <span>Out of Stock</span>
        </div>
        }
        </div>
      </TableCell>
      <TableCell className='block xs:table-cell w-full sm:w-1/5'>
        <div className="flex items-center justify-between">
           <p className="text-sm text-gray-400 sm:hidden">Action:</p>
        <div className="flex items-center gap-2">
          <AddToCartButton id={product?._id} cls='flex items-center gap-1 bg-green-600 rounded-lg text-white px-4 py-2 '>
           <FaCartShopping />
           <span>Add To Cart</span>
        </AddToCartButton>
        <BiSolidTrashAlt 
        onClick={handleDeleteWishlist}
        className={`text-gray-500 cursor-pointer text-xl ${delPending && 'opacity-50'}`} />
        </div>
        </div>
      </TableCell>
    </TableRow>
    </>)

}