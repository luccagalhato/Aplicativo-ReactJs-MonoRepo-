import React, {
  createContext,
  ReactChild,
  useContext,
  useState,
} from 'react';
import {
  createCharge as createChargeApi,
  createPayment as createPaymentApi,
} from 'app/service/payment.api';
import {
  FindOneOrder as findOrderApi,
  createOrder as createOrderApi,
} from 'app/service/orders.api';
import {
  Charge,
  CreateChargeInput,
  CreditCard,
  PaymentTypes,
  UserPayment,
} from 'app/common/interfaces/payment.interface';
import { useAuth } from '../Auth';
import { ApiResponse } from 'apisauce';
import { AwsApiError } from 'app/common/interfaces';
import { Order } from 'app/common/interfaces/order.interface';

interface PaymentProviderProps {
  children: ReactChild
}

interface ICharge {
  amount: number
  description: IDescription
}

export interface IDescription {
  name: string,
  id: string
}

interface PaymentContextData {
  hasCreditCard: boolean
  createCharge(charge: ICharge, cb: Function): Promise<ApiResponse<any, AwsApiError>>
  creditCards: CreditCard[]
  handleAddCreditCard(creditCard: CreditCard): void
  handleSetCreditCardId(id: string): void
  createOrder(partialOrder: Partial<Order>): Promise<ApiResponse<any, AwsApiError>>
}

const PaymentContext = createContext<PaymentContextData>({} as PaymentContextData);

const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]); // botar um local storage aqui
  const [creditCardId, setCreditCardId] = useState<string>('');
  const [category, setCategory] = useState<IDescription>();
  const [chargeId, setChargeId] = useState<string>('');
  const [payment, setPayment] = useState<any>();
  const { userData } = useAuth();
  const { client } = userData!;
  const mainAddress = client?.delivery_address
    .filter(({ place_id }) => {
      return place_id === client.default_place_id;
    })[0];
  
  const address = {
    street: mainAddress?.street ?? '',
    number: mainAddress?.number.toString() ?? '',
    postCode: mainAddress?.postal_code?.replace('-', '') ?? '',
    city: mainAddress?.city ?? '',
    state: mainAddress?.state ?? '',
  }

  async function createCharge(charge: ICharge, cb: Function) {
    setCategory(charge.description);
    const chargeData: CreateChargeInput = {
      charge: {
        ...chargeStaticData,
        amount: charge.amount!,
        description: charge.description.name,
      },
      billing: {
        email: client!.email,
        notify: false,
        name: `${client?.first_name} ${client?.last_name}`,
        document: client!.cpf,
        address,
      },
    };
    const response = await createChargeApi(chargeData);

    setChargeId(response.data._embedded.charges[0].id); // TODO nao sei que resposta vem aqui kk

    if (creditCards.length === 0) {
      cb();
    }

    const responsePayment = await createPayment();

    setPayment(responsePayment);
  
    return responsePayment;
  }

  async function createPayment() {
    const userPayment: UserPayment = {
      billing: {
        delayed: true,
        address,
        email: client!.email,
      },
      creditCardDetails: {
        creditCardId,
      },
      chargeId,
    };
    const response = await createPaymentApi(userPayment);

    return response;
  }

  async function createOrder(partialOrder: Partial<Order>) {
    const order: Order = {
      total: payment.amount,
      delivery_fee: payment.fee,
      delivery_address: mainAddress!,
      id: payment.id,
      partners: [
        {
          id: category?.id!,
          name: category?.name!,
        }
      ],
      items: partialOrder.items!,
      preparation_start: new Date().toISOString().substr(0, 10),
      status: 'NEW_ORDER',
      sub_total_value: payment.total,
      client_id: userData?.client?.id!,
    };

    const response = await createOrderApi(order);

    return response;
  }

  function handleAddCreditCard(creditCard: CreditCard) {
    setCreditCards([
      ...creditCards,
      creditCard,
    ]);

    setCreditCardId(creditCard.creditCardId); // TODO: ver se tem tela do figma pra selecionar qual cartao
  }

  function handleSetCreditCardId(id: string) {
    setCreditCardId(id);
  }

  return (
    <PaymentContext.Provider
      value={{
        hasCreditCard: creditCards.length > 0,
        createCharge,
        creditCards,
        handleAddCreditCard,
        handleSetCreditCardId,
        createOrder,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

function usePayment() {
  const context = useContext(PaymentContext)

  if (!context) {
    throw new Error('usePayment must be used within an PaymentContext.')
  }

  return context
}

const chargeStaticData = {
  dueDate: new Date().toISOString().substr(0, 10),
  discountAmount: '0.00',
  discountDays: -1,
  paymentAdvance: true,
  interest: '0.00',
  fine: 0,
  maxOverdueDays: 0,
  paymentTypes: [
    PaymentTypes.CREDIT_CARD,
  ],
};

export { PaymentProvider, usePayment }
