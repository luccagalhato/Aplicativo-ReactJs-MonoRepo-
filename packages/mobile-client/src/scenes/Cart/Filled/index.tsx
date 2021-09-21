import { useNavigation, useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import Button from 'app/common/components/Button'
import TextCurrency from 'app/common/components/TextCurrency'
import { useCart } from 'app/contexts/Cart'
import { usePayment } from 'app/contexts/Payment'
import React, { useCallback, useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CartItem from '../CartItem'

const Filled = () => {
  const formRef = useRef<FormHandles>(null)
  const { navigate } = useNavigation()
  const { createCharge } = usePayment()
  const { cart, total, description } = useCart()
  const { colors } = useTheme()

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current?.setErrors({})
      const payment = await createCharge(
        {
          amount: total,
          description
        },
        () => {
          navigate('AddPayment')
        }
      )

      if (payment.ok) {
        navigate('Order')
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <ScrollView alwaysBounceVertical>
        <View>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </View>
        <TouchableWithoutFeedback onPress={() => navigate('Restaurant')}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.primary,
              fontFamily: 'Sora-Bold',
              fontSize: 12,
              fontWeight: '600',
              marginTop: 8
            }}
          >
            Adicionar mais itens
          </Text>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Button
        style={{
          marginEnd: 10,
          marginStart: 10,
          marginBottom: 20,
          backgroundColor: colors.primary
        }}
        color={colors.card}
        onPress={handleSubmit}
      >
        <>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              fontWeight: '500'
            }}
          >
            Finalizar pedido
          </Text>
        </>
      </Button>
      <TextCurrency
        style={{
          position: 'absolute',
          bottom: 32,
          right: 40,
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          color: colors.card,
          fontWeight: '500'
        }}
        currencyValue={total || 0}
      />
    </>
  )
}

export default Filled
