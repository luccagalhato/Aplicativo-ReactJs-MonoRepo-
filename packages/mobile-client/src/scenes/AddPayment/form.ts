import * as Yup from 'yup';

export interface CardData {
  cardNumber: string;
  holderName: string;
  securityCode: string;
  expirationDate: string | Date;
}

export interface CardDataForm {
  cardNumber: string[];
  holderName: string;
  securityCode: string;
  expirationDate: Date;
}

export const schema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Número de cartão de crédito obrigatório')
    .length(16),
  holderName: Yup.string()
    .required('Digite o nome como está no cartão de crédito')
    .min(3),
  securityCode: Yup.string()
    .required('Digite o número de segurança')
    .min(3, 'O número de segurança deve conter no mínimo 3 dígitos'),
  expirationDate: Yup.string()
    .required('Data de validade obrigatória')
    .min(3)
});

export const validateSchema = async (data: CardData) =>
  schema.validate(data, { abortEarly: false });
