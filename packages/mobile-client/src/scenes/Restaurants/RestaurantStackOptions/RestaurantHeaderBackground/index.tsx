import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import Tag from 'app/common/components/Tag'
import { useRestaurant } from 'app/contexts/Restaurant'
import { formatCurrency } from 'app/utils/format'
import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFetchCategories } from '../../useFetch'
import RestaurantBackButton from '../RestaurantBackButton'
import Animated from 'react-native-reanimated'

interface RestaurantHeaderBackgroundProp {
  hasBackButton?: boolean
  style: StyleProp
}

const RestaurantHeaderBackground = ({
  hasBackButton,
  style
}: RestaurantHeaderBackgroundProp) => {
  const { restaurant } = useRestaurant() // TODO: implementar isLoading
  const { categories: fetchedCategories } = useFetchCategories()
  const { top } = useSafeAreaInsets()
  const { navigate } = useNavigation()
  const { width } = Dimensions.get('window')

  const categories: { [key: string]: string } = {}
  fetchedCategories.forEach(category => {
    categories[category.id] = category.name
  })
  if (!restaurant) return null
  return (
    <Animated.View style={[styles.root, style]}>
      <ImageBackground
        borderBottomLeftRadius={16}
        borderBottomRightRadius={16}
        source={{
          uri: restaurant.banner_url
        }}
        style={styles.rootImage}
      >
        <View style={[styles.headerButtons, { top: top + 16 }]}>
          {hasBackButton ? <RestaurantBackButton /> : <View />}
          <TouchableOpacity onPress={() => {}}>
            <Feather name="heart" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.rootInfo}>
        <Image
          style={styles.logo}
          source={{
            uri: restaurant.logo_url
          }}
        />
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { width: width - 120 }]}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>
          <TouchableOpacity onPress={() => navigate('RestaurantInfo')}>
            <Text style={styles.more}>Mais informações</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          $$ ⋅{' '}
          {restaurant.categories
            ? restaurant.categories.map((categoryId, index) => (
                <Text key={index}>{categories[categoryId]} </Text>
              ))
            : null}
        </Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tags}>
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
            <Tag>{formatCurrency(0)}</Tag>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
            style={styles.searchButton}
          >
            <AntDesign name="search1" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderBottomColor: '#EFF0EF',
    borderBottomWidth: 1,
    height: 280,
    position: 'absolute'
  },
  rootImage: {
    backgroundColor: 'white',
    flex: 4
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  rootInfo: {
    paddingRight: 16,
    paddingLeft: 16,
    flex: 3,
    backgroundColor: 'white'
  },
  logo: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    height: 48,
    width: 48,
    position: 'absolute',
    top: -24,
    left: 16
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  title: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
    color: '#252725',
    marginBottom: 2
  },
  more: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 10,
    color: '#41A550'
  },
  subtitle: {
    color: '#575C57',
    fontSize: 12,
    marginBottom: 2
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tags: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchButton: {
    backgroundColor: '#41A550',
    borderRadius: 50,
    padding: 8
  }
})

export default RestaurantHeaderBackground
