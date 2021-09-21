import { ApisauceInstance } from 'apisauce'
import { Buffer } from 'buffer'

export const setToken = (
  api: ApisauceInstance,
  accessToken: string,
  idToken: string
) => {
  api.setHeaders({
    authorization: `Bearer ${accessToken}`,
    idtoken: idToken
  })
}

export const isValidPattern = (token: string): boolean => {
  const regex = /([0-9a-zA-Z]){1,}\.([0-9a-zA-Z]){1,}\.([0-9a-zA-Z]){1,}/
  return regex.test(token)
}

export const getValueByKeyInPayload = (key: string, token: string) => {
  if (!isValidPattern(token)) {
    return null
  }
  let payload: string[] | string = token.split('.')
  payload = Buffer.from(payload[1], 'base64').toString()
  payload = JSON.parse(payload)
  return payload[key as any] || null
}
