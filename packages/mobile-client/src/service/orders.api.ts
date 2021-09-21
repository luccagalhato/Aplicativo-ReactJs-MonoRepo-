import { URL_ENDPOINT_CLIENT } from './apis-endpoint'
import api, { ApiResponse } from 'apisauce'
import { Order,OrderId } from '../common/interfaces/order.interface'
import { AwsApiError } from '../common/interfaces'

const paymentApi = api.create({
  baseURL: URL_ENDPOINT_CLIENT,
  headers: { 'Content-Type': 'application/json' }
})

export const createOrder = async (
  order: Order
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await paymentApi.post('/orders/', order)
  } catch (error) {
    return error
  }
}

export const FindOneOrder = async (
  id: OrderId
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await paymentApi.get('/orders/get-one/', id)
  } catch (error) {
    return error
  }
}