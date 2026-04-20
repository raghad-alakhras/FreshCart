import { BrandRoot } from "@/interfaces/Brands.interface"
import { toast } from "sonner"
import { getProducts } from "../featureProducts.api"

export async function getBrandProducts(id:string){
    const data = await getProducts()
   const brandProducts = data.filter(product=>product?.brand._id === id)
   return brandProducts
}