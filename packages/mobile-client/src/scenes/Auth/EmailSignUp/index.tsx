import { useNavigation, useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import Button from 'app/common/components/Button'
import Input from 'app/common/components/Input'
import { AppTypeEnum } from 'app/common/enums'
import { useAuth } from 'app/contexts/Auth'
import {
  hasAddress,
  hasAddressSurname,
  hasFirstLastName
} from 'app/utils/signed'
import React, { useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'
import { EmailSignUp as SignUpData, validateSchema } from './form'

const EmailSignUp = () => {
  const { colors } = useTheme()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()
  const [apiMessageError, setApiMessageError] = useState<string>('')

  const { signUp } = useAuth()

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
      formRef.current?.setErrors({})
      await validateSchema(data)
      const user = { ...data, appType: AppTypeEnum.USER_APP }
      const response = await signUp(user)

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
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
          <View>
            <View style={{ marginBottom: 12 }}>
              <Input
                name="phone_number"
                keyboardType="phone-pad"
                returnKeyType="next"
                placeholder="Celular"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <Input
                name="email"
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="E-mail"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <Input
                secureTextEntry
                name="password"
                apiMessageError={apiMessageError}
                autoCompleteType="password"
                returnKeyType="next"
                placeholder="Senha"
              />
            </View>
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

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'space-between' },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 20,
    paddingTop: 32,
    paddingRight: 20,
    paddingBottom: 32,
    marginTop: 26,
    position: 'relative'
  },
  form: { flex: 1, justifyContent: 'space-between' }
})

export default EmailSignUp
