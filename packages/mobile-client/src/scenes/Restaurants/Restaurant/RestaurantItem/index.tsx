import { useNavigation } from '@react-navigation/native'
import AddButton from 'app/common/components/AddButton'
import Button from 'app/common/components/Button'
import { OptionalItem } from 'app/common/interfaces/cart.interface'
import { useCart } from 'app/contexts/Cart'
import { useRestaurant } from 'app/contexts/Restaurant'
import { formatCurrency } from 'app/utils/format'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import RestaurantItemSection from './Section'

const RestaurantItem = () => {
  const navigation = useNavigation()
  const { product, setProduct } = useRestaurant()
  const { setCartItem } = useCart()
  if (!product) return null
  const {
    sku,
    name,
    description,
    price,
    quantity,
    tags,
    image_url,
    options,
    partner_id
  } = product

  const total = calcTotal()
  const minQuantity = 1
  const requiredsItsOK = requiredsOK()

  function handleProductQuantity(quantity: number) {
    if (!product) return
    setProduct({ ...product, quantity })
  }

  function handleAddToCart() {
    const optionalItems: OptionalItem[] = []
    options.forEach(option => {
      option.option_items
        .filter(item => item.is_available && item.quantity > 0)
        .forEach(item => {
          optionalItems.push({
            qty: item.quantity,
            name: item.option_name,
            price: item.price
          })
        })
    })
    setCartItem({
      id: sku,
      partner_id,
      sku,
      name,
      urlImg: image_url,
      qty: quantity || 1,
      value: price,
      total,
      date: new Date().toString().substr(0, 10),
      optionalItems
    })
    navigation.navigate('Restaurant')
  }

  function calcTotal() {
    let total = price
    options.forEach(option => {
      total += option.option_items
        .filter(item => item.is_available && item.quantity > 0)
        .reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
    })
    return product && product.quantity ? product.quantity * total : total
  }

  function requiredsOK() {
    const requireds: number[] = []
    options.forEach(option => {
      const { min_count, option_items } = option
      if (min_count > 0) {
        let total = 0
        option_items
          .filter(item => item.is_available)
          .forEach(item => {
            total += item.quantity || 0
          })
        if (total < min_count) {
          requireds.push(option.section_id)
        }
      }
    })
    return requireds.length === 0
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.tags}>
          {tags.map(tag => (
            <View style={styles.tag} key={tag}>
              <Text style={styles.textTag}>{tag}</Text>
            </View>
          ))}
        </View>

        {options
          .sort((a, b) => (a.section_id > b.section_id ? 1 : -1))
          .map((option, index) => (
            <RestaurantItemSection key={index} option={option} />
          ))}
      </ScrollView>

      <View style={styles.button}>
        <AddButton
          buttonStyle="filled"
          minValue={minQuantity}
          value={quantity || minQuantity}
          onChange={requiredsItsOK ? handleProductQuantity : () => {}}
        />
        <Button
          backgroundColor={requiredsItsOK ? '#41A550' : '#F5F5F4'}
          color={requiredsItsOK ? '#FFFFFF' : '#BDC1BD'}
          onPress={requiredsItsOK ? handleAddToCart : () => {}}
        >
          <Text
            style={{
              fontSize: 14,
              marginBottom: 10
            }}
          >
            {`Adicionar à cesta ${formatCurrency(total)}`}
          </Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 19
  },
  title: {
    fontFamily: 'Sora-Bold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 10
  },
  description: {
    fontFamily: 'Sora',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#899089',
    marginTop: 3
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#EDF9ED',
    width: 'auto',
    height: 27,
    paddingHorizontal: 10,
    marginLeft: 6
  },
  textTag: {
    fontSize: 12,
    fontFamily: 'Sora',
    lineHeight: 28,
    color: '#252725',
    paddingLeft: 5
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  }
})

export default RestaurantItem
