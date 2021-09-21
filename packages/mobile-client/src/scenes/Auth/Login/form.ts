import * as Yup from 'yup'
import { AppTypeEnum } from 'app/common/enums'

export interface EmailSignIn {
  email: string
  password: string
  appType?: AppTypeEnum
}
export const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string()
    .required('Digite uma senha')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
      'A senha deve conter 6 caracteres, uma maiúscula, uma minúscula, um número'
    )
})

export const validateSchema = async (data: EmailSignIn) =>
  schema.validate(data, { abortEarly: false })
