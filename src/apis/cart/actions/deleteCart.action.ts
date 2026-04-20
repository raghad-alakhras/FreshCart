'use server'
import { getTokenFun } from "@/utilties/getTokenFun";

export async function deleteCartItem(prodId:string){
    const token =await getTokenFun()
    if(!token){
        throw new Error('unauthorized user')
    }
    try {
        const data= await fetch(`${process.env.API}cart/${prodId}`,{
            method:'delete',
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