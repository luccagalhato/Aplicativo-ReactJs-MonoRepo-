import React from "react";
import { View, Text, StatusBar } from "react-native";
import { Icon } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

interface HeaderProps {
  title?: string;
  option?: boolean;
}

const HeaderSignUp = ({ option = true }: HeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          paddingTop: insets.top + 10,
          paddingHorizontal: 25,
          backgroundColor: "white",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#DDD",
        }}
      >
        {option ? (
          <Icon
            name="arrow-left"
            onPress={handleBack}
            style={{
              color: "#41A550",
              fontSize: 24,
              padding: 12,
              marginLeft: -15,
            }}
          />
        ) : (
          <View style={{ paddingBottom: "15%" }} />
        )}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Sora-SemiBold",
            lineHeight: 22,
            color: colors.background,
          }}
        >
          Rua São Paulo, 300
        </Text>
        <Icon
          name="down"
          style={{
            color: "#41A550",
            fontSize: 12,
            padding: 5,
          }}
        />
      </View>
    </>
  );
};

export default HeaderSignUp;
