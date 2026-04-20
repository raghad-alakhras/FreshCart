import { error } from 'console';
import { toast } from 'sonner';
export async function getReviews(productId:string){

 const data = await fetch(`${process.env.API}products/${productId}/reviews`,{headers:{'Content-type':'application/json'}})
 if(!data.ok){
    toast.error(data?.statusText)
 }
 const payload = await data.json()
 return payload
//  it gives not found response
}