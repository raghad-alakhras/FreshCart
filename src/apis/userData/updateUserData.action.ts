'use server'
import { getTokenFun } from "@/utilties/getTokenFun";


export async function updateUserInfo(formData:{name:string , email:string , phone:string}){
    const token =await getTokenFun()
    if(!token){
        throw new Error('unauthorized user')
    }
    try {
        const data= await fetch(`${process.env.API}users/updateMe/`,{
            method:'put',
            body:JSON.stringify(formData),
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