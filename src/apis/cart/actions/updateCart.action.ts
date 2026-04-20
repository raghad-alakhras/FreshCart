'use server'
import { getTokenFun } from "@/utilties/getTokenFun";


export async function updateCart({prodId,count}:{prodId:string, count:number}){
    const token =await getTokenFun()
    if(!token){
        throw new Error('unauthorized user')
    }
    try {
        const data= await fetch(`${process.env.API}cart/${prodId}`,{
            method:'put',
            body:JSON.stringify({count}),
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