"use client";

import { ProductInterface } from "@/interfaces/ProductInterface.interface";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaBagShopping, FaStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

export default function NavAndTabs({ product }: { product: ProductInterface }) {
  const [isActive, setActive] = useState("productDetails");


  return (
    <div className="my-4">
      <div className="flex items-center gap-10 border-b border-gray-300 *:p-3 *:flex *:items-center *:cursor-pointer *:gap-2  ">
        <p
          onClick={() => {
            setActive("productDetails");
          }}
          className={`${isActive=='productDetails' ? "text-green-600 bg-green-50 border-b-3 border-green-600" : "text-gray-600"}`}
        >
          <FaBagShopping /> <span>Product Details</span>
        </p>
        <p
          onClick={() => {
            setActive("reviews");
          }}
          className={`${isActive==='reviews' ? "text-green-600 bg-green-50 border-b-3 border-green-600" : "text-gray-600"}`}
        >
          <FaStar /> <span>Reviews ({product?.ratingsQuantity})</span>
        </p>
        <p
          onClick={() => {
            setActive("delivery");
          }}
          className={`${isActive==='delivery' ? "text-green-600 bg-green-50 border-b-3 border-green-600" : "text-gray-600"}`}
        >
          <TbTruckDelivery /> <span>Delivery and Shipping</span>
        </p>
      </div>
    {isActive==='productDetails' &&  <div className="p-3 pb-6 my-5" >
        <h2>About this product</h2>
        <p className="my-3">{product?.description}</p>
        <div className="p-4 flex items-center gap-6 ">
          <div className="p-4 md:w-1/2">
            <p className="font-semibold my-3 text-gray-800">Product Information</p>
            <div className="*:flex *:items-center *:justify-between">
              <div>
                <p className="text-gray-500 text-sm">Category</p>
                <p className="text-sm">{product?.category?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">subcategory</p>
                <p className="text-sm">{product?.subcategory[0]?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Brand</p>
                <p className="text-sm">{product?.brand?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">items sold</p>
                <p className="text-sm">{product?.sold} sold</p>
              </div>
            </div>
          </div>
          <div className="p-4 mf:w-1/2">
            <p className="font-semibold text-gray-800 my-3">Key Feature</p>
            <div className="*:flex *:items-center *:gap-2">
            <div>
                <FaCheck className="text-sm text-green-500" /> <span className="text-gray-500 text-sm">Premium Quality Product</span>
            </div>
            <div>
                <FaCheck className="text-sm text-green-500" /> <span className="text-gray-500 text-sm">100% Authentic Guarantee</span>
            </div>
            <div>
                <FaCheck className="text-sm text-green-500" /> <span className="text-gray-500 text-sm">Fast & Secure Packaging</span>
            </div>
            <div>
                <FaCheck className="text-sm text-green-500" /> <span className="text-gray-500 text-sm">Quality Tested</span>
            </div>
            </div>
          </div>
        </div>
      </div>}
      {isActive==='reviews' &&<div className="flex my-5 items-center justify-center">
        <p>Customer Reviews ...</p>
        </div>}
      {isActive==='delivery' &&<div className="flex my-5 items-center justify-center">
        <p>Delivery Info ...</p>
        </div>}
    </div>
  );
}
