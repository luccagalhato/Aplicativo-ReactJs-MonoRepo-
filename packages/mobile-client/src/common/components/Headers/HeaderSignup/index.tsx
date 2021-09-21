import React from "react";
import { View, Text } from "react-native";
import { Icon } from "@ant-design/react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
}

const HeaderSignUp = ({ title }: HeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View
      style={{
        flexDirection: "column",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Icon
        name="arrow-left"
        onPress={handleBack}
        style={{ color: colors.primary, fontSize: 32 }}
      />
      <Text
        style={{
          marginTop: 12,
          fontSize: 22,
          fontFamily: "Sora",
          lineHeight: 28,
          color: colors.card,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default HeaderSignUp;