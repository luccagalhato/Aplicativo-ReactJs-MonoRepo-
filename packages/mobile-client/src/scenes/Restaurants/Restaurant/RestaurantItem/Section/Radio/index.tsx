import Radio from 'app/common/components/Radio'
import { ProductOptionItems, ProductOptions } from 'app/common/interfaces'
import { useRestaurant } from 'app/contexts/Restaurant'
import { formatCurrency } from 'app/utils/format'
import _ from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  option: ProductOptions
  item: ProductOptionItems
  index: number
}

function RestaurantItemSectionRadio(props: Props) {
  const { option, item, index } = props
  if (!item.is_available) return null
  const { product, setProduct } = useRestaurant()

  function toggleQuantity() {
    if (!product) return
    const clonedProduct = _.cloneDeep(product)
    clonedProduct.options.forEach(_option => {
      if (_option.section_id === option.section_id) {
        _option.option_items
          .filter(_item => _item.is_available)
          .forEach((_item, _index) => {
            _item.quantity = 0
            if (_index === index) {
              _item.quantity = 1
            }
          })
      }
    })
    setProduct(clonedProduct)
  }
  return (
    <View style={styles.separator}>
      <Text style={styles.text}>{item.option_name}</Text>
      <View style={styles.addButton}>
        <Text style={styles.price}>
          {item.price > 0 ? `+${formatCurrency(item.price)}` : ''}
        </Text>
        <Radio
          checked={item.quantity > 0}
          name={item.option_name}
          onChange={toggleQuantity}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  text: {
    fontSize: 14,
    fontFamily: 'Sora',
    lineHeight: 24,
    color: '#575C57',
    paddingLeft: 5
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    color: '#899089',
    fontSize: 11,
    marginRight: 5,
    fontWeight: 'bold'
  }
})

export default RestaurantItemSectionRadio
