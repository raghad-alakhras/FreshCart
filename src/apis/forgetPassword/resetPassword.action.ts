'use server'

import { cookies } from "next/headers"
import { toast } from "sonner"

export async function resetNewPassword(formData: { email: string , newPassword:string }){
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, 
        {method:'put', 
            body:JSON.stringify(formData),
            headers:{
                'Content-type':'application/json'
            }
        }
    )
   
   if(!data?.ok){
    throw new Error(data?.statusText)
   }

    const payload = await data.json()
    const cookie = await cookies()
    cookie.set('token', payload?.token , {httpOnly:true})
 console.log('payload', payload)
    return data?.ok
}