import { Product } from 'app/common/interfaces'
import { toCurrency } from 'app/utils/currency'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  product: Product
}

const SearchProductItem = ({ product }: Props) => {
  return (
    <View style={[styles.container]}>
      <Image
        style={styles.image}
        source={{ uri: product.image_url }}
        borderRadius={75 / 2}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>{toCurrency(product.price)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 8
  },
  image: {
    backgroundColor: '#ccc',
    width: 75,
    height: 75,
    marginRight: 16
  },
  info: {
    height: 75,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    color: '#0F281E',
    fontWeight: '600',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    lineHeight: 22
  },
  price: {
    color: '#41A550',
    fontWeight: '600',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5
  },
  description: {
    color: '#899089',
    fontSize: 14
  }
})

export default SearchProductItem
