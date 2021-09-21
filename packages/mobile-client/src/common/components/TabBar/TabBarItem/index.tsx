import { Icon } from "@ant-design/react-native";
import { IconNames } from "@ant-design/react-native/lib/icon";
import React from "react";
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TabBarItemEnum } from "../../../enums";

type TabBarItemProps = {
  onPress: () => any;
  iconName: IconNames;
  activeTab: TabBarItemEnum;
  title: string;
  tabType: TabBarItemEnum;
};

const TabBarItem = ({
  onPress,
  iconName,
  tabType,
  activeTab,
  title,
}: TabBarItemProps) => {
  const handlerColor = (): ColorValue =>
    activeTab === tabType ? "#FFFFFF" : "#41A550";

  const textStyle: StyleProp<TextStyle> = {
    fontSize: 10,
    color: handlerColor(),
    alignSelf: "center",
    fontWeight: "600",
    fontFamily: "Sora",
  };

  const iconStyle: StyleProp<TextStyle> = {
    height: 24,
    width: 24,
    color: handlerColor(),
    textAlign: "center",
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ alignItems: "center" }}>
        <Icon style={iconStyle} name={iconName} />
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabBarItem;
