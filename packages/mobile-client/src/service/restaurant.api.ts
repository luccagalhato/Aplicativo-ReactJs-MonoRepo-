import {
  Catalog,
  CategorizedRestaurant,
  Category,
  Product,
  Restaurant
} from 'app/common/interfaces'
import { ApiCallback } from 'app/contexts/Service'
import { api } from '../api'

export const getRestaurantCategories = async (clientApi: ApiCallback) => {
  try {
    const response = await api.get<Category[]>('/clients/search/categories')
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getRestaurantList = async (clientApi: ApiCallback) => {
  try {
    const response = await api.get<Restaurant[]>('/clients/search/partners')

    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getRestaurantsCategorized = async (clientApi: ApiCallback) => {
  try {
    const response = await api.get<CategorizedRestaurant>(
      '/clients/search/categorized-partners'
    )

    return response.data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const getRestaurantById = async (
  partnerApi: ApiCallback,
  id: string
) => {
  try {
    const response = await api.get<Restaurant>(`/partners/${id}`)

    return response.data
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const getRestaurantCatalogs = async (
  partnerApi: ApiCallback,
  partner_id: string
) => {
  try {
    const response = await api.get<Catalog[]>(
      `/partners/catalogs/partner/${partner_id}`,
      {
        params: { partner_id }
      }
    )

    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getRestaurantCatalogProducts = async (
  partnerApi: ApiCallback,
  catalogId: string
) => {
  try {
    const response = await api.get<Product[]>(
      `/partners/catalogs/${catalogId}/products`
    )

    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}
