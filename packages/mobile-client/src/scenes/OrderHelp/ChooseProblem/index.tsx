import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native';

import List, { CustomItem } from '../List';

const ChooseProblem = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // const { orderId, orderStatus } = route.params;

  function selectProblemType(type: string) {
    return () => {
      navigation.navigate("ChooseAction");
    };
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
      }}
    >
      <List>
        <CustomItem onPress={selectProblemType("product")}>
          Tive um problema com um produto
        </CustomItem>
        <CustomItem onPress={selectProblemType("delivery")}>
          Tive um problema com um a entrega
        </CustomItem>
      </List>
    </View>
  );
};
export default ChooseProblem;
