import { Category } from "@/interfaces/ProductInterface.interface"
import { toast } from "sonner"


export async function getCategoris() : Promise <Category[] | null>{
 
   try {
        const url = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,{headers:{'Content-type':'application/json'}})
   
    if(!url.ok){
       toast.error(url?.statusText)
    }
    const data = await url.json()
    return data.data
   } catch (error:any) {
      return null
     // throw new Error(error)
      
   }
  
}