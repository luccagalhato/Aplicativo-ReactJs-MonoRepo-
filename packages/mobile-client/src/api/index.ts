import axios, { AxiosError } from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserData } from 'app/common/interfaces'

interface FailedRequestsQueue {
  onSuccess(token: string): void
  onFailure(err: AxiosError): void
}

export const STORAGE_KEY_REFRESH_TOKEN = '@ClientAuth:refreshToken'
export const STORAGE_KEY_ACCESS_TOKEN = '@ClientAuth:accessToken'
export const STORAGE_KEY_ID_TOKEN = '@ClientAuth:idToken'
export const STORAGE_KEY_USER = '@ClientAuth:user'

export async function getStorageKey(key: string) {
  return AsyncStorage.getItem(key)
}

export async function setStorage(data: UserData) {
  const { accessToken, idToken, client, refreshToken } = data
  if (refreshToken && accessToken && idToken && client) {
    await AsyncStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, refreshToken)
    await AsyncStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken)
    await AsyncStorage.setItem(STORAGE_KEY_ID_TOKEN, idToken)
    await AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(client))
  }
}

export const api = axios.create({
  baseURL: __DEV__ ? 'https://dev.todogreen.com' : 'https://dev.todogreen.com',
  headers: { 'Content-Type': 'application/json' }
})

let isRefreshing = false
let failedRequestsQueue: FailedRequestsQueue[] = []

api.interceptors.request.use(config => {
  return config
})

api.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    console.log('INTERCEPTOR ERROR', error)

    if (error.response?.status === 403) {
      const refreshToken = await getStorageKey(STORAGE_KEY_REFRESH_TOKEN)
      const storagedUser = await getStorageKey(STORAGE_KEY_USER)

      const originalAxiosConfig = error.config

      if (!isRefreshing && storagedUser) {
        isRefreshing = true
        const parsedUser = JSON.parse(storagedUser)

        api
          .post('/auth/refresh-token', {
            user: {
              email: parsedUser.email,
              appType: 'USER'
            },
            refreshToken
          })
          .then(async response => {
            api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`
            api.defaults.headers.idtoken = response.data.idToken

            const { accessToken, refreshToken, idToken } = response.data

            await setStorage({
              accessToken,
              refreshToken,
              idToken,
              client: parsedUser
            })

            failedRequestsQueue.forEach(request =>
              request.onSuccess(accessToken)
            )
            failedRequestsQueue = []
          })
          .catch(err => {
            console.log(err)
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalAxiosConfig.headers.Authorization = `Bearer ${token}`
            resolve(api(originalAxiosConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          }
        })
      })
    }
    return Promise.reject(error)
  }
)
