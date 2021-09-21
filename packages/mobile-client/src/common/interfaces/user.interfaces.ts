import { AppTypeEnum } from '../enums'

export interface UserRegistration {
  email: string
  password: string
  phone_number?: string
  appType?: AppTypeEnum | string
}
export interface UserSignIn {
  email: string
  password: string
  appType?: AppTypeEnum | string
}
export interface UserData {
  refreshToken: string
  accessToken: string
  idToken: string
  client: User
}
export interface UserDataLogin extends UserData {}
export interface UserCode {
  user: UserRegistration
  code: number
}

export interface Address {
  place_id: string
  street?: string
  city?: string
  district?: string
  state?: string
  country?: string
  number: number
  complement?: string
  postal_code?: string
  latitude?: number
  longitude?: number
  surname?: string
  reference_point?: string
}

export interface User {
  id: string
  cpf: string
  phone: string
  cognitoIdentity: string
  delivery_address: Address[]
  default_place_id: string
  email: string
  first_name: string
  last_name: string,
  expo_device_token: string,
}
