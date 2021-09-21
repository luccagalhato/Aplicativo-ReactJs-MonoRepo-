import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Theme from "./src/styles/theme";
import { AuthProvider } from "./src/contexts/Auth";
import Routes from "./src/routes";
import { ShoppingProvider } from "./src/contexts/Shopping";
import { FiltersProvider } from "./src/contexts/Filters";

export default function App() {
  const [fontsLoaded] = useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
    Sora: require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}>
        <AuthProvider>
          <FiltersProvider>
            <ShoppingProvider>
              <Routes />
            </ShoppingProvider>
          </FiltersProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
