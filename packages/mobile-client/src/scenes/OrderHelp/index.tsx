import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChooseProblem from './ChooseProblem';
import ChooseAction from './ChooseAction';

const OrderHelp = () => {
  const HelpStack = createStackNavigator();

  return (
    <HelpStack.Navigator initialRouteName="ChooseProblem" headerMode="none">
      <HelpStack.Screen name="ChooseProblem" component={ChooseProblem} />
      <HelpStack.Screen name="ChooseAction" component={ChooseAction} />
    </HelpStack.Navigator>
  );
};
export default OrderHelp;
