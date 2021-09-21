import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { View, Text, ImageBackground } from 'react-native'
import { Button, Flex, WhiteSpace } from '@ant-design/react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Home = () => {
  const { colors } = useTheme()
  const navigator = useNavigation()

  Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
    if (response.notification.request.content.data) {
      const notificationData: any = response.notification.request.content.data
      if (notificationData?.screenName) {
        navigator.navigate(notificationData.screenName)
      }
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('assets/background.png')}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'column'
        }}
        resizeMode="cover"
      >
        <Flex>
          <Flex.Item
            style={{
              backgroundColor: colors.card,
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 24
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                textAlign: 'center',
                fontFamily: 'Sora',
                color: colors.text
              }}
            >
              Entre ou crie uma conta para continuar
            </Text>
            <WhiteSpace size="xl" />
            <Button
              style={{
                borderRadius: 100,
                borderColor: colors.notification,
                marginBottom: 12
              }}
              onPress={() => navigator.navigate('EmailSignUp')}
            >
              <Text style={{ fontSize: 16, color: colors.notification }}>
                Cadastre-se
              </Text>
            </Button>
            <Button
              style={{ borderRadius: 100, borderColor: colors.notification }}
              onPress={() => navigator.navigate('Login')}
            >
              <Text style={{ fontSize: 16, color: colors.notification }}>
                Login
              </Text>
            </Button>
          </Flex.Item>
        </Flex>
      </ImageBackground>
    </View>
  )
}

export default Home
