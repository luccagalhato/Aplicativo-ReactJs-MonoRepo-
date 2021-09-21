import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Order = () => {
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
              Número do pedido
            </Text>
            <Text
              style={{
                color: "#252725",
                fontSize: 30,
                fontFamily: "Sora-SemiBold",
                lineHeight: 38,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#D8DAD8",
              }}
            >
              #00000
            </Text>
            <Text
              style={{
                width: "60%",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                lineHeight: 22,
                color: "#575C57",
                paddingVertical: 15,
              }}
            >
              Pedido
            </Text>
            <View>
              <View style={styles.productView}>
                <Text style={styles.product}>
                  <Text style={styles.productQtd}>1x</Text> Nome do Produto
                </Text>
                <Text style={styles.remove}>1 item para remover</Text>
                <Text style={styles.add}>1 item para adicionar</Text>
              </View>
            </View>
            <View>
              <View style={styles.productView}>
                <Text style={styles.product}>
                  <Text style={styles.productQtd}>1x</Text> Nome do Produto
                </Text>
                <Text style={styles.remove}>1 item para remover</Text>
                <Text style={styles.add}>1 item para adicionar</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.observation}>Solicitar Talheres</Text>
          </View>
          <View>
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
                Coletei o pedido
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  product: {
    fontSize: 16,
    fontFamily: "Sora-Regular",
    lineHeight: 22,
    paddingBottom: 5,
  },
  productQtd: {
    fontFamily: "Sora-SemiBold",
    fontSize: 16,
    lineHeight: 22,
  },
  remove: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    lineHeight: 18,
    color: "#899089",
  },
  add: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    lineHeight: 18,
    color: "#899089",
  },
  productView: {
    paddingBottom: 10,
  },
  observation: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    lineHeight: 22,
    color: "#252725",
    paddingVertical: 20,
  },
});

export default Order;
