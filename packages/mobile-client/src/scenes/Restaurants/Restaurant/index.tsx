import { useNavigation } from '@react-navigation/core'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { Icon } from '@ant-design/react-native'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFetchCategories } from '../useFetch'
import Button from 'app/common/components/Button'
import Tag from 'app/common/components/Tag'
import TextCurrency from 'app/common/components/TextCurrency'
import { useCart } from 'app/contexts/Cart'
import { useRestaurant } from 'app/contexts/Restaurant'
import { formatCurrency } from 'app/utils/format'
import React from 'react'
import {
  FlatList,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import RestaurantCatalog from './RestaurantCatalog'
import RestaurantBackButton from '../RestaurantStackOptions/RestaurantBackButton'

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Restaurant = ({ hasBackButton = true }) => {
  const { catalogs, restaurant } = useRestaurant()
  const { categories: fetchedCategories } = useFetchCategories()
  const { navigate, goBack } = useNavigation()
  const { total, isCartEmpty } = useCart()
  const { colors } = useTheme()

  const { top } = useSafeAreaInsets()

  const { width } = Dimensions.get('window')

  const categories: { [key: string]: string } = {}
  fetchedCategories.forEach(category => {
    categories[category.id] = category.name
  })

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [280, 100],
        Extrapolate.CLAMP
      )
    }
  })

  const imageBackgroundStyle = useAnimatedStyle(() => {
    return {
      // opacity: interpolate(scrollY.value, [100, 140], [1, 0], Extrapolate.CLAMP)
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [80, 100], [1, 0], Extrapolate.CLAMP)
    }
  })

  const infosStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [80, 100], [1, 0], Extrapolate.CLAMP)
    }
  })

  const tagsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [80, 100], [1, 0], Extrapolate.CLAMP)
    }
  })

  const moreInfoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [40, 80], [1, 0], Extrapolate.CLAMP)
    }
  })

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [80, 100],
            [0, 60],
            Extrapolate.CLAMP
          )
        },
        {
          translateY: interpolate(
            scrollY.value,
            [0, 180],
            [0, 30],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [80, 100], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 180],
            [0, 30],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const searchButtonDisapearStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [40, 80], [1, 0], Extrapolate.CLAMP)
    }
  })

  const searchButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 110],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 180],
            [0, 30],
            Extrapolate.CLAMP
          )
        },
        {
          translateX: interpolate(
            scrollY.value,
            [0, 180],
            [0, width * 0.85],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <AnimatedFlatlist
        contentContainerStyle={{ paddingTop: 280 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={catalogs}
        renderItem={({ item, index }) => {
          return <RestaurantCatalog catalog={item} key={index} />
        }}
      />
      <Animated.View style={[styles.root, headerStyle]}>
        <AnimatedImageBackground
          borderBottomLeftRadius={16}
          borderBottomRightRadius={16}
          source={{
            uri: restaurant?.banner_url
          }}
          style={[styles.rootImage, imageBackgroundStyle]}
        >
          <View style={[styles.headerButtons, { top: top + 16 }]}>
            {hasBackButton && <RestaurantBackButton />}
            <TouchableOpacity onPress={() => {}}>
              <Feather name="heart" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </AnimatedImageBackground>

        <View style={styles.rootInfo}>
          <Animated.Image
            style={[styles.logo, logoStyle]}
            source={{
              uri: restaurant?.logo_url
            }}
          />

          <View style={styles.titleContainer}>
            <AnimatedTouchableOpacity
              onPress={() => goBack()}
              activeOpacity={0.5}
              style={[
                {
                  padding: 12,
                  width: 44,
                  borderRadius: 22,
                  position: 'absolute',
                  zIndex: 1
                },
                buttonStyle
              ]}
            >
              <Icon
                name="arrow-left"
                style={{
                  color: colors.primary,
                  fontSize: 22,
                  padding: 0
                }}
              />
            </AnimatedTouchableOpacity>

            <AnimatedTouchableOpacity
              activeOpacity={0.5}
              onPress={() => {}}
              style={[
                styles.searchButton,
                { zIndex: 5, position: 'absolute' },
                searchButtonStyle
              ]}
            >
              <AntDesign name="search1" size={16} color="white" />
            </AnimatedTouchableOpacity>
            <Animated.Text
              style={[styles.title, { width: width - 120 }, titleStyle]}
              numberOfLines={1}
            >
              {restaurant?.name}
            </Animated.Text>
            <TouchableOpacity onPress={() => navigate('RestaurantInfo')}>
              <Animated.Text style={[styles.more, moreInfoStyle]}>
                Mais informações
              </Animated.Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={infosStyle}>
            <Text style={styles.subtitle}>
              $$ ⋅{' '}
              {restaurant?.categories
                ? restaurant?.categories.map((categoryId, index) => (
                    <Text key={index}>{categories[categoryId]} </Text>
                  ))
                : null}
            </Text>
          </Animated.View>
          <View style={styles.tagsContainer}>
            <Animated.View style={[styles.tags, tagsStyle]}>
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
            </Animated.View>
            <AnimatedTouchableOpacity
              activeOpacity={0.5}
              onPress={() => {}}
              style={[styles.searchButton, searchButtonDisapearStyle]}
            >
              <AntDesign name="search1" size={16} color="white" />
            </AnimatedTouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {!isCartEmpty ? (
        <>
          <Button
            style={{
              marginEnd: 15,
              marginStart: 15,
              marginBottom: 20,
              backgroundColor: colors.primary
            }}
            color={colors.card}
            onPress={() => navigate('Cart')}
          >
            <>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 16,
                  fontWeight: '500'
                }}
              >
                Ir para a cesta
              </Text>
            </>
          </Button>
          <TextCurrency
            style={{
              position: 'absolute',
              bottom: 36,
              right: 40,
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
              color: colors.card,
              fontWeight: '500'
            }}
            currencyValue={total || 0}
          />
        </>
      ) : null}
    </View>
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
    backgroundColor: '#fff',
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

    backgroundColor: '#fff'
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

export default Restaurant
