import React from 'react';
import Item from '@ant-design/react-native/lib/list/ListItem';
import { Dimensions, Text, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '@react-navigation/native';
import { ProfileItemLink } from 'app/common/interfaces';

const ProfileLinkItem = ({ title, onPress, iconName }: ProfileItemLink) => {
  const { colors } = useTheme();
  const { height } = Dimensions.get("window");

  return (
    <Item
      align="top"
      multipleLine
      onPress={() => onPress()}
      style={{
        height: height * 0.1,
        flexDirection: "column",
        margin: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon
          style={{
            width: 24,
            marginEnd: 10,
            color: colors.primary,
          }}
          size="md"
          name={iconName}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Sora",
          }}
        >
          {title}
        </Text>
      </View>
    </Item>
  );
};

export default ProfileLinkItem;
