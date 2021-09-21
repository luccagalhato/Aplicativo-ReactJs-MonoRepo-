import { Feather, FontAwesome } from '@expo/vector-icons'
import Tag from 'app/common/components/Tag'
import { Restaurant } from 'app/common/interfaces'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  partner: Restaurant
}

const SearchPartnerItem = ({ partner }: Props) => {
  return (
    <View style={[styles.container]}>
      <Image
        style={styles.image}
        source={{ uri: partner.logo }}
        borderRadius={75 / 2}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{partner.name}</Text>
        <Text>
          <Text style={styles.categoriesList}>$$</Text>
          {partner.categories.length > 0 && (
            <Text style={styles.categoriesList}> ⋅ </Text>
          )}
          {partner.categories.map(category => {
            return (
              <Text key={category.id} style={styles.categoriesList}>
                {category.name}
                {'   '}
              </Text>
            )
          })}
        </Text>
        <View style={styles.tagList}>
          <Tag
            prefixIcon={<Feather name="clock" color="#41A550" />}
            style={{ marginRight: 8 }}
          >
            00min
          </Tag>
          <Tag
            prefixIcon={<FontAwesome name="star" color="#41A550" />}
            style={{ marginRight: 8 }}
          >
            5.0
          </Tag>
          <Tag>R$00,00</Tag>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 8
  },
  image: {
    backgroundColor: '#ccc',
    width: 75,
    height: 75,
    marginRight: 16
  },
  info: {
    height: 75,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  name: {
    color: '#0F281E',
    fontWeight: '600',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14
  },
  categoriesList: {
    color: '#575C57',
    fontWeight: '400',
    fontSize: 12
  },
  tagList: {
    flexDirection: 'row'
  }
})

export default SearchPartnerItem
