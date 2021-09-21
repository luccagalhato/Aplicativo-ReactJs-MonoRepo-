import { Icon, List } from '@ant-design/react-native'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import Button from 'app/common/components/Button'
import Input from 'app/common/components/Input'
import { GoogleMapsAddress, LatLng, UserData } from 'app/common/interfaces'
import { useAuth } from 'app/contexts/Auth'
import { useService } from 'app/contexts/Service'
import {
  updateClientGoogleLocation,
  updateClientLatLon
} from 'app/service/client.api'
import { getGoogleMapsAddress } from 'app/service/geolocation.api'
import { getValueByKeyInPayload } from 'app/service/helpers'
import * as Loc from 'expo-location'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { useDebounce } from 'use-debounce'

const Location = () => {
  const { colors } = useTheme()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const { name: routeName } = useRoute()

  const { userData, setUserData } = useAuth()

  const handleSubmit = useCallback(async () => {}, [])

  const { Item } = List
  const { Brief } = Item

  const [addressValue, setAddressValue] = useState('')
  const [count, setCount] = useState(0)
  const [debouncedAddress] = useDebounce<string>(addressValue, 500)

  const [location, setLocation] = useState<GoogleMapsAddress[]>([])
  const [loading, setLoading] = useState(false)

  const { geolocationApi, clientApi } = useService()

  useEffect(() => {
    if (!debouncedAddress) return
    ;(async () => {
      const { status } = await requestTrackingPermissionsAsync()
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data')
      }
    })()

    const getLoc = async () => {
      setCount(count + 1)
      if (userData && userData.accessToken && userData.idToken) {
        const resp = await getGoogleMapsAddress(geolocationApi)(
          debouncedAddress
        )

        if (resp.data) {
          setLocation(resp.data)
        }
      }
    }
    getLoc()
  }, [debouncedAddress])

  const handlerSaveLocation = async (googleMapsAddress: GoogleMapsAddress) => {
    if (!userData) return

    const id = getValueByKeyInPayload('username', userData.accessToken)
    const savedLocation = await updateClientGoogleLocation(clientApi)(
      id!,
      googleMapsAddress
    )

    setUserData({
      ...userData,
      client: {
        ...userData.client,
        delivery_address: [
          ...(userData.client?.delivery_address ?? []),
          savedLocation
        ]
      } as UserData['client']
    })

    return navigation.navigate(
      routeName === 'AddLocation' ? 'AddLocationSurname' : 'LocationSurname',
      {
        address: savedLocation,
        goToPage: 'Home'
      }
    )
  }

  const saveAppLocation = async () => {
    try {
      setLoading(true)
      const { status } = await Loc.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Sem permissão')
      }

      const currLocation = await Loc.getCurrentPositionAsync({})

      const latlon: LatLng = {
        lat: currLocation.coords.latitude,
        lng: currLocation.coords.longitude
      }

      if (!userData) {
        throw new Error('Não foi possível carregar os dados do usuário')
      }

      const id = getValueByKeyInPayload(
        'username',
        userData.accessToken as string
      )

      const savedLocation = await updateClientLatLon(clientApi)(id!, latlon)

      setUserData({
        ...userData,
        client: {
          ...userData.client,
          delivery_address: [
            ...(userData?.client?.delivery_address ?? []),
            savedLocation
          ]
        } as UserData['client']
      })

      navigation.navigate(
        routeName === 'AddLocation' ? 'AddLocationSurname' : 'LocationSurname',
        {
          address: savedLocation
        }
      )
    } catch (error) {
      Alert.alert(error.message ?? 'Algo deu Errado ao salvar localização!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopLeftRadius: routeName === 'Location' ? 30 : 0,
        borderTopRightRadius: routeName === 'Location' ? 30 : 0,
        padding: 24,
        marginTop: routeName === 'Location' ? 26 : 0,
        position: 'relative'
      }}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Input
          name="location"
          returnKeyType="search"
          icon={
            <Icon
              name="search"
              style={{ position: 'absolute', top: 15, left: 8 }}
            />
          }
          iconSide="left"
          placeholder="Buscar endereço e número"
          onChangeText={setAddressValue}
          clearButtonMode="always"
        />
        <ScrollView alwaysBounceVertical>
          <List style={{ justifyContent: 'flex-start' }}>
            {location.map(item => (
              <Item
                key={item.place_id}
                align="top"
                multipleLine
                onPress={() => handlerSaveLocation(item)}
              >
                {item.primary_address} <Brief>{item.secundary_address}</Brief>
              </Item>
            ))}
          </List>
        </ScrollView>
        <Button
          backgroundColor={colors.primary}
          color={colors.card}
          icon="environment"
          onPress={() => {
            saveAppLocation()
          }}
          loading={loading}
        >
          Usar minha localização
        </Button>
      </Form>
    </View>
  )
}

export default Location
