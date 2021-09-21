import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

interface LoadingIndicatorProps {
  style?: ViewStyle
}

const LoadingIndicator = ({style, ...props}: LoadingIndicatorProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    >
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );
};

export default LoadingIndicator;