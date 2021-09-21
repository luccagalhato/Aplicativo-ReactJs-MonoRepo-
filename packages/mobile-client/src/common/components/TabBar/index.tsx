import React, { useState, useEffect } from "react";
import { View } from "react-native";
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

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 30,
        backgroundColor: "#14412D",
        height: 55,
        width: 350,
        paddingTop: 8,
        paddingLeft: 39.5,
        paddingRight: 39.5,
        paddingBottom: 8,
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        alignSelf: "center",
        bottom: 20,
      }}
    >
      <TabBarItem
        activeTab={activeTab}
        iconName="home"
        title="Home"
        onPress={handlerOnPressTab(TabBarItemEnum.HOME)}
        tabType={TabBarItemEnum.HOME}
      />

      <TabBarItem
        activeTab={activeTab}
        iconName="search"
        title="Busca"
        onPress={handlerOnPressTab(TabBarItemEnum.SEARCH)}
        tabType={TabBarItemEnum.SEARCH}
      />

      <TabBarItem
        activeTab={activeTab}
        iconName="shopping"
        title="Cesta"
        onPress={handlerOnPressTab(TabBarItemEnum.CART)}
        tabType={TabBarItemEnum.CART}
      />

      <TabBarItem
        activeTab={activeTab}
        iconName="user"
        title="Perfil"
        onPress={handlerOnPressTab(TabBarItemEnum.PROFILE)}
        tabType={TabBarItemEnum.PROFILE}
      />
    </View>
  );
}
