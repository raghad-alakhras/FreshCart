'use client'
import { updateUserInfo } from '@/apis/userData/updateUserData.action'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaUserAlt, FaUserPlus } from 'react-icons/fa'
import { toast } from 'sonner'

export default function ProfileInfoForm({userData}:{userData:{id:string, name:string, role:string}}) {

    interface userInfo {
        name:string 
        email : string
        phone: string
    }
    const {control,handleSubmit,reset}= useForm<userInfo>({
        defaultValues:{
        name:'',
        email:'',
        phone:''
      }})
      const {data,mutate,isPending} = useMutation({
        mutationFn:updateUserInfo,
        onSuccess: (data)=>{
            if(data?.message === 'success'){
                toast.success('information updated successfully',{position:'top-right'})
            }
            if(data?.message ==='fail'){
                toast.error(data?.errors?.msg,{position:'top-right'})
            }
        }
      })

      function editUserData(data:userInfo){
       mutate(data)
      }
      console.log(data)
      
  return (
    <div className="rounded-xl shadow-md shadow-gray-300">

    <div className='p-8 '>
        <div className="flex items-center gap-8">
                <div className="size-13 rounded-md bg-green-100 text-green-600 flex items-center justify-center">
                    <FaUserAlt />
                </div>
                <div>
                    <h6>Profile Information</h6>
                    <p className="text-gray-600 mt-1">Update your personal details</p>
                </div>
            </div>
         <form className='my-6' onSubmit={handleSubmit(editUserData)}>
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
            
         <Button className={`flex cursor-pointer items-center gap-2 text-center bg-green-600 text-white rounded-md font-semibold px-5 py-4 my-10 ${isPending && 'opacity-70'}`}>
          <FaUserPlus />Save Changes</Button>
          
            
          </form>

         
    </div>
     <div className="bg-green-100 p-8 rounded-b-xl ">
              <h6>Account Information</h6>
              <div className='*:flex *:items-center *:justify-between *:mt-6'>
                <div>
                    <p className="font-semibold text-gray-600">User id:</p>
                    <p className='text-sm text-gray-700'>{userData?.id}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Role:</p>
                    <p className='text-sm px-3 py-2 bg-green-200 text-green-600 w-fit rounded-md'>{userData?.role}</p>
                </div>
              </div>
     </div>
     </div>
  
  )
}
