import { Toast } from '@ant-design/react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import Button from 'app/common/components/Button'
import Input from 'app/common/components/Input'
import { useAuth } from 'app/contexts/Auth'
import { updateClient } from 'app/service/client.api'
import { getValueByKeyInPayload } from 'app/service/helpers'
import {
  getExpoDeviceToken,
  requestNotificationPermission
} from 'app/utils/notification'
import React, { useRef } from 'react'
import { View } from 'react-native'
import * as Yup from 'yup'
import { validateSchema } from './form'

interface NameData {
  firstName: string
  lastName: string
}

const FirstLastName = () => {
  const { colors } = useTheme()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()
  const { userData } = useAuth()

  const handleSubmit = async (data: NameData) => {
    try {
      if (!userData || !userData.accessToken || !userData.idToken) {
        return Toast.fail(
          'Falha ao atualizar usuário, por favor coloque email e senha novamente!',
          3000,
          () => navigation.navigate('EmailSignUp')
        )
      }

      formRef.current?.setErrors({})
      await validateSchema(data)

      const id = getValueByKeyInPayload('username', userData.accessToken)
      let expoDeviceToken = ''
      let notificationIsAuthorized = await requestNotificationPermission()
      if (notificationIsAuthorized) {
        expoDeviceToken = await getExpoDeviceToken()
      }

      if (id) {
        await updateClient(id, {
          first_name: data.firstName,
          last_name: data.lastName,
          expo_device_token: expoDeviceToken
        })

        return navigation.navigate('Location', {
          clientId: id
        })
      }
    } catch (err) {
      console.error(err)
      const ValidationErrors: any = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          ValidationErrors[error.path!] = error.message
        })
        formRef.current?.setErrors(ValidationErrors)
      }

      return err
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        marginTop: 26,
        position: 'relative'
      }}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <View>
          <View style={{ paddingBottom: 12 }}>
            <Input name="firstName" returnKeyType="next" placeholder="Nome" />
          </View>
          <Input name="lastName" returnKeyType="next" placeholder="Sobrenome" />
        </View>

        <Button
          backgroundColor={colors.primary}
          color={colors.card}
          onPress={() => {
            formRef.current?.submitForm()
          }}
        >
          Continuar
        </Button>
      </Form>
    </View>
  )
}

export default FirstLastName
