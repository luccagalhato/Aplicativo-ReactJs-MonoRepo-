import { api } from '../api'
import { URL_ENDPOINT_CLIENT } from './apis-endpoint'
import { AwsApiError } from '../common/interfaces'

export const generalSearch = async (
  query: string
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await api.get('/clients/search/tracked', query)
  } catch (error) {
    return error
  }
}
