import * as Yup from "yup";
import { AppTypeEnum } from "../../common/enums";

export interface EmailSignUp {
  email: string;
  password: string;
  appType?: AppTypeEnum;
}

export const schema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail obrigatório"),
  password: Yup.string()
    .required("Digite uma senha")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "A senha deve conter 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

export const validateSchema = async (data: EmailSignUp) =>
  schema.validate(data, { abortEarly: false });
