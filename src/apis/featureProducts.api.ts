import { ProductInterface } from "@/interfaces/ProductInterface.interface"
import { useQuery } from "@tanstack/react-query"


export async function getProducts() : Promise<ProductInterface[]>{

      try {
     const url = await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{headers:{'Content-type':'application/json'}})
    
    if(!url.ok){
        throw new Error(url?.statusText)
    }
    const data = await url.json()
    return data.data
   } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch products')
   }
    }
    

