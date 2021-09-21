import { Icon } from '@ant-design/react-native'
import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  HeaderAddress,
  HeaderRestaurantItem
} from 'app/common/components/Headers'
import { RestaurantProvider } from 'app/contexts/Restaurant'
import React from 'react'
import Restaurants from '.'
import Restaurant from './Restaurant'
import RestaurantInfo from './Restaurant/RestaurantInfo'
import RestaurantItem from './Restaurant/RestaurantItem'
import RestaurantHeader from './RestaurantStackOptions/RestaurantHeader'

const RestaurantStack = createStackNavigator()

const RestaurantsRoutes = () => {
  const { colors } = useTheme()
  return (
    <RestaurantProvider>
      <RestaurantStack.Navigator
        initialRouteName="Restaurants"
        headerMode="screen"
        screenOptions={{
          headerStyle: { height: 280 },
          headerBackTitleVisible: false,
          header: () => undefined
        }}
      >
        <RestaurantStack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{
            header: () => undefined,
            headerStyle: null,

            headerTitleAlign: 'left'
          }}
        />

        <RestaurantStack.Screen name="Restaurant" component={Restaurant} />

        <RestaurantStack.Screen
          name="RestaurantInfo"
          component={RestaurantInfo}
          options={{
            headerStyle: { height: 168 },
            header: () => <RestaurantHeader />
          }}
        />

        <RestaurantStack.Screen
          name="RestaurantItem"
          component={RestaurantItem}
          options={{
            header: () => <HeaderRestaurantItem />
          }}
        />
      </RestaurantStack.Navigator>
    </RestaurantProvider>
  )
}

export default RestaurantsRoutes
