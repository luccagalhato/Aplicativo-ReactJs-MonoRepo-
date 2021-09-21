import { URL_ENDPOINT_PAYMENTS } from './apis-endpoint'
import api, { ApiResponse } from 'apisauce'
import { CreditCardHash,CreateChargeInput ,UserPayment} from '../common/interfaces/payment.interface'
import { AwsApiError } from '../common/interfaces'

const paymentApi = api.create({
  baseURL: URL_ENDPOINT_PAYMENTS,
  headers: { 'Content-Type': 'application/json' }
})

export const addCreditCard = async (
  creditCardHash: CreditCardHash
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await paymentApi.post('/add-credit-card', creditCardHash)
  } catch (error) {
    return error
  }
}

export const createCharge = async (
  chargeData: CreateChargeInput
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await paymentApi.post('/charge', chargeData)
  } catch (error) {
    return error
  }
}


export const createPayment = async (
  paymentData: UserPayment
): Promise<ApiResponse<any, AwsApiError>> => {
  try {
    return await paymentApi.post('/payment', paymentData)
  } catch (error) {
    return error
  }
}