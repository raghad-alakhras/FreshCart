'use server'
import { getTokenFun } from "@/utilties/getTokenFun";

export async function addToCart(prodId:string){

    const token =await getTokenFun()
    const data = await fetch(`${process.env.API}cart`,{
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