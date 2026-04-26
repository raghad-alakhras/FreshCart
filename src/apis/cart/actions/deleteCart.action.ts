'use server'
import { getTokenFun } from "@/utilties/getTokenFun";
import { toast } from "sonner";

export async function deleteCartItem(prodId:string){
    const token =await getTokenFun()
    if(!token){
        toast.error('unauthorized user')
        throw new Error('unathorized')
       
    }

    try {
        const data= await fetch(`${process.env.API}cart/${prodId}`,{
            method:'DELETE',
            body:JSON.stringify({productId:prodId}),
            headers:{
                token,
                'Content-type':'application/json'
            }
        })
        const payload = await data.json()
        return payload
    } catch (error) {
        throw new Error('Must login first')
    }
}