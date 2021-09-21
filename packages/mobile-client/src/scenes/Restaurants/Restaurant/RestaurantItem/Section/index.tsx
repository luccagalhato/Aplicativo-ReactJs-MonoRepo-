import { ProductOptions } from 'app/common/interfaces'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RestaurantItemSectionDefault from './Default'
import RestaurantItemSectionRadio from './Radio'

interface Props {
  option: ProductOptions
}

function RestaurantItemSection(props: Props) {
  const { option } = props
  const { section_name, option_items, min_count, max_count } = option
  const isRequired = min_count > 0
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{section_name}</Text>
          <Text style={styles.hint}>
            {isRequired
              ? min_count === 1 && max_count === 1
                ? 'Escolha 1 opção'
                : `Escolha de ${min_count} até ${max_count} ${
                    max_count === 1 ? 'opção' : 'opções'
                  }`
              : `Escolha de ${min_count} até ${max_count} ${
                  max_count === 1 ? 'opção' : 'opções'
                }`}
          </Text>
        </View>
        <Text style={styles.legend}>
          {isRequired ? 'Obrigatório' : 'Opcional'}
        </Text>
      </View>
      {option_items
        .filter(item => item.is_available)
        .map((item, index) =>
          min_count === 1 && max_count === 1 ? (
            <RestaurantItemSectionRadio
              key={index}
              index={index}
              option={option}
              item={item}
            />
          ) : (
            <RestaurantItemSectionDefault
              key={index}
              index={index}
              option={option}
              item={item}
            />
          )
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontFamily: 'Sora',
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#252725',
    paddingLeft: 5
  },
  hint: {
    fontSize: 14,
    fontFamily: 'Sora',
    fontWeight: 'normal',
    lineHeight: 22,
    color: '#BDC1BD',
    paddingLeft: 5
  },
  legend: {
    fontFamily: 'Sora',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#BDC1BD'
  }
})

export default RestaurantItemSection
