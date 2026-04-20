'use server'

import { toast } from "sonner"

export async function verifyResetCode(codeData: { resetCode: string }){
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, 
        {method:'post', 
            body:JSON.stringify(codeData),
            headers:{
                'Content-type':'application/json'
            }
        }
    )

    const payload = await data.json()
  
    return payload
}