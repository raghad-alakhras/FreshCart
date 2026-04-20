import { ProductInterface } from "@/interfaces/ProductInterface.interface"


export async function getSingleProd({id}:{id:string}) : Promise<ProductInterface>{
   try {
     const url = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const data = await url.json()
    if(!url.ok)
        throw new Error('some thing get error')
    
    return data.data
   } catch (error) {
    throw new Error('error')
   }
}