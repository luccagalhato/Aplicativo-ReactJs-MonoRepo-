import { Ionicons } from '@expo/vector-icons'
import { useTheme, useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import InputSearch from 'app/common/components/InputSearch'
import { HeaderAddress } from 'app/common/components/Headers'
import { AntDesign, Feather } from '@expo/vector-icons'
import TabBar from 'app/common/components/TabBar'
import { useFilters } from 'app/contexts/Filters'
import React, { useMemo } from 'react'
import { Image, LayoutRectangle, StyleSheet, Text, View } from 'react-native'
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import RestaurantCategory from './components/RestaurantCategory'
import { useFetchCategories } from './useFetch'
import { useAuth } from 'app/contexts/Auth'

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Restaurants = () => {
  const [ref, setRef] = React.useState<any>(null)
  const [cords, setCords] = React.useState<any>({})
  const { colors } = useTheme()
  const { toggleFiltersBox } = useFilters()
  const { categories } = useFetchCategories()
  const navigation = useNavigation()

  const { userData } = useAuth()

  const address = useMemo(() => {
    const client = userData?.client!
    return client.delivery_address.find(({ place_id }) => {
      return place_id === client.default_place_id
    })
  }, [userData])

  function handleNavigateToMyAddress() {
    navigation.navigate('MyAddresses')
  }

  function handleCords(categoryId: string, layout: LayoutRectangle) {
    cords[categoryId] = layout.y + 245
    setCords(cords)
  }

  function handleScroll(categoryId: string) {
    ref.scrollTo({
      x: 0,
      y: cords[categoryId],
      animated: true
    })
  }

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [100, 130], [1, 0], Extrapolate.CLAMP)
    }
  })

  const headerButtonsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [100, 130], [0, 1], Extrapolate.CLAMP)
    }
  })

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 130],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [100, 130],
            [0, -60],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <View
          style={{
            marginTop: 30,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 8
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.goBack()}
              style={{ marginRight: 8 }}
            >
              <Feather name="arrow-left" size={28} color={colors.primary} />
            </TouchableWithoutFeedback>
            <AnimatedTouchableOpacity
              style={[
                {
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center'
                },
                headerStyle
              ]}
              onPress={handleNavigateToMyAddress}
            >
              <Text
                style={{
                  textAlignVertical: 'center',
                  fontFamily: 'Sora-SemiBold',
                  fontSize: 16,
                  lineHeight: 22,
                  color: '#252725',
                  marginLeft: 0
                }}
              >
                {address?.surname ??
                  `${address?.street}${
                    address?.number ? `, ${address.number}` : ''
                  }`}
              </Text>
              <Feather
                name="chevron-down"
                size={16}
                color={colors.primary}
                style={{ marginLeft: 2, marginTop: 2 }}
              />
            </AnimatedTouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Animated.Text
                style={[
                  {
                    textAlignVertical: 'center',
                    fontFamily: 'Sora-SemiBold',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#252725',
                    marginLeft: 0
                  },
                  titleStyle
                ]}
              >
                Restaurantes
              </Animated.Text>

              <Animated.View
                style={[
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  },
                  headerButtonsStyle
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={toggleFiltersBox}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 16,
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8
                  }}
                >
                  <AntDesign name="search1" size={16} color="white" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={toggleFiltersBox}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 16,
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons
                    name="ios-options-outline"
                    size={24}
                    color={colors.card}
                    style={{ transform: [{ rotate: '90deg' }] }}
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </View>
        </View>
        <AnimatedScrollView
          ref={ref => {
            setRef(ref)
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <View style={styles.topo}>
            <Text style={styles.title}>Restaurantes</Text>
            <Image
              source={require('assets/iconLunch.png')}
              style={styles.iconTopo}
            />
          </View>
          <View style={{ backgroundColor: colors.card }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5%'
              }}
            >
              <Form onSubmit={() => {}} style={{ width: '85%' }}>
                <InputSearch
                  name="search"
                  placeholder="Buscar pratos, produtos ou lojas"
                />
              </Form>
              <TouchableWithoutFeedback
                onPress={toggleFiltersBox}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons
                  name="ios-options-outline"
                  size={24}
                  color={colors.card}
                  style={{ transform: [{ rotate: '90deg' }] }}
                />
              </TouchableWithoutFeedback>
            </View>

            {categories ? (
              <View
                style={{
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                <ScrollView
                  style={{
                    display: 'flex',
                    height: 80,
                    marginBottom: '5%'
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {categories.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleScroll(item.id)}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 72,
                        marginLeft: 10
                      }}
                      activeOpacity={0.5}
                    >
                      <Image
                        style={styles.categories}
                        source={{ uri: item.icon_url }}
                      />
                      <Text
                        style={styles.nameCategories}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <View style={{ backgroundColor: colors.card }}>
                  <RestaurantCategory
                    categories={categories}
                    onLayout={handleCords}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </AnimatedScrollView>
      </View>
      <TabBar />
    </>
  )
}

const styles = StyleSheet.create({
  topo: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#41A550',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Sora-Bold',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff',
    marginLeft: 19
  },
  iconTopo: {
    marginRight: '5%'
  },
  inputSearch: {
    marginTop: 45
  },
  buttonFilter: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: '#41A550',
    justifyContent: 'space-around'
  },
  categories: {
    height: 48,
    width: 48,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: '#ccc'
  },
  nameCategories: {
    fontSize: 12,
    fontFamily: 'Sora',
    marginTop: 10
  }
})

export default Restaurants
