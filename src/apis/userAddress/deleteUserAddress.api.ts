'use server'

import { UserAddress } from "@/interfaces/UserAddress.interface"
import { getTokenFun } from "@/utilties/getTokenFun"
import { toast } from "sonner"

export async function deleteUserAddress(addressId:string){
    const token = await getTokenFun()
    const data = await fetch(`${process.env.API}addresses/${addressId}`,{
        method:'delete',
        headers:{
            'Content-type':'application/json',
            token:token!
        }
    })
    if(!data?.ok){
        toast.error(data?.statusText,{position:'top-right'})
    }
    const payload = await data.json()
    return payload
}