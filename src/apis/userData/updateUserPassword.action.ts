'use server'
import { cookies } from 'next/headers';
import { changePassSchema, changePassSchemaType } from './../../app/profile/settings/schema/changePassSchema';
import { getTokenFun } from "@/utilties/getTokenFun";


export async function updateUserPass(formData:changePassSchemaType){
    const token =await getTokenFun()
    if(!token){
        throw new Error('unauthorized user')
    }
    try {
        const data= await fetch(`${process.env.API}users/changeMyPassword`,{
            method:'put',
            body:JSON.stringify(formData),
            headers:{
                token,
                'Content-type':'application/json'
            }
        })
        const payload = await data.json()
        const cookie = await cookies()
        cookie.set('token',payload?.token)
       
        return payload.message
    } catch (error) {
        throw new Error('Must login first')
    }
}