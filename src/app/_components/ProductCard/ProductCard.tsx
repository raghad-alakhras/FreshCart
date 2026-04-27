import { ProductInterface } from "@/interfaces/ProductInterface.interface";
import Image from "next/image";
import React from "react";
import { BiShow } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaPlus, FaStar } from "react-icons/fa";
import { LiaSyncAltSolid } from "react-icons/lia";
import StarRating from "../../../utilties/StarRating";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import AddToWishlist from "../AddToWishlist/AddToWishlist";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {

  return (
    <div className="w-9/10 mx-auto px-3 py-4 border border-gray-200 shadow-sm shadow-gray-200 rounded-[8px] hover:-translate-y-4 transition-all duration-300">
      <div className="relative">
        <Link href={`/productdetails/${product?._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={100}
            height={100}
            className="w-3/4 mx-auto"
          />
        </Link>
        <div className="absolute top-2 right-2 flex-col *:mt-2 *:size-8 *:shadow-sm *:shadow-gray-200 *:text-lg *:rounded-full *:bg-white *:flex *:items-center *:justify-center ">
          <AddToWishlist
            id={product?._id}
            cls="group *:transition-all *:duration-300 *:group-hover:text-red-500"
          >
            <CiHeart />
          </AddToWishlist>

          <div className="group *:transition-all *:duration-300 *:group-hover:text-green-500">
            <LiaSyncAltSolid />
          </div>
          <div className="group *:transition-all *:duration-300 *:group-hover:text-green-500">
            <BiShow />
          </div>
        </div>
      </div>
      <p className="text-gray-600 my-2 font-light text-xs">
        {product?.category?.name}
      </p>
      <p className="text-gray-800 line-clamp-2 font-semibold mb-3">
        {product?.title}
      </p>
      <div className="flex items-center gap-3">
        <StarRating rating={product?.ratingsAverage} />
        <p className="text-sm text-gray-700 font-light">
          {product?.ratingsAverage} ({product?.ratingsQuantity})
        </p>
      </div>
      <div className="flex items-center justify-between my-2">
        {product?.priceAfterDiscount ? (
          <div className="flex items-center gap-2">
            <h5 className="text-green-600">
              {product?.priceAfterDiscount} EGP
            </h5>
            <p className="text-gray-600 text-light line-through">
              {product?.price}
            </p>
          </div>
        ) : (
          <h5>{product?.price} EGP</h5>
        )}
        <AddToCartButton
          id={product?._id}
          cls="size-10 cursor-pointer rounded-full flex items-center justify-center bg-green-600 text-white font-semibold"
        >
          <FaPlus />
        </AddToCartButton>
      </div>
    </div>
  );
}
