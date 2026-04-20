import { Subcategory } from "@/interfaces/ProductInterface.interface"
import { toast } from "sonner"

export async function getSubcategories(categoryId:string){

try {
    
    const data= await fetch(`${process.env.API}categories/${categoryId}/subcategories`,{
        headers:{'Content-type':'application/json'}
    })
    if(!data?.ok){
        toast.error(data?.statusText,{position:'top-right'})
    }
    const payload = await data.json()
    return payload.data as Subcategory[]
    
} catch (error:any) {
    throw new Error(error?.message)
}
}