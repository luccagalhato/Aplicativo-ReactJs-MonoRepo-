import { User } from '../common/interfaces'

export function hasFirstLastName(user: User | undefined): boolean {
  return !!user?.first_name && !!user?.last_name
}

export function hasAddressSurname(user: User | undefined): boolean {
  if (!user) return false
  return !!user.default_place_id
}
export function hasAddress(user: User) {
  if (!user) return false
  if (!user.delivery_address) return false
  return user.delivery_address.length > 0
}
