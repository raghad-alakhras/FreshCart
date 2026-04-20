
'use server'
import { decode } from 'next-auth/jwt';
import { getTokenFun } from "@/utilties/getTokenFun"
import { jwt } from 'zod';
import { jwtDecode } from 'jwt-decode';

export async function getUserOrder(){
    const token = await getTokenFun()
    const tokenData = jwtDecode<{ id: string }>(token!)
    //console.log(tokenData)
    const userId = tokenData?.id
   const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,{
    method:'get',
    headers:{
        'Content-type':'application/json'
    }
   })
   if(!data.ok){
    throw new Error(data?.statusText)
   }
   const payload = await data.json()
   return payload
}