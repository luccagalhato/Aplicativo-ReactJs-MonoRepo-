import { useNavigation, useTheme } from '@react-navigation/native'
import RoundIcon from 'app/common/components/RoundIcon'
import TabBar from 'app/common/components/TabBar'
import { TabBarItemEnum } from 'app/common/enums'
import { useCart } from 'app/contexts/Cart'
import EmptyIcon from 'assets/emptyBag.svg'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Empty = () => {
  const { navigate } = useNavigation()
  const { isCartEmpty } = useCart()
  const { colors } = useTheme()
  const onPress = () => {
    navigate('Restaurants')
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          top: 50,
          alignItems: 'center'
        }}
      >
        <RoundIcon size="large" svgIcon={EmptyIcon} />
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <Text
            style={{
              marginTop: 32,
              textAlign: 'center',
              fontWeight: '400',
              fontFamily: 'Sora',
              fontSize: 14,
              width: 164,
              color: '#899089'
            }}
          >
            Ainda não há produtos na sua cesta
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => isCartEmpty && onPress()}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'Sora-Bold',
              fontSize: 12,
              fontWeight: '600',
              marginTop: 32
            }}
          >
            Adicionar itens
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <TabBar currentTab={TabBarItemEnum.CART} />
    </>
  )
}

export default Empty
