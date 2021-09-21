import React, { useRef, useCallback, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import * as Yup from 'yup'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Input from 'app/common/components/Input'
import Button from 'app/common/components/Button'
import { AppTypeEnum } from 'app/common/enums'
import { EmailSignIn as SignInData, validateSchema } from './form'
import { useAuth } from 'app/contexts/Auth'
import {
  hasAddress,
  hasAddressSurname,
  hasFirstLastName
} from 'app/utils/signed'
import { useService } from 'app/contexts/Service'
import { updateClient } from 'app/service/client.api'
import { getExpoDeviceToken, requestNotificationPermission } from 'app/utils/notification'

const Login = () => {
  const { colors } = useTheme()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()
  const [apiMessageError, setApiMessageError] = useState<string>('')
  const { clientApi } = useService()

  const { signIn } = useAuth()

  const handleSubmit = useCallback(async (data: SignInData) => {
    try {
      formRef.current?.setErrors({})
      await validateSchema(data)
      const user = { ...data, appType: AppTypeEnum.USER_APP }
      const response = await signIn(user)

      if (response.data) {
        const { client, code } = response.data
        if (code === 'UserNotConfirmedException') {
          return navigation.navigate('VerificationCode', { user })
        }
        if (!hasFirstLastName(client)) {
          return navigation.navigate('FirstLastName', {
            user
          })
        }
        if (!hasAddress(client)) {
          return navigation.navigate('Location', {
            user
          })
        }
        if (!hasAddressSurname(client)) {
          const { delivery_address } = client
          return navigation.navigate('LocationSurname', {
            address: delivery_address[0] || {}
          })
        }
        if (client) {
          let notificationIsAuthorized = await requestNotificationPermission()
          if (notificationIsAuthorized) {
            const currentExpoDeviceToken = await getExpoDeviceToken()
            const savedExpoDeviceToken = client.expoDeviceToken
            if (savedExpoDeviceToken !== currentExpoDeviceToken) {
              await updateClient(client.id, {
                expo_device_token: currentExpoDeviceToken
              })
            }
          }
        }
        return navigation.navigate('Home')
      }

      return setApiMessageError('Usuário ou senha inválidos!')
    } catch (err) {
      const ValidationErrors: any = {}

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          ValidationErrors[error.path as string] = error.message
        })
        formRef.current?.setErrors(ValidationErrors)
        console.log(formRef.current?.getErrors())
      }
      return err
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', justifyContent: 'space-between' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingLeft: 20,
          paddingTop: 32,
          paddingRight: 20,
          paddingBottom: 32,
          marginTop: 26,
          position: 'relative'
        }}
      >
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ flex: 1, justifyContent: 'space-between' }}
        >
          <View>
            <View style={{ paddingBottom: 12 }}>
              <Input
                name="email"
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="E-mail"
                autoCapitalize="none"
              />
            </View>
            <Input
              secureTextEntry
              name="password"
              apiMessageError={apiMessageError}
              autoCompleteType="password"
              returnKeyType="next"
              placeholder="Senha"
            />
          </View>

          <View>
            <Button
              backgroundColor={colors.primary}
              color={colors.card}
              onPress={() => {
                setApiMessageError('')
                formRef.current?.submitForm()
              }}
            >
              Entrar
            </Button>
          </View>
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login
