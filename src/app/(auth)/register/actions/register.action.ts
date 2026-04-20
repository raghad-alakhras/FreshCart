'use server'
import { cookies } from "next/headers";
import { registerSchemaType } from "../schema/register.schema";

export async function registerFun(formData:registerSchemaType){
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, 
        {method:'post', 
            body:JSON.stringify(formData), 
            headers:{
                'content-type':'application/json'
            }
        }
    )
    if(!data.ok)
        throw new Error(data.statusText)
    const payload = await data.json()

    // cookie
    const cookie= await cookies()
    cookie.set('token',payload?.token,{
        httpOnly:true
    })
    return data.ok;
}