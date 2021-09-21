import React from "react";
import { View, Image, StatusBar, Dimensions } from "react-native";
import { Icon } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/core";

const HeaderRestaurantInfo = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");

  function handleBack() {
    navigation.goBack();
  }

  const imageHeight = height / 3;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          paddingBottom: 10,
        }}
      >
        <Image
          source={require("../../../../assets/bannerRestaurante.png")}
          style={{
            top: 0,
            right: 0,
            left: 0,
            width: "100%",
            height: imageHeight,
            resizeMode: "cover",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        />
        <Icon
          name="arrow-left"
          onPress={handleBack}
          style={{
            color: "#41A550",
            fontSize: 24,
            padding: 12,
            left: 30,
            top: 40,
            marginLeft: -15,
            backgroundColor: "#FFF",
            borderRadius: 100,
            position: "absolute",
          }}
        />
      </View>
    </>
  );
};

export default HeaderRestaurantInfo;
