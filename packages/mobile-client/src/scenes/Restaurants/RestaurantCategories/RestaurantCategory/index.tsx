import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'
import { useFetchRestaurants } from '../../useFetch'
import { Restaurant } from 'app/common/interfaces'
import Tag from 'app/common/components/Tag'

interface RestaurantCategoryProps {
  categoryName: string
  id: string
}

const RestaurantCategory = ({ categoryName, id }: RestaurantCategoryProps) => {
  const { restaurants } = useFetchRestaurants()
  return (
    <View style={restaurantCategoryStyles.container}>
      <View style={restaurantCategoryStyles.categoryContainer}>
        <Text style={restaurantCategoryStyles.categoryTitle}>
          {categoryName}
        </Text>
        <TouchableOpacity
          style={restaurantCategoryStyles.expandCategoryButton}
          onPress={() => {}}
        >
          <Text style={restaurantCategoryStyles.expandCategoryText}>
            Ver mais
          </Text>
          <FontAwesome name="angle-right" size={16} color="#41A550" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        style={{ height: 240, display: 'flex' }}
        showsHorizontalScrollIndicator={false}
      >
        {restaurants.map(restaurant => {
          return <RestaurantCard restaurant={restaurant} />
        })}
      </ScrollView>
    </View>
  )
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { width } = Dimensions.get('window')

  return (
    <View style={[restaurantCardStyles.container, { width: width * 0.77 }]}>
      <Image
        style={restaurantCardStyles.image}
        source={{ uri: restaurant.logo }}
        borderTopLeftRadius={12}
        borderTopRightRadius={12}
      />
      <View style={restaurantCardStyles.info}>
        <Text style={restaurantCardStyles.name}>{restaurant.name}</Text>
        <Text>
          <Text style={restaurantCardStyles.categoriesList}>$$</Text>
          {(restaurant.categories || []).length > 0 && (
            <Text style={restaurantCardStyles.categoriesList}> ⋅ </Text>
          )}
          {(restaurant.categories || []).map(category => {
            return (
              <Text
                key={category.id}
                style={restaurantCardStyles.categoriesList}
              >
                {category.name}
              </Text>
            )
          })}
        </Text>
        <View style={restaurantCardStyles.tagList}>
          <Tag
            prefixIcon={<Feather name="clock" color="#41A550" />}
            style={{ marginRight: 8 }}
          >
            00min
          </Tag>
          <Tag
            prefixIcon={<FontAwesome name="star" color="#41A550" />}
            style={{ marginRight: 8 }}
          >
            5.0
          </Tag>
          <Tag>R$00,00</Tag>
        </View>
      </View>
    </View>
  )
}

const restaurantCategoryStyles = StyleSheet.create({
  container: {
    // height: 288,
  },
  categoryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  categoryTitle: {
    color: '#14412D',
    fontFamily: 'Sora-SemiBold',
    fontStyle: 'normal',
    fontSize: 20,
    flexGrow: 1
  },
  expandCategoryButton: {
    flexDirection: 'row'
  },
  expandCategoryText: {
    color: '#41A550',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8
  }
})

const restaurantCardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 240,
    marginRight: 16
  },
  image: {
    flex: 2,
    backgroundColor: '#ccc'
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  name: {
    color: '#0F281E',
    fontWeight: '600',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    marginTop: 16
  },
  categoriesList: {
    color: '#575C57',
    fontWeight: '400',
    fontSize: 12
  },
  tagList: {
    flexDirection: 'row'
  }
})

export default RestaurantCategory
