import { productItem } from "./ProductCart.interface"
import { ProductInterface } from "./ProductInterface.interface"

export interface OrderData{
    shippingAddress: { city: string, details: string, phone: string },
    taxPrice: number,
    shippingPrice: number,
    totalOrderPrice: number,
    paymentMethodType: string,
    isPaid: boolean,
    isDelivered: boolean,
    _id: string,
    user: {
      _id: string,
      name: string,
      email: string,
      phone: string
    },
    cartItems:productItem [],
    id: number,
    createdAt: string,
    updatedAt: string,
  }

