import React from 'react'
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { Restaurant } from 'app/common/interfaces'
import { useRestaurant } from 'app/contexts/Restaurant'
import Tag from 'app/common/components/Tag'
import { useFilters } from 'app/contexts/Filters'
import { useCart } from 'app/contexts/Cart'

interface RestaurantCardProps {
  restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { navigate } = useNavigation()
  const { getRestaurant } = useRestaurant()
  const { setDescription } = useCart();
  const { filters } = useFilters()
  const { width } = Dimensions.get('window')
  const { categories } = restaurant

  const handleRestaurantClick = async () => {
    getRestaurant(restaurant.id as string)
    setDescription({name: getCategoryNameFromFilters(categories[0]), id: categories[0]}) // TODO botar a categoria
    navigate('Restaurant')
  }

  const getCategoryNameFromFilters = React.useCallback(
    (id: string) => {
      const category = filters.categories.find(category => category.id === id)
      return category ? category.name : ''
    },
    [filters.categories]
  )

  return (
    <TouchableOpacity
      style={[styles.container, { width: width * 0.77 }]}
      activeOpacity={0.5}
      onPress={handleRestaurantClick}
    >
      <ImageBackground
        style={styles.image}
        source={{ uri: restaurant.banner_url }}
        borderTopLeftRadius={12}
        borderTopRightRadius={12}
      >
        <View
          style={{
            ...styles.imageActions,
            justifyContent: restaurant.tags ? 'space-between' : 'flex-end'
          }}
        >
          {restaurant.tags && (
            <View style={styles.tagContainer}>
              {<Text style={styles.tag}>{restaurant.tags.join(', ')}</Text>}
            </View>
          )}
          <TouchableOpacity onPress={() => {}}>
            <Feather name="heart" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <Text>
          <Text style={styles.categoriesList}>$$</Text>
          {categories && categories.length > 0 && (
            <Text style={styles.categoriesList}> ⋅ </Text>
          )}
          {categories &&
            categories.map((category, index) => {
              return (
                <Text key={index} style={styles.categoriesList}>
                  {getCategoryNameFromFilters(category)}{' '}
                </Text>
              )
            })}
        </Text>
        <View style={styles.tagList}>
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 240,
    marginLeft: 16
  },
  image: {
    flex: 2,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  tagContainer: {
    backgroundColor: '#41A550',
    borderRadius: 100,
    height: 24,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  tag: {
    color: 'white',
    fontWeight: '500'
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

export default RestaurantCard
