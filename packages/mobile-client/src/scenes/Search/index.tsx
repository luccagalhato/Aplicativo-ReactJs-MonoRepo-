import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import InputSearch from 'app/common/components/InputSearch'
import RoundIcon from 'app/common/components/RoundIcon'
import { Restaurant } from 'app/common/interfaces'
import { useAuth } from 'app/contexts/Auth'
import { useFilters } from 'app/contexts/Filters'
import { generalSearch } from 'app/service/search/api'
import EmptySearch from 'assets/search-empty.svg'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import {
  FlatList,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDebouncedCallback } from 'use-debounce'
import SearchPartnerItem from './Partner'

const Search = () => {
  const [searching, setSearching] = React.useState(false)
  const [data, setData] = React.useState<Restaurant[]>([])
  const { userData } = useAuth()
  const { filters, setFilters, toggleFiltersBox } = useFilters()
  const { colors } = useTheme()

  const search = useDebouncedCallback((value: string) => {
    setFilters({ ...filters, textSearch: value })

    if (searching) return
    if (value.length < 3) {
      setData([])
      return
    }
    if (!userData || !userData.client || !userData.client.default_place_id) {
      console.log('Location not defined!')
      return
    }

    const { client } = userData
    const { default_place_id } = client
    const defaultAddress = client.delivery_address.find(
      address => address.place_id === default_place_id
    )

    if (!defaultAddress) {
      console.log('Address not defined!')
      return
    }

    const categories = filters.categories
      .filter(({ selected }) => selected)
      .map(({ name }) => name)

    setSearching(true)
    generalSearch
      .partners(value, categories, {
        lat: defaultAddress.latitude || 0,
        lng: defaultAddress.longitude || 0
      })
      .then(response => {
        console.log(response)
        setSearching(false)
        setData(response.ok ? response.data : [])
      })
      .catch(error => {
        console.error(error)
        setData([])
        setSearching(false)
      })
  }, 1000)

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28
        }}
      >
        <Form
          onSubmit={() => {}}
          style={{
            width: '80%'
          }}
        >
          <InputSearch
            name="search"
            placeholder="Buscar pratos, produtos ou lojas"
            onChangeText={(text: string) => search(text)}
            returnKeyType="search"
          />
        </Form>
        <TouchableWithoutFeedback
          onPress={() => toggleFiltersBox(true)}
          style={{
            marginRight: '5%',
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

      {searching ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          refreshing={searching}
          data={data}
          contentContainerStyle={{ flex: 1 }}
          keyExtractor={item => String(item.id || item.sku)}
          renderItem={({ item }) => <SearchPartnerItem partner={item} />}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: '#EFF0EF',
                  marginVertical: 8
                }}
              ></View>
            )
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RoundIcon
                size="large"
                svgIcon={EmptySearch}
                backgroundColor="#DAF7DE"
              />
              <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20
  },
  emptyText: {
    fontSize: 20,
    lineHeight: 28,
    marginTop: 64,
    fontFamily: 'Sora',
    paddingHorizontal: 50,
    textAlign: 'center'
  }
})

export default Search
