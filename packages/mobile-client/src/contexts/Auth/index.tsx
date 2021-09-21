import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserData, UserRegistration, UserSignIn } from 'app/common/interfaces'
import {
  hasAddress,
  hasAddressSurname,
  hasFirstLastName
} from 'app/utils/signed'
import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  api,
  getStorageKey,
  setStorage,
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_ID_TOKEN,
  STORAGE_KEY_REFRESH_TOKEN,
  STORAGE_KEY_USER
} from '../../api'

interface AuthProviderProps {
  children: ReactChild
}

interface AuthContextData {
  signed: boolean
  loading: boolean
  userData: UserData | null
  signIn(user: UserRegistration): Promise<any>
  signUp(user: UserRegistration): Promise<any>
  signOut(): Promise<void>
  setUserData(data: UserData): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData>({} as UserData)
  const [loading, setLoading] = useState(true)

  function handleSetUserData(data: UserData) {
    if (data) {
      setUserData(past => ({ ...past, ...data }))
    } else {
      setUserData({} as UserData)
    }
  }

  async function signIn(user: UserSignIn) {
    try {
      const response = await api.post('/auth/sign-in', user)
      setUserData(response.data)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function signUp(user: UserRegistration) {
    try {
      const response = await api.post('/auth/sign-up', user)
      setUserData(response.data)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      STORAGE_KEY_ACCESS_TOKEN,
      STORAGE_KEY_ID_TOKEN,
      STORAGE_KEY_REFRESH_TOKEN,
      STORAGE_KEY_USER
    ])
    setUserData({} as UserData)
  }

  useEffect(() => {
    async function getClient() {
      try {
        const refreshToken = await getStorageKey(STORAGE_KEY_REFRESH_TOKEN)
        const accessToken = await getStorageKey(STORAGE_KEY_ACCESS_TOKEN)
        const idToken = await getStorageKey(STORAGE_KEY_ID_TOKEN)
        const client = await getStorageKey(STORAGE_KEY_USER)

        if (refreshToken && accessToken && idToken && client) {
          api.defaults.headers.Authorization = `Bearer ${accessToken}`
          api.defaults.headers.idToken = idToken

          const data: UserData = {
            refreshToken,
            accessToken,
            idToken,
            client: JSON.parse(client)
          }

          setUserData(data)
        }

        setLoading(false)
      } catch (err) {
        setLoading(false)
        signOut()
        console.log(err)
      }
    }

    getClient()
  }, [])

  useEffect(() => {
    if (userData) {
      setStorage(userData)
      console.log(`USER DATA STORAGED`)
    }
  }, [userData])

  const signed =
    !!userData?.client &&
    hasFirstLastName(userData.client) &&
    hasAddress(userData.client) &&
    hasAddressSurname(userData.client)

  return (
    <AuthContext.Provider
      value={{
        signed,
        userData,
        signUp,
        signIn,
        signOut,
        loading,
        setUserData: handleSetUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
