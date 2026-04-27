import { ProductInterface } from '@/interfaces/ProductInterface.interface'
import Image from 'next/image'
import React from 'react'
import ImageSlider from './ImageSlider'
import StarRating from '../../../utilties/StarRating'
import { FaCircle, FaRegHeart } from 'react-icons/fa'
import { FaBoltLightning, FaCartShopping, FaShareNodes } from 'react-icons/fa6'
import NavAndTabs from './NavAndTabs'
import AddToCartButton from '../AddToCartButton/AddToCartButton'
import AddToWishlist from '../AddToWishlist/AddToWishlist'
import IncAndDecBtn from '../IncAndDecBtn/IncAndDecBtn'
import { getProducts } from '@/apis/featureProducts.api'
import ProductCard from '../ProductCard/ProductCard'

export default async function ProductItem({product}:{product:ProductInterface}) {
  
 const allProducts = await getProducts()
 const relatedProducts = allProducts.filter(prod=> prod?.category?.name === product?.category?.name)

  return (
    <>
    <div className='md:flex gap-5'>
       <ImageSlider product={product}/>
       <div className="md:w-2/3 sm:p-4 mt-6 ml-4">
           <div className='flex items-center gap-3'>
            <p className="px-4 py-2 rounded-full bg-green-50 text-green-600 text-[12px]">{product?.category?.name}</p>
            <p className="px-4 py-2 rounded-full bg-gray-50 text-gray-600 text-[12px]">{product?.brand?.name}</p>
           </div>
           <h1 className='mt-6 mb-2 text-sm sm:text-xl'>{product?.title}</h1>
           <div className="flex items-center gap-4">
            {<StarRating rating={product?.ratingsAverage}/>}
            <div className="flex items-center gap-1 *:text-[14px] *:text-gray-500">
              <p>{product?.ratingsAverage}</p>
              <p>({product?.ratingsQuantity} reviews)</p>
            </div>
           </div>
           {product?.priceAfterDiscount?<div className="flex items-center gap-4 my-3">
            <h2>{product?.priceAfterDiscount} EGP</h2>
            <p className='text-gray-600 line-through'>{product?.price}EGP</p>
           </div>:<h2 className='my-3'>{product?.price} EGP</h2>}
         {product?.quantity>0 ?
         <p className='text-green-600 w-fit bg-green-50 rounded-full px-4 py-2 text-sm flex items-center gap-2'><FaCircle className='text-xs' /> <span>in Stock</span></p>:
          <p className='text-red-600 w-fit bg-red-200 rounded-full px-4 py-2 text-sm flex items-center gap-2'><FaCircle className='text-xs' /> <span>out of Stock</span></p>}
        <p className='px-2 py-4 text-gray-500'>{product?.description}</p>
        <div className="my-4">
          <p className="text-gray-600 text-sm">Quantity</p>
          <div className="flex items-center gap-7 my-4">
            <IncAndDecBtn product={product}>
            </IncAndDecBtn>
            <p className='text-gray-500'>{product?.count} available</p>
          </div>
        </div>
        <div className='p-4 flex items-center justify-between'>
             <span className='text-gray-800'>Total price:</span>
             <h5 className='text-green-600'>{product?.price} EGP</h5>
        </div>
        <div className="md:flex items-center gap-2 mt-8">
        <AddToCartButton id={product?._id} cls='w-full cursor-pointer md:w-1/2 py-2 rounded-[12px] bg-green-600 text-white flex items-center gap-2 justify-center'>
            
            <FaCartShopping className='text-white' />
            <span>Add to cart</span>
          
        </AddToCartButton>
          <button className='w-full md:w-1/2 py-2 mt-5 rounded-[12px] bg-black text-white flex items-center gap-2 justify-center'>
            <FaBoltLightning  className='text-white' />
            <span>Buy Now</span>
          </button>
        </div>
        <div className="flex items-center gap-6 my-5">
          <AddToWishlist id={product?._id} cls='w-[93%] border border-gray-600 rounded-[12px] text-gray-800 flex items-center justify-center py-2 gap-2 text-sm'>
             <FaRegHeart />
            <span>Add to Wishlist</span>
          </AddToWishlist>
          
          <button className='w-[7%] border border-gray-600 rounded-[12px] text-gray-800 flex items-center justify-center py-2 gap-2 text-sm'>
            <FaShareNodes />
          </button>
        </div>
       </div>
    </div>
    {/* nav and tabs  */}
        <NavAndTabs product={product}/>
        {/* related products */}
        {relatedProducts.length!==0 && <>
         <h2 className="my-5 before:absolute before:left-0 before:top-0 relative before:w-2 before:h-10 before:rounded-full before:bg-linear-to-b before:from-green-300 before:to-green-700 pl-5 my-5">You May Also <span className="text-green-600">Like</span></h2>
          <div className="grid gap-6 my-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
               {relatedProducts?.map(prod=><ProductCard key={prod?._id} product={prod}/>)}
          </div>
        </>}
    </>
  )
}
