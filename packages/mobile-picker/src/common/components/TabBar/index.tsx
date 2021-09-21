import React, { useState, useEffect } from "react";
import { View, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabBarItem from "./TabBarItem";
import { TabBarItemEnum } from "../../enums";

interface TabBarProps {
  currentTab?: TabBarItemEnum;
}

export default function TabBar({
  currentTab = TabBarItemEnum.HOME,
}: TabBarProps) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabBarItemEnum>(
    TabBarItemEnum.HOME
  );

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handlerOnPressTab = (tab: TabBarItemEnum) => () => {
    navigation.navigate(tab);
  };

  const handleOpenSupport = () => {
    Linking.openURL("https://wa.me/5511978179810");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 30,
        backgroundColor: "#14412D",
        height: 55,
        width: 334,
        paddingTop: 8,
        paddingLeft: 39.5,
        paddingRight: 39.5,
        paddingBottom: 8,
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        alignSelf: "center",
        bottom: 20,
      }}
    >
      <TabBarItem
        activeTab={activeTab}
        iconName="loader"
        title="Em andamento"
        onPress={handlerOnPressTab(TabBarItemEnum.HOME)}
        tabType={TabBarItemEnum.HOME}
      />
      <TabBarItem
        activeTab={activeTab}
        iconName="phone"
        title="Suporte"
        onPress={handleOpenSupport}
        tabType={TabBarItemEnum.SHOPPING}
      />
    </View>
  );
}
