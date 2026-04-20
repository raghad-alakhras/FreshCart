import { ProductInterface } from "./ProductInterface.interface"

export interface CartProduct{
    
  status: string,
  numOfCartItems: number,
  cartId: string,
  data: {
    _id: string,
    cartOwner: string,
    products: productItem[],
    totalCartPrice: number
  }

}

export interface productItem{
    count: number,
    _id: string,
    product: ProductInterface,
    price: number
  }
