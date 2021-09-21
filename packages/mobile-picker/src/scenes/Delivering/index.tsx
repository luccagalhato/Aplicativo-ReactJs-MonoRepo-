import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "@ant-design/react-native";

const Delivering = () => {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: "#FFF", padding: "5%" }}>
        <View
          style={{
            borderWidth: 1,
            width: "100%",
            padding: "5%",
            borderColor: "#D8DAD8",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: "5%",
              borderColor: "#D8DAD8",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Roboto-Regular",
                lineHeight: 22,
                color: "#899089",
                paddingBottom: 10,
              }}
            >
              Entregar Em
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: "60%",
                  fontSize: 18,
                  fontFamily: "Roboto-Medium",
                  lineHeight: 24,
                }}
              >
                Rua Joaquim Antunes, 210 - Pinheiros, São Paulo - SP, 05415-010
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  height: 48,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                }}
              >
                <Icon
                  name="environment"
                  onPress={handleBack}
                  style={{ color: "#000", fontSize: 16, paddingRight: 5 }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Roboto-Medium" }}>
                  Mapa
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "#41A550",
                fontSize: 16,
                fontFamily: "Sora-SemiBold",
                lineHeight: 24,
                paddingBottom: 10,
                paddingTop: 20,
              }}
            >
              Nome do usuário
            </Text>
            <Text
              style={{
                color: "#575C57",
                fontSize: 14,
                fontFamily: "Roboto-Regular",
                lineHeight: 22,
                paddingBottom: 10,
              }}
            >
              Complemento do endereco
            </Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 48,
                paddingHorizontal: 24,
                borderRadius: 50,
                justifyContent: "center",
                backgroundColor: "#41A550",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto-Medium",
                  color: "#FFF",
                  paddingVertical: 12,
                }}
              >
                Cheguei ao destino
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Delivering;
