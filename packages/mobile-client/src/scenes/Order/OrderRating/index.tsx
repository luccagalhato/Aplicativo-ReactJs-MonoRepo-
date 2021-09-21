import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

import RoundIcon from 'app/common/components/RoundIcon';
import Button from 'app/common/components/Button';

import Ratting from 'assets/orderRating.svg';

import { OrderStatus } from 'app/common/enums';

interface OrderRatingProps {
  orderStatus: OrderStatus;
  orderId: string;
}

const OrderRating = ({ /* orderStatus, */ orderId }: OrderRatingProps) => {
  // const navigation = useNavigation();
  const { colors } = useTheme();
  const [isPanelActive, setIsPanelActive] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RoundIcon svgIcon={Ratting} backgroundColor="#DAF7DE" size="large" />

      <Text
        style={{
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "bold",
          color: "#000000",
          marginTop: 30,
        }}
      >
        Entrega confirmada
      </Text>

      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          width: "80%",
          fontWeight: "normal",
          color: "#000000",
          textAlign: "center",
          marginTop: 15,
        }}
      >
        Como estava o seu pedido? Nos conte como foi a sua experiência.
      </Text>
      <Button
        onPress={() => setIsPanelActive(true)}
        style={{
          backgroundColor: colors.primary,
          borderWidth: 0,
          paddingHorizontal: 10,
          marginTop: 30,
          height: 40,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Avaliar pedido
        </Text>
      </Button>
      <Pressable
        onPressIn={() => setIsPanelActive(true)}
        style={{ marginTop: 20 }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Avaliar mais tarde
        </Text>
      </Pressable>

      <SwipeablePanel
        fullWidth
        openLarge
        closeOnTouchOutside
        barStyle={{ width: "40%" }}
        onClose={() => setIsPanelActive(false)}
        isActive={isPanelActive}
      >
        <View>
          <Text>{orderId}</Text>
        </View>
      </SwipeablePanel>
    </View>
  );
};

export default OrderRating;
