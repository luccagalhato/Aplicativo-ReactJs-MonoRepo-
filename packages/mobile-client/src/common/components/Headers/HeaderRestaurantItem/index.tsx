import React from 'react'
import { View, Image, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/core'
import { useRestaurant } from 'app/contexts/Restaurant'

const HeaderRestaurantItem = () => {
  const navigation = useNavigation()
  const { product } = useRestaurant()
  const { height } = Dimensions.get('window')

  function handleBack() {
    navigation.goBack()
  }

  const imageHeight = height / 3

  const style = styles(imageHeight)

  if (!product) return null
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'white',
          paddingBottom: 10
        }}
      >
        {product.image_url ? (
          <Image
            source={{
              uri: product.image_url
            }}
            style={style.image}
          />
        ) : (
          <View style={style.image}></View>
        )}
        <Icon
          name="arrow-left"
          onPress={handleBack}
          style={{
            color: '#41A550',
            fontSize: 24,
            padding: 12,
            left: 30,
            top: 40,
            marginLeft: -15,
            backgroundColor: '#FFF',
            borderRadius: 100,
            position: 'absolute'
          }}
        />
      </View>
    </>
  )
}

const styles = (imageHeight: number) =>
  StyleSheet.create({
    image: {
      top: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: imageHeight,
      resizeMode: 'cover',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
    }
  })

export default HeaderRestaurantItem
