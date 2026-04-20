'use server'
import { getTokenFun } from "@/utilties/getTokenFun";

export async function addToWishlist(prodId:string){

    const token =await getTokenFun()
    const data = await fetch(`${process.env.API}wishlist`,{
        method:'post',
        body:JSON.stringify({productId:prodId}),
        headers:{
            'Content-type':'application/json',
            token:token!
        }
    })
    const payload= await data.json()
    return payload

}