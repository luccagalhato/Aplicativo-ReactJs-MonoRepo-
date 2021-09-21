import { Icon } from '@ant-design/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import OrderItemDetails from 'app/common/components/OrderItemDetails';
import { OrderData } from 'app/common/interfaces/index';
import { OrderStatus } from 'app/common/enums';

interface OrderDetailProps {
  orderData: OrderData;
  orderStatus: OrderStatus;
}

const OrderDetail = ({ orderData, orderStatus }: OrderDetailProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function getPaymentInfo() {
    const { method } = orderData.paymentInfo;
    if (method === "credit_card")
      return `Crédito ***${orderData.paymentInfo.info}`;
    if (method === "dedit_card")
      return `Débito ***${orderData.paymentInfo.info}`;
    return "dinheiro";
  }

  function getHelp() {
    return navigation.navigate("OrderHelp", {
      OrderParams: { orderId: orderData.orderId, orderStatus },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "bold",
          color: "#000000",
          width: "100%",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Resumo do pedido
      </Text>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          color: "#000000",
        }}
      >
        Entregar em
      </Text>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 25,
        }}
        onPress={() => {}}
      >
        <Text
          style={{
            fontSize: 14,
            lineHeight: 22,
            fontWeight: "bold",
            color: "#000000",
            marginRight: 5,
          }}
        >
          {orderData.address}
        </Text>
        <Icon
          name="down"
          style={{
            color: "#41A550",
            fontSize: 12,
            padding: 5
          }}
        />
      </Pressable>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          fontWeight: "bold",
          color: "#000000",
          marginBottom: 12,
        }}
      >
        Seu pedido
      </Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {orderData.orderItems.map((item) => (
          <OrderItemDetails
            garnishes={item.garnishes}
            id={item.id}
            name={item.name}
            value={item.value}
            key={item.id}
          />
        ))}
      </View>
      <Row title="Subtotal" value={orderData.subtotal} />
      <Row title="Taxa de entrega" value={orderData.deliveryFee} />
      <Row title="Total" value={orderData.total} bold />
      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          fontWeight: "bold",
          color: "#000000",
          marginVertical: 12,
        }}
      >
        Pagamento
      </Text>
      <Text
        style={{
          fontSize: 12,
          lineHeight: 22,
          fontWeight: "normal",
          color: "#252725",
        }}
      >
        {getPaymentInfo()}
      </Text>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          fontWeight: "normal",
          color: "#575C57",
          marginBottom: 40,
        }}
      >
        Pago pelo app
      </Text>
      <Pressable
        onPressIn={() => getHelp()}
        style={{ marginTop: 20, width: "100%" }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            lineHeight: 22,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Tenho um problema com meu pedido
        </Text>
      </Pressable>
    </View>
  );
};
interface RowProps {
  title: string;
  value: number;
  bold?: boolean;
}

const Row = ({ title, value, bold }: RowProps) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 5,
    }}
  >
    <Text
      style={{
        fontWeight: bold ? "bold" : "normal",
        fontSize: 12,
        lineHeight: 18,
        color: bold ? "#000000" : "#899089",
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        fontWeight: bold ? "bold" : "normal",
        fontSize: bold ? 14 : 12,
        lineHeight: bold ? 20 : 18,
        color: bold ? "#000000" : "#899089",
      }}
    >
      {`R$ ${value.toFixed(2)}`}
    </Text>
  </View>
);

export default OrderDetail;
