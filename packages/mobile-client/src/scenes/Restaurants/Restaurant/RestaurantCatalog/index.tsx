import { useNavigation } from '@react-navigation/native'
import { Catalog, Product } from 'app/common/interfaces'
import { useRestaurant } from 'app/contexts/Restaurant'
import { useService } from 'app/contexts/Service'
import { getRestaurantCatalogProducts } from 'app/service/restaurant.api'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RestaurantCatalogItem from './Item'

interface Props {
  catalog: Catalog
}

function RestaurantCatalog(props: Props) {
  const { catalog } = props
  const [products, setProducts] = React.useState<Product[]>([])
  const { setProduct } = useRestaurant()
  const { navigate } = useNavigation()
  const { partnerApi } = useService()

  React.useEffect(() => {
    if (catalog.id) {
      getRestaurantCatalogProducts(partnerApi, catalog.id)
        .then(setProducts)
        .catch(console.error)
    }
  }, [])

  function handlePress(product: Product) {
    return function () {
      setProduct(product)
      navigate('RestaurantItem')
    }
  }

  if (!products || products.length === 0) return null

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> {catalog.name} </Text>
      </View>

      {products.map((product, index) => (
        <RestaurantCatalogItem
          product={product}
          handlePress={handlePress(product)}
          key={index}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  title: {
    fontFamily: 'Sora-Bold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    paddingLeft: 15,
    paddingTop: 20,
    color: '#41A505'
  }
})

export default RestaurantCatalog
