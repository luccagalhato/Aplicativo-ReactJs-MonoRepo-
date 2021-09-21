import { Icon } from '@ant-design/react-native';
import Item from '@ant-design/react-native/lib/list/ListItem';
import { useTheme } from '@react-navigation/native';
import React from 'react'
import { Dimensions, GestureResponderEvent, Text, View } from 'react-native';

interface MyAddressItemProps {
  surname: string;
  street: string;
  number: number;
  onClick: (event: GestureResponderEvent) => void;
}

const MyAddressItem = ({ surname, street, number, onClick }: MyAddressItemProps) => {
  const { width } = Dimensions.get('window')
  const { colors } = useTheme()
  return (
    <Item
      onPress={onClick}
      style={{
        width: width * 0.92,
        height: 60,
        marginStart: 15,
        paddingStart: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon style={{ width: 20 }} size="xs" color={colors.primary} name="environment" />
        <Text>{surname}</Text>
      </View>
      <Text style={{
        margin: 2,
        color: '#899089',
      }}>
        {`${street}, ${number}`}
      </Text>
    </Item>
  )
}
export default MyAddressItem;
