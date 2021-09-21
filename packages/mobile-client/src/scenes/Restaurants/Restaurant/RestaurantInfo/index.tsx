import { Icon } from '@ant-design/react-native'
import {
  Collapse,
  CollapseBody,
  CollapseHeader
} from 'accordion-collapse-react-native'
import { useRestaurant } from 'app/contexts/Restaurant'
import { formatLocation, formatPhoneNumber } from 'app/utils/format'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RestaurantInfo = () => {
  const { restaurant } = useRestaurant()
  if (!restaurant) return null

  const { location, contact, open_time, end_time } = restaurant

  function extractTime(date: Date) {
    return date.toString().substr(11, 5)
  }

  const open = extractTime(open_time)
  const end = extractTime(end_time)

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.list}>
        <View>
          <Icon
            name="environment"
            style={{
              color: '#41A550'
            }}
          />
        </View>
        <View>
          <Text style={styles.infos}>{formatLocation(location)}</Text>
        </View>
      </View>

      <View style={styles.list}>
        <View>
          <Icon name="phone" style={{ color: '#41A550' }} />
        </View>
        <View>
          <Text style={styles.infos}>
            {contact.telephone ? formatPhoneNumber(contact.telephone) : ''}
            {contact.cellphone ? formatPhoneNumber(contact.cellphone) : ''}
          </Text>
        </View>
      </View>

      <Collapse>
        <CollapseHeader>
          <View style={styles.listAcordeon}>
            <View>
              <Icon
                name="clock-circle"
                style={{
                  color: '#41A550'
                }}
              />
            </View>
            <View>
              <Text style={styles.infos}>
                Aberto das {open} às {end}
              </Text>
            </View>
            <Icon
              name="arrow-down"
              style={{
                marginHorizontal: 120,
                color: '#41A550'
              }}
            />
          </View>
        </CollapseHeader>
        <CollapseBody style={{ marginHorizontal: 20 }}>
          <View>
            <Text style={styles.day}>Segunda-Sexta</Text>
            <Text style={styles.hour}>
              {open} às {end}
            </Text>
          </View>

          <View>
            <Text style={styles.day}>Sábado</Text>
            <Text style={styles.hour}>
              {open} às {end}
            </Text>
          </View>

          <View>
            <Text style={styles.day}>Domingo</Text>
            <Text style={styles.hour}>
              {open} às {end}
            </Text>
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 17,
    marginHorizontal: 20,
    borderStyle: 'solid',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF0EF',
    paddingBottom: 16
  },
  listAcordeon: {
    marginTop: 17,
    marginHorizontal: 20,
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingBottom: 16
  },
  infos: {
    marginHorizontal: 20,
    fontFamily: 'Sora',
    fontSize: 14
  },
  day: {
    fontFamily: 'Sora-Bold',
    fontSize: 14
  },
  hour: {
    fontFamily: 'Sora',
    fontSize: 14
  }
})

export default RestaurantInfo
