import { FontAwesome } from '@expo/vector-icons'
import { Category } from 'app/common/interfaces'
import { useRestaurant } from 'app/contexts/Restaurant'
import React from 'react'
import {
  LayoutRectangle,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import RestaurantCard from '../RestaurantCard'

interface Props {
  categories: Category[]
  onLayout: (categoryId: string, layout: LayoutRectangle) => void
}

const RestaurantCategory = (props: Props) => {
  const { categorizedRestaurants } = useRestaurant()
  const categories: { [key: string]: string } = {}
  props.categories.forEach(category => {
    categories[category.id] = category.name
  })
  return (
    <>
      {Object.entries(categorizedRestaurants).map(
        ([categoryId, restaurants], index) => (
          <View
            style={styles.container}
            key={index}
            onLayout={event => {
              const layout = event.nativeEvent.layout
              props.onLayout(categoryId, layout)
            }}
          >
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>
                {categories[categoryId] || ''}
              </Text>

              <TouchableOpacity
                style={styles.expandCategoryButton}
                onPress={() => {}}
              >
                <Text style={styles.expandCategoryText}>Ver mais</Text>
                <FontAwesome name="angle-right" size={16} color="#41A550" />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={{ height: 240, display: 'flex' }}
              showsHorizontalScrollIndicator={false}
            >
              {restaurants.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} key={index} />
              ))}
            </ScrollView>
          </View>
        )
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32
  },
  categoryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16
  },
  categoryTitle: {
    color: '#14412D',
    fontFamily: 'Sora-SemiBold',
    fontStyle: 'normal',
    fontSize: 20
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

export default RestaurantCategory
