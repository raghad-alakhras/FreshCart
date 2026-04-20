'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { MutationCache, useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { FaLock, FaUserAlt, FaUserPlus } from 'react-icons/fa'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePassSchema, changePassSchemaType } from './schema/changePassSchema'
import { updateUserPass } from '@/apis/userData/updateUserPassword.action'
export default function ChangePassword() {
 
       const {control,handleSubmit,reset}= useForm<changePassSchemaType>({
         resolver: zodResolver(changePassSchema),
            defaultValues:{
            password:'',
            currentPassword:'',
            rePassword:''
          }})
     const {data,mutate,isPending} = useMutation({
        mutationFn:updateUserPass,
        onSuccess:(data)=>{
            if(data === 'success'){
                toast.success('password updated successfully', {position:'top-right'})
            }else{
                toast.error(data,{position:'top-right'})
            }
            reset()
        }
     })
       function handleChangePassword(data:changePassSchemaType){
          mutate(data)
       }   
  return (
        <div className="my-10 rounded-xl shadow-md shadow-gray-300">

    <div className='p-8 '>
        <div className="flex items-center gap-8">
                <div className="size-13 rounded-md bg-orange-300 text-orange-700 flex items-center justify-center">
                    <FaLock />
                </div>
                <div>
                    <h6>Change Password</h6>
                    <p className="text-gray-600 mt-1">Update your account password</p>
                </div>
            </div>
         <form className='my-6' onSubmit={handleSubmit(handleChangePassword)}>
            <FieldGroup>
              {/* password */}
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="currentPassword" className="font-medium">
                    Current Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    id="currentPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Current Password"
                    autoComplete="off"
                    className="p-3 rounded-[6px]"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-gray-800  text-left" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* new password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mail" className="font-medium mt-3">
                    New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="mail"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your New Password"
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
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    
                    id="rePassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm Your New Password"
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
            
         <Button className={`flex cursor-pointer items-center gap-2 text-center bg-orange-700 shadow-sm shadow-orange-200 text-white rounded-md font-semibold px-5 py-4 my-10 ${ isPending &&'opacity-100'}`}>
          <FaLock />Change Password</Button>
          
            
          </form>

         
    </div>
    
     </div>
  
  )
}
