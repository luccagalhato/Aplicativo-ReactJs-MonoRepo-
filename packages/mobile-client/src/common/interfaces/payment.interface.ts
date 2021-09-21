export interface CreditCardHash {
  cardHash: string
}
export enum PaymentTypes {
  CREDIT_CARD = 'CREDIT_CARD',
  MONEY = 'MONEY'
}
export interface Charge {
  description: string
  amount: number
  dueDate: string
  maxOverdueDays: number
  fine: number
  interest: string
  discountAmount: string
  discountDays: number
  paymentTypes: PaymentTypes[]
  paymentAdvance: boolean
}
export interface Billing {
  name: string
  document: string
  email: string
  address: {
    street: string
    number: string
    city: string
    state: string
    postCode: string
  }
  notify: boolean
}


export interface CreateChargeInput { 
  charge: Charge;
  billing: Billing;
}

export interface CreditCard {
  creditCardId: string
  last4CardNumber:number
  expirationMonth: number
  expirationYear: number
}
export interface CardId {
  creditCardId: string
}

export interface UserPayment {
  chargeId: string,
  billing: {
      email: string
      address: {
          street: string
          number: string
          city: string
          state: string
          postCode: string
      },
      delayed: boolean
  },
  creditCardDetails: {
    creditCardId: string
    // cardHash: CreditCardHash
  }
}
