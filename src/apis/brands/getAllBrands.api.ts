import { BrandRoot } from "@/interfaces/Brands.interface"
import { toast } from "sonner"

export async function getAllBrands(){
    const data = await fetch (`https://ecommerce.routemisr.com/api/v1/brands`)
    if(!data.ok){
        toast.error(data?.statusText)
    }
    const payload = await data.json()
    return payload as BrandRoot
}