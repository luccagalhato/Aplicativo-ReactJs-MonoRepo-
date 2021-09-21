import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Icon } from '@ant-design/react-native'

interface BackButtonProp {
  hasPadding?: boolean
}

const RestaurantBackButton = ({ hasPadding = true }: BackButtonProp) => {
  const { colors } = useTheme()
  const navigator = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigator.goBack()}
      activeOpacity={0.5}
      style={{ zIndex: 99 }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50
        }}
      >
        <Icon
          name="arrow-left"
          style={{
            color: colors.primary,
            fontSize: 22,
            padding: hasPadding ? 8 : 0
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantBackButton
