import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'app/contexts/Auth'
import { CartProvider } from 'app/contexts/Cart'
import { FiltersProvider } from 'app/contexts/Filters'
import { ServiceProvider } from 'app/contexts/Service'
import { PaymentProvider } from 'app/contexts/Payment'
import Routes from 'app/routes'
import Theme from 'app/styles/theme'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false)
  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
        antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
        Sora: require('./assets/fonts/Sora-Regular.ttf'),
        'Sora-Bold': require('./assets/fonts/Sora-Bold.ttf'),
        'Sora-SemiBold': require('./assets/fonts/Sora-SemiBold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
      })
      setFontsLoaded(true)
    }
    loadFonts()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}>
        <AuthProvider>
          <ServiceProvider>
            <FiltersProvider>
              <PaymentProvider>
                <CartProvider>
                  <Routes />
                </CartProvider>
              </PaymentProvider>
            </FiltersProvider>
          </ServiceProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
