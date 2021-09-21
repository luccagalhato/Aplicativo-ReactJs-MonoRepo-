import * as Yup from 'yup';
import { labelsTranslated } from 'app/utils/labels-translated';
import { User } from 'app/common/interfaces';

export interface UpdateUserData extends Partial<User> {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;

}

export const schema = Yup.object().shape({
  firstName: Yup.string().required(`${labelsTranslated.firstName} é obrigatório`),
  lastName: Yup.string().required(`${labelsTranslated.lastName} é obrigatório`),
  email: Yup.string().email().required(`${labelsTranslated.email} é obrigatório`),
  cpf: Yup.string()
    .required(`${labelsTranslated.cpf} é obrigatório`),
  phone: Yup.string().required(`${labelsTranslated.phone} é obrigatório`),
});

export const validateSchema = async (data: UpdateUserData) => schema.validate(data, { abortEarly: false });
