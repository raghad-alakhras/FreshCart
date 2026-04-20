'use server'
import { getTokenFun } from "@/utilties/getTokenFun"
import { toast } from "sonner"

interface shippingAddressInterface{
    details: string,
        phone: string,
        city: string
}



export async function cachPayment(cartId:string, shippingAddress:shippingAddressInterface){
// online payment
    const token =await getTokenFun()
    if(!token){
        throw new Error('user not authenticated')
    }
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        method:'post',
        body: JSON.stringify({shippingAddress}),
        headers: {
            'Content-type':'application/json',
            token:token!
        }
    })
    if(!data.ok){
        toast.error('unauthorized',{
            position:'top-right'
        })
    }

    const payload = await data.json()
   
    return payload
    

}