import React, {
  createContext,
  ReactChild,
  useContext,
  useCallback,
  useEffect
} from 'react'
import { AxiosRequestConfig, Method } from 'axios'
import apisauce, { ApiResponse } from 'apisauce'
import {
  URL_ENDPOINT_CLIENT,
  URL_ENDPOINT_GEOLOCATION,
  URL_ENDPOINT_PARTNER
} from '../../service/apis-endpoint'
import { useAuth } from '../Auth'

import { setToken } from '../../service/helpers'

interface Props {
  children: ReactChild
}

export type ApiCallback = <T>(
  method: Method,
  url: string,
  config: AxiosRequestConfig
) => Promise<ApiResponse<T>>

interface ServiceContextData {
  clientApi: ApiCallback
  partnerApi: ApiCallback
  geolocationApi: ApiCallback
}

const api = apisauce.create({
  baseURL: ''
})

function client<T>(method: Method, url: string, config: AxiosRequestConfig) {
  return api.any<T>({
    method,
    url,
    baseURL: URL_ENDPOINT_CLIENT,
    ...config
  })
}

function partner<T>(method: Method, url: string, config: AxiosRequestConfig) {
  return api.any<T>({
    method,
    url,
    baseURL: URL_ENDPOINT_PARTNER,
    ...config
  })
}

function geolocation<T>(
  method: Method,
  url: string,
  config: AxiosRequestConfig
) {
  return api.any<T>({
    method,
    url,
    baseURL: URL_ENDPOINT_GEOLOCATION,
    ...config
  })
}

const ServiceContext = createContext<ServiceContextData>(
  {} as ServiceContextData
)

const ServiceProvider = ({ children }: Props) => {
  const clientApi = useCallback(client, [])
  const partnerApi = useCallback(partner, [])
  const geolocationApi = useCallback(geolocation, [])

  const { userData, signOut } = useAuth()

  api.axiosInstance.interceptors.response.use(response => {
    if ([403, 401].includes(response.status)) signOut()
    return response
  })

  useEffect(() => {
    if (!userData) return
    if (userData.accessToken && userData.idToken) {
      setToken(api, userData.accessToken, userData.idToken)
    }
  }, [userData])

  return (
    <ServiceContext.Provider
      value={{
        clientApi,
        partnerApi,
        geolocationApi
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

function useService() {
  const context = useContext(ServiceContext)
  return context
}

export { ServiceProvider, useService }
