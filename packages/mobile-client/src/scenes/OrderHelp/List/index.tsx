import { IconOutline } from '@ant-design/icons-react-native';
import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';

interface ListProps {
  children?: false | JSX.Element | JSX.Element[];
}

const List = ({ children }: ListProps) => (
  <View
    style={{
      flexDirection: "column",
      flex: 1,
    }}
  >
    {children || null}
  </View>
);

export default List;

interface CustomItemProps {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const CustomItem = ({ children, onPress }: CustomItemProps) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={onPress}
    style={{
      justifyContent: "space-between",
      borderColor: "#E5E5E5",
      borderWidth: 1,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        marginHorizontal: 15,
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Sora",
          fontWeight: "400",
          fontSize: 14,
          lineHeight: 22,
          paddingVertical: 10,
          color: "#575C57",
        }}
      >
        {children}
      </Text>
      <IconOutline name="right" color="#41A550" size={16} />
    </View>
  </TouchableHighlight>
);
