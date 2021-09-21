import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import Login from 'app/scenes/Auth/Login'
import Onboard from 'app/scenes/Auth/Onboard'
import EmailSignUp from 'app/scenes/Auth/EmailSignUp'
import { HeaderSignup } from 'app/common/components/Headers'
import VerificationCode from 'app/scenes/Auth/VerificationCode'
import FirstLastName from 'app/scenes/Auth/FirstLastName'
import Location from 'app/scenes/Auth/Location'
import Wait from 'app/scenes/Wait'
import LocationSurname from 'app/scenes/Auth/LocationSurname'

const AuthStack = createStackNavigator()

const AuthRoutes = () => {
  const { colors } = useTheme()

  return (
    <AuthStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: colors.background } }}
      initialRouteName="Onboard"
      headerMode="screen"
    >
      <AuthStack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="EmailSignUp"
        component={EmailSignUp}
        options={{
          header: () => <HeaderSignup title="Qual o seu e-mail?" />
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <HeaderSignup title="Qual o seu e-mail?" />
        }}
      />
      <AuthStack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{
          header: () => <HeaderSignup title="Confirme seu código" />
        }}
      />
      <AuthStack.Screen
        name="FirstLastName"
        component={FirstLastName}
        options={{
          header: () => <HeaderSignup title="Como você se chama?" />
        }}
      />
      <AuthStack.Screen
        name="Location"
        component={Location}
        options={{
          header: () => <HeaderSignup title="Onde quer receber seu pedido?" />
        }}
      />
      <AuthStack.Screen
        name="LocationSurname"
        component={LocationSurname}
        options={{
          header: () => <HeaderSignup title="Onde quer receber seu pedido?" />
        }}
      />
      <AuthStack.Screen name="Wait" component={Wait} />
    </AuthStack.Navigator>
  )
}

export default AuthRoutes
