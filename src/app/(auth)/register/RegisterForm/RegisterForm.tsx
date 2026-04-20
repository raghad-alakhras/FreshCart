'use client'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaFacebook, FaGoogle, FaStar, FaUserPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import avatar from '../../../../assets/avatar.png'
import Image from "next/image";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { log } from "console";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import { registerFun } from "../actions/register.action";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isLoading, setLoading]= useState(false)
  const router = useRouter()
  const {control,handleSubmit,reset}= useForm<registerSchemaType>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  }})

  async function handleRegister(data:registerSchemaType){
    setLoading(true)
  try {
     const isSuccessfulRegister = await registerFun(data)
    //  if true: toaster & navigate to login or home
    if(isSuccessfulRegister){
         toast.success('user created successfully',{
          position:'top-right'
         })
     setTimeout(()=>{
            router.push('/login')
     },500)    
     reset()
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
      <div className="md:w-1/2 px-4 py-3">
        <h1 className="text-gray-800">
          Welcome to <span className="text-green-600">FreshCart</span>
        </h1>
        <p className="text-gray-500 my-2">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>
        <div className="py-6 *:mb-5">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center">
              <FaStar className="text-lg text-green-600" />
            </div>
            <div>
              <h5 className="text-gray-900">Premium Quality</h5>
              <p className="text-gray-500">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center">
              <TbTruckDelivery className="text-lg text-green-600" />
            </div>
            <div>
              <h5 className="text-gray-900">Fast Delivery</h5>
              <p className="text-gray-500">
                Same-day delivery available in most areas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center">
              <AiFillSafetyCertificate   className="text-lg text-green-600" />
            </div>
            <div>
              <h5 className="text-gray-900">Secure Shopping</h5>
              <p className="text-gray-500">
                Your data and payments are completely secure.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-[6px] ">
          <div className="flex items-center gap-5 mb-3">
            <div className="size-12 rounded-full">
              <Image src={avatar} alt="sarah avatar" width={12} height={12} className="w-full object-cover"/>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Sarah Johnson</p>
              <div className="flex items-center gap-2">
                <FaStar className="text-lg text-yellow-600" />
                <FaStar className="text-lg text-yellow-600" />
                <FaStar className="text-lg text-yellow-600" />
                <FaStar className="text-lg text-yellow-600" />
                <FaStar className="text-lg text-yellow-600" />
              </div>
            </div>
          </div>
          <q className="font-semibold  text-gray-600">
            FreshCart has transformed my shopping experience. The quality of the
            products is outstanding, and the delivery is always on time. Highly
            recommend!
          </q>
        </div>
      </div>
      <div className="text-center md:w-1/2 px-4 py-3">
        <h2 className="text-gray-700">Create Your Account</h2>
        <p className="text-gray-500">Start your fresh journey with us today</p>
        <div className="py-8 flex items-center justify-between gap-2 *:cursor-pointer">
          <button className="py-2 w-1/2 px-4 border border-gray-200 rounded-[8px] font-semibold flex items-center justify-center gap-3"><FaGoogle className="text-red-600 text-lg " />Google</button>
          <button className="py-2 w-1/2 px-4 border border-gray-200 rounded-[8px] font-semibold flex items-center justify-center gap-3"><FaFacebook className="text-blue-600 text-lg"/>Facebook</button>
        </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FieldGroup>
              {/* name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className="font-medium">
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mail" className="font-medium mt-3">
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="mail"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
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
                  <FieldLabel htmlFor="password" className="font-medium mt-3">
                    Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Create a strong password"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* repassword */}
              <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rePassword" className="font-medium mt-3">
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="rePassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* phonr number */}
              <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone" className="font-medium mt-3">
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+201234567890"
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
             <div className="flex items-center gap-3 my-4">
           <input type="checkbox" id="agreePolicy" />
          <label htmlFor="agreePolicy" className="text-gray-600">I agree to the  <span className="text-green-600">
            Terms of Service</span> and <span className="text-green-600">
              Privacy Policy</span></label>
         </div>
         <Button className={`flex cursor-pointer items-center gap-2 text-center bg-green-600 text-white rounded-md font-semibold w-full py-4 my-4 ${isLoading?'opacity-50':'opacity-100'}`}>
          <FaUserPlus />Create My Account</Button>
          
            
          </form>
          <div className="my-7 pt-10 pb-5 shadow-md text-center rounded-lg">
            <p className="text-gray-800">Already have an account? <Link href={`/login`} className="text-green-600">Sign In</Link></p>
          </div>
      </div>
    </div>
  );
}
