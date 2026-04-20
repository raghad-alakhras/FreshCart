

'use client'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaClock, FaFacebook, FaGoogle, FaStar, FaUserPlus, FaUsers } from "react-icons/fa";
import { TbBusFilled } from "react-icons/tb";
import Loginimage from '../../../../assets/loginphoto.png'
import Image from "next/image";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "../schema/login.schema";
import { signIn } from "next-auth/react";
import { IoLockClosedSharp } from "react-icons/io5";

export default function LoginForm() {
  const [isLoading, setLoading]= useState(false)
  const router = useRouter()
  const {control,handleSubmit,reset}= useForm<loginSchemaType>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
 
    email:'',
    password:'',
  
  }})

  async function handleLogin(data:loginSchemaType){
    setLoading(true)
  try {
  const isSuccessfulRegister= await signIn('credentials',{redirect:false,...data})


    if(isSuccessfulRegister?.ok){
         toast.success('login successfully',{
          position:'top-right'
         })
     setTimeout(()=>{
            router.push('/')
     },500)    
     reset()
   }else{
    toast.error(isSuccessfulRegister?.error,{
          position:'top-right'
         })
   }
  } catch (error:any) {
    // toaster
   toast.error(error?.message,{
          position:'top-right'
         })
  } finally{
    setLoading(false)
  }
  }
  
  return (
    <div className="md:flex mt-8 items-center gap-6 justify-between max-w-[1280px] mx-auto">
      <div className="hidden md:block md:w-1/2 px-4 py-3">
      <Image src={Loginimage} alt='cart with fresh products' width={100} height={100} className=" w-9/10 h-[500px] object-cover mb-5 rounded-[16px] shadow-md shadow-gray-200"/>
        <h3 className="text-gray-800 max-w-[586px] text-center">
           FreshCart - Your One-Stop Shop for Fresh
Products
        </h3>
  
        <p className="text-gray-500 my-5 max-w-[586px] text-center">
         Join thousands of happy customers who trust FreshCart for their daily
grocery needs
        </p>
    <div className="flex items-center  mt-5 justify-center gap-5 *:flex *:items-center *:gap-1">
      <div>
      <TbBusFilled className="text-green-600 text-sm" />
        <span className="text-sm text-gray-500">Free Delivery</span>
      </div>
      <div>
      <AiFillSafetyCertificate  className="text-green-600 text-sm" />
        <span className="text-sm text-gray-500">Secure payment</span>
      </div>
      <div>
      <FaClock className="text-green-600 text-sm" />
        <span className="text-sm text-gray-500">24/7 Support</span>
      </div>
      </div>
      </div>
      <div className="text-center md:w-1/2 px-4 py-3">
         <h1 className="text-gray-800">
           <span className="text-green-600">Fresh</span>Cart
        </h1>
        <h2 className="text-gray-800 mt-3">Welcome Back!</h2>
        <p className="text-gray-500 mt-3">Sign in to continue your fresh shopping experience</p>
        <div className="py-8 *:cursor-pointer *:w-full *:mt-4 *:text-gray-800">
          <button className="py-2  px-4 border border-gray-200 rounded-[8px]  flex items-center justify-center gap-3"><FaGoogle className="text-red-600 text-lg " />Continue with Google</button>
          <button className="py-2  px-4 border border-gray-200 rounded-[8px]  flex items-center justify-center gap-3"><FaFacebook className="text-blue-600 text-lg"/>Continue with Facebook</button>
        </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
      
            {/* email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mail" className="font-medium mt-3">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="mail"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* password */}
              <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password" className="font-medium mt-3 flex items-center justify-between">
                   <span> Password</span>
                   <Link href={'/forgetPassword'} className="text-green-600">Forgot Password?</Link>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
   
            </FieldGroup>
             <div className="flex items-center gap-2 my-4">
           <input type="checkbox" id="agreePolicy" />
          <label htmlFor="agreePolicy" className="text-gray-600 text-sm">Keep me signed in</label>
         </div>
         <Button className={` cursor-pointer text-center bg-green-600 text-white rounded-md font-semibold w-full py-4 my-4 ${isLoading?'opacity-50':'opacity-100'}`}>
         Sign in</Button>
          
            
          </form>
          <div className="my-7 pt-10 pb-5 shadow-md text-center rounded-lg">
            <p className="text-gray-800">New to FreshCart ? <Link href={`/register`} className="text-green-600">Create an account</Link></p>
            <div className="flex items-center justify-center gap-4 my-4 *:flex *:items-center *:gap-1 *:text-xs *:text-gray-500">
               <div>
                <IoLockClosedSharp  />
                <span>SSL Secured</span>
               </div>
               <div>
                 <FaUsers />
                <span>50K+ Users</span>
               </div>
               <div>
                <FaStar />
                <span>4.9 Rating</span>
               </div>
            </div>
          </div>
      </div>
    </div>
  );
}
