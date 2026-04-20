'use server'
import { getTokenFun } from "@/utilties/getTokenFun";

export async function clearCart(){
    const token =await getTokenFun()
    if(!token){
        throw new Error('unauthorized user')
    }
    try {
        const data= await fetch(`${process.env.API}cart`,{
            method:'delete',
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