import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

const Wait = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        marginTop: 26,
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 45 }}>Aguarde...</Text>
      </View>
    </View>
  );
};

export default Wait;
