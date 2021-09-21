import { Address, GoogleMapsAddress, LatLng, User } from '../common/interfaces'
import { api } from '../api'
import { ApiCallback } from '../contexts/Service'

export function createUser(_api: ApiCallback) {
  return async (user: User) => {
    try {
      const response = await api.post('/clients', user)

      return response.data
    } catch (error) {
      return error
    }
  }
}

export async function updateClient(id: string, user: Partial<User>) {
  try {
    return api.put(`/clients/${id}`, user)
  } catch (error) {
    throw error
  }
}

export function updateClientGoogleLocation(_api: ApiCallback) {
  return async (id: string, googleMapsAddress: GoogleMapsAddress) => {
    try {
      const response = await api.put(
        `/clients/address/google-location/${id}`,
        googleMapsAddress
      )
      return response.data
    } catch (error) {
      return error
    }
  }
}

export async function updateClientAddressSurname(
  id: string,
  delivery_address: Partial<Address>
) {
  try {
    const response = await api.put(
      `clients/address/surname/${id}`,
      delivery_address
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export function updateClientLatLon(_api: ApiCallback) {
  return async (id: string, latLon: LatLng) => {
    try {
      const response = await api.put(`clients/address/lat-lng/${id}`, latLon)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export function changeEmailNotification(_api: ApiCallback) {
  return async (emailNotification: boolean) => {
    try {
      // return api("patch", "change-email-notification", {
      //   data: { emailNotification },
      // });
      return emailNotification
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export function changeSMSNotification(api: ApiCallback) {
  return async (smsNotification: boolean) => {
    try {
      // await api("patch", "change-sms-notification", {
      //   data: { smsNotification },
      // });
      return smsNotification
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
