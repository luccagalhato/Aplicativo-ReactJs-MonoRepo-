import AddButton from 'app/common/components/AddButton'
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

function RestaurantItemSectionDefault(props: Props) {
  const { option, item, index } = props
  if (!item.is_available) return null

  const { product, setProduct } = useRestaurant()

  function handleChange(quantity: number) {
    if (!product) return
    const clonedProduct = _.cloneDeep(product)

    clonedProduct.options.forEach(_option => {
      if (_option.section_id === option.section_id) {
        const { max_count, max_unique } = _option

        let total = 0
        _option.option_items
          .filter(item => item.is_available)
          .forEach(_item => {
            total += _item.quantity || 0
          })

        if (_option.option_items.length > 1) {
          total += quantity
        }

        if (
          total <= max_count &&
          quantity <= max_count &&
          quantity <= max_unique
        ) {
          _option.option_items[index].quantity = quantity
        }
      }
    })

    setProduct(clonedProduct)
  }

  const minQuantity = 0

  return (
    <View style={styles.separator}>
      <Text style={styles.name}>{item.option_name}</Text>
      <View style={styles.addButton}>
        <Text style={styles.price}>
          {item.price > 0 ? `+${formatCurrency(item.price)}` : ''}
        </Text>
        <AddButton
          buttonStyle="outlined"
          minValue={minQuantity}
          value={item.quantity || minQuantity}
          onChange={handleChange}
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
  name: {
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

export default RestaurantItemSectionDefault
