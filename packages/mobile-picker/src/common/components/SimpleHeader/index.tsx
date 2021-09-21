import React from "react";
import { Text, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Icon } from "@ant-design/react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShoppingBag } from "../../../contexts/Shopping";

interface HeaderProps {
  title: string;
  rigthButton?: boolean;
}

const SimpleHeader = ({ title, rigthButton = false }: HeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { clearShoppingBag, isEmptyBag } = useShoppingBag();

  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (navigation.canGoBack()) return navigation.goBack()
    return navigation.navigate("HomePicker");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: navigation.canGoBack() ? 'space-between' : 'center',
        width: "100%",
        height: 79,
        paddingTop: insets.top,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: "#EFF0EF",
      }}
    >
      {navigation.canGoBack() ? ( 
        <Icon
          name="arrow-left"
          style={{ color: colors.primary, fontSize: 25 }}
          onPress={goBack}
        />
      ) : null}
      <Text
        style={{
          left: 10,
          justifyContent: "space-between",
          margin: "auto",
          fontFamily: "Sora-Bold",
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "600",
          color: "#000",
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: 55,
          alignItems: "center",
        }}
      >
        {!isEmptyBag && rigthButton ? (
          <TouchableWithoutFeedback onPress={clearShoppingBag}>
            <Text
              style={{
                right: 0,
                color: colors.primary,
                fontFamily: "Sora-Bold",
                fontSize: 12,
              }}
            >
              Esvaziar
            </Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </View>
  );
};

export default SimpleHeader;
