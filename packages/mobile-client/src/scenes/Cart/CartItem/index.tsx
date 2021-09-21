import { Icon } from '@ant-design/react-native'
import { useTheme } from '@react-navigation/native'
import TextCurrency from 'app/common/components/TextCurrency'
import { CartItem as ICartItem } from 'app/common/interfaces/cart.interface'
import { useCart } from 'app/contexts/Cart'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface CartItemProps {
  item: ICartItem
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeCartItem } = useCart()

  const { colors } = useTheme()

  const calcTotal = () => {
    let total = item.value
    item.optionalItems.map(optional => {
      total += optional.qty * optional.price
    })
    total *= item.qty
    return total
  }

  return (
    <View style={styles.item}>
      <View style={styles.main}>
        {item.urlImg ? (
          <Image
            style={styles.img}
            source={{
              uri: item.urlImg
            }}
          />
        ) : (
          <View style={styles.img}></View>
        )}

        <View style={styles.content}>
          <View style={styles.left}>
            <Text style={{ fontFamily: 'Sora-Bold', marginBottom: 4 }}>
              {item.qty} x {item.name}
            </Text>
            <View>
              {item.optionalItems.map((optionalItem, index) => (
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: '#899089'
                  }}
                  key={`${index}`}
                >
                  {`${optionalItem.qty} x ${optionalItem.name}`}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.right}>
            <TextCurrency
              style={{
                color: colors.primary,
                fontFamily: 'Sora-Bold',
                backgroundColor: '#fff',
                marginBottom: 4
              }}
              currencyValue={calcTotal()}
            />

            <TouchableWithoutFeedback
              style={styles.remove}
              onPress={() => removeCartItem(item.id)}
            >
              <Icon name="delete" size="md" color="#F5243C" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF0EF',
    borderStyle: 'solid'
  },
  main: {
    flexDirection: 'row'
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#D8DAD8',
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16
  },
  left: {
    flex: 1
  },
  right: {
    alignItems: 'flex-end'
  },
  remove: {
    padding: 16,
    backgroundColor: 'white'
  }
})

export default CartItem
