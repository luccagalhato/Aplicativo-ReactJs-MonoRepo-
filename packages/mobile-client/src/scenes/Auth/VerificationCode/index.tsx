import { Provider, Toast } from '@ant-design/react-native'
import { RouteProp, useNavigation, useTheme } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import Button from 'app/common/components/Button'
import CodeInput from 'app/common/components/CodeInput'
import { UserRegistration } from 'app/common/interfaces'
import { useAuth } from 'app/contexts/Auth'
import {
  confirmCode,
  resendConfirmationCode
} from 'app/service/authentication.api'
import React, { useRef } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View
} from 'react-native'

type VerificationCodeParamList = {
  VerificationCode: {
    email?: string
    phone?: string
    user: UserRegistration
  }
}

type ProfileScreenRouteProp = RouteProp<
  VerificationCodeParamList,
  'VerificationCode'
>

type Props = {
  route: ProfileScreenRouteProp
}

const VerificationCode = ({ route }: Props) => {
  const { colors } = useTheme()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()
  const { signIn, signOut } = useAuth()

  const { user } = route.params
  const { email, phone_number } = user

  const handleResendConfirmationCode = async () => {
    try {
      await resendConfirmationCode(user)
      Toast.info('Codigo Reenviado!')
    } catch (error) {
      Toast.fail('Houve um problema! Tente novamente mais tarde.')
    }
  }

  const handleSubmit: SubmitHandler<FormData & { 'code-digit': string }> =
    async (data): Promise<void> => {
      try {
        if (data['code-digit']?.length < 6) {
          Toast.info('O código de confirmação deve ter 6 dígitos', 2)
          return
        }

        await confirmCode(user, data['code-digit'])
        await signOut()

        const response = await signIn(user)

        if (response.data) {
          navigation.navigate('FirstLastName', {
            user
          })
        }
      } catch (error) {
        console.error(error)
        Toast.fail('Codigo de verificação inválido!')
      }
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Provider>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 24,
            marginTop: 26
          }}
        >
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  textAlign: 'left',
                  fontFamily: 'Sora',
                  color: colors.text
                }}
              >
                Enviamos um código de 6 digitos para {phone_number || email}
              </Text>
              <CodeInput
                name="code-digit"
                // onEndEditing={formRef.current?.submitForm}
              />
              <Pressable onPress={handleResendConfirmationCode}>
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: 14,
                    lineHeight: 22
                  }}
                >
                  Reenviar código
                </Text>
              </Pressable>
            </View>
            <Button
              onPress={() => {
                formRef.current?.submitForm()
              }}
              backgroundColor={colors.primary}
              color={colors.card}
            >
              Continuar
            </Button>
          </Form>
        </View>
      </Provider>
    </KeyboardAvoidingView>
  )
}

export default VerificationCode
