const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.todogreen.com'
    : 'https://dev.todogreen.com'

export const URL_ENDPOINT_AUTHENTICATION = `${BASE_URL}/auth`
export const URL_ENDPOINT_COLLABORATOR = `${BASE_URL}/collaborators`
export const URL_ENDPOINT_CLIENT = `${BASE_URL}/clients`
export const URL_ENDPOINT_PARTNER = `${BASE_URL}/partners`
export const URL_ENDPOINT_GEOLOCATION = `${BASE_URL}/geolocations`
export const URL_ENDPOINT_PAYMENTS = `${BASE_URL}/payments`
export const URL_ENDPOINT_SEARCH = `${BASE_URL}/search`
