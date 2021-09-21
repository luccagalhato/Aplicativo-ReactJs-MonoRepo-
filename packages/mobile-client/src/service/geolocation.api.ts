import { ApiCallback } from '../contexts/Service';

export function getGoogleMapsAddress(api: ApiCallback) {
  return async (query: string) => {
    try {
      return api('get', "/google-map-api", { params: { input: query } })
    } catch (error) {
      return error
    }
  }
}
