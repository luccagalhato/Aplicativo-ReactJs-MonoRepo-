import { Product } from 'app/common/interfaces'
import { formatCurrency } from 'app/utils/format'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  product: Product
  handlePress: () => void
}

function RestaurantCatalogItem(props: Props) {
  const { product, handlePress } = props
  return (
    <View style={styles.flex}>
      <TouchableOpacity style={styles.flex} onPress={handlePress}>
        <View style={styles.list}>
          <View style={styles.image}>
            {product.image_url ? (
              <Image
                source={{ uri: product.image_url, width: 115, height: 115 }}
              />
            ) : null}
          </View>

          <View>
            <Text numberOfLines={1} style={styles.name}>
              {product.name}
            </Text>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <Text numberOfLines={4} style={styles.description}>
              {product.description}
            </Text>
          </View>
          <View style={styles.divisor} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  list: {
    marginTop: 17,
    marginLeft: 15,
    borderStyle: 'solid',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF0EF',
    paddingBottom: 16
  },
  image: {
    width: 115,
    height: 115,
    backgroundColor: '#D8DAD8',
    borderRadius: 12,
    overflow: 'hidden'
  },
  name: {
    marginHorizontal: 15,
    fontFamily: 'Sora-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22
  },
  price: {
    marginHorizontal: 15,
    fontFamily: 'Sora-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: '#41A505'
  },
  description: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontFamily: 'Sora',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    width: 204,
    color: '#899089'
  },
  divisor: {
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default RestaurantCatalogItem
