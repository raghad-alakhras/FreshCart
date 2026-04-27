"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function Slider ({pageItems}:{pageItems:string []}){
  return (
    <Swiper
     modules={[ Pagination]}
      pagination={{ clickable: true , renderBullet(index, className) {
        return `<span class='${className} bg-white! size-4! rounded-full! '></span>`
      },bulletActiveClass:'bg-white! opacity-100! w-7! rounded-lg!'}}
      spaceBetween={50}
      slidesPerView={1}
    >
 
      <SwiperSlide>
        <div className="relative">
          <Image src={pageItems[0] } alt='pics' width={100} height={100} className='w-full h-100 object-cover my-5 relative' />
           <div className="absolute inset-0 bg-green-600 opacity-50"></div> 
           <div className="absolute z-50 top-1/2 -translate-y-1/2 left-10">
            <h3 className='w-[300px] text-white'>Fresh Products Delivered to your Door</h3>
            <p className='text-white my-3'>Get 20% off your first order</p>
            <div className="flex items-center gap-3 mt-4">
              <button className='px-4 py-2 text-green-600 bg-white rounded-md font-bold hover:scale-105 transition-all duration-400'>Shop Now</button>
              <button className='px-4 py-2 text-white bg-transparent border-2 border-white rounded-md font-bold hover:scale-105 transition-all duration-400'>View Deals</button>
            </div>
           </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <Image src={pageItems[0] } alt='pics' width={100} height={100} className='w-full h-100 object-cover my-5 relative' />
           <div className="absolute inset-0 bg-green-600 opacity-50"></div> 
           <div className="absolute z-50 top-1/2 -translate-y-1/2 left-10">
            <h3 className='w-[200px] text-white'>Premium Quality  Guaranteed</h3>
            <p className='text-white my-3'>Fresh from farm to your table</p>
            <div className="flex items-center gap-3 mt-4">
              <button className='px-4 py-2 text-blue-600 bg-white rounded-md font-bold hover:scale-105 transition-all duration-400'>Shop Now</button>
              <button className='px-4 py-2 text-white bg-transparent border-2 border-white rounded-md font-bold hover:scale-105 transition-all duration-400'>Learn More</button>
            </div>
           </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <Image src={pageItems[0] } alt='pics' width={100} height={100} className='w-full h-100 object-cover my-5 relative' />
           <div className="absolute inset-0 bg-green-600 opacity-50"></div> 
           <div className="absolute z-50 top-1/2 -translate-y-1/2 left-10">
            <h3 className='w-[200px] text-white'>Fast and Free Delivery</h3>
            <p className='text-white my-3'>same day delivery available</p>
            <div className="flex items-center gap-3 mt-4">
              <button className='px-4 py-2 text-purple-600 bg-white rounded-md font-bold hover:scale-105 transition-all duration-400'>Order Now</button>
              <button className='px-4 py-2 text-white bg-transparent border-2 border-white rounded-md font-bold hover:scale-105 transition-all duration-400'>Delivery Info</button>
            </div>
           </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};