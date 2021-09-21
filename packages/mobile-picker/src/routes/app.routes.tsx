import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";
import { Icon } from "@ant-design/react-native";

import Home from "../scenes/Home";

import HomePicker from "../scenes/HomePicker";
import AddressHeader from "../common/components/AddressHeader";

import SimpleHeader from "../common/components/SimpleHeader";

import Order from "../scenes/Order";
import Delivering from "../scenes/Delivering";
import Delivered from "../scenes/Delivered";

const AppStack = createStackNavigator();

const AppRoutes = () => {
  const { colors } = useTheme();

  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerBackImage: () => (
          <Icon
            name="arrow-left"
            style={{
              color: colors.primary,
              fontSize: 25,
            }}
          />
        ),
      }}
      initialRouteName="HomePicker"
      headerMode="screen"
    >
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <AddressHeader />,
        }}
      />
      <AppStack.Screen
        name="HomePicker"
        component={HomePicker}
        options={{
          header: () => <SimpleHeader title="Sua Cesta" rigthButton />,
        }}
      />

      <AppStack.Screen
        name="Order"
        component={Order}
        options={{
          header: () => <SimpleHeader title="Coleta em Andamento" />,
        }}
      />

      <AppStack.Screen
        name="Delivering"
        component={Delivering}
        options={{
          header: () => <SimpleHeader title="Entrega em andamento" />,
        }}
      />

      <AppStack.Screen
        name="Delivered"
        component={Delivered}
        options={{
          header: () => <SimpleHeader title="Entrega em andamento" />,
        }}
      />

      {/* <AppStack.Screen name="Search" component={Search} /> */}
    </AppStack.Navigator>
  );
};

export default AppRoutes;
