import { api } from '../api'
import { Catalog } from '../common/interfaces'

export const getPartners = async (
  city: string,
  latitude: string,
  longitude: string
) => {
  return api.get(`/partners/?city=${city}&lat=${latitude}&lon=${longitude}`)
}

export const getPartnerCatalogs = async (partner_id: string) => {
  return api
    .get<Catalog[]>('partners/catalogs', { partner_id })
    .then(response => {
      return response.data
    })
}
