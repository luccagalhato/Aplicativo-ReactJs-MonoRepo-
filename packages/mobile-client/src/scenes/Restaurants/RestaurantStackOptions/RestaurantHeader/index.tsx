import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRestaurant } from 'app/contexts/Restaurant'
import Tag from 'app/common/components/Tag'
import RestaurantBackButton from '../RestaurantBackButton'
import { useFetchCategories } from '../../useFetch'

const RestaurantHeader = () => {
  const { restaurant } = useRestaurant()
  const { categories: fetchedCategories } = useFetchCategories()
  const { width } = Dimensions.get('window')
  const { top } = useSafeAreaInsets()
  const categories: { [key: string]: string } = {}
  fetchedCategories.forEach(category => {
    categories[category.id] = category.name
  })
  if (!restaurant) return null
  return (
    <View style={styles.root}>
      <View style={{ top: top + 16 }}>
        <RestaurantBackButton hasPadding={false} />
        <View style={styles.infoContainer}>
          <Image style={styles.logo} source={{ uri: restaurant.logo_url }} />
          <View style={styles.info}>
            <Text
              style={[styles.title, { width: width - 72 }]}
              numberOfLines={1}
            >
              {restaurant.name}
            </Text>
            <Text style={styles.subtitle}>
              $$ ⋅
              {restaurant.categories.map((category, index) => (
                <Text key={index}> {categories[category]} </Text>
              ))}
            </Text>
            <View style={styles.tags}>
              <Tag
                prefixIcon={<FontAwesome name="star" color="#41A550" />}
                style={{ marginRight: 8 }}
              >
                5.0
              </Tag>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: '#EFF0EF',
    borderBottomWidth: 1,
    height: 168,
    paddingHorizontal: 16
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  logo: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    height: 48,
    width: 48,
    marginRight: 8
  },
  info: {},
  tags: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
    color: '#252725'
  },
  subtitle: {
    color: '#575C57',
    fontSize: 12,
    marginBottom: 4
  }
})

export default RestaurantHeader
