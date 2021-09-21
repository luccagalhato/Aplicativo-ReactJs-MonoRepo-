export interface CartItem {
  sku: string
  name: string
  quantity: number
  unit_price: number
  urlImg?: string
  optionalItems: OptionalGroup[]
  value: number
  total: number
  date : string
}
export interface OptionalGroup{
  name: string
  option_items: OptionalItem[]
}
export interface OptionalItem {
  name: string
  quantity: number
  unit_price: number
}

export interface CartTotal {
  sub_total_value: number
  partner_id: string
  cart_item: CartItem[]
}