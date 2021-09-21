import { IconNames } from '@ant-design/react-native/lib/icon'

export * from './user.interfaces'

export interface GoogleMapsAddress {
  primary_address: string
  secundary_address: string
  place_id: string
}

export interface LatLng {
  lat: number
  lng: number
}

export interface ProfileItemLink {
  title: string
  onPress: () => void
  iconName: IconNames
}
export interface OrderItems {
  name: string
  id: string
  value: number
  garnishes: { name: string; quantity: number }[]
}

export interface OrderData {
  status: string
  orderId: string
  address: string
  deliveryFee: number
  total: number
  subtotal: number
  paymentInfo: { method: string; info: string }
  deliveryman: { name: string; id: string }
  orderItems: OrderItems[]
}

export interface AwsApiError {
  code: string
  message: string
  name: string
}

export interface Restaurant {
  id?: string
  name: string
  logo_url: string
  banner_url: string
  status: string
  radius: number
  description: string
  categories: string[]
  tags: string[]
  is_online: boolean
  contact: {
    email: string
    cellphone: string
    telephone: string
  }
  location: {
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
  }
  payment_info?: {
    token_id: string
    webhook: {
      id: string
      url: string
      secret: string
      status: 'ACTIVE' | 'INACTIVE'
    }
  }
  open_time: Date
  end_time: Date
  expo_device_token?: string
}

export interface Category {
  id: string
  name: string
  icon_url: string
  department: string
}

export interface ProductOptionItems {
  price: number
  option_name: string
  is_available: boolean
  tags: string[]
  quantity: number
}

export interface ProductOptions {
  max_count: number
  min_count: number
  max_unique: number
  section_name: string
  section_id: number
  option_items: ProductOptionItems[]
}
export interface Product {
  sku: string
  name: string
  description: string
  price: number
  visible: boolean
  image_url: string
  items: string[]
  options: ProductOptions[]
  partner_id: string
  tags: string[]
  quantity: number
}

export interface Catalog {
  id: string
  partner_id: string
  section_id: string
  name: string
  categories: string[]
  items: string[]
}

export interface CategorizedRestaurant {
  [key: string]: Restaurant[]
}
