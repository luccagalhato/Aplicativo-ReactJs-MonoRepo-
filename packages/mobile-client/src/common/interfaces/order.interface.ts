import {CartItem} from '../interfaces/cart.interface'
import { Address } from './user.interfaces';

export interface Order {
  id: string
  delivery_fee: number
  sub_total_value: number
  total_value: number
  date_time: Date
  partner_id: string
  delivery_address: {
    address: string
    city: string
    state: string
    country: string
    neighborhood: string
    latitude: number
    longitude: number
    number: number
    complement: string
    zip_code: string
  } | Address
  status: string
  items: CartItem[] // aqui seria o objeto do carrinho 
  client_id: String
}

export interface OrderId {
  id: string
}