'use server'

import { toast } from "sonner"

export async function forgetPassword(mailData: { email: string }){
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, 
        {method:'post', 
            body:JSON.stringify(mailData),
            headers:{
                'Content-type':'application/json'
            }
        }
    )

  
    const payload = await data.json()
    
    return payload
}