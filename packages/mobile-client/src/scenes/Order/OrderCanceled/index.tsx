import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

import RoundIcon from 'app/common/components/RoundIcon';
import Canceled from 'assets/orderCanceled.svg';

const OrderRating = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: colors.card,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <RoundIcon size="large" svgIcon={Canceled} backgroundColor="#DAF7DE" />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          lineHeight: 24,
          color: "#252725",
          marginTop:40
        }}
      >
        Pedido cancelado
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "normal",
          lineHeight: 16,
          color: "#575C57",
          textAlign:'center',
          marginHorizontal:15,
          marginTop:15
        }}
      >
        Não se preocupe, em breve você receberá o reembolso da sua compra.
      </Text>
    </View>
  );
};

export default OrderRating;
