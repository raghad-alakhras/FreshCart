'use server'

import { UserAddress } from "@/interfaces/UserAddress.interface"
import { getTokenFun } from "@/utilties/getTokenFun"
import { toast } from "sonner"

export async function addUserAddress(address:UserAddress){
    const token = await getTokenFun()
    const data = await fetch(`${process.env.API}addresses`,{
        method:'post',
        body:JSON.stringify(address),
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