import React from "react";
import { View, Text } from "react-native";

import { OrderItems } from "../../interfaces";

const OrderItemDetails = ({ name, id, value, garnishes }: OrderItems) => {

  return (
    <View
      key={id}
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            textTransform: "capitalize",
            fontSize: 12,
            lineHeight: 22,
            color: "#252725",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontWeight: "normal",
            fontSize: 12,
            lineHeight: 22,
            color: "#41A550",
          }}
        >
          {`R$ ${value.toFixed(2)}`}
        </Text>
      </View>
      <View>
        {garnishes.map((garrison, idx) => (
          <View key={`garrison-${(idx + 1) * 2}`}>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: 12,
                lineHeight: 18,
                color: "#899089",
              }}
            >
              {`${garrison.quantity} ${garrison.name}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderItemDetails;
