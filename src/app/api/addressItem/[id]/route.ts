
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }){

    const { id: addressId } = await  params
    
    console.log('Fetching address for ID:', addressId)
    
    const token = await getToken({req})
    if(!token){
        return NextResponse.json({error:'Unauthorized'})
    }
     const data= await fetch(`${process.env.API}addresses/${addressId}`,{
     headers:{
        token:token?.token!,
        'Content-type':'application/json'
     }
    })
    if(!data?.ok){
        return NextResponse.json({error:data.statusText, status:data?.status})
    }
    const payload = await data.json()
    
    return NextResponse.json(payload)
}