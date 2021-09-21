import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button, Flex, WhiteSpace } from "@ant-design/react-native";

const Home = () => {
  const { colors } = useTheme();
  const navigator = useNavigation();

  function goToSignup(url: string) {
    return () => navigator.navigate(url);
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "column",
        }}
        resizeMode="cover"
      >
        <Flex>
          <Flex.Item
            style={{
              backgroundColor: colors.card,
              justifyContent: "flex-end",
              alignItems: "stretch",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                textAlign: "center",
                fontFamily: "Sora",
                color: colors.text,
              }}
            >
              Logar com usuário e senha
            </Text>
            <WhiteSpace size="xl" />
            <Button
              style={{ borderRadius: 100, borderColor: colors.notification }}
              onPress={goToSignup("EmailSignUp")}
            >
              <Text style={{ fontSize: 16, color: colors.notification }}>
                Entrar
              </Text>
            </Button>
          </Flex.Item>
        </Flex>
      </ImageBackground>
    </View>
  );
};

export default Home;
