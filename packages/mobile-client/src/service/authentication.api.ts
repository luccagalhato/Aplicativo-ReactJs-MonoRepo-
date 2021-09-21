import { api } from '../api'
import { AppTypeEnum } from '../common/enums'
import { UserRegistration, UserSignIn } from '../common/interfaces'

export const registerUser = async (user: UserRegistration) => {
  const currUser = { ...user, appType: AppTypeEnum.USER_APP }
  return api.post('/auth/sign-up', currUser)
}

export const authenticationUser = async (user: UserSignIn) => {
  const currUser = { ...user, appType: AppTypeEnum.USER_APP }
  return api.post('/auth/sign-in', currUser)
}

export const confirmCode = async (user: UserRegistration, code: string) => {
  return api.post('/auth/confirm-sign-up-getting-leed', {
    user,
    code
  })
}

export const deleteCognitoUser = async (user: UserRegistration) => {
  return api.post(`/auth/delete`, user)
}

export const resendConfirmationCode = async (user: UserRegistration) => {
  return api.post(`/auth/resend-code`, user)
}
