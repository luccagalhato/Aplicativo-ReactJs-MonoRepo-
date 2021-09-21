import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";

import Onboard from "../scenes/Onboard";
import EmailSignUp from "../scenes/EmailSignUp";
import HeaderSignUp from "../common/components/HeaderSignUp";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  const { colors } = useTheme();

  return (
    <AuthStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: colors.background } }}
      initialRouteName="Onboard"
      headerMode="screen"
    >
      <AuthStack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="EmailSignUp"
        component={EmailSignUp}
        options={{
          header: () => <HeaderSignUp title="Qual o seu e-mail?" />,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
