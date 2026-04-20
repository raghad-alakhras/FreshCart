'use client'
import Image from "next/image";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaClock, FaLock } from "react-icons/fa";
import { TbBusFilled } from "react-icons/tb";
import forgetImage from "../../../assets/forgetPAssword.png";
import { MdEmail } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { forgetPassword } from "@/apis/forgetPassword/forgetPassword.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
export default function ForgetPassCard() {


  return (
    <>
      <div className="hidden md:block md:w-1/2 px-4 py-3">
        <Image
          src={forgetImage}
          alt="Forget Password?"
          width={100}
          height={100}
          className=" w-9/10 h-[300px] object-cover mb-5 rounded-[16px] shadow-md shadow-gray-200"
        />
        <h3 className="text-gray-800 max-w-[586px] text-center">
          Reset Your Password
        </h3>

        <p className="text-gray-500 my-5 max-w-[586px] text-center">
          Don't worry, it happens to the best of us. We'll help you get back
          into your account in no time.
        </p>
        <div className="flex items-center mt-5 justify-center gap-5 *:flex *:items-center *:gap-2">
          <div>
            <TbBusFilled className="text-green-600 text-sm" />
            <span className="text-sm text-gray-500">Email Verification</span>
          </div>
          <div>
            <AiFillSafetyCertificate className="text-green-600 text-sm" />
            <span className="text-sm text-gray-500">Secure Reset</span>
          </div>
          <div>
            <FaClock className="text-green-600 text-sm" />
            <span className="text-sm text-gray-500">Encrypted</span>
          </div>
        </div>
      </div>
     
    </>
  );
}
