import { Icon } from '@ant-design/react-native'
import * as Yup from 'yup'
import { useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import JunoCardHash from 'react-native-juno-rn-card-hash'
import React, { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from 'app/common/components/Button'
import Input from 'app/common/components/Input'
import InputMask from 'app/common/components/InputMask'
import { addCreditCard } from 'app/service/payment.api'
import { CreditCardHash } from 'app/common/interfaces/payment.interface'
// import { CardData, validateSchema } from './form';
import { usePayment } from 'app/contexts/Payment'

const AddPayment = () => {
  const formRef = useRef<FormHandles>(null)
  const { colors } = useTheme()
  const { handleAddCreditCard } = usePayment();
  console.log('oiiii')
  
  const handleSubmit = useCallback(async (data: any) => {
    console.log('OIFDIORES')
    try {
      const Juno = new JunoCardHash('3AF3BBF075725934BD8F25EFDC00B758E9604C7701D30563D89531E260C03023', 'sandbox')
      formRef.current?.setErrors({});

      // await validateSchema({
      //   ...data,
      //   cardNumber: data.cardNumber.join(''),
      // });

      const expirationMonth = (data.expirationDate.getMonth() + 1).toString().padStart(2, '0');

      const cardData = {
        cardNumber: data.cardNumber.join(''),
        holderName: data.holderName,
        securityCode: data.securityCode,
        expirationMonth,
        expirationYear: data.expirationDate.getFullYear().toString(),
      }

      console.log(cardData);

      let creditCardHashData: CreditCardHash = {
        cardHash: ''
      }

      console.log(cardData);

      Juno.getCardHash(cardData)
        .then((res) => {
          creditCardHashData.cardHash = res
          console.log(res);

          addCreditCard(creditCardHashData).then((respAddCreditCard) => {
            console.log('aaaa');
            console.log('respAddCreditCard', respAddCreditCard);
            handleAddCreditCard(respAddCreditCard.data);
      
            console.log('cartao adicionado')

          })
    
        })
        .catch(console.error)


    } catch (err) {
      console.log('erro:');
      console.log(err);
      const ValidationErrors: any = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          ValidationErrors[error.path as string] = error.message;
        });
        formRef.current?.setErrors(ValidationErrors);
        console.log(formRef.current?.getErrors());
      }
      return err;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Form
        ref={formRef}
        style={styles.form}
        onSubmit={handleSubmit}
      >
        <View style={styles.spacing}>
          <InputMask
            noLabel
            type="credit-card"
            name="cardNumber"
            placeholder="Número de cartão"
            keyboardType="numeric"
            icon={
              <Icon
                name="credit-card"
                color={colors.primary}
                style={styles.icon}
              />
            }
          />
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <InputMask
              noLabel
              type="datetime"
              name="expirationDate"
              placeholder="MM/AA"
              options={{
                format: 'MM/YY'
              }}
            />
          </View>
          <View style={styles.input}>
            <Input
              name="securityCode"
              placeholder="CVV"
              keyboardType="numeric"
              maxLength={4}
              icon={
                <Icon
                  name="question-circle"
                  color={colors.primary}
                  style={[styles.icon, styles.iconQuestion]}
                />
              }
            />
          </View>
        </View>
        <View style={styles.spacing}>
          <Input
            name="holderName"
            placeholder="Nome do titular"
          />
        </View>
        <View style={styles.spacing}>
          <InputMask
            noLabel
            type="cpf"
            name="titular-document"
            placeholder="CPF do titular"
            keyboardType="numeric"
          />
        </View>
      </Form>
      <Button onPress={formRef.current?.submitForm}>
        Adicionar forma de pagamento
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  form: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  input: {
    flexBasis: '48%'
  },
  spacing: {
    marginVertical: 8
  },
  icon: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    transform: [{ translateY: -13 }]
  },
  iconQuestion: {
    transform: [{ translateY: -22 }]
  }
})
export default AddPayment
