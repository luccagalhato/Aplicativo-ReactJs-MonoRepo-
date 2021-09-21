
import { UserPayment } from '../common/interfaces/payment.interface'
export function hasCreditCardId(userpayment: UserPayment | undefined): boolean{
  return !!userpayment?.creditCardDetails.creditCardId
}




