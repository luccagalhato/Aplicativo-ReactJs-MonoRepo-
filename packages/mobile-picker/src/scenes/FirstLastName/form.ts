import * as Yup from "yup";
import { User } from "../../common/interfaces";

export interface NameData extends Partial<User> {
  firstName: string;
  lastName: string;
}

export const schema = Yup.object().shape({
  firstName: Yup.string().required("Nome é orbrigatório"),
  lastName: Yup.string().required("Sobrenome é orbrigatório"),
});

export const validateSchema = async (data: NameData) =>
  schema.validate(data, { abortEarly: false });
