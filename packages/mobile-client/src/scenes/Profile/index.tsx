import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Icon, List } from '@ant-design/react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useAuth } from 'app/contexts/Auth'
import { ProfileItemLink } from 'app/common/interfaces'
import TabBar from 'app/common/components/TabBar'
import { TabBarItemEnum } from 'app/common/enums'
import ProfileLinkItem from './ProfileLinkItem'

const Profile = () => {
  const { width } = Dimensions.get('window')
  const { colors } = useTheme()
  const { userData, signOut } = useAuth()

  const navigator = useNavigation()

  const arrayLinks: ProfileItemLink[] = [
    {
      title: 'Historico de pedidos',
      onPress: () => navigator.navigate('OrderHistory'),
      iconName: 'container'
    },
    {
      title: 'Meus Endereços',
      onPress: () => navigator.navigate('MyAddresses'),
      iconName: 'environment'
    },
    {
      title: 'Formas de pagamento',
      onPress: () => navigator.navigate('PaymentMethods'),
      iconName: 'credit-card'
    },
    {
      title: 'Notificações',
      onPress: () => navigator.navigate('Notifications'),
      iconName: 'bell'
    },
    {
      title: 'Sair',
      onPress: () => signOut(),
      iconName: 'logout'
    }
  ]

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.card
      }}
    >
      <View
        style={{
          width: width * 0.92,
          height: 80,
          marginStart: 15,
          paddingStart: 15,
          marginTop: 32,
          flexDirection: 'row',
          borderBottomColor: '#EFF0EF',
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            width: 43,
            height: 43,
            backgroundColor: '#D8DAD8',
            marginEnd: 10
          }}
        >
          <Icon name="user" size="md" color={colors.card} />
        </View>
        <View
          style={{
            flexDirection: 'column'
          }}
        >
          <Text
            style={{
              fontFamily: 'Sora-Bold',
              fontSize: 16
            }}
          >
            {userData?.client?.first_name}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigator.navigate('UpdateProfile')}
          >
            <Text
              style={{
                fontFamily: 'Sora-Bold',
                fontSize: 12,
                color: colors.primary
              }}
            >
              Editar perfil
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          marginBottom: 3,
          marginTop: 10,
          marginLeft: 15,
          marginEnd: 20
        }}
      >
        <List
          style={{
            // width: width * 0.,
            justifyContent: 'flex-start'
          }}
        >
          {arrayLinks.map((item, index) => (
            <ProfileLinkItem
              key={`${3.141516 * index ** 2}`}
              iconName={item.iconName}
              title={item.title}
              onPress={item.onPress}
            />
          ))}
        </List>
      </View>
      <TabBar currentTab={TabBarItemEnum.PROFILE} />
    </View>
  )
}

export default Profile
