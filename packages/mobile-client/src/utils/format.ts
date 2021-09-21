import { Restaurant } from 'app/common/interfaces'
import { toCurrency } from './currency'
import { toDateTime } from './datetime'

export const formatPhoneNumber = (phoneNumber: String): String | null => {
  let regex = /^(\d{2})(\d{5})(\d{4})$/
  if (phoneNumber.length === 10) {
    regex = /^(\d{2})(\d{4})(\d{4})$/
  }

  const match = phoneNumber.match(regex)

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return null
}

export const formatLocation = (location: Restaurant['location']) => {
  const { address, neighborhood, city, state, number, complement, zip_code } =
    location
  const paths = []
  if (address) paths.push(address)
  if (number) paths.push(number)
  if (complement) paths.push(complement)
  if (neighborhood) paths.push(neighborhood)
  if (city) paths.push(city)
  if (state) paths.push(state)
  if (zip_code) paths.push(zip_code)
  return paths.join(' - ')
}

export const formatCurrency = toCurrency
