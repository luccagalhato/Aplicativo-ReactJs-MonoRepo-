import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useCart } from '../../contexts/Cart'
import Filled from './Filled'
import Empty from './Empty'

const Cart = () => {
  const { colors } = useTheme()
  const { isCartEmpty } = useCart()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card
      }}
    >
      {!isCartEmpty ? <Filled /> : <Empty />}
    </View>
  )
}

export default Cart
