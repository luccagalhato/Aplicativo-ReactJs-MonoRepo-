import { Icon } from '@ant-design/react-native';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import RoundIcon from 'app/common/components/RoundIcon';
import Steps from 'app/common/components/Steps';

import Delivered from 'assets/orderDelivered.svg';
import Placed from 'assets/orderPlaced.svg';
import InProgress from 'assets/orderInProgress.svg';
import OnWay from 'assets/orderOnWay.svg';

import { OrderStatus } from 'app/common/enums';
import { OrderData } from 'app/common/interfaces/index';

import OrderDetail from '../OrderDetail';

interface OrderTrackingProps {
  orderStatus: OrderStatus;
  orderData: OrderData;
}

const OrderTracking = ({ orderStatus, orderData }: OrderTrackingProps) => {
  const { colors } = useTheme();
  const [isDetailOn, setDetailOn] = useState(false);
  const [isChatOn, setChatOn] = useState(false);

  const orderSteps = [
    {
      title: "Realizado",
      description: "Seu pedido está sendo confirmado",
      icon: Placed,
    },
    {
      title: "Em preparo",
      description: "A loja confirmou a preparar seu pedido",
      icon: InProgress,
    },
    {
      title: "A caminho",
      description: "Seu pedido está indo até você",
      icon: OnWay,
    },
    {
      title: "Chegou",
      description: "Retire a sua entrega ;)",
      icon: Delivered,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        paddingVertical: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.card,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Steps current={orderStatus} steps={orderSteps} />
        <RoundIcon
          svgIcon={orderSteps[orderStatus].icon}
          backgroundColor="#DAF7DE"
          size="large"
        />
      </View>
      {orderStatus >= 2 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <RoundIcon backgroundColor="#D8DAD8" size="small">
            <Icon name="user" style={{ color: "#fff", fontSize: 20 }} />
          </RoundIcon>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 22,
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              {orderData.deliveryman.name}
            </Text>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 22,
                fontWeight: "bold",
                color: "#899089",
              }}
            >
              To Do
            </Text>
          </View>
          <Pressable onPress={() => setChatOn(true)}>
            <RoundIcon backgroundColor="#41A550" size="small">
              <Icon name="message" style={{ color: "#fff", fontSize: 20 }} />
            </RoundIcon>
          </Pressable>
        </View>
      )}
      <Pressable
        onPressIn={() => setDetailOn(true)}
        style={{ width: "40 %" }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Resumo do pedido
        </Text>
      </Pressable>
      <SwipeablePanel
        fullWidth
        closeOnTouchOutside
        barStyle={{ width: "40%" }}
        onClose={() => setDetailOn(false)}
        isActive={isDetailOn}
      >
        <OrderDetail orderData={orderData} orderStatus={orderStatus}/>
      </SwipeablePanel>
      <SwipeablePanel
        fullWidth
        closeOnTouchOutside
        barStyle={{ width: "40%" }}
        onClose={() => setChatOn(false)}
        isActive={isChatOn}
        style={{
          backgroundColor: colors.primary,
        }}
      >
        <Text>Test</Text>
      </SwipeablePanel>
    </View>
  );
};

export default OrderTracking;
