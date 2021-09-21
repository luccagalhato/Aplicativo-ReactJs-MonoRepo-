import React, { useState } from 'react';
import {  useTheme, useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

import { OrderStatus } from 'app/common/enums';
import List, { CustomItem } from '../List';

const ChooseAction = () => {
  // const { orderId, orderStatus } = route.params;
  const { colors } = useTheme();
  const orderStatus = OrderStatus.PLACED;
  const orderId ="dsff";
  const [isChatActive, setChatActive] = useState(false);

  function onCancelOrder() {
    const navigation = useNavigation();
    // TODO request order cancel
    return () => {
      console.log(orderStatus);
      if (orderStatus < OrderStatus.PROCESSING) {
        // setView("order_canceled");
        navigation.navigate("Order");
      }
    };
  }

  return (
    <View
      style={{
        flex:1,
        backgroundColor: colors.card
      }}
    >
      <List>
        <CustomItem onPress={onCancelOrder()}>Cancelar pedido</CustomItem>
        <CustomItem onPress={() => setChatActive(true)}>
          Falar com o To Do
        </CustomItem>
      </List>
      <SwipeablePanel
        fullWidth
        openLarge
        closeOnTouchOutside
        barStyle={{ width: "40%" }}
        onClose={() => setChatActive(false)}
        isActive={isChatActive}
      >
        <View>
          <Text>{orderId}</Text>
        </View>
      </SwipeablePanel>
    </View>
  );
};
export default ChooseAction;
