"use client";

import { ProductInterface } from "@/interfaces/ProductInterface.interface";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ImageSlider({
  product,
}: {
  product: ProductInterface;
}) {
  const [imgPreview, setImgPreview] = useState(product?.imageCover);
  function changeImgPreview(src:any) {
    setImgPreview(src);
  }

  return (
    <div className="p-4 md:w-1/3 ">
      <Image
        src={imgPreview}
        alt={product?.title}
        width={100}
        height={100}
        className="w-1/2 mb-2"
      />
      <Swiper
        className="mt-4"
        spaceBetween={1}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {product?.images.map((img) => (
          <SwiperSlide className="cursor-pointer ">
            <Image
              onClick={() => {
                changeImgPreview(img);
              }}
              src={img}
              alt={product?.title}
              width={20}
              height={100}
              className="w-20 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
