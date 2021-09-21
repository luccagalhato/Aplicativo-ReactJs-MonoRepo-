import api from 'apisauce'
import { LatLng } from 'geolocation-utils'
import { URL_ENDPOINT_SEARCH } from '../apis-endpoint'

const searchApi = api.create({
  baseURL: URL_ENDPOINT_SEARCH
})

export const generalSearch = {
  partners: async (
    q: string,
    categories: string[],
    latLng: LatLng
  ): Promise<any> => {
    try {
      const params: any = {
        q,
        lat: latLng.lat,
        lng: latLng.lng,
        categories: categories.join(',')
      }
      return searchApi.get('/partners', params)
    } catch (error) {
      return error
    }
  },

  products: async (q: string): Promise<any> => {
    try {
      const params = { q }
      return searchApi.get('/products', params)
    } catch (error) {
      return error
    }
  }
}
