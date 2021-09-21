import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@ant-design/react-native'

import Home from 'app/scenes/Home'
import Cart from 'app/scenes/Cart'
import Profile from 'app/scenes/Profile'
import UpdateProfile from 'app/scenes/UpdateProfile'
import Notifications from 'app/scenes/Notifications'
import Order from 'app/scenes/Order'
import OrderHelp from 'app/scenes/OrderHelp'
import MyAddresses from 'app/scenes/MyAddresses'
import Payments from 'app/scenes/Payments'
import AddPayment from 'app/scenes/AddPayment'
import LocationSurname from 'app/scenes/Auth/LocationSurname'
import Location from 'app/scenes/Auth/Location'
import Search from 'app/scenes/Search'
import OrderHistory from 'app/scenes/OrderHistory'
import { HeaderAddress, HeaderSimple } from 'app/common/components/Headers'
import RestaurantsRoutes from 'app/scenes/Restaurants/routes'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  const { colors } = useTheme()

  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerBackImage: () => (
          <Icon
            name="arrow-left"
            style={{
              color: colors.primary,
              fontSize: 20,
              padding: 8
            }}
          />
        )
      }}
      initialRouteName="Home"
      headerMode="screen"
    >
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderAddress />
        }}
      />

      <AppStack.Screen
        name="RestaurantRoutes"
        component={RestaurantsRoutes}
        options={{
          headerShown: false
        }}
      />

      <AppStack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: () => <HeaderSimple title="Sua Cesta" rigthButton />
        }}
      />

      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <HeaderSimple title="Perfil" />
        }}
      />

      <AppStack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: () => <HeaderSimple title="Editar Perfil" />
        }}
      />

      <AppStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          header: () => <HeaderSimple title="Notificações" />
        }}
      />

      <AppStack.Screen
        name="MyAddresses"
        component={MyAddresses}
        options={{
          header: () => <HeaderSimple title="Meus Endereços" />
        }}
      />

      <AppStack.Screen
        name="AddLocation"
        component={Location}
        options={{
          header: () => <HeaderSimple title="Adicione um endereço" />
        }}
      />

      <AppStack.Screen
        name="AddLocationSurname"
        component={LocationSurname}
        options={{
          header: () => <HeaderSimple title="Adicione um endereço" />
        }}
      />

      <AppStack.Screen
        name="Order"
        component={Order}
        options={{
          header: () => <HeaderSimple title="Acompanhe seu pedido" />
        }}
      />
      <AppStack.Screen
        name="OrderHelp"
        component={OrderHelp}
        options={{
          header: () => <HeaderSimple title="Como podemos te ajudar?" />
        }}
      />
      <AppStack.Screen
        name="PaymentMethods"
        component={Payments}
        options={{
          header: () => <HeaderSimple title="Formas de pagamento" />
        }}
      />
      <AppStack.Screen
        name="AddPaymentMethod"
        component={AddPayment}
        options={{
          header: () => <HeaderSimple title="Formas de pagamento" />
        }}
      />
      <AppStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false
        }}
      />

      <AppStack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          header: () => <HeaderSimple title="Histórico de pedidos" />
        }}
      />
    </AppStack.Navigator>
  )
}

export default AppRoutes
